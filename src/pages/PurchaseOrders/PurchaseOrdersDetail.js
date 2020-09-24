import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import { CCard, CCardBody, CRow, CCol, CButton, } from '@coreui/react'
import CustomTable from 'shared/table/CustomTableDetail'
import CustomPagination from 'shared/table/CustomPagination'
import HeaderTitle from 'shared/container/TheHeader'
import './PurchaseOrder.scss'
const columns = [
  { accessor: "orig_line_number",  placeholder: 'Line No', Header: "Line No", width:90 },
  { accessor: "product", Cell: row => (<div>{row.value}</div>),    placeholder: 'Product', Header: "Product" },
  { accessor: "product_name",  placeholder: 'Description', Header: "Description" },
  { accessor: "quantity",  Cell: row => (<div className="alg-right">{row.value}</div>),   placeholder: 'Qty', Header: "Qty", width: 60, sortType: "float" },
  { accessor: "packdesc_1",  placeholder: 'UOM', Header: "UOM", width: 80 },
  { accessor: "qty_processed", Cell: row => (<div className="alg-right">{row.value}</div>),    placeholder: 'Qty Processed', Header: "Qty Processed", width: 130, sortType: "float" },
  { accessor: "weight",  Cell: row => (<div className="alg-right">{row.value}</div>),   placeholder: 'Weight', Header: "Weight", sortType: "float" },
  { accessor: "weight_processed",  Cell: row => (<div className="alg-right">{row.value}</div>),   placeholder: 'Weight Processed', Header: "Weight Processed", width: 140 , sortType: "float"},
  {
    accessor: "completed",  placeholder: 'Completed', Header: "Completed",
    Cell: (row) => <i className={`${row.original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  { accessor: "batch",  Cell: row => (<div className="text-left">{row.value}</div>),   placeholder: 'Batch', Header: "Batch", width: null },
  { accessor: "rotadate",  placeholder: 'Rotadate', Header: "Rotadate" },
  { accessor: "ref3",  placeholder: 'Ref3', Header: "Ref3", width: null },
  { accessor: "ref4",  placeholder: 'Ref4', Header: "Ref4", width: null },
  { accessor: "disposition", placeholder: 'Disposition', Header: "Disposition" },
  {
    accessor: "released",placeholder: 'Released', Header: "Released", 
    Cell: (row) => <i className={`${row.original.released === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  }
]
class PurchaseOrdersDetail extends React.Component {
  constructor(props) {
    super(props)
    // ref to get element height and calculate table height
    this.section1 = React.createRef()
    this.state = {
      dimension: { width: 0, height: 0 },
      fields: columns,
      detail: {},
      products: [],
      pagination: {},
      tableStatus: 'waiting',
      exportData: [],
      sort: "down"
    }
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
    const { orderdetail, client,site } = this.props.match.params
    const url = `/purchaseOrder?searchParam=${orderdetail}&client=${client}&site=${site}`
    const { data } = await axios.get(url)
    if (!!data.data) {
      this.setState({ detail: data.data.data[0] })
    }
  }
  getProducts = async (page=1,export_='false') => {
    //export : true/false --> param for identify this function called from export button 
    
    const { pagination,tableStatus } = this.state
    const { orderdetail, client,site} = this.props.match.params
    const url = `/purchaseOrder/${site}/${client}/${orderdetail}?page=${page}&export=${export_}`
    const { data } = await axios.get(url)
    // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    // if (data.data.length) {
    //   this.setState({ products: data.data })
    // }
    if (data?.data?.data) { 
      console.log(data.data.data)
      const dt = data.data.data.map(m => { 
        m.rotadate = m?.rotadate ? moment(m.rotadate).format('DD/MM/YYYY') : '-'
        m.quantity = numeral(m.quantity).format('0,0')
        m.qty_processed = numeral(m.qty_processed).format('0,0')
        m.weight = numeral(m.weight).format('0,0.000')
        m.weight_processed = numeral(m.weight_processed).format('0,0.000')
        return m
      })
      if(export_=='true'){
        this.setState({ 
          exportData: dt
        })
      }else{
        this.setState({
          products: dt,
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
      

      if(data.data.data.length < 1){
        this.setState({   tableStatus: 'noData'  })
      }
    }else {
      this.setState({ data: [] })
      this.setState({   tableStatus: 'noData'  })
    } 
  }

  formatDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '-'
  }

  siteCheck = (siteVal) => {
    return this.props.site.map(data => {
      if (data.value === siteVal) return data.label
    })
  }

  clientCheck = (clientVal) => {
    return this.props.client.map(data => {
      if (data.value === clientVal) return data.label
    })
  }
  UrlHeader = () =>{
    return `/getPurchaseOrderDetailColumn?client=ALL`
  }
  UrlAll = () => {
    return '/putPurchaseOrderDetailColumn?client=ALL'
  }
  sortFloat = (value, column, sort) => {
    let data = value;
    let floatData = [];

    if(sort == "down"){
        data.sort((a, b) => { 
            if (a[column] !== undefined && b[column] !== undefined) {
                if(a[column] === null){
                    return -1;
                }else if(b[column] === null){
                    return 1;
                }
                return Number.parseFloat(b[column].replace(/,/g, "")) - Number.parseFloat(a[column].replace(/,/g, "")) 
            }
        });
        this.setState({ sort: "up" })
    }else if(sort == "up"){
        data.sort((a, b) => { 
            if (a[column] !== undefined && b[column] !== undefined) {
                if(a[column] === null){
                    return 1;
                }else if(b[column] === null){
                    return -1;
                }
                return Number.parseFloat(a[column].replace(/,/g, "")) - Number.parseFloat(b[column].replace(/,/g, "")) 
            }
        });
        this.setState({ sort: "down" })
    }

    this.setState({ data: data })

  }

  render() {
    // const { match, history } = this.props
    const { detail, products, fields, pagination, tableStatus, exportData, sort } = this.state
    return <div className="purchase-order-details">
      <HeaderTitle breadcrumb={[
        { to: '/purchase-order', label: 'Purchase Order' },
        { to: '', label: this.props.match.params.orderdetail, active: true },
      ]} />
      <div ref={this.section1} className="card-group section-1 mb-3 pod" >
        <CCard>
          <CCardBody className="p-0 m-3 border-right">
            <CRow><CCol lg={3} className="text-light-gray px-3">Site</CCol> <CCol>{this.siteCheck(detail.site) || '-'}</CCol></CRow>
            <CRow><CCol lg={3} className="text-light-gray px-3 py-1">Client</CCol> <CCol className="py-1">{this.clientCheck(detail.client) || '-'}</CCol></CRow>
            <CRow><CCol lg={3} className="text-light-gray px-3">Order No</CCol> <CCol>{detail.order_no || '-'}</CCol></CRow>
            <CRow><CCol lg={3} className="text-light-gray px-3 py-1">Order Type</CCol> <CCol className="py-1">{detail.order_type || '-'}</CCol></CRow>
            <CRow><CCol lg={3} className="text-light-gray px-3">Status</CCol> <CCol>{detail.status || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-1 mx-2 my-3 border-right">
            <CRow><CCol lg={3} className="text-light-gray px-0">Supplier No</CCol> <CCol className="px-3">{detail.supplier_no || '-'}</CCol></CRow>
            <CRow><CCol lg={3} className="text-light-gray px-0 py-1">Supplier Name</CCol> <CCol className="px-3 py-1">{detail.supplier_name || '-'}</CCol></CRow>
            <CRow><CCol lg={3} className="text-light-gray px-0">Customer Order Ref</CCol> <CCol className="px-3">{detail.customer_order_ref || '-'}</CCol></CRow>
            <CRow><CCol lg={3} className="text-light-gray px-0 pt-1">Vendor Order Ref</CCol> <CCol className="px-3 pt-1">{detail.vendor_ord_ref || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 mx-3 my-3">
            <CRow><CCol lg={3}  className="text-light-gray px-0">Order Date</CCol> <CCol className="px-3">{this.formatDate(detail.delivery_date)}</CCol></CRow>
            <CRow><CCol lg={3}  className="text-light-gray px-0 py-1">Date Received</CCol> <CCol className="px-3 py-1">{this.formatDate(detail.date_received)}</CCol></CRow>
            <CRow><CCol lg={3}  className="text-light-gray px-0">Date Released</CCol> <CCol className="px-3">{this.formatDate(detail.date_released)}</CCol></CRow>
            <CRow><CCol lg={3}  className="text-light-gray px-0 pt-1">Date Completed</CCol> <CCol className="px-3 pt-1">{this.formatDate(detail.date_completed)}</CCol></CRow>
          </CCardBody>
        </CCard>
      </div>

      <CustomTable
        title="Purchase Orders Details"
        filename='Microlistics_PurchaseOrderDetail.'
        font="9"
        height={this.state.dimension.height}
        fields={fields}
        data={products}
        pagination={pagination}
        UrlHeader={this.UrlHeader} 
        UrlAll={this.UrlAll}
        tableStatus={tableStatus}
        sortFloat={(column) => this.sortFloat(products, column, sort)}
        export={
          <button className='btn btn-primary float-right btn-export'>
            {/* <div className='export-export pr-3' /> */}
            EXPORT
          </button>
        }
        goto={(active) => {
          this.setState({ pagination: { ...pagination, active } }, () => this.getProducts(active))
        }}
        exportApi={async () =>  {await this.getProducts(1,'true')}}
        exportData={exportData}
      />
      {/* <CustomPagination
      data={products}
      pagination={pagination}
      goto={(active) => {
        this.setState({ pagination: { ...pagination, active } }, () => this.getProducts())
      }}
      /> */}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    site: state.site,
    client: state.client
  }
}
export default connect(mapStateToProps)(PurchaseOrdersDetail)
