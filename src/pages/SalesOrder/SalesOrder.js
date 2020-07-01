import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CCol,
} from '@coreui/react'
import Select from 'react-select'
import { IoIosArrowDown } from 'react-icons/io'
import CustomTable from 'shared/table/CustomTable'
import CustomPagination from 'shared/table/CustomPagination'
import HeaderTitle from 'shared/container/TheHeader'
import SalesOrderCreate from './SalesOrderCreate'
// import DummyData from './dummy/data.json'
import './SalesOrder.css'

const columns = [
  { accessor: 'site', Header: 'Site', sortable: true },
  { accessor: 'client', Header: 'Client', sortable: true },
  { accessor: 'orderno', Header: 'Order No', sortable: true },
  { accessor: 'ordertype', Header: 'Order Type', sortable: true },
  { accessor: 'task', Header: 'Task', sortable: true },
  { accessor: 'customername', Header: 'Customer', sortable: true },
  { accessor: 'status', Header: 'Status', sortable: true },
  { accessor: 'deliverydate', Header: 'Delivery Date', sortable: true },
  { accessor: 'datereceived', Header: 'Date Received', sortable: true },
  { accessor: 'datereleased', Header: 'Date Released', sortable: true },
  { accessor: 'datecompleted', Header: 'Date Completed', sortable: true },
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
    pagination: {},
    create: false,
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
    const height = (window.innerHeight - 116) * 0.83
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getSite = async () => {
    const { data } = await axios.get("/dropdown/getsite")
    const siteData = data.map(d => ({ value: d.site, label: `${d.site} : ${d.name}` }))
    const site = { value: 'all', label: 'All Site' }
    siteData.splice(0, 0, site)
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get("/dropdown/getclient")
    const clientData = data.map(d => ({ value: d.code, label: `${d.code} : ${d.name}` }))
    const client = { value: 'all', label: 'All Client' }
    clientData.splice(0, 0, client)
    this.setState({ clientData })
  }
  getStatus = async () => {
    const statusData = [
      { value: "open", label: 'All Open' },
      { value: 'all', label: 'All Status' },
      { value: "unavailable", label: '0: Unavailable' },
      { value: "available", label: '1: Available' },
      { value: "released", label: '2: Released' },
      { value: "part_released", label: '3: Part Released' },
      { value: "completed", label: '4: Completed' },
    ];
    this.setState({ statusData })
  }
  getTask = async () => {
    const { client, site } = this.state
    if (client && site) {
      const { data } = await axios.get(`/dropdown/getIsisTask?client=${client.value}&site=${site.value}&order=so`)
      const taskData = data.code.map((c, i) => ({ value: c, label: `${data.name[i]}` }))
      const task = { value: 'all', label: 'All Task' }
      taskData.splice(0, 0, task)
      this.setState({ taskData })
    }
  }
  getResources = async () => {
    const { user } = this.props.store
    if (user) {
      const { data } = await axios.get(`/getsorecources?company=${user.company}&client=${user.client}`)
      const { code, name } = data.orderType
      const orderTypeData = code.map((c, i) => ({ value: c, label: `${code[i]}: ${name[i]}` }))
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
    let { search, site, client, orderType, task, pagination } = this.state
    let urls = []
    urls.push('searchParam=' + search ? search : '')
    urls.push('site=' + (site ? site.value : 'all'))
    urls.push('client=' + (client ? client.value : 'all'))
    urls.push('orderType=' + (orderType ? orderType.value : 'all'))
    urls.push('page=' + (pagination.active || 1))
    console.log('load sales order', urls.join('&'), task)
    const { data } = await axios.get(`/salesorder?` + urls.join('&'))
    if (data?.data?.data) {
      const modifiedData = data.data.data.map(m => {
        m.deliverydate = moment(m.deliverydate).format('DD/MM/YYYY')
        m.datereceived = moment(m.datereceived).format('DD/MM/YYYY')
        m.datereleased = moment(m.datereleased).format('DD/MM/YYYY')
        m.datecompleted = moment(m.datecompleted).format('DD/MM/YYYY')
        m.loadoutstart = moment(m.loadoutstart).format('DD/MM/YYYY')
        m.loadoutfinish = moment(m.loadoutfinish).format('DD/MM/YYYY')
        return m
      })
      this.setState({
        pagination: {
          active: pagination.active || data.data.current_page,
          show: data.data.per_page,
          total: data.data.total
        },
        data: modifiedData
      })
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
      dimension, fields, data, pagination, site, client, status, orderType, create, task,
      siteData, clientData, statusData, orderTypeData, taskData
    } = this.state
    console.log(pagination)
    return <div className="sales-order">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Sales Orders', active: true }]}
        button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right">Create Sales Order</CButton>}
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
                    onChange={(val) => this.setState({ site: val }, () => this.getTask())}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-1">
                  <Select name="client" placeholder="Client"
                    value={client} options={clientData}
                    onChange={(val) => this.setState({ client: val }, () => this.getTask())}
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
      />
      <CustomPagination
        data={data}
        pagination={pagination}
        goto={(active) => {
          this.setState({ pagination: { ...pagination, active } }, () => this.searchSalesOrder())
        }}
        export={<CButton className="btn btn-primary float-right px-4 btn-export">Export <IoIosArrowDown /></CButton>}
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