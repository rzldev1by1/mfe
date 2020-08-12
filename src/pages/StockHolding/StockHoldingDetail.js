import React from 'react';
import axios from 'axios';
import moment from 'moment';
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
import CustomTable from 'shared/table/CustomTable';
import { tab1, tab1Inactive, tab2, tab2Inactive } from './Helper';
import HeaderTitle from 'shared/container/TheHeader';
import './StockHolding.css';

class SalesOrderDetail extends React.Component {
  // ref to get element height and calculate table height
  section1 = React.createRef();
  state = {
    dimension: { width: 0, height: 0 },
    stockDetail: [
      { accessor: 'batch',       placeholder: 'Batch',     Header: 'Batch',    sortable: true, width: 200 },
      { accessor: 'rotadate',    placeholder: 'Rotadate',  Header: 'Rotadate', sortable: true, width: 100 },
      { accessor: 'ref3',        placeholder: 'Ref3',      Header: 'Ref3',     sortable: true, width: 100 },
      { accessor: 'ref4',        placeholder: 'Ref4',      Header: 'Ref4',     sortable: true, width: 100 },
      { accessor: 'qty',         placeholder: 'Qty',       Header: 'Qty',      sortable: true, width: 110 },
      { accessor: 'weight',      placeholder: 'Weight',    Header: 'Weight',   sortable: true, width: 115 },
      { accessor: 'pallet',      placeholder: 'Pallet',    Header: 'Pallet',   sortable: true, width: 120 },
      { accessor: 'price',       placeholder: 'Prince',    Header: 'Price',    sortable: true, width: 120 },
      { accessor: 'pack_id',     placeholder: 'Pack ID',   Header: 'Pack ID',  sortable: true, width: 180 },
    ],
    ForesCast: [
      { accessor: 'type',
        placeholder: 'Type', 
        Header: 'Type', 
        sortable: true, 
        width: 130, 
        Cell : row => {
          return(
            <div>
              <span className="class-for-name">{row.original.openingbalancetext}</span>
              <span className="class-for-name">{row.original.type}</span>
              <span className="class-for-name">{row.original.batchnum}</span>
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
        Cell : row => {
          return(
            <div>
              <span className="class-for-name">{row.original.effectivedate}</span>
              <span className="class-for-name">{row.original.stockexpirydate}</span>
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
        Cell : row => {
          return(
            <div>
              <span className="class-for-name">{row.original.qtyexpected}</span>
              <span className="class-for-name">{row.original.qty? 0 : null}</span>
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
        Cell : row => {
          return(
            <div>
              <span className="class-for-name">{row.original.qtycommitted}</span>
              <span className="class-for-name">{row.original.qty}</span>
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
        Cell : row => {
          return(
            <div>
              <span className="class-for-name">{row.original.startbalance}</span>
              <span className="class-for-name">{row.original.closingbalance}</span>
              <span className="class-for-name">{row.original.closingstock}</span>
              <span className="class-for-name">{row.original.totalbalance}</span>
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
  UrlHeader = () =>{
    return `/getPurchase?client=ANTEC`
  }
  UrlAll = () => {
    return '/putStockholdingColumn?client=ALL'
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
      .catch((error) => {});
  };
  getStockDetails = async () => { 
    this.setState({
      data: [],
      tableStatus: 'waiting'
    })

    const { product, client, site, expected_out_qty} = this.props.match.params;
    const url = `/stockdetail/${product}?client=${client}&site=${site}`;
    const { data } = await axios.get(url);
    // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|[''([{])+\S/g, match => match.toUpperCase());
    if (data.data.length) {
      this.setState({ products: data.data });
    }else{
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
    const openingbal  = [{openingbalancetext:'Opening Balance', startbalance:data[0][0]['opening balance']}]
    let closingbal  = [{closingbalancetext:'Closing Balance', totalbalance:data[0][0]['closing balance']}]
    const available   = data[0][0]['available orders']
    let expiry      = data[0][0]['stock expiry']
    expiry.map(expiry => {
      expiry['qty'] = expiry['quantity']
      closingbal[0].totalbalance = parseInt(closingbal[0].totalbalance)  - parseInt(expiry.qty)
      expiry['closingstock'] = closingbal[0].totalbalance
      return expiry
    })
    let concat = openingbal.concat(available)
    concat = concat.concat(expiry)
    concat = concat.concat(closingbal)
    console.log(concat)
    if (data) {
      this.setState({ forecast: concat});
    }else{
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
      ? this.state.datahead[0].stock_on_hand
      : null;
    let available_qty = this.state.datahead.length
      ? this.state.datahead[0].available_qty
      : null;
    let expected_in_qty = this.state.datahead.length
      ? this.state.datahead[0].expected_in_qty
      : null;
    let expected_out_qty = this.state.datahead.length
      ? this.state.datahead[0].expected_out_qty
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
            <CRow className="mx-0"><CCol  lg={2} className="text-light-gray pl-0 mr-3 my-1">Site</CCol> <CCol>{site || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={2} className="text-light-gray pl-0 mr-3 my-1">Client</CCol> <CCol>{client || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={2} className="text-light-gray pl-0 mr-3 my-1">Product</CCol> <CCol>{product || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={2} className="text-light-gray pl-0 mr-3 my-1">Description</CCol> <CCol>{description || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={2} className="text-light-gray pl-0 mr-3 my-1">UOM</CCol> <CCol>{uom || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 my-3 mx-0 border-right">
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Stock On Hand</CCol> <CCol className="pl-0">{stock_on_hand || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Available Qty</CCol> <CCol className="pl-0">{available_qty || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Expected in Qty</CCol> <CCol className="pl-0">{expected_in_qty || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Expected Out Qty</CCol> <CCol className="pl-0">{expected_out_qty || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Rotadate Type</CCol> <CCol className="pl-0">{rotadate_type || '-'}</CCol></CRow>
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
                <NavItem className='p-0'>
                  <NavLink
                    className={
                      'p-3 nav-link-cust d-flex align-items-center ' +
                      (activeTab === '1' ? ' tab-custom' : 'tab-nonActive')
                    }
                    active={this.state.activeTab === '1'}
                    onClick={() => this.activeTabIndex('1')}
                  >
                    <div className='row rowTabCustom align-items-center tabColumn mx-0'>
                      <span className='number-number-1 tabTitleText'/>
                        {activeTab === '1' } Stock
                        Details
                    </div>
                  </NavLink>
                </NavItem>

                {parseInt(expected_in_qty) === 0 && parseInt(expected_out_qty) === 0 && (parseInt(stock_on_hand) + parseInt(expected_in_qty) >= expected_out_qty) ?  '' :
                <NavItem className={'p-0'} style={{marginLeft:"11px"}}>
                  <NavLink
                    className={
                      'p-3 nav-link-cust d-flex align-items-center ' +
                      (activeTab === '2' ? ' tab-custom' : 'tab-nonActive')
                    }
                    active={this.state.activeTab === '2'}
                    onClick={() => this.activeTabIndex('2')}
                  >
                   <div className='row rowTabCustom align-items-center tabColumn mx-0'>
                      <span className='number-number-2 tabTitleText'/>
                        {activeTab === '2' } Stock
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
              <TabPane className='p-0 stockDetails' tabId='1'>
                <CustomTable
                  title='Stock Detail'
                  filename='Microlistics_StockDetail.'
                  font="12"
                  editColumn='false'
                  height={this.state.dimension.height}
                  fields={stockDetail}
                  data={products}
                  UrlHeader={this.UrlHeader} 
                  UrlAll={this.UrlAll}
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
              <TabPane className='stockDetails' tabId='2'>
                <CustomTable
                  title='Stock ForesCast'
                  filename='Microlistics_ForesCast.'
                  font="12"
                  editColumn='false'
                  height={this.state.dimension.height}
                  fields={ForesCast}
                  data={forecast}
                  UrlHeader={this.UrlHeader} 
                  UrlAll={this.UrlAll}
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
export default SalesOrderDetail;
