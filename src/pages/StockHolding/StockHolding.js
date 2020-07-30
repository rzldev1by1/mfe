import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import Select from 'react-select'
import { FaPencilAlt } from 'react-icons/fa'
import endpoints from 'helpers/endpoints'
import CustomTable from '../../shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import './StockHolding.scss'
const columns = [
  { accessor: 'site', Header: 'Site', placeholder: 'Site', width: null, sortable: true },
  { accessor: 'client', Header: 'Client', placeholder: 'Client', width: null, sortable: true },
  {
    accessor: 'product',
    Header: 'Product',
    placeholder: 'Product',
    sortable: true,
    width: 80,
    style: { textAlign: 'left' },
  },
  {
    accessor: 'product_name',
    Header: 'Description',
    placeholder: 'Description',
    width: null,
    sortable: true,
  },
  { accessor: 'disposition', Header: 'Disposition', placeholder: 'Disposition', width: null, sortable: true },
  { accessor: 'packdesc_1', Header: 'UOM', placeholder: 'UOM', width: null, sortable: true },
  { accessor: 'status', Header: ' Status ', placeholder: 'Status', width: null, sortable: true },
  {
    accessor: 'on_hand_qty',
    Header: 'Stock on Hand',
    placeholder: 'Stock on Hand',
    sortable: true,
    width: null,
  },
  {
    accessor: 'on_hand_wgy',
    Header: 'On Hand WGT',
    placeholder: 'On Hand WGT',
    sortable: true,
    width: null,
  },
  {
    accessor: 'expected_in_qty',
    Header: 'Expected In Qty',
    placeholder: 'Expected In Qty',
    sortable: true,
    width: null,
  },
  {
    accessor: 'expected_in_wgt',
    Header: 'Expected In Weight',
    placeholder: 'Expected In Weight',
    sortable: true,
    width: null,
  },
  {
    accessor: 'expected_out_qty',
    Header: 'Expected Out Qty',
    placeholder: 'Expected Out Qty',
    sortable: true,
    width: null,
  },
  { accessor: 'price', Header: ' Price ', placeholder: 'Price', width: null, sortable: true },
  { accessor: 'pallets', Header: 'Pallets', placeholder: 'Pallets', width: null, sortable: true },
];
class StockHolding extends React.PureComponent {
  state = {
    search: '',
    site: {
      value: this.props.store.user.site ? this.props.store.user.site : null,
    },
    client: {
      value: this.props.store.user.client ? this.props.store.user.client : null,
    },
    status: null,
    orderType: null,
    task: null,
    resources: [],
    fields: columns,
    data: [],
    create: false,
    pagination: {},
    detail: {},
    dimension: { width: 0, height: 0 },
    products: [],
    columnsPayload: [],
  };
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
    const height = window.innerHeight - 257;
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
      { value: 'Ok', label: 'Ok' },
      { value: 'Shortage', label: 'Shortage' },
    ];
    this.setState({ statusData })
  }

  // url Get Header And Post

  UrlHeader = () => {
    return `${endpoints.getStockHoldingHearder}?client=ANTEC`
  }
  UrlAntec = () => {
    return '/putStockholdingColumn?client=ANTEC'
  }
  UrlBega = () => {
    return '/putStockholdingColumn?client=BEGA'
  }
  UrlAesop = () => {
    return '/putStockholdingColumn?client=AESOP'
  }
  UrlClucth = () => {
    return '/putStockholdingColumn?client=CLUCTH'
  }
  UrlExquira = () => {
    return '/putStockholdingColumn?client=EXQUIRA'
  }
  UrlLedvance = () => {
    return '/putStockholdingColumn?client=LEDVANCE'
  }
  UrlOnestop = () => {
    return '/putStockholdingColumn?client=ONESTOP'
  }
  UrlStartrack = () => {
    return '/putStockholdingColumn?client=STARTRACK'
  }
  UrlTatura = () => {
    return '/putStockholdingColumn?client=TATURA'
  }
  UrlTtl = () => {
    return '/putStockholdingColumn?client=TTL'
  }
  UrlTtchem = () => {
    return '/putStockholdingColumn?client=TTCHEM'
  }

  // end url Get Header And Post

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

  searchStockHolding = async () => {
    let { search, site, client, status, pagination } = this.state
    
    let urls = []
    urls.push('searchParam=' + (search ? search : ''))
    urls.push('site=' + (site.value ? site.value : 'all'))
    urls.push('client=' + (client.value ? client.value : 'all'))
    urls.push('status=' + (status ? status.value : 'all'))
    urls.push('page=' + (pagination.active || 1))
    const { data } = await axios.get(`${endpoints.stockHoldingSummary}?${urls.join('&')}`)
    if (data?.data?.data) {
      const modifiedData = data.data.data;
      modifiedData.map((item, idx) => {
        if (parseInt(item['on_hand_qty'] + item['expected_in_qty'])  >= item['expected_out_qty']) {
          item['status'] = [<a className='status-ok'>OK</a>];
        } else {
          item['status'] = [<a className='status-shortage'>SHORTAGE</a>];
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
    const url = '/stock-holding' + item.product + '/' + item.client + '/' + item.site
    this.props.history.push(url)
  }

  toggle = (value) => {
    this.setState({ create: value ? value : !this.state.create })
  }

  render() {
    const {
      dimension,
      fields,
      data,
      pagination,
      site,
      client,
      status,
      siteData,
      clientData,
      statusData,
      urlHeader
    } = this.state
    return (
      <div className='stockHolding table-summary'>
        <HeaderTitle
          breadcrumb={[{ to: '', label: 'Stock Holding', active: true }]}
          button={
            <CButton
              onClick={this.toggle}
              className='c-subheader-nav-link btn btn-primary text-white float-right d-none'
            >
              <FaPencilAlt />
            </CButton>
          }
        />

        <CCard className='mb-3'>
          <CCardBody className='p-3'>
            <CRow>
              <CCol lg={3} className='px-0'>
                <div className='input-group '>
                  <div className='input-group-prepend'>
                    <span className='input-group-text border-right-0 bg-white'>
                      <i className='iconU-search'></i>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control border-left-0 input-height '
                    placeholder='Enter a Product'
                    onChange={(e) => this.setState({ search: e.target.value })}
                  />
                </div>
              </CCol>
              <CCol lg={9} className='pr-0'>
                <CRow>
                  <CCol sm={4} lg={2} className='px-0'>
                    {
                      this.props.store.user.site ?
                        <input value={this.siteCheck(site.value)} className="form-control" readOnly />
                        :
                        <Select
                          name='site'
                          placeholder='Site'
                          // value={site}
                          options={siteData}
                          onChange={(val) => this.setState({ site: val }, () => { })}
                          styles={{
                            dropdownIndicator: (base, state) => ({
                              ...base,
                              transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                            })
                          }}
                        />
                    }
                  </CCol>
                  <CCol sm={4} lg={2} className='px-3'>
                    {
                      this.props.store.user.client ?
                        <input value={this.clientCheck(client.value)} className="form-control" readOnly />
                        :
                        <Select
                          name='client'
                          placeholder='Client'
                          // value={client}
                          options={clientData}
                          onChange={(val) => this.setState({ client: val })}
                          styles={{
                            dropdownIndicator: (base, state) => ({
                              ...base,
                              transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                            })
                          }}
                        />
                    }
                  </CCol>
                  <CCol sm={4} lg={2} className='px-0'>
                    <Select
                      name='status'
                      placeholder='Status'
                      value={status}
                      options={statusData}
                      onChange={(val) => this.setState({ status: val })}
                      styles={{
                        dropdownIndicator: (base, state) => ({
                          ...base,
                          transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                        })
                      }}
                    />
                  </CCol>
                  <CCol sm={4} lg={2} className='px-0'></CCol>
                  <CCol sm={4} lg={2} className='px-0'></CCol>
                  <CCol sm={4} lg={2} className='px-0'>
                    <button
                      className='btn btn-primary float-right stockHolding'
                      onClick={this.searchStockHolding}
                    >
                      SEARCH
                    </button>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <CustomTable
          title='Stock Holding'   
          filename='Microlistics_StockHolding.'
          height={dimension.height}
          data={data}
          font="10"
          fields={fields}
          pagination={pagination}
          onClick={this.showDetails}
          renameSubmit={this.renameSubmit}
          UrlHeader={this.UrlHeader} UrlAntec={this.UrlAntec} UrlBega={this.UrlBega}
          UrlAesop={this.UrlAesop} UrlClucth={this.UrlClucth} UrlExquira={this.UrlExquira}
          UrlLedvance={this.UrlLedvance} UrlOnestop={this.UrlOnestop} UrlStartrack={this.UrlStartrack}
          UrlTatura={this.UrlTatura} UrlTtl={this.UrlTtl} UrlTtchem={this.UrlTtchem}
          goto={(active) => {
            this.setState({ pagination: { ...pagination, active } }, () =>
              this.searchStockHolding()
            )
          }}
          export={
            <button className='btn btn-primary float-right btn-export'>
              {/* <div className='export-export pr-3' /> */}
              EXPORT
            </button>
          }
        />
      </div>
    );
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(StockHolding);
