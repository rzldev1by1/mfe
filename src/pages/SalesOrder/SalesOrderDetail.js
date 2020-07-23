import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import { IoIosArrowDown } from 'react-icons/io'
import CustomTable from 'shared/table/CustomTable'
import CustomPagination from 'shared/table/CustomPagination'
import HeaderTitle from 'shared/container/TheHeader'
import './SalesOrder.scss'

const columns = [
  { accessor: "line", Header: "Line No" },
  { accessor: "product", Header: "Product" },
  { accessor: "product_description", Header: "Description" },
  { accessor: "qty", Header: "Qty", width: 60  },
  { accessor: "uom", Header: "UOM", width: 80 },
  { accessor: "qty_processed", Header: "Qty Processed" },
  { accessor: "weight", Header: "Weight" },
  { accessor: "weight_processed", Header: "Weight Processed" },
  {
    accessor: "completed", Header: "Completed",
    Cell: (row) => <i className={`${row.original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  //{ accessor: "oos", Header: "OOS", width: 50 },
  {
    accessor: "oos", Header: "OOS", width: 60 ,
    Cell: (row) => <i className={`${row.original.oos === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  {
    accessor: "received", Header: "Received", width: 80 ,
    Cell: (row) => <i className={`${row.original.received === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  { accessor: "batch", Header: "Batch", width: 60  },
  { accessor: "ref2", Header: "Ref2" },
  { accessor: "ref3", Header: "Ref3" },
  { accessor: "ref4", Header: "Ref4" },
  { accessor: "disposition", Header: "Disposition" },
  { accessor: "pack_id", Header: "Pack ID" }
]
class SalesOrderDetail extends React.Component {
  // ref to get element height and calculate table height
  section1 = React.createRef()
  state = {
    dimension: { width: 0, height: 0 },
    fields: columns,
    detail: {},
    products: [],
    request_status: 'Please Wait...'
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
    const height = (window.innerHeight - this.section1.current.clientHeight - 160)
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getDetail = async () => {
    const { orderno, client, site } = this.props.match.params
    const url = `/salesorder?searchParam=${orderno}&client=${client}&site=${site}`
    const { data } = await axios.get(url)
    if (!!data.data) {
      this.setState({ detail: data.data.data[0] })
    }
  }
  getProducts = async () => {
    const { orderno, client, site } = this.props.match.params
    this.setState({ request_status: "Please Wait..."  })
    const url = `/salesorder/${orderno}?client=${client}&site=${site}`
    const { data } = await axios.get(url)
    // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    if (data.data.length) {
      this.setState({ products: data.data })
    }else{ 
      this.setState({ request_status: "No Data Found"  })
    } 
  }
  formatDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '-'
  }
  render() {
    // const { match, history } = this.props
    const { detail, products, fields } = this.state
    return <div className="sales-order-detail">
      <HeaderTitle breadcrumb={[
        { to: '/sales-orders', label: 'Sales Order' },
        { to: '', label: this.props.match.params.orderno, active: true },
      ]} />
      <div ref={this.section1} className="card-group section-1 mb-4" >
        <CCard>
          <CCardBody className="p-0 m-4 border-right">
    <CRow><CCol className="text-light-gray">Site</CCol> <CCol>{detail.site}: {detail.site_name}</CCol></CRow>
    <CRow><CCol className="text-light-gray">Client</CCol> <CCol>{detail.client}: {detail.client_name}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Order No</CCol> <CCol>{detail.orderno || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Order Type</CCol> <CCol>{detail.ordertype || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Task</CCol> <CCol>{detail.customer || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Customer No.</CCol> <CCol>{detail.customer || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Customer Name</CCol> <CCol>{detail.customername || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Customer Order Ref</CCol> <CCol>{detail.customerpono || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Vendor Order Ref</CCol> <CCol>{detail.vendororderno || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 m-4 border-right">
            <CRow><CCol className="text-light-gray">Address 1</CCol> <CCol>{detail.address1 || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Address 2</CCol> <CCol>{detail.address2 || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Address 3</CCol> <CCol>{detail.address3 || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Address 4</CCol> <CCol>{detail.address4 || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Address 5</CCol> <CCol>{detail.address5 || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Suburb</CCol> <CCol>{detail.suburb || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Postcode</CCol> <CCol>{detail.postcode || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">State</CCol> <CCol>{detail.state || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Country</CCol> <CCol>{detail.country || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 m-4">
            <CRow><CCol className="text-light-gray">Status</CCol> <CCol>{detail.status || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Delivary Date</CCol> <CCol>{this.formatDate(detail.deliverydate)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Received</CCol> <CCol>{this.formatDate(detail.datereceived)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Released</CCol> <CCol>{this.formatDate(detail.datereleased)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Completed</CCol> <CCol>{this.formatDate(detail.datecompleted)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Load Number</CCol> <CCol>{detail.loadnumber || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Loadout Start</CCol> <CCol>{this.formatDate(detail.loadoutstart)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Loadout Finish</CCol> <CCol>{this.formatDate(detail.loadoutfinish)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Consignment No</CCol> <CCol>{detail.consignmentno || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Freight Charge</CCol> <CCol>{detail.freightcharge || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
      </div>

      <CustomTable
        title="Sales Orders Details"
        height={this.state.dimension.height}
        fields={fields}
        data={products}
        request_status={this.state.request_status}
      />
    </div>
  }
}
export default SalesOrderDetail