import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCol,
} from '@coreui/react'
import Select from 'react-select'

// import DataTable from 'shared/table/DataTable'
import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import SalesOrderCreate from './SalesOrderCreate'
import DummyData from './dummy/data.json'
import './SalesOrder.css'
const columns = [
  { accessor: 'site', Header: 'Site' },
  { accessor: 'client', Header: 'Client' },
  { accessor: 'orderno', Header: 'OrderNo' },
  { accessor: 'ordertype', Header: 'OrderType' },
  { accessor: 'customername', Header: 'Customer Name' },
  { accessor: 'status', Header: 'Status' },
]
class SalesOrder extends React.PureComponent {
  state = {
    search: '',
    site: null,
    client: null,
    status: null,
    orderType: null,
    resources: [],
    fields: columns,
    data: [],
    create: false,
    detail: {},
  }
  componentDidMount = () => {
    this.getSite()
    this.getClient()
    this.getStatus()
    this.getResources()
    this.getProduct()
    this.searchSalesOrder()
  }
  getSite = async () => {
    const { data } = await axios.get("/dropdown/getsite")
    const siteData = data.map(s => ({ value: s.site, label: `${s.name}` }))
    const site = { value: 'all', label: 'All' }
    siteData.splice(0, 0, site)
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get("/dropdown/getclient")
    const clientData = data.map(s => ({ value: s.code, label: `${s.name}` }))
    const client = { value: 'all', label: 'All' }
    clientData.splice(0, 0, client)
    this.setState({ clientData })
  }
  getStatus = async () => {
    const status = { value: 'all', label: 'All' }
    const statusData = [
      status,
      { value: "unavailable", label: 'Unavailable' },
      { value: "available", label: 'Available' },
      { value: "released", label: 'Released' },
      { value: "part_released", label: 'Part Released' },
      { value: "completed", label: 'Completed' },
      { value: "open", label: 'Open' },
    ];
    this.setState({ statusData })
  }
  getResources = async () => {
    const { user } = this.props.store
    if (user) {
      const { data } = await axios.get(`/getsorecources?company=${user.company}&client=${user.client}`)
      const orderTypeData = data.orderType.code.map((c, i) => (
        { value: c, label: data.orderType.name[i] }
      ))
      const orderType = { value: 'all', label: 'All' }
      orderTypeData.splice(0, 0, orderType)
      this.setState({ resources: data, orderTypeData })
    }
  }
  getProduct = async () => {
    // const { user } = this.props.store
    // const { data } = await axios.get(`/dropdown/getProduct?client=${user.client}`)
    // console.log(data)
  }
  searchSalesOrder = async () => {
    console.log('load sales order')
    // const { search, site, client, orderType } = this.state
    // let urls = []
    // urls.push('searchParam=' + search ? search : '')
    // urls.push('site=' + (site ? site.value : 'all'))
    // urls.push('client=' + (client ? client.value : 'all'))
    // urls.push('orderType=' + (orderType ? orderType.value : 'all'))
    // const { data } = await axios.get(`/salesorder?` + urls.join('&'))
    // if (data.data.length) {
    //   console.log(JSON.stringify(data.data))
    //   console.log(Object.keys(data.data[0]))
    //   this.setState({ data: data.data, fields })
    // } else {
    //   this.setState({ data: [] })
    // }
    this.setState({ data: DummyData })
  }
  showDetails = (item, c, d, e, f) => {
    console.log(d, d, e, f)
    const url = '/sales-orders/' + item.client + '/' + item.site + '/' + item.orderno
    this.props.history.push(url)
  }
  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }
  render() {
    const { siteData, fields, data,
      site, clientData, client, statusData, status, orderTypeData, orderType,
      create,
    } = this.state
    return <div className="sales-order">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Sales Order', active: true }]}
        button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right">Create Sales Order</CButton>}
      />

      <SalesOrderCreate show={!!create} toggle={this.toggle} />
      <CCard>
        <CCardBody className="p-2">
          <CRow>
            <CCol sm="4" lg="3">
              <input type="text" className="form-control" placeholder="Search"
                onChange={e => this.setState({ search: e.target.value })}
              />
            </CCol>
            <CCol sm="4" lg="2">
              <Select name="site" placeholder="Site"
                value={site} options={siteData}
                onChange={(val) => this.setState({ site: val })}
              />
            </CCol>
            <CCol sm="4" lg="2">
              <Select name="client" placeholder="Client"
                value={client} options={clientData}
                onChange={(val) => this.setState({ client: val })}
              />
            </CCol>
            <CCol sm="4" lg="2">
              <Select name="status" placeholder="Status"
                value={status} options={statusData}
                onChange={(val) => this.setState({ status: val })}
              />
            </CCol>
            <CCol sm="4" lg="2">
              <Select name="orderType" placeholder="Order Type"
                value={orderType} options={orderTypeData}
                onChange={(val) => this.setState({ orderType: val })}
              />
            </CCol>
            <CCol sm="4" lg="1">
              <button className="btn btn-outline-primary float-right" onClick={this.searchSalesOrder}>Search</button>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* <DataTable
        fields={fields}
        data={data}
        onClick={this.showDetails}
      /> */}

      <CustomTable
        data={data}
        fields={fields}
        onClick={this.showDetails} />
    </div>
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(SalesOrder);