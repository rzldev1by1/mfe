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
// import SalesOrderCreate from './SalesOrderCreate'
// import './SalesOrder.css'
const columns = [
  { accessor: 'site', Header: 'Site', sortable: true },
  { accessor: 'client', Header: 'Client', sortable: true },
  { accessor: 'product', Header: 'Product', sortable: true },
  { accessor: 'product_name', Header: 'Description', sortable: true  },
  { accessor: 'disposition', Header: 'Disposition', sortable: true },
  { accessor: 'uom', Header: 'UOM', sortable: true },
  { accessor: 'status', Header: 'Status', sortable: true },
  { accessor: 'on_hand_qty', Header: 'Stock on Hand', sortable: true },
  { accessor: 'expected_in_qty', Header: 'Expected In Qty', sortable: true },
  { accessor: 'expected_in_wty', Header: 'Expected In Wty', sortable: true },
  { accessor: 'expected_out_qty', Header: 'Expected Out Qty', sortable: true },
  { accessor: 'prince', Header: 'Price', sortable: true },
  { accessor: 'pallets', Header: 'Pallets', sortable: true },
]
class StockHolding extends React.PureComponent {
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
    this.searchStockHolding()
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
      { value: "Ok", label: 'Ok' },
      { value: "Shortage", label: 'Shortage' },
    ];
    this.setState({ statusData })
  }
  
  searchStockHolding = async () => {
    console.log('load stock holding')
    const { search, site, client, orderType } = this.state
    let urls = []
    urls.push('searchParam=' + search ? search : '')
    urls.push('site=' + (site ? site.value : 'all'))
    urls.push('client=' + (client ? client.value : 'all'))
    urls.push('orderType=' + (orderType ? orderType.value : 'all'))

    const { data } = await axios.get(`/stockholding?` + urls.join('&'))

    if (data?.data?.data) {
      this.setState({ data: data.data.data })
    } else {
      this.setState({ data: [] })
    }
    // this.setState({ data: DummyData })
  }

  showDetails = (item) => {
    const url = '/stock-holding/' + item.client + '/' + item.site + '/' + item.orderno
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
        breadcrumb={[{ to: '', label: 'Stock Holding', active: true }]}
        button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right d-none">
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
                  <button className="btn btn-block btn-primary float-right" onClick={this.searchStockHolding}>Search</button>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CustomTable
        title="Stock Holding"
        height={dimension.height}
        data={data}
        fields={fields}
        onClick={this.showDetails}
        export={<CButton className="btn btn-primary px-4">Export <IoIosArrowDown /></CButton>}
      />

      {/* <SalesOrderCreate
        show={!!create}
        toggle={this.toggle}
        siteData={siteData}
        clientData={clientData}
        statusData={statusData}
        orderTypeData={orderTypeData}
      /> */}
    </div>
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(StockHolding);
