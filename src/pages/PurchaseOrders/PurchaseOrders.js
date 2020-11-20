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
  { 
    accessor: 'site', 
    placeholder: 'Site', 
    Header: 'Site', 
    width: 80, 
    sortable: true ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: 'client', 
    placeholder: 'Client', 
    Header: 'Client', 
    width: 110, 
    sortable: true ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: 'order_no', 
    placeholder: 'Order No', 
    Header: 'Order No', 
    width: 160, 
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: 'order_type', 
    placeholder: 'Order Type', 
    Header: 'Order Type', 
    width: 120, 
    sortable: true ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: 'isis_task', 
    placeholder: 'Task', 
    Header: 'Task', 
    width: 100, 
    sortable: true ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: 'supplier_no', 
    placeholder: 'Supplier No', 
    Header: 'Supplier No', 
    width: 120, 
    sortable: true, 
    style: { textAlign: 'left' },
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
   },
  { 
    accessor: 'supplier_name', 
    placeholder: 'Supplier Name', 
    Header: 'Supplier Name',
    width: 290 ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  {
    accessor: 'status', placeholder: 'Status', Header: 'Status', width: 140,
    Cell: row => {
      switch (row.original.status) {
        case '0: Unavailable':
          return <a className="status-Unavailable">UNAVAILABLE</a>
          break;
        case '1: Available':
          return <a className="status-available">AVAILABLE</a>
          break;
        case '2: Released':
          return <a className="status-Release">RELEASED</a>
          break;
        case '3: Part Released':
          return <a className="status-partRelease">PART RELEASED</a>
          break;
        case '4: Completed':
          return <a className="status-complete">COMPLETED</a>
          break;
        case 'All Open':
          return <a className="status-ok">ALL OPEN</a>
          break;
        default:
          break;
      }
    }
  },
  {
    accessor: 'delivery_date', placeholder: 'Order Date', Header: 'Order Date', width: 150, sortable: true,
    style: { textAlign: 'left' }, Cell: props => <span>{props.value ? props.value : '-'}</span>,
    sortable: false, 
    sortType: "date"
  },
  {
    accessor: 'date_received', placeholder: 'Date Received', Header: 'Date Received', width: 150, sortable: true,
    style: { textAlign: 'left' }, Cell: props => <span>{props.value ?props.value : '-'}</span>,
    sortable: false, 
    sortType: "date"
  },
  {
    accessor: 'date_released', placeholder: 'Date Released', Header: 'Date Released', width: 150, sortable: true,
    style: { textAlign: 'left' }, Cell: props => <span>{props.value ? props.value : '-'}</span>,
    sortable: false, 
    sortType: "date"
  },
  {
    accessor: 'date_completed', placeholder: 'Date Completed', Header: 'Date Completed', width: 150, sortable: true,
    style: { textAlign: 'left' }, Cell: props => <span>{props.value ? props.value : '-'}</span>,
    sortable: false, 
    sortType: "date"
  },
  // { accessor: 'customer_order_ref', Header: 'Customer Order Ref' },
  // { accessor: 'vendor_order_ref', Header: 'Vendor Order No' },
]
const customColumns = [
  { accessor: 'site', Header: 'Site', width: 30, sortable: true },
  { accessor: 'client', Header: 'Client', width: null, sortable: true },
  { accessor: 'order_no', Header: 'Order No', width: 130, sortable: true },
  { accessor: 'order_type', Header: 'Order Type', width: null, sortable: true },
  { accessor: 'isis_task', Header: 'Task', width: null, sortable: true },
  { accessor: 'supplier_no', Header: 'Supplier No', width: null, sortable: true },
  { accessor: 'supplier_name', Header: 'Supplier Name', width: 290 },
  { accessor: 'status', Header: 'Status', width: 140 },
  { accessor: 'delivery_date', Header: 'Order Date', width: null, sortable: true },
  { accessor: 'date_received', Header: 'Date Received', width: null, sortable: true },
  { accessor: 'date_released', Header: 'Date Released', width: null, sortable: true },
  { accessor: 'date_completed', Header: 'Date Completed', width: null, sortable: true },
  // { accessor: 'customer_order_ref', Header: 'Customer Order Ref' },
  // { accessor: 'vendor_order_ref', Header: 'Vendor Order No' },
]

