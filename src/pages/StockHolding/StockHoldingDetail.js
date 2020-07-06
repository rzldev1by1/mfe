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
// import './SalesOrder.css'

const columns = [
  { accessor: "type", Header: "Line No" },
  { accessor: "id", Header: "Product" },
  { accessor: "order_no", Header: "Description" },
  { accessor: "qty", Header: "Qty" },
  { accessor: "qty_processed", Header: "Qty Processed" },
  { accessor: "weight", Header: "Weight" },
  { accessor: "weight_processed", Header: "Weight Processed" },
  {
    accessor: "completed", Header: "Completed",
    Cell: (row) => <i className={`${row.original.completed === 'Y' ? 'iconU-checked text-success' : 'iconU-close text-danger'}`} />
  },
  { accessor: "oos", Header: "OOS" },
  { accessor: "batch", Header: "Batch" },
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
    const { product, client, site } = this.props.match.params
    const url = `/stock-holding?searchParam=${product}&client=${client}&site=${site}`
    const { data } = await axios.get(url)
    console.log(data)
    if (!!data.data) {
      this.setState({ detail: data.data.data[0] })
    }
  }
  // getProducts = async () => {
  //   const { product, client, site } = this.props.match.params
  //   const url = `/foreshadowedstockbalance/${product}?client=${client}&site=${site}`
  //   const { data } = await axios.get(url)
  //   // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  //   if (data.data.length) {
  //     this.setState({ products: data.data })
  //   }
  // }
  formatDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '-'
  }
  render() {
    // const { match, history } = this.props
    const { detail, products, fields } = this.state
    return <div className="sales-order-detail">
      <HeaderTitle breadcrumb={[
        { to: '/stock-holding', label: 'Stock Holding' },
        { to: '', label: this.props.match.params.product, active: true },
      ]} />
      <div ref={this.section1} className="card-group section-1 mb-4" >
        <CCard>
          <CCardBody className="p-0 m-4 border-right">
            <CRow><CCol className="text-light-gray">Site</CCol><CCol>{detail.site || '-'}</CCol> </CRow>
            <CRow><CCol className="text-light-gray">Client</CCol> <CCol>{detail.client || '-'}</CCol>  </CRow>
            <CRow><CCol className="text-light-gray">Product</CCol> <CCol>{detail.product || '-'}</CCol>  </CRow>
            <CRow><CCol className="text-light-gray">Description</CCol> <CCol>{detail.product_name || '-'}</CCol>  </CRow>
            <CRow><CCol className="text-light-gray">UOM</CCol> <CCol>{detail.packdesc_1 || '-'}</CCol>  </CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 m-4 border-right">
            <CRow><CCol className="text-light-gray">Stock On Hand</CCol>  <CCol>{detail.on_hand_qty || '-'}</CCol> </CRow>
            <CRow><CCol className="text-light-gray">Available Qty</CCol>  <CCol>{detail.expected_in_qty || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Expected in Qty</CCol>  <CCol>{detail.expected_in_wyt || '-'}</CCol> </CRow>
            <CRow><CCol className="text-light-gray">Expected Out Qty</CCol>  <CCol>{detail.expected_out_qty || '-'}</CCol> </CRow>
            <CRow><CCol className="text-light-gray">Rotadate Type</CCol>  <CCol>{detail.rotadet_type || '-'}</CCol> </CRow>
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
export default SalesOrderDetail