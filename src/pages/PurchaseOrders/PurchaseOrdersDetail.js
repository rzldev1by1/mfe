import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {CCard,CCardBody,CRow,CCol,CButton,} from '@coreui/react'
import { IoIosArrowDown } from 'react-icons/io'
import CustomTable from 'shared/table/CustomTable'
import CustomPagination from 'shared/table/CustomPagination'
import HeaderTitle from 'shared/container/TheHeader'

const columns = [
  { accessor: "site", Header: "Site" },
  { accessor: "client", Header: "Client" },
  { accessor: "order_no", Header: "Order No" },
  { accessor: "status", Header: "Status" },
  { accessor: "order_type", Header: "Order Type" },
  { accessor: "supplier_no", Header: "Supplier No" },
  { accessor: "supplier_name", Header: "Supplier Name" },
  {
    accessor: "completed", Header: "Completed",
    Cell: (row) => <i className={`${row.original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  { accessor: "delivery_date", Header: "Delivery Date" },
  { accessor: "date_received", Header: "Date Received" },
  { accessor: "date_released", Header: "Date Released" },
  { accessor: "date_completed", Header: "Date Completed" },
  { accessor: "customer_order_ref", Header: "Customer_order_ref" },
  { accessor: "vendor_order_ref", Header: "Vendor_order_ref" },
]
class PurchaseOrdersDetail extends React.Component {
  // ref to get element height and calculate table height
  section1 = React.createRef()
  state = {
    dimension: { width: 0, height: 0 },
    fields: columns,
    detail: {},
    products: [],
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
  render() {
    // const { match, history } = this.props
    const { detail, products, fields } = this.state
    return <div className="purchase-order-detail">
      <HeaderTitle breadcrumb={[
        { to: '/purchase-order', label: 'Purchase Order' },
        { to: '', label: this.props.match.params.orderdetail, active: true },
      ]} />
      <div ref={this.section1} className="card-group section-1 mb-4" >
        <CCard>
          <CCardBody className="p-0 m-4 border-right">
            <CRow><CCol className="text-light-gray">Site</CCol> <CCol>{detail.site}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Client</CCol> <CCol>{detail.client}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Order No</CCol> <CCol>{detail.order_no || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Order Type</CCol> <CCol>{detail.order_type || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">status</CCol> <CCol>{detail.status || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 m-4 border-right">
            <CRow><CCol className="text-light-gray">Supplier No</CCol> <CCol>{detail.supplier_no || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Supplier Name</CCol> <CCol>{detail.supplier_name || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Customer Order Ref</CCol> <CCol>{detail.customer_order_ref || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Vendor Order Ref</CCol> <CCol>{detail.vendor_ord_ref || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 m-4">
            <CRow><CCol className="text-light-gray">Date Received</CCol> <CCol>{this.formatDate(detail.date_received)}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Delivary Date</CCol> <CCol>{this.formatDate(detail.delivery_date)}</CCol></CRow>
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
export default PurchaseOrdersDetail