class PurchaseOrders extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      site: {
        value: this.props.store.user.site ? this.props.store.user.site : null,
      },
      client: {
        value: this.props.store.user.client ? this.props.store.user.client : null,
      },
      status: { value: "open", label: "All Open" }, //on load status=open,
      orderType: null,
      task: null,
      resources: [],
      fields: columns,
      customFields: customColumns,
      data: [],
      pagination: {},
      create: false,
      detail: {},
      dimension: { width: 0, height: 0 },
      tableStatus: 'waiting',
      exportData: [],
      sort: "down"
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
    this.searchPurchaseOrder('false', 'true')
    const { site, client } = this.props.store.user
    if (site && client) this.getTask()
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
    this.props.dispatch({ type: 'SITE', data: siteData })
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
      const { data } = await axios.get(`${endpoints.getIsisTask}?client=${client?.value}&site=${site?.value}&order=po`)
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
      const orderTypeFilterData = data.orderTypeFilter.map((data, i) => ({ value: data.code, label: `${data.code}: ${data.description}` }))
      const orderTypeData = data.orderType.map((data, i) => ({ value: data.code, label: `${data.code}: ${data.description}` }))
      const site = data.site.map(data => ({ value: data.site, label: `${data.site}: ${data.name}` }))
      const orderType = { value: 'all', label: 'All' }
      orderTypeFilterData.splice(0, 0, orderType)
      this.props.dispatch({ type: 'SITE', data: site })
      this.setState({ resources: data, orderTypeFilterData, orderTypeData })
    }
  }
  searchPurchaseOrder = async (export_ = 'false', readyDocument = 'false') => {
    //export : true/false --> param for identify this function called from export button
    //readyDocument : true/false --> if true, then avoid bug "repeatly set state from ComponentDidMount"

    let { search, site, client, orderType, task, pagination, status } = this.state
    let urls = []

    //reset table
    if (readyDocument == 'false' && export_ == 'false') {
      this.setState({
        data: [],
        tableStatus: 'waiting'
      })
    }

    urls.push('searchParam=' + (search ? search : ''))
    urls.push('site=' + (site?.value ? site.value : 'all'))
    urls.push('client=' + (client?.value ? client.value : 'all'))
    urls.push('orderType=' + (orderType ? orderType.value : 'all'))
    urls.push('status=' + (status ? status.value : 'all'))
    if (task && task.value !== 'all') urls.push('task=' + task.value)
    urls.push('page=' + (pagination.active || 1))
    if (export_ == 'true') { urls.push('export=true') }
    console.log('load Purchase order', urls.join('&'), task)
    const { data } = await axios.get(`${endpoints.purchaseOrder}?${urls.join('&')}`)
    console.log(data);
    if (data?.data?.data) {
      const modifiedData = data.data.data.map(m => {
        // m.delivery_date = m?.delivery_date ? moment(m.delivery_date).format('DD/MM/YYYY') : '-'
        // m.date_received = m?.date_received ? moment(m.date_received).format('DD/MM/YYYY') : '-'
        // m.date_released = m?.date_released ? moment(m.date_released).format('DD/MM/YYYY') : '-'
        // m.date_completed = m?.date_completed ? moment(m.date_completed).format('DD/MM/YYYY') : '-'
        console.log(m);
        return m
      })
      if (export_ == 'true') {
        this.setState({
          exportData: modifiedData
        })
      } else {
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
      }

      if (modifiedData.length < 1) {

        this.setState({ tableStatus: 'noData' })
      }
    } else {
      this.setState({ data: [] })
      // this.setState({ tableStatus: 'noData' })
    }
    // this.setState({ data: DummyData })
  }
  showDetails = (item) => {
    const url = '/purchase-order/' + item.site + '/' + item.client + '/' + item.order_no
    this.props.history.push(url)
  }
  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }

  siteCheck = (siteVal) => {
    let l = null
    const { site } = this.props.store
    if (site)
      site.map(data => {
        if (data.value === siteVal) l = data.label
      })
    return l
  }

  clientCheck = (clientVal) => {
    let c = null
    const { client } = this.props.store
    if (client)
      client.map(data => {
        if (data.value === clientVal) c = data.label
      })
    return c
  }

  setClient = (client) => {
    this.setState({ client: client }, () => this.getTask())

  }

  setSite = (site) => {
    this.setState({ site }, () => this.getTask())

  }
  UrlHeader = () => {
    return `/getPurchaseOrderColumn?client=ALL`
  }
  UrlAll = () => {
    return '/putPurchaseOrderColumn?client=ALL'
  }

  onSubmitSearch = (e) => {
    e.preventDefault();
    this.searchPurchaseOrder();
  }

  sortDate = (value, column, sort) => {
    let data = value;
    let dateFormatting = (value) => {
        if(value){
            let split = value.split("/");
            split.reverse()
            return split.join("-")
        }

    }
    if(sort == "down"){
        data.sort((a, b) => {
            if (a[column] !== undefined && b[column] !== undefined) {
                let date1 = new Date(dateFormatting(a[column]));
                let date2 = new Date(dateFormatting(b[column]));
                if(a[column] === null){
                    return -1;
                }else if(b[column] === null){
                    return 1;
                }
                return date2 - date1;
            }
        })

        
        this.setState({ sort: "up" })
    }else if(sort == "up"){
        data.sort((a, b) => {
            if (a[column] !== undefined && b[column] !== undefined) {
                let date1 = new Date(dateFormatting(a[column]));
                let date2 = new Date(dateFormatting(b[column]));
                if(a[column] === null){
                    return 1;
                }else if(b[column] === null){
                    return -1;
                }
                return date1 - date2;
            }

        })
        this.setState({ sort: "down" })
    }
    this.setState({ data });
  }
  render() {
    const {
      dimension, fields, data, pagination, site, client, status, orderType, create, task,
      siteData, clientData, statusData, orderTypeData, taskData, customFields, tableStatus, orderTypeFilterData, exportData
    } = this.state
    return <div className="purchase-order">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Purchase Orders', active: true }]}
        button={<CButton onClick={this.toggle} className="btn btn-primary btn-create float-right">CREATE PURCHASE ORDER</CButton>}
      />

      <CCard className="mb-3">
        <CCardBody className="p-3">
          <form onSubmit={this.onSubmitSearch}>
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
                        <input value={this.siteCheck(site?.value)} className="form-control sh-input" readOnly />
                        :
                        <Select isClearable name="site" placeholder="Site"
                          options={siteData}
                          filterOption={
                              (option, inputVal) => {
                                  return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                              }
                          }
                          onChange={(val) => this.setSite(val)}
                          styles={{
                              option: (provided, state) => ({
                                ...provided,
                                textAlign: 'left'
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                                display: !site || !site.value ? "flex" : "none"
                              })
                          }}
                        />
                    }
                  </CCol>
                  <CCol sm={4} lg={2} className="px-3">
                    {
                      this.props.store.user.client ?
                        <input value={this.clientCheck(client?.value)} className="form-control sh-input" readOnly />
                        :
                        <Select isClearable name="client" placeholder="Client"
                          options={clientData}
                          onChange={(val) => this.setClient(val)}
                          filterOption={
                              (option, inputVal) => {
                                  return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                              }
                          }
                          styles={{
                              option: (provided, state) => ({
                                ...provided,
                                textAlign: 'left'
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                                display:  !client || !client.value ? "flex" : "none"
                              })
                          }}
                        />
                    }
                    {console.log(this.state.status)}
                  </CCol>
                  <CCol sm={4} lg={2} className="px-0">
                    <Select isClearable name="status" placeholder="Status"
                      value={status} options={statusData}
                      onChange={(val) => this.setState({ status: val })}
                      filterOption={
                          (option, inputVal) => {
                              return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                          }
                      }
                      styles={{
                          option: (provided, state) => ({
                            ...provided,
                            textAlign: 'left'
                          }),
                          dropdownIndicator: (base, state) => ({
                            ...base,
                            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                            display: !status ? "flex" : "none"
                          })
                      }}
                    />
                  </CCol>
                  <CCol sm={4} lg={2} className="px-3">
                    <Select isClearable name="orderType" placeholder="Order Type"
                      value={orderType} options={orderTypeFilterData}
                      onChange={(val) => this.setState({ orderType: val })}
                      filterOption={
                          (option, inputVal) => {
                              return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                          }
                      }
                      styles={{
                          option: (provided, state) => ({
                            ...provided,
                            textAlign: 'left'
                          }),
                          dropdownIndicator: (base, state) => ({
                            ...base,
                            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                            display: !orderType ? "flex" : "none"
                          })
                      }}
                    />
                  </CCol>
                  <CCol sm={4} lg={2} className="px-0">
                    <Select isClearable name="task" placeholder="Task"
                      value={task} options={taskData}
                      onChange={(val) => this.setState({ task: val })}
                      filterOption={
                          (option, inputVal) => {
                              return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                          }
                      }
                      styles={{
                          option: (provided, state) => ({
                            ...provided,
                            textAlign: 'left'
                          }),
                          dropdownIndicator: (base, state) => ({
                            ...base,
                            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                            display: !task ? "flex" : "none"
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
          </form>
        </CCardBody>
      </CCard>

      <CustomTable
        title="Purchase Order Summary"
        filename='Microlistics_PurchaseOrder.'
        font="9"
        height={dimension.height}
        data={data}
        fields={fields}
        customFields={customFields}
        pagination={pagination}
        onClick={this.showDetails}
        UrlHeader={this.UrlHeader}
        UrlAll={this.UrlAll}
        sortDate={(column) => this.sortDate(this.state.data, column, this.state.sort)}
        tableStatus={tableStatus}
        goto={(active) => {
          this.setState({ pagination: { ...pagination, active } }, () => this.searchPurchaseOrder())
        }}
        export={<button className="btn btn-primary float-right btn-export">
          {/* <div className="export-export pr-3"/> */}
        EXPORT</button>}
        exportApi={async () => { await this.searchPurchaseOrder('true') }}
        exportData={exportData}
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
