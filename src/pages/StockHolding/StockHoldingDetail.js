import React from 'react';
import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral'
import {connect} from 'react-redux'
import { CCard, CCardBody, CRow, CCol, CButton } from '@coreui/react';
import {
  Card,
  CardBody,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from 'reactstrap';
import CustomTable from 'shared/table/CustomTableDetail';
import { tab1, tab1Inactive, tab2, tab2Inactive } from './Helper';
import HeaderTitle from 'shared/container/TheHeader';
import './StockHolding.scss';

class SalesOrderDetail extends React.Component {
  // ref to get element height and calculate table height
  section1 = React.createRef();
  state = {
    dimension: { width: 0, height: 0 },
    stockDetail: [
      { accessor: 'batch', placeholder: 'Batch', Header: 'Batch', sortable: true, width: 200, className:'text-left' },
      { accessor: 'rotadate', placeholder: 'Rotadate', Header: 'Rotadate', sortable: true, width: 100 },
      { accessor: 'ref3', placeholder: 'Ref3', Header: 'Ref3', sortable: true, width: 100 },
      { accessor: 'ref4', placeholder: 'Ref4', Header: 'Ref4', sortable: true, width: 100 },
      { accessor: 'qty', placeholder: 'Qty', Header: 'Qty', sortable: true, width: 60 },
      { accessor: 'weight', placeholder: 'Weight', Header: 'Weight', sortable: true, width: 80 },
      { accessor: 'pallet', placeholder: 'Pallet', Header: 'Pallet', sortable: true, width: 70 },
      { accessor: 'price', placeholder: 'Prince', Header: 'Price', sortable: true, width: 70 },
      { accessor: 'pack_id', placeholder: 'Pack ID', Header: 'Pack ID', sortable: true, width: 170, className:'text-left' },
      { accessor: 'disposition', placeholder: 'Disposition', Header: 'Disposition', sortable: true, width: 100, className:'text-left' },
    ],
    ForesCast: [
      {
        accessor: 'type',
        placeholder: 'Type',
        Header: 'Type',
        sortable: true,
        width: this.props.store.total_length + 400,
        Cell: row => {
          return (
            <div>
              <span className="class-for-name">{row.original.openingbalancetext}</span>
              {/* <span className="class-for-name">{row.original.type}</span> */}
              <span className="class-for-name overflow-visible z-index-20">{row.original.newstockexpirydate}</span>
              <span className="class-for-name">{row.original.closingbalancetext}</span>
            </div>
          )
        }
      },
      {
        accessor: 'company',
        placeholder: 'Customer No',
        Header: 'Customer No',
        sortable: true,
        width: 140,
      },
      { accessor: 'orderno', placeholder: 'Order No', Header: 'Order No', sortable: true, width: 170 },
      {
        accessor: 'effectivedate',
        placeholder: 'Order Date',
        Header: 'Order Date',
        sortable: true,
        width: 150,
        Cell: row => {
          return (
            <div>
              <span className="class-for-name alg-right">{row.original.effectivedate}</span>
            </div>
          )
        }
      },
      {
        accessor: 'qtyexpected',
        placeholder: 'Expected In',
        Header: 'Expected In',
        sortable: true,
        width: 150,
        Cell: row => {
          return (
            <div>
              <span className="class-for-name alg-right">{row.original.qtyexpected ? numeral(row.original.qtyexpected).format('0,0') : row.original.qtyexpected}</span>
              <span className="class-for-name alg-right">{row.original.qty ? 0 : null}</span>
            </div>
          )
        }
      },
      {
        accessor: 'qtycommitted',
        placeholder: 'Expected Out',
        Header: 'Expected Out',
        sortable: true,
        width: 150,
        Cell: row => {
          return (
            <div>
              <span className="class-for-name alg-right">{row.original.qtycommitted ? numeral(row.original.qtycommitted).format('0,0') : row.original.qtycommitted}</span>
              <span className="class-for-name alg-right">{row.original.qty ? numeral(row.original.qty).format('0,0') : row.original.qty}</span>
            </div>
          )
        }
      },
      {
        accessor: 'closingbalance',
        placeholder: 'Balance',
        Header: 'Balance',
        sortable: true,
        width: 140,
        Cell: row => {
          return (
            <div>
              <span className="class-for-name alg-right">{row.original.startbalance ? numeral(row.original.startbalance).format('0,0') : row.original.startbalance}</span>
              <span className="class-for-name alg-right">{row.original.closingbalance ? numeral(row.original.closingbalance).format('0,0') : row.original.closingbalance}</span>
              <span className="class-for-name alg-right">{row.original.closingstock ? numeral(row.original.closingstock).format('0,0') : row.original.closingstock}</span>
              <span className="class-for-name alg-right">{row.original.totalbalance ? numeral(row.original.totalbalance).format('0,0') : row.original.totalbalance}</span>
            </div>
          )
        }
      },
    ],
    detail: {},
    products: [],
    forecast: [],
    datahead: [],
    activeTab: '1',
    tableStatus: 'waiting', //stock details
    tableStatusForecast: 'waiting' //stock forecast
  };
  componentDidMount() {
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);
    this.getDetail();
    this.getStockDetails();
    this.getForescast();
  }
  activeTabIndex = (tabIndex) => {
    if (this.state.activeTab !== tabIndex) {
      this.setState({ activeTab: tabIndex });
    }
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }

  updateDimension = () => {
    const height =
      window.innerHeight - this.section1.current.clientHeight - 225;
    this.setState({ dimension: { width: window.innerWidth, height } });
  };

  getDetail = async () => {
    const { product, client, site } = this.props.match.params;
    const url = `/stockdetail/header/${product}?client=${client}&site=${site}`;
    // const { data } = await axios.get(url)
    axios
      .get(url)
      .then((res) => {
        const result = res.data.data;
        this.setState({ datahead: result });
        this.potableref.current.setPagination(res);
      })
      .catch((error) => { });
  };
  getStockDetails = async () => {
    this.setState({
      data: [],
      tableStatus: 'waiting'
    })

    const { product, client, site, expected_out_qty } = this.props.match.params;
    const url = `/stockdetail/${product}?client=${client}&site=${site}`;
    const { data } = await axios.get(url);
    // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|[''([{])+\S/g, match => match.toUpperCase());
    if (data.data.length) {
      this.setState({ products: data.data });
    } else {
      this.setState({
        tableStatus: 'noData'
      })
    }
  };
  getForescast = async () => {
    this.setState({
      data: [],
      tableStatusForecast: 'waiting'
    })

    const { product, client, site } = this.props.match.params;
    const url = `/stockbal?client=${client}&product=${product}&site=${site}`;
    const { data } = await axios.get(url);
    const available = data[0][0]['available orders']
    if (data[0][0]['stock expiry'].length === 0) {
      this.setState({
        tableStatusForecast: 'noData'
      })
      return
    }
    let expiry = data[0][0]['stock expiry']
    let expdt = expiry[expiry.length - 1].stockexpirydate
    const openingbal = [{ openingbalancetext: `Opening Balance as on ${moment().format('DD/MM/YYYY')}`, startbalance: data[0][0]['opening balance'] }]
    let closingbal = [{ closingbalancetext: `Closing Balance as on ${expdt}`, totalbalance: data[0][0]['closing balance'] }]
    let txt = []

    expiry.map(expiry => {
      expiry['qty'] = expiry['quantity']
      closingbal[0].totalbalance = parseInt(closingbal[0].totalbalance) - parseInt(expiry.qty)
      expiry['newstockexpirydate'] = `Batch ( ${expiry['batchnum']} ) Stock Expires on ${expiry['stockexpirydate']}`
      expiry['closingstock'] = closingbal[0].totalbalance
      txt.push(expiry.newstockexpirydate?.length)
      
      return expiry
    
    })
    let largest= 0;

    for (let i=0; i<=largest;i++){
        if (txt[i]>largest) {
            largest=txt[i];
        }
    }

    this.props.dispatch({ type: 'TOTAL_LENGTH', data: largest })
    console.log(this.props.store.total_length)
    console.log(largest)
    let concat = openingbal.concat(available)
    concat = concat.concat(expiry)
    concat = concat.concat(closingbal)
    console.log(concat)
    if (data) {
      this.setState({ forecast: concat });
    } else {
      this.setState({
        tableStatusForecast: 'noData'
      })
    }
  };
  formatDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '-';
  };
  render() {
    // const { match, history } = this.props
    const {
      detail,
      products,
      stockDetail,
      activeTab,
      ForesCast,
      forecast,
      tableStatus,
      tableStatusForecast
    } = this.state;
    let site = this.state.datahead.length ? this.state.datahead[0].site : null;
    let client = this.state.datahead.length
      ? this.state.datahead[0].client
      : null;
    let product = this.state.datahead.length
      ? this.state.datahead[0].product
      : null;
    let description = this.state.datahead.length
      ? this.state.datahead[0].description
      : null;
    let uom = this.state.datahead.length ? this.state.datahead[0].uom : null;
    let stock_on_hand = this.state.datahead.length
      ? numeral(this.state.datahead[0].stock_on_hand).format('0,0')
      : null;
    let available_qty = this.state.datahead.length
      ? numeral(this.state.datahead[0].available_qty).format('0,0')
      : null;
    let expected_in_qty = this.state.datahead.length
      ? numeral(this.state.datahead[0].expected_in_qty).format('0,0')
      : null;
    let expected_out_qty = this.state.datahead.length
      ? numeral(this.state.datahead[0].expected_out_qty).format('0,0')
      : null;
    let rotadate_type = this.state.datahead.length
      ? this.state.datahead[0].rotadate_type
      : null;
    return (
      <div className='stock-holding-detail'>
        <HeaderTitle
          breadcrumb={[
            { to: '/stock-holding', label: 'Stock Holding' },
            { to: '', label: this.props.match.params.product, active: true },
          ]}
        />

        <div ref={this.section1} className='card-group section-1 mb-3'>
          <CCard>
            <CCardBody className="p-0 m-3 border-right">
              <CRow className="mx-0"><CCol lg={2} className="text-light-gray pl-0 mr-3 my-1">Site</CCol> <CCol>{site || '-'}</CCol></CRow>
              <CRow className="mx-0"><CCol lg={2} className="text-light-gray pl-0 mr-3 my-1">Client</CCol> <CCol>{client || '-'}</CCol></CRow>
              <CRow className="mx-0"><CCol lg={2} className="text-light-gray pl-0 mr-3 my-1">Product</CCol> <CCol>{product || '-'}</CCol></CRow>
              <CRow className="mx-0"><CCol lg={2} className="text-light-gray pl-0 mr-3 my-1">Description</CCol> <CCol>{description || '-'}</CCol></CRow>
              <CRow className="mx-0"><CCol lg={2} className="text-light-gray pl-0 mr-3 my-1">UOM</CCol> <CCol>{uom || '-'}</CCol></CRow>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody className="p-0 my-3 mx-0">
              <CRow className="mx-0"><CCol lg={3} className="text-light-gray px-0 my-1">Stock On Hand</CCol> <CCol className="pl-0">{stock_on_hand || '-'}</CCol></CRow>
              <CRow className="mx-0"><CCol lg={3} className="text-light-gray px-0 my-1">Projected Available Qty</CCol> <CCol className="pl-0">{available_qty || '-'}</CCol></CRow>
              <CRow className="mx-0"><CCol lg={3} className="text-light-gray px-0 my-1">Expected In Qty</CCol> <CCol className="pl-0">{expected_in_qty || '-'}</CCol></CRow>
              <CRow className="mx-0"><CCol lg={3} className="text-light-gray px-0 my-1">Expected Out Qty</CCol> <CCol className="pl-0">{expected_out_qty || '-'}</CCol></CRow>
              <CRow className="mx-0"><CCol lg={3} className="text-light-gray px-0 my-1">Rotadate Type</CCol> <CCol className="pl-0">{rotadate_type || '-'}</CCol></CRow>
            </CCardBody>
          </CCard>
        </div>

        <CRow
          className='align-items-center mx-0'
          style={{ width: 'max-content' }}
        >
          <div className='stockDetails col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0'>
            <Nav tabs className='mx-0'>
              <div className='input-group'>
                <NavItem className={`p-0 ${activeTab === '2' ? 'bg-tabNonActive' : 'n'}`}>
                  <NavLink 
                   active={this.state.activeTab === '1'}
                   onClick={() => this.activeTabIndex('1')}
                   style={{marginLeft:'0px'}}
                  >
                  <div className={`row rowTabCustom align-items-center tabColumn mx-0 ${activeTab === '1' ? ' tab-custom' : 'tab-nonActive'}`}>
                      <span className='number-number-1 tabTitleText' />
                      {activeTab === '1'} Stock
                        Details
                    </div> 
                  </NavLink>
                </NavItem>

                {parseInt(expected_in_qty) === 0 && parseInt(expected_out_qty) === 0 && (parseInt(stock_on_hand) + parseInt(expected_in_qty) >= expected_out_qty) ? '' :
                  <NavItem className={`p-0 ml-2 ${activeTab === '1' ? 'bg-tabNonActive' : 'sss'}`}>
                    <NavLink 
                    active={this.state.activeTab === '2'}
                    onClick={() => this.activeTabIndex('2')}
                    >
                    <div className={`row rowTabCustom align-items-center tabColumn mx-0 ${activeTab === '2' ? ' tab-custom' : 'tab-nonActive'}`}>
                        <span className='number-number-2 tabTitleText' />
                        {activeTab === '2'} Stock
                          Balance Forecast
                      </div> 
                    </NavLink>
                  </NavItem>}
              </div>
            </Nav>
          </div>
        </CRow>

        <Row className='mx-0'>
          <div className='col-12 col-lg-12 col-md-12 col-sm-12 mt-0 px-0 '>
            <TabContent className='border-0' activeTab={this.state.activeTab}>
              <TabPane className='p-0 stockDetails' tabId='1' style={{background: "#e9eced"}}>
                <CustomTable
                  title='Stock Detail'
                  filename='Microlistics_StockDetail.'
                  font="12"
                  editColumn='false'
                  height={this.state.dimension.height}
                  fields={stockDetail}
                  data={products}
                  tableStatus={tableStatus}
                  export={
                    <button className='btn btn-primary float-right btn-export'>
                      {/* <div className='export-export pr-3' /> */}
                      EXPORT
                    </button>
                  }
                  exportData={products}
                />
              </TabPane>
              <TabPane className='stockDetails' tabId='2' style={{background: "#e9eced"}}>
                <CustomTable
                  title='Stock ForesCast'
                  filename='Microlistics_ForesCast.'
                  font="12"
                  editColumn='false'
                  height={this.state.dimension.height}
                  fields={ForesCast}
                  data={forecast}
                  tableStatus={tableStatusForecast}
                  exportData={forecast}
                  export={
                    <button className='btn btn-primary float-right btn-export'>
                      {/* <div className='export-export pr-3' /> */}
                      EXPORT
                    </button>
                  }
                />
              </TabPane>
            </TabContent>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({ store })
const mapDispatchToProps = (dispatch) => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProps)(SalesOrderDetail);
