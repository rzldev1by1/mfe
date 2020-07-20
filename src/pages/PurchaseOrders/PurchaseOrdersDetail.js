import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import moment from 'moment'
import {CCard,CCardBody,CRow,CCol,CButton,} from '@coreui/react'
import { IoIosArrowDown } from 'react-icons/io'
import CustomTable from 'shared/table/CustomTable'
import CustomPagination from 'shared/table/CustomPagination'
import HeaderTitle from 'shared/container/TheHeader'
import './PurchaseOrder.css'
const columns = [
  { accessor: "orig_line_number", Header: "Line No" },
  { accessor: "product", Header: "Product" },
  { accessor: "product_name", Header: "Description" },
  { accessor: "quantity", Header: "Qty", width: 50 },
  { accessor: "packdesc_1", Header: "UOM", width: 80 },
  { accessor: "qty_processed", Header: "Qty Processed", width: 130 },
  { accessor: "weight", Header: "Weight" },
  { accessor: "weight_processed", Header: "Weight Processed", width: 140  },
  {
    accessor: "completed", Header: "Completed",
    Cell: (row) => <i className={`${row.original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  { accessor: "batch", Header: "Batch", width: 90 },
  { accessor: "rotadate", Header: "Rota Date" },
  { accessor: "ref3", Header: "Ref3", width: 80  },
  { accessor: "ref4", Header: "Ref4", width: 80  },
  { accessor: "disposition", Header: "Disposition" },
]
class PurchaseOrdersDetail extends React.Component {
  constructor(props){
    super(props)
    // ref to get element height and calculate table height
  this.section1 = React.createRef()
  this.state = {
    dimension: { width: 0, height: 0 },
    fields: columns,
    detail: {},
    products: [],
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
    const height = (window.innerHeight - this.section1.current.clientHeight - 60) * 0.82
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getDetail = async () => {
    const { orderdetail, client} = this.props.match.params
    const url = `/purchaseOrder?searchParam=${client}&orderdetail=${orderdetail}`
    const { data } = await axios.get(url)
    if (!!data.data) {
      this.setState({ detail: data.data.data[0] })
    }
  }
  getProducts = async () => {
    const { orderdetail, client} = this.props.match.params
    const url = `/purchaseOrder/${client}/${orderdetail}`
    console.log(this.props.match.params)
    const { data } = await axios.get(url)
    // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    if (data.data.length) {
      this.setState({ products: data.data })
    }
  }
  formatDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '-'
  }

  siteCheck = (siteVal) => {
    return this.props.site.map(data => {
      if(data.value === siteVal) return data.label
    })
  }

  clientCheck = (clientVal) => {
    return this.props.client.map(data => {
      if(data.value === clientVal) return data.label
    })
  }

  render() {
    // const { match, history } = this.props
    const { detail, products, fields } = this.state
    return <div className="order-detail">
      <HeaderTitle breadcrumb={[
        { to: '/purchase-order', label: 'Purchase Order' },
        { to: '', label: this.props.match.params.orderdetail, active: true },
      ]} />
      <div ref={this.section1} className="card-group section-1 mb-4 pod" >
        <CCard>
          <CCardBody className="p-0 m-4">
            <CRow><CCol className="text-light-gray">Site</CCol> <CCol>{ this.siteCheck(detail.site)  || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Client</CCol> <CCol>{this.clientCheck(detail.client) || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Order No</CCol> <CCol>{detail.order_no || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Order Type</CCol> <CCol>{detail.order_type || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">status</CCol> <CCol>{detail.status || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 m-4">
            <CRow><CCol className="text-light-gray">Supplier No</CCol> <CCol>{detail.supplier_no || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Supplier Name</CCol> <CCol>{detail.supplier_name || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Customer Order Ref</CCol> <CCol>{detail.customer_order_ref || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Vendor Order Ref</CCol> <CCol>{detail.vendor_ord_ref || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 m-4">
            <CRow><CCol className="text-light-gray">Order Date</CCol> <CCol>{this.formatDate(detail.delivery_date)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Received</CCol> <CCol>{this.formatDate(detail.date_received)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Released</CCol> <CCol>{this.formatDate(detail.date_released)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Completed</CCol> <CCol>{this.formatDate(detail.date_completed)}</CCol></CRow>
          </CCardBody>
        </CCard>
      </div>

      <CustomTable
        title="Sales Orders Details"
        height={this.state.dimension.height}
        fields={fields}
        data={products}
      />
      <CustomPagination
        data={products}
        // pagination={pagination}
        // goto={(active) => {
        //   this.setState({ pagination: { ...pagination, active } }, () => this.getProducts())
        // }}
      />
    </div>
  }
}

const mapStateToProps = state => {
  return{
    site : state.site,
    client: state.client
  }
}
export default connect(mapStateToProps)(PurchaseOrdersDetail)
