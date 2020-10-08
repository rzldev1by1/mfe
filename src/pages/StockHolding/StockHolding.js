import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import numeral from 'numeral'
import { CButton, CCard, CCardBody, CRow, CCol } from '@coreui/react'
import Select from 'react-select'
import { FaPencilAlt } from 'react-icons/fa'
import endpoints from 'helpers/endpoints'
import CustomTable from '../../shared/table/CustomTable'
import HeaderTitle from 'shared/container/TheHeader'
import './StockHolding.scss'
const columns = [
  { 
    accessor: 'site', 
    Header: 'Site', 
    placeholder: 'Site',
    width: 70, 
    sortable: true,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: 'client', 
    Header: 'Client', 
    placeholder: 'Client', 
    width: 130, 
    sortable: true ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  {
    accessor: 'product',
    Header: 'Product',
    placeholder: 'Product',
    sortable: true,
    width: null,
    style: { textAlign: 'left' },
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  {
    accessor: 'product_name',
    Header: 'Description',
    placeholder: 'Description',
    width: null,
    sortable: true,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
  { 
    accessor: 'packdesc_1', 
    Header: 'UOM', 
    placeholder: 'UOM', 
    width: 80, 
    sortable: true ,
    Cell: props => <span>{props.value ? props.value : '-'}</span>  
  },
{
  accessor: 'status', placeholder: 'Status', Header: 'Status', width: 140,
  Cell: row => {
    switch (row.original.status) {
      case 'OK':
        return <a id='SHORTAGE' className='status-ok'>OK</a>
        break;
      case 'SHORTAGE':
        return <a id='SHORTAGE' className='status-shortage'>SHORTAGE</a>
        break;
      default:
        break;
    }
  }
},
  {
    accessor: 'on_hand_qty',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    Header: 'Stock on Hand',
    placeholder: 'Stock on Hand',
    sortable: false,
    sortType: "float",
    width: 140,
    style: {flexDirection: 'row-reverse'}
  },
  {
    accessor: 'on_hand_wgy',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    Header: 'On Hand Wght',
    placeholder: 'On Hand Wght',
    sortable: false,
    sortType: "float",
    width: 130,
    style: {flexDirection: 'row-reverse'}
  },
  {
    accessor: 'expected_in_qty',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    Header: 'Expected In Qty',
    placeholder: 'Expected In Qty',
    sortable: false,
    sortType: "float",
    width: 130,
    style: {flexDirection: 'row-reverse'}
  },
  {
    accessor: 'expected_in_wgt',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    Header: 'Expected In Wght',
    placeholder: 'Expected In Wght',
    sortable: false,
    sortType: "float",
    width: 150,
    style: {flexDirection: 'row-reverse'}
  },
  {
    accessor: 'expected_out_qty',
    Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),
    Header: 'Expected Out Qty',
    placeholder: 'Expected Out Qty',
    sortable: false,
    sortType: "float",
    width: 140,
    style: {flexDirection: 'row-reverse'}
  },
  { accessor: 'price', Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>),Header: ' Price ', placeholder: 'Price', width: 70, sortable: false,
  sortType: "float",
    style: {flexDirection: 'row-reverse'} },
  { accessor: 'pallets',Cell: row => (<div className="alg-right">{row.value ? row.value : '-'}</div>), Header: 'Pallets', placeholder: 'Pallets', width: 70, sortable: false,
  sortType: "float",
  style: {flexDirection: 'row-reverse'} },
];

const customColumns = [
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
    width: 250,
    sortable: true,
  },
  { accessor: 'disposition', Header: 'Disposition', placeholder: 'Disposition', width: null, sortable: true },
  { accessor: 'packdesc_1', Header: 'UOM', placeholder: 'UOM', width: null, sortable: true },
  { accessor: 'statusTxt', Header: ' Status ', placeholder: 'Status', width: 200, sortable: true },
  {
    accessor: 'on_hand_qty',
    Header: 'Stock on Hand',
    placeholder: 'Stock on Hand',
    sortable: false,
    sortType: "float",
    width: null,
  },
  {
    accessor: 'on_hand_wgy',
    Header: 'On Hand WGT',
    placeholder: 'On Hand WGT',
    sortable: false,
    sortType: "float",
    width: 140,
  },
  {
    accessor: 'expected_in_qty',
    Header: 'Expected In Qty',
    placeholder: 'Expected In Qty',
    sortable: false,
    sortType: "float",
    width: 140,
  },
  {
    accessor: 'expected_in_wgt',
    Header: 'Expected In Weight',
    placeholder: 'Expected In Wght',
    sortable: false,
    sortType: "float",
    width: 140,
  },
  {
    accessor: 'expected_out_qty',
    Header: 'Expected Out Qty',
    placeholder: 'Expected Out Qty',
    sortable: false,
    sortType: "float",
    width: null,
  },
  { accessor: 'price', Header: ' Price ', placeholder: 'Price', width: 100, sortable: false,
  sortType: null },
  { accessor: 'pallets', Header: 'Pallets', placeholder: 'Pallets', width: 100, sortable: false,
  sortType: null },
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
    customFields: customColumns,
    data: [],
    loginInfo: {},
    create: false,
    pagination: {},
    detail: {},
    dimension: { width: 0, height: 0 },
    products: [],
    columnsPayload: [],
    exportData: [],
    tableStatus: 'waiting', //table status waiting or noData
    sort: "up"
  };
  componentDidMount = () => {
    // set automatic table height
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);

    this.getSite()
    this.getClient()
    this.getStatus()
    this.searchStockHolding('false','true')
    // this.loadPersonalLogin();
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
    const status = { value: 'all', label: 'All Status' }
    const statusData = [
      status,
      { value: 'Ok', label: 'Ok' },
      { value: 'Shortage', label: 'Shortage' },
    ];
    this.setState({ statusData })
  }

  // url Get Header And Post
