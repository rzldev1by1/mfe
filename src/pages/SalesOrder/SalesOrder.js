import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import Select from 'react-select'
import endpoints from 'helpers/endpoints'
import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import SalesOrderCreate from './SalesOrderCreate'
import loading from "../../assets/icons/loading/LOADING-MLS-GRAY.gif"
// import DummyData from './dummy/data.json'
import './SalesOrder.scss'

const columns = [
  { accessor: 'site', placeholder: 'Site', Header: 'Site', width: 50, },
  { accessor: 'client', placeholder: 'Client', Header: 'Client', width: 100, },
  { accessor: 'orderno',  placeholder: 'Order No', Header: 'Order No', style: { textAlign: 'left' }, width: 100, },
  { accessor: 'ordertype', placeholder: 'Order Type', Header: 'Order Type', width: 120, },
  { accessor: 'isistask', placeholder: 'Task', Header: 'Task', width: 100, }, 
  { accessor: 'customer', placeholder: 'Customer No', Header: 'Customer No', style: { textAlign: 'left' },width: null, },
  { accessor: 'customername', placeholder: 'Customer Name', Header: 'Customer Name' , width: null, },
  { accessor: 'status',  placeholder: 'Status', Header: 'Status', width: 150, },
  { accessor: 'deliverydate', placeholder: 'Delivery Date', Header: 'Delivery Date', width: 120 , },
  { accessor: 'datereceived', placeholder: 'Date Received', Header: 'Date Received', width: 120 , },
  { accessor: 'datereleased', placeholder: 'Date Released', Header: 'Date Released', width: 120 , },
  { accessor: 'datecompleted', placeholder: 'Date Completed', Header: 'Date Completed', width: 120 , },
  { accessor: 'customerpono',  placeholder: 'Customer Order Ref', Header: 'Customer Order Ref', width: null, },
  { accessor: 'vendororderno',  placeholder: 'Vendor Order No',  Header: 'Vendor Order No',width: null, },
  { accessor: 'address1', placeholder: 'Address1',  Header: 'Address1',width: null, },
  { accessor: 'address2', placeholder: 'Address2',  Header: 'Address2',width: null, },
  { accessor: 'address3', placeholder: 'Address3', Header: 'Address3',width: null, },
  { accessor: 'address4',  placeholder: 'Address4', Header: 'Address4',width: null, },
  { accessor: 'address5',  placeholder: 'Address5', Header: 'Address5',width: null, },
  { accessor: 'suburb',  placeholder: 'Suburb', Header: 'Suburb' ,width: null,},
  { accessor: 'postcode', placeholder: 'Postcode', Header: 'Postcode',width: null, },
  { accessor: 'state', placeholder: 'State', Header: 'State',width: null, },
  { accessor: 'country',  placeholder: 'Country', Header: 'Country',width: null, },
  { accessor: 'loadnumber',  placeholder: 'Load Number', Header: 'Load Number',width: null, },
  { accessor: 'loadoutstart',  placeholder: 'Load Start', Header: 'Load Start' ,width: null,},
  { accessor: 'loadoutfinish',  placeholder: 'Load Finish', Header: 'Load Finish' ,width: null,},
  { accessor: 'consignmentno',  placeholder: 'Consignment No', Header: 'Consignment No',width: null, },
  { accessor: 'freightcharge',  placeholder: 'Freight Charge', Header: 'Freight Charge',width: null, },
]

const customColumns = [
  { accessor: 'site', Header: 'Site', width: 50 },
  { accessor: 'client', Header: 'Client', width: 100 },
  { accessor: 'orderno', Header: 'Order No', style: { textAlign: 'left' }, width: 100 },
  { accessor: 'ordertype', Header: 'Order Type', width: 120 },
  { accessor: 'isistask', Header: 'Task', width: 100 }, 
  { accessor: 'customer', Header: 'Customer No', style: { textAlign: 'left' } },
  { accessor: 'customername', Header: 'Customer Name' },
  { accessor: 'statusTxt', Header: 'Status', width: 150 },
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
]


