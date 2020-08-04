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
      { accessor: 'batch', placeholder: 'Batch', Header: 'Batch', sortable: true, width: 130 },
      { accessor: 'rotadate', placeholder: 'Rotadate', Header: 'Rotadate', sortable: true, width: 100 },
      { accessor: 'ref3', placeholder: 'Ref3', Header: 'Ref3', sortable: true, width: 100 },
      { accessor: 'ref4',placeholder: 'Ref4', Header: 'Ref4', sortable: true, width: 100 },
      { accessor: 'qty', placeholder: 'Qty', Header: 'Qty', sortable: true, width: 110 },
      { accessor: 'weight', placeholder: 'Weight', Header: 'Weight', sortable: true, width: 115 },
      { accessor: 'pallet',placeholder: 'Pallet', Header: 'Pallet', sortable: true, width: 120 },
      { accessor: 'price',placeholder: 'Prince', Header: 'Price', sortable: true, width: 120 },
      { accessor: 'pack_id',placeholder: 'Pack Id', Header: 'Pack Id', sortable: true, width: 180 },
    ],
    ForesCast: [
      { accessor: 'type',placeholder: 'Type', Header: 'Type', sortable: true, width: 130 },
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
      },
      {
        accessor: 'qtyexpected',
        placeholder: 'Expected In',
        Header: 'Expected In',
        sortable: true,
        width: 150,
      },
      {
        accessor: 'qtycommitted',
        placeholder: 'Expected Out',
        Header: 'Expected Out',
        sortable: true,
        width: 150,
      },
      {
        accessor: 'closingbalance',
        placeholder: 'Balance',
        Header: 'Balance',
        sortable: true,
        width: 140
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
        console.log(res);
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
    console.log(expected_out_qty)
    const { data } = await axios.get(url);
    // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|[''([{])+\S/g, match => match.toUpperCase());
    if (data.data.length) {
      this.setState({ products: data.data }, () => {
        console.log('--- products ')
        console.log(data.data)
      });
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
    if (data) {
      this.setState({ forecast: data[0][0]['available orders'] }, () => {
        console.log('--- forecast ')
        console.log(data[0][0]['available orders'])
      });
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
            <CRow className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Site</CCol> <CCol>{site || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Client</CCol> <CCol>{client || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Product</CCol> <CCol>{product || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Description</CCol> <CCol>{description || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">UOM</CCol> <CCol>{uom || '-'}</CCol></CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className="p-0 my-3 mx-0 border-right">
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Stock On Hand</CCol> <CCol>{stock_on_hand || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Available Qty</CCol> <CCol>{available_qty || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Expected in Qty</CCol> <CCol>{expected_in_qty || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Expected Out Qty</CCol> <CCol>{expected_out_qty || '-'}</CCol></CRow>
            <CRow  className="mx-0"><CCol  lg={3} className="text-light-gray px-0 my-1">Rotadate Type</CCol> <CCol>{rotadate_type || '-'}</CCol></CRow>
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
                      <span className='tabTitleText'>
                        {activeTab === '1' ? tab1() : tab1Inactive()} Stock
                        Details
                      </span>
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
                      <span className='tabTitleText'>
                        {activeTab === '2' ? tab2() : tab2Inactive()} Stock
                        Balance Forecast
                      </span>
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
                  tableStatus={tableStatus}
                  export={
                    <button className='btn btn-primary float-right btn-export'>
                      {/* <div className='export-export pr-3' /> */}
                      EXPORT
                    </button>
                  }
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
                  tableStatus={tableStatusForecast}
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