//   loadPersonalLogin = () => {
//     let userInfo = this.props.store;     
//     this.setState({ loginInfo: userInfo.user });
// }

  UrlHeader = () => {
    // let loginInfo = this.state.loginInfo
    return `${endpoints.getStockHoldingHearder}?client=ALL`
  }
  UrlAll = () => {
    return '/putStockholdingColumn?client=ALL'
  }
  // end url Get Header And Post

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

  searchStockHolding = async (export_='false',readyDocument='false') => {
    //export : true/false --> param for identify this function called from export button
    //readyDocument : true/false --> if true, then avoid bug "repeatly set state from ComponentDidMount"

    let { search, site, client, status, pagination, tableStatus } = this.state

    //reset table
    if(readyDocument == 'false' && export_ == 'false'){
      this.setState({
        data: [],
        tableStatus: 'waiting'
      })
    } 
    
    let urls = []
    urls.push('searchParam=' + (search ? search : ''))
    urls.push('site=' + (site.value ? site.value : 'all'))
    urls.push('client=' + (client.value ? client.value : 'all'))
    urls.push('status=' + (status ? status.value : 'all'))
    urls.push('page=' + (pagination.active || 1))
    if(export_=='true'){urls.push('export=true')}
    const { data } = await axios.get(`${endpoints.stockHoldingSummary}?${urls.join('&')}`)
    if (data?.data?.data) {
      const modifiedData = data.data.data;
      console.log(modifiedData)
      modifiedData.map((item, idx) => {
        let statusOk = []
        let statusShortage = []
        if (parseInt(item['on_hand_qty'] + item['expected_in_qty'])  >= item['expected_out_qty']) {
          item['status'] = 'OK';
          item['statusTxt'] = 'OK';
        }if (parseInt(item['on_hand_qty'] + item['expected_in_qty'])  <= item['expected_out_qty']) {
          item['status'] =  'SHORTAGE';
          item['statusTxt'] = 'SHORTAGE';
        }
        item.product = String(item.product)
        item['expected_in_qty'] = numeral(item['expected_in_qty']).format('0,0')
        item['expected_out_qty'] = numeral(item['expected_out_qty']).format('0,0')
        item['on_hand_qty'] = numeral(item['on_hand_qty']).format('0,0')
        item['pallets'] = numeral(item['pallets']).format('0,0')
        item['expected_in_wgt'] = numeral(item['expected_in_wgt']).format('0,0.000')
        item['weight_processed'] = numeral(item['weight_processed']).format('0,0.000')
      })

      
      
      if(export_=='true'){
        this.setState({ 
          exportData: modifiedData
        })
      }else{
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

      if(modifiedData.length < 1){
        this.setState({   tableStatus: 'noData'  })
      }

    } else {
      if(export_!=='true'){this.setState({ data: [] })} 
      this.setState({   tableStatus: 'noData'  })
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

  onSubmitSearch = (e) => {
    e.preventDefault();
    this.searchStockHolding();
  }

  sortInt = (value, column, sort) => {
    let data = value;

    if(sort == "down"){
        data.sort((a, b) => { 
            if (a[column] !== undefined && b[column] !== undefined) {
                if(a[column] === null){
                    return -1;
                }else if(b[column] === null){
                    return 1;
                }
                return Number(b[column].replace(/,/g, "")) - Number(a[column].replace(/,/g, "")) 
            }
        });
        this.setState({ sort: "up" })
    }else if(sort == "up"){
        data.sort((a, b) => { 
            if (a[column] !== undefined && b[column] !== undefined) {
                if(a[column] === null){
                    return 1;
                }else if(b[column] === null){
                    return -1;
                }
                return Number(a[column].replace(/,/g, "")) - Number(b[column].replace(/,/g, "")) 
            }
        });
        this.setState({ sort: "down" })
    }

    this.setState({ data: data })

  }

  sortFloat = (value, column, sort) => {
    let data = value;
    let floatData = [];

    if(sort == "down"){
        data.sort((a, b) => { 
            if (a[column] !== undefined && b[column] !== undefined) {
                if(a[column] === null){
                    return -1;
                }else if(b[column] === null){
                    return 1;
                }
                return Number.parseFloat(b[column].replace(/,/g, "")) - Number.parseFloat(a[column].replace(/,/g, "")) 
            }
        });
        this.setState({ sort: "up" })
    }else if(sort == "up"){
        data.sort((a, b) => { 
            if (a[column] !== undefined && b[column] !== undefined) {
                if(a[column] === null){
                    return 1;
                }else if(b[column] === null){
                    return -1;
                }
                return Number.parseFloat(a[column].replace(/,/g, "")) - Number.parseFloat(b[column].replace(/,/g, "")) 
            }
        });
        this.setState({ sort: "down" })
    }

    this.setState({ data: data })

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
      exportData,
      urlHeader,
      customFields,
      tableStatus
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
            <form onSubmit={this.onSubmitSearch}>
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
                    filterOption={ (option, inputVal) => {return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toLowerCase()}} 
                    onChange={(e) =>  this.setState({ search: e.target.value.toUpperCase() })}
                  />
                </div>
              </CCol>
              <CCol lg={9} className='pr-0'>
                <CRow>
                  <CCol sm={4} lg={2} className='px-0'>
                    {
                      this.props.store.user.site ?
                        <input value={this.siteCheck(site.value)} className="form-control sh-input" readOnly />
                        :
                        <Select
                          isClearable
                          name='site'
                          placeholder='Site'
                          // value={site}
                          options={siteData}
                          onChange={(val) => this.setState({ site: val }, () => { })} 
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
                  <CCol sm={4} lg={2} className='px-3'>
                    {
                      this.props.store.user.client ?
                        <input value={this.clientCheck(client.value)} className="form-control sh-input" readOnly />
                        :
                        <Select
                          isClearable
                          name='client'
                          placeholder='Client'
                          // value={client}
                          options={clientData}
                          onChange={(val) => this.setState({ client: val })} 
                          styles={{
                              option: (provided, state) => ({
                                ...provided,
                                textAlign: 'left'
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                                display: !client || !client.value ? "flex" : "none"
                              })
                          }}
                        />
                    }
                  </CCol>
                  <CCol sm={4} lg={2} className='px-0'>
                    <Select
                      isClearable
                      name='status'
                      placeholder='Status'
                      value={status}
                      options={statusData}
                      onChange={(val) => this.setState({ status: val })} 
                      styles={{
                          option: (provided, state) => ({
                            ...provided,
                            textAlign: 'left'
                          }),
                          dropdownIndicator: (base, state) => ({
                            ...base,
                            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                            display: !status || !status.value ? "flex" : "none"
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
            </form>
          </CCardBody>
        </CCard>

        <CustomTable
          title='Stock Holding Summary'   
          filename='Microlistics_StockHolding.'
          height={dimension.height}
          data={data}
          font="7"
          sortFloat={(column) => this.sortFloat(this.state.data, column, this.state.sort)}
          fields={this.state.fields}
          customFields={customFields} 
          pagination={pagination}
          onClick={this.showDetails}
          renameSubmit={this.renameSubmit}
          UrlHeader={this.UrlHeader}
          UrlAll={this.UrlAll}
          tableStatus={tableStatus}
          exportApi={async () =>  {await this.searchStockHolding('true')}}
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
          exportData={exportData}
        />
      </div>
    );
  }
}
const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(StockHolding);