class SalesOrder extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      search: '',
      site: (this.props.store.user.site)?{value:this.props.store.user.site}:null,
      client: (this.props.store.user.client)?{value:this.props.store.user.client}:null,
      status: {value: "open", label: "All Open"}, //on load status=open
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
      tableStatus: 'waiting'
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
    this.searchSalesOrder()
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
    const siteData = data.map(d => ({ value: d.site, label: `${d.site} : ${d.name}` }))
    const site = { value: 'all', label: 'All Site' }
    siteData.splice(0, 0, site)
    this.props.dispatch({ type: 'SITE', data: siteData })
    this.setState({ siteData })
  }
  getClient = async () => {
    const { data } = await axios.get(endpoints.getClient)
    const clientData = data.map(d => ({ value: d.code, label: `${d.code} : ${d.name}` }))
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
    if (user) {
      const { data } = await axios.get(`${endpoints.getSoResources}?company=${user.company || ''}&client=${user.client || ''}`)
      const { code, name } = data.orderTypeFilter
      const orderTypeData = code.map((c, i) => ({ value: c, label: `${code[i]}: ${name[i]}` })) 
      const orderType = { value: 'all', label: 'All Order' }
      orderTypeData.splice(0, 0, orderType)

      const code2 = data.orderType.code
      const name2 = data.orderType.name
      const orderTypeInsert = code2.map((c, i) => ({ value: c, label: `${code2[i]}: ${name2[i]}` })) 
      this.setState({ resources: data, orderTypeData, orderTypeInsert }) 
       
    }
  }
  searchSalesOrder = async () => {
    let { search, site, client, orderType, status, task, pagination } = this.state 
    this.setState({ data: [], tableStatus: "waiting" })
    let urls = []
    urls.push('searchParam=' + (search ? search : ''))
    urls.push('site=' + (site ? site.value : 'all'))
    urls.push('client=' + (client ? client.value : 'all'))
    urls.push('orderType=' + (orderType ? orderType.value : 'all'))
    urls.push('status=' + (status ? status.value : 'all'))
    urls.push('task=' + (task ? task.value : 'All'))
    urls.push('page=' + (pagination.active || 1))
    const { data } = await axios.get(`${endpoints.salesOrder}?${urls.join('&')}`)
    if (data?.data?.data) {
      const modifiedData = data.data.data.map(m => {
        m.deliverydate = m.deliverydate ? moment(m.deliverydate).format('DD/MM/YYYY') : '-'
        m.datereceived = m.datereceived ? moment(m.datereceived).format('DD/MM/YYYY') : '-'
        m.datereleased = m.datereleased ? moment(m.datereleased).format('DD/MM/YYYY') : '-'
        m.datecompleted = m.datecompleted ? moment(m.datecompleted).format('DD/MM/YYYY') : '-'
        m.loadoutstart = m.loadoutstart ? moment(m.loadoutstart).format('DD/MM/YYYY') : '-'
        m.loadoutfinish = m.loadoutfinish ? moment(m.loadoutfinish).format('DD/MM/YYYY') : '-'
        return m
      })
      modifiedData.map((item, idx) => {
        if ((item["status"]) === "1: Available") {
          item['status'] = [<a className="status-available">AVAILABLE</a>]
          item['statusTxt'] = 'AVAILABLE'
        } if ((item["status"]) === "0: Not Available") {
          item['status'] = [<a className="status-Unavailable">UNAVAILABLE</a>]
          item['statusTxt'] = 'UNAVAILABLE'
        } if ((item["status"]) === "2: Released") {
          item['status'] = [<a className="status-Release">RELEASED</a>]
          item['statusTxt'] = 'RELEASED'
        } if ((item["status"]) === "3: Part Released") {
          item['status'] = [<a className="status-partRelease">PART RELEASED</a>]
          item['statusTxt'] = 'PART RELEASED'
        } if ((item["status"]) === "4: Completed") {
          item['status'] = [<a className="status-complete">COMPLETED</a>]
          item['statusTxt'] = 'COMPLETED'
        } if ((item["status"]) === "All Open") {
          item['status'] = [<a className="status-ok">ALL OPEN</a>]
          item['statusTxt'] = 'ALL OPEN'
        }
      })
      if (data.data.total==0) {
        this.setState({ tableStatus: "noData" })
      }
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
      }, () => {console.log (this.state.pagination)})
    } else {
      this.setState({ tableStatus: "noData" })
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
  
  siteCheck = (siteVal) => {
    let l = null
    const {site} = this.props.store
    if(site)
    site.map(data => {
      if (data.value === siteVal) l = data.label
    })
    return l
  }

  clientCheck = (clientVal) => {
    let c = null
    const {client} = this.props.store
    if(client)
    client.map(data => {
      if (data.value === clientVal) c = data.label
    })
    return c
  }
  
  UrlHeader = () => {
    return `/getSalesOrderColumn?client=ANTEC`
  }
  UrlAntec = () => {
    return '/putSalesOrderColumn?client=ANTEC'
  }
  UrlBega = () => {
    return '/putSalesOrderColumn?client=BEGA'
  }
  UrlAesop = () => {
    return '/putSalesOrderColumn?client=AESOP'
  }
  UrlClucth = () => {
    return '/putSalesOrderColumn?client=CLUCTH'
  }
  UrlExquira = () => {
    return '/putSalesOrderColumn?client=EXQUIRA'
  }
  UrlLedvance = () => {
    return '/putSalesOrderColumn?client=LEDVANCE'
  }
  UrlOnestop = () => {
    return '/putSalesOrderColumn?client=ONESTOP'
  }
  UrlStartrack = () => {
    return '/putSalesOrderColumn?client=STARTRACK'
  }
  UrlTatura = () => {
    return '/putSalesOrderColumn?client=TATURA'
  }
  UrlTtl = () => {
    return '/putSalesOrderColumn?client=TTL'
  }
  UrlTtchem = () => {
    return '/putSalesOrderColumn?client=TTCHEM'
  }

  // end url Get Header And Post

  onSubmitSearch = (e) => {
    e.preventDefault();
    this.searchSalesOrder();
}
  
  render() {
    const {
      dimension, fields, data, pagination, site, client, status, orderType, create, task,
      siteData, clientData, statusData, orderTypeData,orderTypeInsert, taskData, customFields,tableStatus
    } = this.state 
    
    return <div className="sales-order">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Sales Orders', active: true }]}
        button={<CButton onClick={this.toggle} className="btn btn-primary btn-create float-right">CREATE SALES ORDER</CButton>}
      />

      <CCard className="mb-3">
        <CCardBody className="p-3">
        <form onSubmit={this.onSubmitSearch}>
          <CRow>
            <CCol lg={3} className="px-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                </div>
                <input type="text" className="form-control pl-0 border-left-0" placeholder="Enter an Order No" onChange={e => this.setState({ search: e.target.value })} />
              </div>
            </CCol>
            <CCol lg={9} className="pr-0">
              <CRow>
                <CCol lg={2} className="px-0">
                  {
                  this.props.store.user.site ?
                  <input value={this.siteCheck(site.value)} className="form-control" readOnly />
                  : 
                  <Select name="site" placeholder="Site"
                    value={site} options={siteData}
                    onChange={(val) => this.setState({ site: val }, () => {this.getTask()})}
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                  />
                }  
                </CCol>
                <CCol lg={2} className="px-3">
                  {
                    this.props.store.user.client ?
                    <input value={this.clientCheck(client.value)} className="form-control" readOnly />
                    :
                    <Select name="client" placeholder="Client"
                      value={client} options={clientData}
                      onChange={(val) => this.setState({ client: val }, () => this.getTask())}
                      styles={{
                        dropdownIndicator: (base, state) => ({
                          ...base, 
                          transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                        })
                      }}
                    />
                  }
                </CCol>
                <CCol lg={2} className="px-0">
                  <Select name="status"
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
                <CCol lg={2} className="px-3">
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
                <CCol lg={2} className="px-0">
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
                <CCol lg={2} className="px-0">
                  <button className="btn btn-search btn-primary float-right" onClick={this.searchSalesOrder}>SEARCH</button>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </form>
        </CCardBody>
      </CCard>
      {console.log(data)}
      <CustomTable
        title="Sales Order"
        filename='Microlistics_SalesOrder.'
        height={dimension.height}
        font="5"
        data={data}
        fields={fields}
        customFields={customFields}
        pagination={pagination}
        tableStatus={tableStatus}
        onClick={this.showDetails}
        renameSubmit={this.renameSubmit}
        UrlHeader={this.UrlHeader} UrlAntec={this.UrlAntec} UrlBega={this.UrlBega}
        UrlAesop={this.UrlAesop} UrlClucth={this.UrlClucth} UrlExquira={this.UrlExquira}
        UrlLedvance={this.UrlLedvance} UrlOnestop={this.UrlOnestop} UrlStartrack={this.UrlStartrack}
        UrlTatura={this.UrlTatura} UrlTtl={this.UrlTtl} UrlTtchem={this.UrlTtchem}
        goto={(active) => {
          this.setState({ pagination: { ...pagination, active } }, () => this.searchSalesOrder())
        }} 
        export={<button className="btn btn-primary float-right btn-export">
           {/* <div className='export-export pr-3' /> */}
          EXPORT </button>}
      />

      <SalesOrderCreate
        user = {this.props.store.user}
        show={!!create}
        toggle={this.toggle}
        siteData={siteData}
        clientData={clientData}
        statusData={statusData}
        orderTypeData={orderTypeInsert}
      />
    </div>
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(SalesOrder);