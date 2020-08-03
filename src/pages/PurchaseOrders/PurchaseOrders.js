import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import Select from 'react-select'

import endpoints from 'helpers/endpoints'
import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import PurchaseOrderCreate from './PurchaseOrderCreate'
import './PurchaseOrder.scss'

const columns = [
  { accessor: 'site', Header: 'Site', },
  { accessor: 'client', Header: 'Client', },
  { accessor: 'order_no', Header: 'Order No', },
  { accessor: 'order_type', Header: 'Order Type', },
  { accessor: 'isis_task', Header: 'Task', },
  { accessor: 'supplier_no', Header: 'Supplier No', },
  { accessor: 'supplier_name', Header: 'Supplier Name', width: 210 },
  { accessor: 'status', Header: 'Status', width: 140 },
  { accessor: 'delivery_date', Header: 'Order Date', },
  { accessor: 'date_received', Header: 'Date Received', },
  { accessor: 'date_released', Header: 'Date Released', },
  { accessor: 'date_completed', Header: 'Date Completed', },
  // { accessor: 'customer_order_ref', Header: 'Customer Order Ref' },
  // { accessor: 'vendor_order_ref', Header: 'Vendor Order No' },
]
class PurchaseOrders extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      site: {
        value:this.props.store.user.site ? this.props.store.user.site : null,
      },
      client: {
        value: this.props.store.user.client ? this.props.store.user.client : null,
      },
      status: {value: "open", label: "All Open"}, //on load status=open,
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

  }
  componentDidMount = () => {
    // set automatic table height
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);

    this.getSite()
    this.getClient()
    this.getStatus()
    this.getResources()
    this.searchPurchaseOrder()
    const {site, client} = this.props.store.user
    if(site && client) this.getTask()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }
  updateDimension = () => {
    const height = (window.innerHeight - 257)
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getSite = async () => {
    const { data } = await axios.get(endpoints.getSite)
    const siteData = data.map(d => ({ value: d.site, label: `${d.site}: ${d.name}` }))
    const site = { value: 'all', label: 'All Site' }
    siteData.splice(0, 0, site)
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get(endpoints.getClient)
    const clientData = data.map(d => ({ value: d.code, label: `${d.code}: ${d.name}` }))
    const client = { value: 'all', label: 'All Client' }
    clientData.splice(0, 0, client)
    this.props.dispatch({ type: 'CLIENT', data: clientData })
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
      const { data } = await axios.get(`${endpoints.getIsisTask}?client=${client.value}&site=${site.value}&order=po`)
      const taskData = data.code.map((c, i) => ({ value: c, label: `${data.name[i]}` }))
      const task = { value: 'all', label: 'All Task' }
      taskData.splice(0, 0, task)
      this.setState({ taskData })
    }
  }
  getResources = async () => {
    const { user } = this.props.store
    if (user) {
      const { data } = await axios.get(`${endpoints.getPOResources}?company=${user.company}&client=${user.client}`)
      const orderTypeData = data.orderTypeFilter.map((data, i) => ({ value: data.code, label: `${data.code}: ${data.description}` }))
      const site = data.site.map(data => ({ value: data.site, label: `${data.site}: ${data.name}` }))
      const orderType = { value: 'all', label: 'All' }
      orderTypeData.splice(0, 0, orderType)
      this.props.dispatch({ type: 'SITE', data: site })
      this.setState({ resources: data, orderTypeData })
    }
  }
  searchPurchaseOrder = async () => {
    let { search, site, client, orderType, task, pagination, status } = this.state
    let urls = []
    urls.push('searchParam=' + (search ? search : ''))
    urls.push('site=' + (site.value ? site.value : 'all'))
    urls.push('client=' + (client.value ? client.value : 'all'))
    urls.push('orderType=' + (orderType ? orderType.value : 'all'))
    urls.push('status=' + (status ? status.value : 'all'))
    if(task && task.value !== 'all') urls.push('task=' + task.value)
    urls.push('page=' + (pagination.active || 1))
    console.log('load Purchase order', urls.join('&'), task)
    const { data } = await axios.get(`${endpoints.purchaseOrder}?${urls.join('&')}`)
    if (data?.data?.data) {
      const modifiedData = data.data.data.map(m => {
        m.delivery_date = m?.delivery_date ? moment(m.delivery_date).format('DD/MM/YYYY') : '-'
        m.date_received = m?.date_received ? moment(m.date_received).format('DD/MM/YYYY') : '-'
        m.date_released = m?.date_released ? moment(m.date_released).format('DD/MM/YYYY') : '-'
        m.date_completed = m?.date_completed ? moment(m.date_completed).format('DD/MM/YYYY') : '-'
        return m
      })
      modifiedData.map((item, idx) => {
        if ((item["status"]) === "1: Available") {
          item['status'] = [<a className="status-available">AVAILABLE</a>]
        } if ((item["status"]) === "0: Unavailable") {
          item['status'] = [<a className="status-Unavailable">UNAVAILABLE</a>]
        } if ((item["status"]) === "2: Released") {
          item['status'] = [<a className="status-Release">RELEASED</a>]
        } if ((item["status"]) === "3: Part Released") {
          item['status'] = [<a className="status-partRelease">PART RELEASED</a>]
        } if ((item["status"]) === "4: Completed") {
          item['status'] = [<a className="status-complete">COMPLETED</a>]
        } if ((item["status"]) === "All Open") {
          item['status'] = [<a className="status-ok">ALL OPEN</a>]
        }
      })
      this.setState({
        pagination: {
          active: pagination.active || data.data.current_page,
          show: data.data.per_page,
          total: data.data.total,
          last_page: data.data.last_page,
          from: data.data.from,
          to: data.data.to
        },
        data: modifiedData
      })
    } else {
      this.setState({ data: [] })
    }
    // this.setState({ data: DummyData })
  }
  showDetails = (item) => {
    const url = '/purchase-order/' +item.site + '/' +  item.client + '/' + item.order_no
    this.props.history.push(url)
  }
  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }

  siteCheck = (siteVal) => {
    let l = null
    this.props.store.site.map(data => {
      if (data.value === siteVal) l = data.label
    })
    return l
  }

  clientCheck = (clientVal) => {
    let c = null
    this.props.store.client.map(data => {
      if (data.value === clientVal) c = data.label
    })
    return c
  }

  setClient = (client) =>{
    this.setState({client:client}, () =>  this.getTask())
   
  }

  setSite = (site) => {
    this.setState({site}, () => this.getTask())
    
  }
  UrlHeader = () =>{
    return `$/getSalesOrderHeader?client=ANTEC`
  }

  render() {
    const {
      dimension, fields, data, pagination, site, client, status, orderType, create, task,
      siteData, clientData, statusData, orderTypeData, taskData,
    } = this.state
    return <div className="purchase-order">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Purchase Orders', active: true }]}
        button={<CButton onClick={this.toggle} className="btn btn-primary btn-create float-right">CREATE PURCHASE ORDER</CButton>}
      />

      <CCard className="mb-3">
        <CCardBody className="p-3">
          <CRow className="mx-0">
            <CCol lg={3} className="pr-3 pl-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                </div>
                <input type="text" className="form-control border-left-0 input-height" placeholder="Enter an Order No" onChange={e => this.setState({ search: e.target.value })} />
              </div>
            </CCol>
            <CCol lg={9} className="px-0">
              <CRow className="mx-0">
                
                <CCol sm={4} lg={2} className="px-0">
                {
                  this.props.store.user.site ?
                  <input value={this.siteCheck(site.value)} className="form-control" readOnly />
                  : 
                  <Select name="site" placeholder="Site"
                   options={siteData}
                    onChange={(val) => this.setSite(val)}
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                  />
                }                  
                </CCol>
                <CCol sm={4} lg={2} className="px-3">
                  {
                    this.props.store.user.client ?
                    <input value={this.clientCheck(client.value)} className="form-control" readOnly />
                    :
                    <Select name="client" placeholder="Client"
                    options={clientData}
                    onChange={(val) => this.setClient(val)}
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                    />
                  }
                  {console.log(this.state.status)}
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <Select name="status" placeholder="Status"
                    value={status} options={statusData}
                    onChange={(val) => this.setState({ status: val })}
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-3">
                  <Select name="orderType" placeholder="Order Type"
                    value={orderType} options={orderTypeData}
                    onChange={(val) => this.setState({ orderType: val })}
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <Select name="task" placeholder="Task"
                    value={task} options={taskData}
                    onChange={(val) => this.setState({ task: val })}
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                  />
                </CCol>
                <CCol sm={4} lg={2} className="px-0">
                  <button className="btn btn-search btn-primary float-right" onClick={this.searchPurchaseOrder}>SEARCH</button>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CustomTable
        title="Purchase Order"
        filename='Microlistics_PurchaseOrder.'
        font="9"
        height={dimension.height}
        data={data}
        fields={fields}
        pagination={pagination}
        onClick={this.showDetails}
        UrlHeader={this.UrlHeader} 
        goto={(active) => {
          this.setState({ pagination: { ...pagination, active } }, () => this.searchPurchaseOrder())
        }}
        export={<button className="btn btn-primary float-right btn-export"> 
        {/* <div className="export-export pr-3"/> */}
        EXPORT</button>}
      />

      <PurchaseOrderCreate
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
export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrders);
