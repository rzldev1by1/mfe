import React from 'react'
import axios from 'axios'
import moment from 'moment'
import {CCard,CCardBody,CRow,CCol,CButton} from '@coreui/react'
import { Card, CardBody, Row,Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import CustomTable from 'shared/table/CustomTable'
import { tab1, tab1Inactive, tab2, tab2Inactive } from './Helper';
import HeaderTitle from 'shared/container/TheHeader'
import './StockHolding.css'

class SalesOrderDetail extends React.Component {
  // ref to get element height and calculate table height
  section1 = React.createRef()
  state = {
    dimension: { width: 0, height: 0 },
    stockDetail: [
                      { accessor: "batch", Header: "Batch",sortable: true, width: 130 },
                      { accessor: "rotadate", Header: "Rotadate",sortable: true, width: 100 },
                      { accessor: "ref3", Header: "Ref3",sortable: true, width: 100 },
                      { accessor: "ref4", Header: "Ref4",sortable: true, width: 100 },
                      { accessor: "qty", Header: "Qty",sortable: true, width: 110 },
                      { accessor: "weight", Header: "Weight",sortable: true, width: 115 },
                      { accessor: "pallet", Header: "Pallet",sortable: true, width: 120 },
                      { accessor: "price", Header: "Price", sortable: true, width: 120 },
                      { accessor: "pack_id", Header: "Pack Id", sortable: true, width: 180 },
                
                ],
    ForesCast: [
                      { accessor: "type", Header: "Type",sortable: true,width: 130 },
                      { accessor: "company", Header: "Customer No",sortable: true, width: 140 },
                      { accessor: "orderno", Header: "Order No",sortable: true, width: 170 },
                      { accessor: "effectivedate", Header: "Order Date",sortable: true, width: 150 },
                      { accessor: "qtyexpected", Header: "Expected In",sortable: true, width: 150 },
                      { accessor: "qtycommitted", Header: "Expected Out",sortable: true, width: 150 },
                      { accessor: "closingbalance", Header: "Balance",sortable: true, width: 140 },
                  ],
    detail: {},
    products: [],
    datahead:[],
    activeTab: "1",
  }
  componentDidMount() {
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);
    this.getDetail()
    this.getStockDetails()
    this.getForescast()
  }
  activeTabIndex = (tabIndex) => {
		if (this.state.activeTab !== tabIndex) {
			this.setState({ activeTab: tabIndex });
		}
	}
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension);
  }
  updateDimension = () => {
    const height = (window.innerHeight - this.section1.current.clientHeight - 60) * 0.82
    this.setState({ dimension: { width: window.innerWidth, height } });
  }
  getDetail = async () => {
    const { product, client, site} = this.props.match.params
    const url =  `/stockdetail/header/${product}?client=${client}&site=${site}`
    // const { data } = await axios.get(url)
    axios.get(url)
    .then(res => {
      console.log(res);
      const result = res.data.data
      this.setState({ datahead:result}) 
      this.potableref.current.setPagination(res)
      
    })
    .catch(error => {
      
    })
  }
  getStockDetails = async () => {
    const { product, client, site } = this.props.match.params
    const url = `/stockdetail/${product}?client=${client}&site=${site}`
    const { data } = await axios.get(url)
    // const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    if (data.data.length) {
      this.setState({ products: data.data })
    }
  }
  getForescast = async () => {
    const { product, client, site } = this.props.match.params
    const url = `/stockbal?client=${client}&product=${product}&site=${site}`
    const { data } = await axios.get(url)
    if (data) {
      this.setState({ products: data[0][0]['available orders'] })
    }
  }
  formatDate = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '-'
  }
  render() {
    // const { match, history } = this.props
    const { detail, products, stockDetail, activeTab, ForesCast, forescast } = this.state
    let site = this.state.datahead.length ? this.state.datahead[0].site : null
    let client = this.state.datahead.length ? this.state.datahead[0].client : null
    let product = this.state.datahead.length ? this.state.datahead[0].product : null
    let description = this.state.datahead.length ? this.state.datahead[0].description : null
    let uom = this.state.datahead.length ? this.state.datahead[0].uom : null
    let stock_on_hand = this.state.datahead.length ? this.state.datahead[0].on_hand_qty : null
    let available_qty= this.state.datahead.length ? this.state.datahead[0].available_qty : null
    let expected_in_qty= this.state.datahead.length ? this.state.datahead[0].expected_in_qty : null
    let expected_out_qty= this.state.datahead.length ? this.state.datahead[0].expected_out_qty : null
    let rotadate_type= this.state.datahead.length ? this.state.datahead[0].rotadate_type : null
    return <div className="order-detail">
              <HeaderTitle breadcrumb={[
                { to: '/stock-holding', label: 'Stock Holding' },
                { to: '', label: this.props.match.params.product, active: true },
              ]} />
              <div ref={this.section1} className="card-group section-1 mb-4" >
                <CCard>
                  <CCardBody className="p-0 m-4 border-right">
                    <CRow><CCol className="text-light-gray">Site</CCol><CCol>{site || '-'}</CCol> </CRow>
                    <CRow><CCol className="text-light-gray">Client</CCol> <CCol>{client || '-'}</CCol>  </CRow>
                    <CRow><CCol className="text-light-gray">Product</CCol> <CCol>{product || '-'}</CCol>  </CRow>
                    <CRow><CCol className="text-light-gray">Description</CCol> <CCol>{description || '-'}</CCol>  </CRow>
                    <CRow><CCol className="text-light-gray">UOM</CCol> <CCol>{uom || '-'}</CCol>  </CRow>
                  </CCardBody>
                </CCard>
                <CCard>
                  <CCardBody className="p-0 m-4 border-right">
                    <CRow><CCol className="text-light-gray">Stock On Hand</CCol>  <CCol>{stock_on_hand || '-'}</CCol> </CRow>
                    <CRow><CCol className="text-light-gray">Available Qty</CCol>  <CCol>{available_qty || '-'}</CCol></CRow>
                    <CRow><CCol className="text-light-gray">Expected in Qty</CCol>  <CCol>{expected_in_qty || '-'}</CCol> </CRow>
                    <CRow><CCol className="text-light-gray">Expected Out Qty</CCol>  <CCol>{expected_out_qty || '-'}</CCol> </CRow>
                    <CRow><CCol className="text-light-gray">Rotadate Type</CCol>  <CCol>{rotadate_type || '-'}</CCol> </CRow>
                  </CCardBody>
                </CCard>
              </div>

              <Row className="align-items-center ml-0">
                  <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
                  <Nav tabs>
                      <div className="input-group">
                          <NavItem className="pl-0 pr-0">                         
                                  <NavLink  className={"nav-link-cust" + (activeTab === "1" ? " tab-custom" : "")} active={this.state.activeTab === "1"} onClick={() => this.activeTabIndex("1")}>
                                      <div className="row rowTabCustom align-items-center">
                                          <span className="tabTitleText">
                                          {activeTab === "1" ? tab1() : tab1Inactive()} Stock Details
                                          </span>
                                      </div>
                                 </NavLink>
                            </NavItem>

                            <NavItem className={"pl-2 pr-0 "}>
                                  <NavLink className={"nav-link-cust" + (activeTab === "2" ? " tab-custom" : "")} active={this.state.activeTab === "2"} onClick={() => this.activeTabIndex("2")}>
                                      <div className="row rowTabCustom align-items-center">
                                            <span className="tabTitleText">
                                            {activeTab === "2" ? tab2() : tab2Inactive()} Stock Balance Forecast
                                            </span>
                                      </div>
                                  </NavLink>
                          </NavItem>
                        </div>
                    </Nav>
                    </div>
                </Row>
        
                <Row className="align-items-center ml-0"> 
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mt-0 pl-0 " style={{paddingRight: '30px'}}>
                        <TabContent className="border-0" activeTab={this.state.activeTab}>
                            <TabPane className="p-0" tabId="1">
                              <CustomTable  title="Stock Detail"
                                            height={this.state.dimension.height}
                                            fields={stockDetail}
                                            data={products}
                                          />
                           </TabPane>
                            <TabPane className={""} tabId="2">
                               <CustomTable  title="Stock ForesCast"
                                            height={this.state.dimension.height}
                                            fields={ForesCast}
                                            data={products}
                                          />                                 
                              </TabPane>
                          </TabContent>
                      </div>
                  </Row>
            </div>
  }
}
export default SalesOrderDetail