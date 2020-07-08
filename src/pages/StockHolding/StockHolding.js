import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { CButton, CCard, CCardBody, CRow, CCol,} from '@coreui/react'
import Select from 'react-select'
import { FaPencilAlt } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import moment from 'moment'
import endpoints from 'helpers/endpoints'
import CustomTable from 'shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import './StockHolding.css'
const columns = [
  { accessor: 'site', Header: 'Site', sortable: true },
  { accessor: 'client', Header: 'Client', sortable: true },
  { accessor: 'product', Header: 'Product', sortable: true, width: 90 },
  { accessor: 'product_name', Header: 'Description', sortable: true  },
  { accessor: 'disposition', Header: 'Disposition', sortable: true },
  { accessor: 'packdesc_1', Header: 'UOM', sortable: true },
  { accessor: 'status', Header: ' Status ', sortable: true },
  { accessor: 'on_hand_qty', Header: 'Stock on Hand', sortable: true,  width: 140 },
  { accessor: 'expected_in_qty', Header: 'Expected In Qty', sortable: true,  width: 145  },
  { accessor: 'expected_in_wgt', Header: 'Expected In Weight', sortable: true,  width: 170 },
  { accessor: 'expected_out_qty', Header: 'Expected Out Qty', sortable: true, width: 155  },
  { accessor: 'prince', Header: ' Price ', sortable: true,},
  { accessor: 'pallets', Header: 'Pallets', sortable: true,},
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
    pagination: {},
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
  searchStockHolding  = async () => {
    let { search, site, client, status, pagination } = this.state
    let urls = []
    urls.push('searchParam=' + search ? search : '')
    urls.push('site=' + (site ? site.value : 'all'))
    urls.push('client=' + (client ? client.value : 'all'))
    urls.push('status=' + (status ? status.value : 'all'))
    urls.push('page=' + (pagination.active || 1))
    console.log('load sales order', urls.join('&'))
    const { data } = await axios.get(`${endpoints.stockHoldingSummary}?${urls.join('&')}`)
    if (data?.data?.data) {
      const modifiedData = data.data.data;
          modifiedData.map((item, idx) => {
            if((item["on_hand_qty"] + item["expected_in_qty"]) >= item["expected_out_qty"]){
              item['status'] = [<a className="status-ok">Ok</a> ]
            }else{
              item['status'] =  [<a className="status-shortage">Shortage</a> ]
            }
          } )
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
    const url = '/stock-holding' + item.product + '/' + item.client + '/' + item.site
    this.props.history.push(url)
  }

  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }
  
  render() {
    const {
      dimension, fields, data, pagination, site, client, status, siteData, clientData, statusData, 
    } = this.state
    return <div className="table-summary">
      <HeaderTitle
        breadcrumb={[{ to: '', label: 'Stock Holding', active: true }]}
        button={<CButton onClick={this.toggle} className="c-subheader-nav-link btn btn-primary text-white float-right d-none">
          <FaPencilAlt />
          </CButton>}
      />

      <CCard>
        <CCardBody className="px-4 py-2">
          <CRow className="row">
            <CCol lg={3} className="px-1">
              <div className="input-group ">
                <div className="input-group-prepend">
                  <span className="input-group-text border-right-0 bg-white"><i className="iconU-search"></i></span>
                </div>
                <input type="text" className="form-control border-left-0 input-height " placeholder="Enter an Order No" onChange={e => this.setState({ search: e.target.value })} />
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
                </CCol>
                <CCol sm={4} lg={2} className="px-1">
                </CCol>
                <CCol sm={4} lg={2} className="px-1">
                  <button className="btn btn-block btn-primary" onClick={this.searchStockHolding}>SEARCH</button>
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
          this.setState({ pagination: { ...pagination, active } }, () => this.searchStockHolding ())
        }}
        export={<button className="btn btn-primary float-right px-4 btn-export"> EXPORT</button>}
      />
    </div>
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(StockHolding);
