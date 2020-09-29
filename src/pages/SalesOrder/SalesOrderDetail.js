import React from 'react'
import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import { IoIosArrowDown } from 'react-icons/io'
import CustomTable from 'shared/table/CustomTableDetail'
import CustomPagination from 'shared/table/CustomPagination'
import HeaderTitle from 'shared/container/TheHeader'
import './SalesOrder.scss'

const columns = [
  { 
    accessor: "line", 
    placeholder: 'Line No', 
    Header: "Line No" ,
    Cell: props => <span>{props.value ? props.value : '-'}</span> 
  },
  { 
    accessor: "product", 
    placeholder: 'Product', 
    Header: "Product", 
    Cell: props => <span>{props.value ? props.value : '-'}</span> 
  },
  { 
    accessor: "product_description",
    placeholder: 'Description', 
    Header: "Description",
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: "qty", 
    placeholder: 'Qty', Header: "Qty", 
    width: 100, style:{textAlign:'right'}, 
    headerClassName:'text-right',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>)    
  },
  { 
    accessor: "uom", 
    placeholder: 'UOM', 
    Header: "UOM", 
    width: 80,
    Cell: props => <span>{props.value ? props.value : '-'}</span>   
  },
  { 
    accessor: "qty_processed", 
    placeholder: 'Qty Processed',
    Header: "Qty Processed", 
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>)    
  },
  { 
    accessor: "weight",  
    placeholder: 'Weight', 
    Header: "Weight" ,
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>)   
  },
  { 
    accessor: "weight_processed", 
    placeholder: 'Weight Procesed', 
    Header: "Weight Processed" ,
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>)   
  },
  {
    accessor: "completed",
    placeholder: 'Completed',
     Header: "Completed",
    Cell: (row) => <i className={`${row.original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  {
    accessor: "oos",
    placeholder: 'OOS', 
    Header: "OOS", 
    width: 60 ,
    Cell: (row) => <i className={`${row.original.oos === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  {
    accessor: "released",
    placeholder: 'Released', 
    Header: "Released", 
    Cell: (row) => <i className={`${row.original.released === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  { 
    accessor: "batch",  
    Cell: row => (<div className="text-left">{row.value}</div>),  
    placeholder: 'Batch',  
    Header: "Batch" , 
    width: 100 ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: "ref3",
    placeholder: 'Ref3', 
    Header: "Ref3" , 
    width: null ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: "ref4",
    placeholder: 'Ref4', 
    Header: "Ref4" , 
    width: null ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: "disposition",
    placeholder: 'Disposition',
    Header: "Disposition" ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: "pack_id",
    placeholder: 'Pack ID', 
    Header: "Pack ID",
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
   },
  { 
    accessor: "rota1",
    placeholder: 'Rotadate', 
    Header: "ROTADATE", 
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  }
]
class SalesOrderDetail extends React.Component {
  // ref to get element height and calculate table height
  section1 = React.createRef()
  state = {
    dimension: { width: 0, height: 0 },
    fields: columns,
    detail: {},
    products: [],
    request_status: 'Please Wait...',
    pagination: {}, 
    tableStatus: 'waiting',
    exportData: []
  }
  componentDidMount() {
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);
    this.getDetail()
    this.getProducts()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }
  updateDimension = () => {
    const height = (window.innerHeight - this.section1.current.clientHeight - 175)
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getDetail = async () => {
    const { orderno, client, site } = this.props.match.params
    const url = `/salesorder?searchParam=${orderno}&client=${client}&site=${site}`
    const { data } = await axios.get(url)
    console.log(data)
    if (!!data.data) {
      this.setState({ detail: data.data.data[0] })
    }
  }
  getProducts = async (page=1,export_='false') => {
    //export : true/false --> param for identify this function called from export button 

    const { pagination } = this.state
    const { orderno, client, site } = this.props.match.params
    this.setState({ data: [], tableStatus: "waiting" }) 
    const url = `/salesorder/${orderno}?client=${client}&site=${site}&page=${page}&export=${export_}`
    const { data } = await axios.get(url)
    console.log(data)
    // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    if (data?.data?.data) { 
        if(export_=='true'){
          this.setState({ 
            exportData: data.data.data
          })
        }else{
          console.log(data.data.data[0])
          this.setState({
            products: data.data.data.map(data => {
              data.qty = numeral(data.qty).format('0,0')
              data.qty_processed = numeral(data.qty_processed).format('0,0')
              data.weight = numeral(data.weight).format('0,0.000')
              data.weight_processed = numeral(data.weight_processed).format('0,0.000')
              return data
            }),
            pagination: {
              active: pagination.active || data.data.current_page,
              show: data.data.per_page,
              total: data.data.total,
              last_page: data.data.last_page,
              from: data.data.from,
              to: data.data.to
            } 
          })
        }
      
      if (data.data.data.length<1) {
        this.setState({ tableStatus: "noData" })
      }
    }else{  
      this.setState({ data: [], tableStatus: "noData" }) 
    }  
  }
  formatDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '-'
  }

  UrlHeader = () =>{
    return `/getSalesOrderDetailColumn?client=ALL `
  }
  UrlAll = () => {
    return '/putSalesOrderDetailColumn?client=ALL'
  }

  
  showDetails = (item) => {
    const { orderno, client, site } = this.props.match.params
    const url = `/salesorder/${orderno}?client=${client}&site=${site}` 
    this.props.history.push(url)
  }
  render() {
    // const { match, history } = this.props
    const { detail, products, fields, pagination, tableStatus, exportData} = this.state
    return <div className="sales-order-detail">
      <HeaderTitle breadcrumb={[
        { to: '/sales-orders', label: 'Sales Order' },
        { to: '', label: this.props.match.params.orderno, active: true },
      ]} />
      <div ref={this.section1} className="card-group section-1 mb-3" >
        <CCard>
          <CCardBody className="p-0 m-3 border-right">
            <CRow className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Site</CCol> <CCol>{detail.site}: {detail.site_name}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Client</CCol> <CCol>{detail.client}: {detail.client_name}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Order No</CCol> <CCol>{detail.orderno || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Order Type</CCol> <CCol>{detail.ordertype || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Task</CCol> <CCol>{detail.isistask || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Customer No.</CCol> <CCol>{detail.customer || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Customer Name</CCol> <CCol>{detail.customername || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Customer Order Ref</CCol> <CCol>{detail.customerpono || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Vendor Order Ref</CCol> <CCol>{detail.vendororderno || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 my-3 mx-0 border-right">
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Address 1</CCol> <CCol>{detail.address1 || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Address 2</CCol> <CCol>{detail.address2 || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Address 3</CCol> <CCol>{detail.address3 || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Address 4</CCol> <CCol>{detail.address4 || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Address 5</CCol> <CCol>{detail.address5 || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Suburb</CCol> <CCol>{detail.suburb || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Postcode</CCol> <CCol>{detail.postcode || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">State</CCol> <CCol>{detail.state || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Country</CCol> <CCol>{detail.country || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 m-3">
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Status</CCol> <CCol>{(detail.status && detail.status.includes("0:")?"0: Unavailable":detail.status) || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Delivery Date</CCol> <CCol>{this.formatDate(detail.deliverydate)}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Date Received</CCol> <CCol>{this.formatDate(detail.datereceived)}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Date Released</CCol> <CCol>{this.formatDate(detail.datereleased)}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Date Completed</CCol> <CCol>{this.formatDate(detail.datecompleted)}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Load Number</CCol> <CCol>{detail.loadnumber || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Loadout Start</CCol> <CCol>{this.formatDate(detail.loadoutstart)}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Loadout Finish</CCol> <CCol>{this.formatDate(detail.loadoutfinish)}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Consignment No</CCol> <CCol>{detail.consignmentno || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0">Freight Charge</CCol> <CCol>{detail.freightcharge || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
      </div>

      <CustomTable
        title="Sales Orders Details"
        filename='Microlistics_SalesOrderDetail.'
        font="7"
        height={this.state.dimension.height}
        fields={fields}
        data={products}
        pagination={pagination}
        tableStatus={tableStatus}
        UrlHeader={this.UrlHeader} 
        UrlAll={this.UrlAll}
        // request_status={this.state.request_status}
        goto={(active) => {
          this.setState({ pagination: { ...pagination, active } }, () => this.getProducts(active))
        }} 
        export={
          <button className='btn btn-primary float-right btn-export'>
            {/* <div className='export-export pr-3' /> */}
            EXPORT
          </button>
        }
        exportApi={async () =>  {await this.getProducts(1,'true')}}
        exportData={exportData}
      />
    </div>
  }
}
export default SalesOrderDetail