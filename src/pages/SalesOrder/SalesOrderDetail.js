import React from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CRow,
  CCol,
} from '@coreui/react'

// import DataTable from 'shared/table/DataTable'
import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import './SalesOrder.css'

class SalesOrderDetail extends React.PureComponent {
  state = {
    detail: {},
    products: [],
  }
  componentDidMount() {
    this.getDetail()
    this.getProducts()
  }
  getDetail = async () => {
    const { orderno, client, site } = this.props.match.params
    const url = `/salesorder?searchParam=${orderno}&client=${client}&site=${site}`
    const { data } = await axios.get(url)
    if (data.data.length) {
      this.setState({ detail: data.data[0] })
    }
  }
  getProducts = async () => {
    const { orderno, client, site } = this.props.match.params
    const url = `/salesorder/${orderno}?client=${client}&site=${site}`
    const { data } = await axios.get(url)
    const capitalize = (str, lower = false) =>
      (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    ;
    if (data.data.length) {
      const fields = Object.entries(data.data[0]).map(([accessor], i) => {
        return {
          accessor, Header: capitalize(accessor.replace('_',' '))
        }
      })
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
      <CCardGroup className="section-1 mt-2 mb-4">
        <CCard>
          <CCardBody>
            <CRow><CCol className="text-muted">Site</CCol> <CCol><b>{detail.site}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Client</CCol> <CCol><b>{detail.client}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Order No</CCol> <CCol><b>{detail.orderno || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Order Type</CCol> <CCol><b>{detail.ordertype || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Customer ID</CCol> <CCol><b>{detail.customer || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Customer Name</CCol> <CCol><b>{detail.customername || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Customer Order Ref</CCol> <CCol><b>{detail.customerpono || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Vendor Order Ref</CCol> <CCol><b>{detail.vendororderno || '-'}</b></CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
            <CRow><CCol className="text-muted">Address 1</CCol> <CCol><b>{detail.address1 || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Address 2</CCol> <CCol><b>{detail.address2 || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Address 3</CCol> <CCol><b>{detail.address3 || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Address 4</CCol> <CCol><b>{detail.address4 || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Address 5</CCol> <CCol><b>{detail.address5 || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Suburb</CCol> <CCol><b>{detail.suburb || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Postcode</CCol> <CCol><b>{detail.postcode || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">State</CCol> <CCol><b>{detail.state || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Country</CCol> <CCol><b>{detail.country || '-'}</b></CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
            <CRow><CCol className="text-muted">Status</CCol> <CCol><b>{detail.status || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Delivary Date</CCol> <CCol><b>{detail.deliverydate || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Date Received</CCol> <CCol><b>{detail.datereceived || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Date Released</CCol> <CCol><b>{detail.datereleased || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Date Completed</CCol> <CCol><b>{detail.datecompleted || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Load Number</CCol> <CCol><b>{detail.loadnumber || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Loadout Start</CCol> <CCol><b>{detail.loadoutstart || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Loadout Finish</CCol> <CCol><b>{detail.loadoutfinish || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Consignment No</CCol> <CCol><b>{detail.consignmentno || '-'}</b></CCol></CRow>
            <CRow><CCol className="text-muted">Freight Charge</CCol> <CCol><b>{detail.freightcharge || '-'}</b></CCol></CRow>
          </CCardBody>
        </CCard>
      </CCardGroup>

      <CustomTable
        fields={fields}
        data={products}
      />
    </div>
  }
}
export default SalesOrderDetail