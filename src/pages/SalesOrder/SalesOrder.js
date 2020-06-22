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
import { FaPencilAlt } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'

// import DataTable from 'shared/table/DataTable'
import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import SalesOrderCreate from './SalesOrderCreate'
// import DummyData from './dummy/data.json'
import './SalesOrder.css'
const columns = [
  { accessor: 'site', Header: 'Site', sortable: true },
  { accessor: 'client', Header: 'Client', sortable: true },
  { accessor: 'orderno', Header: 'Order No', sortable: true },
  { accessor: 'ordertype', Header: 'Order Type' },
  { accessor: 'task', Header: 'Task' },
  { accessor: 'customername', Header: 'Customer' },
  { accessor: 'status', Header: 'Status' },
  { accessor: 'deliverydate', Header: 'Delivery Date' },
  { accessor: 'datereceived', Header: 'Date Received' },
  { accessor: 'datereleased', Header: 'Date Released' },
  { accessor: 'datecompleted', Header: 'Date Completed' },
  // { accessor: 'customerpono', Header: 'Customer PO'},
  // { accessor: 'vendororderno', Header: 'Vendor Order No'},
  // { accessor: 'address1', Header: 'Address1'},
  // { accessor: 'address2', Header: 'Address2'},
  // { accessor: 'address3', Header: 'Address3'},
  // { accessor: 'address4', Header: 'Address4'},
  // { accessor: 'address5', Header: 'Address5'},
  // { accessor: 'suburb', Header: 'Suburb'},
  // { accessor: 'postcode', Header: 'Postcode'},
  // { accessor: 'state', Header: 'State'},
  // { accessor: 'country', Header: 'Country'},
  // { accessor: 'loadnumber', Header: 'Load Number'},
  // { accessor: 'loadoutstart', Header: 'Load Start'},
  // { accessor: 'loadoutfinish', Header: 'Load Finish'},
  // { accessor: 'consignmentno', Header: 'Consignment No'},
  // { accessor: 'freightcharge', Header: 'Freight Charge'},
  // { accessor: 'customer', Header: 'Customer Code'},
]
class SalesOrder extends React.PureComponent {
  state = {
    search: '',
    site: null,
    client: null,
    status: null,
    orderType: null,
    task: null,
    resources: [],
    fields: columns,
    data: [],
    create: true,
    detail: {},
    dimension: { width: 0, height: 0 }
  }
  componentDidMount = () => {
    // set automatic table height
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);

    this.getSite()
    this.getClient()
    this.getStatus()
    this.getResources()
    this.getProduct()
    this.searchSalesOrder()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }
  updateDimension = () => {
    const height = (window.innerHeight - 116) * 0.87
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getSite = async () => {
    const { data } = await axios.get("/dropdown/getsite")
    const siteData = data.map(s => ({ value: s.site, label: `${s.name}` }))
    const site = { value: 'all', label: 'All Site' }
    siteData.splice(0, 0, site)
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get("/dropdown/getclient")
    const clientData = data.map(s => ({ value: s.code, label: `${s.name}` }))
    const client = { value: 'all', label: 'All Client' }
    clientData.splice(0, 0, client)
    this.setState({ clientData })
  }
  getStatus = async () => {
    const status = { value: 'all', label: 'All Status' }
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
  getTask = async () => {
    const { client, site } = this.state
    if (client && site) {
      const { data } = await axios.get(`/dropdown/getIsisTask?client=${client}&site=${site}&order=so`)
      const taskData = data.map(s => ({ value: s.site, label: `${s.name}` }))
      const task = { value: 'all', label: 'All Task' }
      taskData.splice(0, 0, task)
      this.setState({ taskData })
    }
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
    const { search, site, client, orderType } = this.state
    let urls = []
    urls.push('searchParam=' + search ? search : '')
    urls.push('site=' + (site ? site.value : 'all'))
    urls.push('client=' + (client ? client.value : 'all'))
    urls.push('orderType=' + (orderType ? orderType.value : 'all'))
    const { data } = await axios.get(`/salesorder?` + urls.join('&'))
    if (data?.data?.data) {
      this.setState({ data: data.data.data })
    } else {
      this.setState({ data: [] })
    }
    // this.setState({ data: DummyData })
  }
  showDetails = (item) => {
    const url = '/sales-orders/' + item.client + '/' + item.site + '/' + item.orderno
    this.props.history.push(url)
  }
  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }
  render() {
    const {
      dimension, fields, data, site, client, status, orderType, create, task,
      siteData, clientData, statusData, orderTypeData, taskData
    } = this.state
    return <div className="sales-order">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Sales Order', active: true }]}
        button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right">
          <FaPencilAlt />  &nbsp; Create Sales Order
          </CButton>}
      />

      <CCard>
        <CCardBody className="px-4 py-2">
          <CRow className="row">
            <CCol lg={3} className="px-1">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                </div>
                <input type="text" className="form-control border-left-0" placeholder="Enter an Order No" onChange={e => this.setState({ search: e.target.value })} />
              </div>
            </CCol>
            <CCol lg={9}>
              <CRow>
                <CCol sm={4} lg={2} className="px-1">
                  <Select name="site" placeholder="Site"
                    value={site} options={siteData}
                    onChange={(val) => this.setState({ site: val }, () => {

                    })}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-1">
                  <Select name="client" placeholder="Client"
                    value={client} options={clientData}
                    onChange={(val) => this.setState({ client: val })}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-1">
                  <Select name="status" placeholder="Status"
                    value={status} options={statusData}
                    onChange={(val) => this.setState({ status: val })}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-1">
                  <Select name="orderType" placeholder="Order Type"
                    value={orderType} options={orderTypeData}
                    onChange={(val) => this.setState({ orderType: val })}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-1">
                  <Select name="task" placeholder="Task"
                    value={task} options={taskData}
                    onChange={(val) => this.setState({ task: val })}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-1">
                  <button className="btn btn-block btn-primary float-right" onClick={this.searchSalesOrder}>Search</button>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CustomTable
        title="Sales Order"
        height={dimension.height}
        data={data}
        fields={fields}
        onClick={this.showDetails}
        export={<CButton className="btn btn-primary px-4">Export <IoIosArrowDown /></CButton>}
      />

      <SalesOrderCreate
        show={!!create}
        toggle={this.toggle}
        siteData={siteData}
        clientData={clientData}
        statusData={statusData}
        orderTypeData={orderTypeData}
      />
    </div>
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(SalesOrder);