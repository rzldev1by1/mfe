import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import Select from 'react-select'
import { IoIosArrowDown } from 'react-icons/io'

import endpoints from 'helpers/endpoints'
import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import SalesOrderCreate from './SalesOrderCreate'
// import DummyData from './dummy/data.json'
import './SalesOrder.scss'

const columns = [
  { accessor: 'site', Header: 'Site', width: 50 },
  { accessor: 'client', Header: 'Client', width: 100 },
  { accessor: 'orderno', Header: 'Order No', width: 100, style:{textAlign: 'left'} },
  { accessor: 'ordertype', Header: 'Order Type', width: 120 },
  { accessor: 'task', Header: 'Task', width: 100 },
  { accessor: 'customername', Header: 'Customer', width: 250 },
  { accessor: 'status', Header: 'Status', width: 120 },
  { accessor: 'deliverydate', Header: 'Delivery Date', width: 120 },
  { accessor: 'datereceived', Header: 'Date Received', width: 120 },
  { accessor: 'datereleased', Header: 'Date Released', width: 120 },
  { accessor: 'datecompleted', Header: 'Date Completed', width: 120 },
  { accessor: 'customerpono', Header: 'Customer Order Ref' },
  { accessor: 'vendororderno', Header: 'Vendor Order No' },
  { accessor: 'address1', Header: 'Address1' },
  { accessor: 'address2', Header: 'Address2' },
  { accessor: 'address3', Header: 'Address3' },
  { accessor: 'address4', Header: 'Address4' },
  { accessor: 'address5', Header: 'Address5' },
  { accessor: 'suburb', Header: 'Suburb' },
  { accessor: 'postcode', Header: 'Postcode' },
  { accessor: 'state', Header: 'State' },
  { accessor: 'country', Header: 'Country' },
  { accessor: 'loadnumber', Header: 'Load Number' },
  { accessor: 'loadoutstart', Header: 'Load Start' },
  { accessor: 'loadoutfinish', Header: 'Load Finish' },
  { accessor: 'consignmentno', Header: 'Consignment No' },
  { accessor: 'freightcharge', Header: 'Freight Charge' },
  { accessor: 'customer', Header: 'Customer Code' },
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
    dimension: { width: 0, height: 0 },
    request_status: 'Please Wait...'
  }
  componentDidMount = () => {
    // set automatic table height
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);

    this.getSite()
    this.getClient()
    this.getStatus()
    this.getResources()
    this.searchSalesOrder()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }
  updateDimension = () => {
    const height = (window.innerHeight - 270)
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getSite = async () => {
    const { data } = await axios.get(endpoints.getSite)
    const siteData = data.map(d => ({ value: d.site, label: `${d.site} : ${d.name}` }))
    const site = { value: 'all', label: 'All Site' }
    siteData.splice(0, 0, site)
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get(endpoints.getClient)
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
    this.setState({ statusData, status: statusData[0] })
  }
  getTask = async () => {
    const { client, site } = this.state
    if (client && site) {
      const { data } = await axios.get(`${endpoints.getIsisTask}?client=${client.value}&site=${site.value}&order=so`)
      const taskData = data.code.map((c, i) => ({ value: c, label: `${data.name[i]}` }))
      const task = { value: 'All', label: 'All Task' }
      taskData.splice(0, 0, task)
      this.setState({ taskData })
    }
  }
  getResources = async () => {
    const { user } = this.props.store
    console.log(user)
    if (user) {
      const { data } = await axios.get(`${endpoints.getSoResources}?company=${user.company || ''}&client=${user.client || ''}`)
      const { code, name } = data.orderType
      const orderTypeData = code.map((c, i) => ({ value: c, label: `${code[i]}: ${name[i]}` }))
      const orderType = { value: 'all', label: 'All' }
      orderTypeData.splice(0, 0, orderType)
      this.setState({ resources: data, orderTypeData })
    }
  }
  searchSalesOrder = async () => {
    let { search, site, client, orderType, status,task, pagination, request_status } = this.state
    this.setState({ data: [] })
    this.setState({ request_status: "Please Wait..."  })
    let urls = []
    urls.push('searchParam=' + (search ? search : ''))
    urls.push('site=' + (site ? site.value : 'all'))
    urls.push('client=' + (client ? client.value : 'all'))
    urls.push('orderType=' + (orderType ? orderType.value : 'all'))
    urls.push('status=' + (status ? status.value : 'all'))
    urls.push('task=' + (task ? task.value : 'All'))
    urls.push('page=' + (pagination.active || 1))
    // console.log(`${endpoints.salesOrder}?${urls.join('&')}`)
    const { data } = await axios.get(`${endpoints.salesOrder}?${urls.join('&')}`)
    console.log(data)
    if (data?.data?.data) {
      const modifiedData = data.data.data.map(m => {
        m.deliverydate = m.deliverydate ? moment(m.deliverydate).format('DD/MM/YYYY') : ''
        m.datereceived = m.datereceived ? moment(m.datereceived).format('DD/MM/YYYY') : ''
        m.datereleased = m.datereleased ? moment(m.datereleased).format('DD/MM/YYYY') : ''
        m.datecompleted = m.datecompleted ? moment(m.datecompleted).format('DD/MM/YYYY') : ''
        m.loadoutstart = m.loadoutstart ? moment(m.loadoutstart).format('DD/MM/YYYY') : ''
        m.loadoutfinish = m.loadoutfinish ? moment(m.loadoutfinish).format('DD/MM/YYYY') : ''
        return m
      })
      if(data.data.total<1){
        this.setState({ request_status: "No Data Found"  })
      }
      this.setState({
        pagination: {
          active: pagination.active || data.data.current_page,
          show: data.data.per_page,
          total: data.data.total
        },
        data: modifiedData
      })
    } else { 
      this.setState({ request_status: "No Data Found" })
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
      siteData, clientData, statusData, orderTypeData, taskData, request_status
    } = this.state
    return <div className="sales-order">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Sales Orders', active: true }]}
        button={<CButton onClick={this.toggle} className="btn btn-primary btn-create float-right">Create Sales Order</CButton>}
      />

      <CCard className="mb-3">
        <CCardBody className="p-3">
          <CRow>
            <CCol lg={3} className="pr-2">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                </div>
                <input type="text" className="form-control border-left-0" placeholder="Enter an Order No" onChange={e => this.setState({ search: e.target.value })} />
              </div>
            </CCol>
            <CCol lg={9}>
              <CRow>
                <CCol lg={2} className="px-2">
                  <Select name="site" placeholder="Site"
                    value={site} options={siteData}
                    onChange={(val) => this.setState({ site: val }, () => this.getTask())}
                  />
                </CCol>
                <CCol lg={2} className="px-2">
                  <Select name="client" placeholder="Client"
                    value={client} options={clientData}
                    onChange={(val) => this.setState({ client: val }, () => this.getTask())}
                  />
                </CCol>
                <CCol lg={2} className="px-2">
                  <Select name="status"
                    value={status} options={statusData}
                    onChange={(val) => this.setState({ status: val })}
                  />
                </CCol>
                <CCol lg={2} className="px-2">
                  <Select name="orderType" placeholder="Order Type"
                    value={orderType} options={orderTypeData}
                    onChange={(val) => this.setState({ orderType: val })}
                  />
                </CCol>
                <CCol lg={2} className="px-2">
                  <Select name="task" placeholder="Task"
                    value={task} options={taskData}
                    onChange={(val) => this.setState({ task: val })}
                  />
                </CCol>
                <CCol lg={2} className="pl-2">
                  <button className="btn btn-search btn-primary float-right" onClick={this.searchSalesOrder}>SEARCH</button>
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
        pagination={pagination}
        onClick={this.showDetails}
        goto={(active) => {
          this.setState({ pagination: { ...pagination, active } }, () => this.searchSalesOrder())
        }}
        request_status={this.state.request_status}
        export={<button className="btn btn-primary float-right px-4 btn-export">EXPORT <IoIosArrowDown /></button>}
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