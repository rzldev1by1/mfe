import React from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
} from '@coreui/react'

import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import './SalesOrder.css'

class SalesOrderDetail extends React.Component {
  section1 = React.createRef();
  section2 = React.createRef()
  state = {
    dimension: { width: 0, height: 0 },
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
    console.log(this.section2)
    const height = (window.innerHeight - this.section1.current.clientHeight - 60) * 0.82
    console.log(`${window.innerHeight}-${this.section1.current.clientHeight}-${this.section2.current.clientHeight} = ${height}`)
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
    const url = `/salesorder/${orderno}?client=${client}&site=${site}`
    const { data } = await axios.get(url)
    const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    if (data.data.length) {
      const fields = Object.entries(data.data[0]).map(([accessor], i) => ({
        accessor, Header: capitalize(accessor.replace('_', ' '))
      }))
      this.setState({ products: data.data, fields })
    }
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
          <CCardBody>
            <CRow><CCol className="text-light-gray">Site</CCol> <CCol>{detail.site}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Client</CCol> <CCol>{detail.client}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Order No</CCol> <CCol>{detail.orderno || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Order Type</CCol> <CCol>{detail.ordertype || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Customer ID</CCol> <CCol>{detail.customer || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Customer Name</CCol> <CCol>{detail.customername || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Customer Order Ref</CCol> <CCol>{detail.customerpono || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Vendor Order Ref</CCol> <CCol>{detail.vendororderno || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
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
          <CCardBody>
            <CRow><CCol className="text-light-gray">Status</CCol> <CCol>{detail.status || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Delivary Date</CCol> <CCol>{detail.deliverydate || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Received</CCol> <CCol>{detail.datereceived || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Released</CCol> <CCol>{detail.datereleased || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Date Completed</CCol> <CCol>{detail.datecompleted || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Load Number</CCol> <CCol>{detail.loadnumber || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Loadout Start</CCol> <CCol>{detail.loadoutstart || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Loadout Finish</CCol> <CCol>{detail.loadoutfinish || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Consignment No</CCol> <CCol>{detail.consignmentno || '-'}</CCol></CRow>
            <CRow><CCol className="text-light-gray">Freight Charge</CCol> <CCol>{detail.freightcharge || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
      </div>

      <CustomTable
        title="Sales Orders Details"
        ref={this.section2}
        height={this.state.dimension.height}
        fields={fields}
        data={products}
      />
    </div>
  }
}
export default SalesOrderDetail