import React, { Component } from 'react';
import { Card, CardBody,
		 Row,
		 FormGroup, InputGroup,
		 Label,
		 Nav, NavItem, NavLink,
		 TabContent, TabPane } from 'reactstrap';

import axios from 'axios';
import { endpoint, headers } from '../../../AppComponent/ConfigEndpoint';
import { tab1, tab1Inactive, tab2, tab2Inactive } from '../../../AppComponent/Helper';

import StockDetails from './StockDetails';
import StockBalanceForecast from './StockBalanceForecast';

class StockHoldingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// isVisible: [],
			isLoaded: false,
			activeTab: "1",
			displayContent: "INIT",
			UoM: [],

			stockHolding: [],
			isStockDetails: false,
			stockDetails: [],
			isForeshadowedBalance: false,
            stockBalanceForecast: [],
            
            notFoundMessage: ""
		}
	}

	componentDidMount() {
		this.loadStockHolding();
		this.loadStockDetails();
		this.loadForeshadowed();
	}

	loadStockHolding = () => {
		let self = this;
		let productId = this.props.history.location.pathname.substring(20);
		let params = { 'searchParam': productId }

		self.setState({ isLoaded: true });

		axios.get(endpoint.stockHoldingSummary, {
            params: params,
            headers: headers
		})
		.then(res => {
			// res.isSuccess = true;
			return res.data;
		})
		.catch(function (error) {
            self.setState({ displayContent: "NOT_FOUND",
                            notFoundMessage: error.response ? error.response.data.message : "Failed to process your data" });
			return error;
		})
		.then(function(result) {
			if (result.data) {
				let respondRes = result.data;
				self.setState({ displayContent: "FOUND",
                                stockHolding: respondRes });
				// localStorage.setItem("masterResStockHolding", JSON.stringify(respondRes));
            }
            return;
		});
    }

	loadStockDetails = () => {
		let self = this;

		axios.get(endpoint.stockDetail + this.props.history.location.pathname.substring(20), {
            headers: headers
        })
		.then(res => {
			// res.isSuccess = true;
			return res.data;
		})
		.catch(function (error) {
            self.setState({ displayContent: "NOT_FOUND",
                            notFoundMessage: error.response ? error.response.data.message : "Failed to process your data" });
			return error;
		})
		.then(function(result) {
            if (result.data) {
                self.setState({ isStockDetails: true, stockDetails: result.data });
            }
            return;
		});
	}

	loadForeshadowed = () => {
		let self = this;
		self.setState({ isLoaded: true });

		axios.get(endpoint.stockBalanceForecast + this.props.history.location.pathname.substring(20), {
            headers: headers
        })
		.then(res => {
			// res.isSuccess = true;
			// self.setState({ isLoaded: false })
			return res.data;
		})
		.catch(function (error) {
            self.setState({ displayContent: "NOT_FOUND",
                            notFoundMessage: error.response ? error.response.data.message : "Failed to process your data" });
			return error;
		})
		.then(function(result) {
            if (result.data) {
                self.setState({ isForeshadowedBalance: true, stockBalanceForecast: result.data });
            }
            self.setState({ isLoaded: false });
            return;
		});
    }

	activeTabIndex = (tabIndex) => {
		if (this.state.activeTab !== tabIndex) {
			this.setState({ activeTab: tabIndex });
		}
	}

	render() {
		const { stockHolding, stockDetails, activeTab } = this.state;

		let content;
		switch (this.state.displayContent) {
			case "FOUND" :
				content =
				<div className="animated fadeIn">
					<div className="row">
						<div className="col-12 p-0">
							<div className="row">
								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
                                    <CardBody className="pb-0">
                                        <Row className="align-items-center">
                                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 pr-0">
                                                <FormGroup className="mb-0">
                                                    <InputGroup>
                                                        <div className="col-12 col-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                                            {/* <Breadcrumb>
                                                                <BreadcrumbItem>
                                                                    <a href="#" className="breadcrumb">Detailed Information</a>
                                                                </BreadcrumbItem>
                                                                <BreadcrumbItem active>
                                                                    {decodeURIComponent(this.props.match.params.product)}
                                                                </BreadcrumbItem>
                                                            </Breadcrumb> */}
                                                            <div className="headerTitle">
                                                                <h2 style={{ marginRight: "3%" }}>Stock Holding Summary</h2>
                                                                <h2 style={{ marginRight: "3%" }}><i className="iconU-rightArrow" style={{ fontSize: "20px" }} /></h2>
                                                                <h2 style={{ marginRight: "3%" }}>{decodeURIComponent(this.props.match.params.product)}</h2>
                                                            </div>
                                                        </div>
                                                    </InputGroup>
                                                </FormGroup>
                                            </div>
                                        </Row>
                                    </CardBody>
								</div>
							</div>

							<div className="row">
								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
									<div className="form-group row">
										<div className="col-12 col-lg-12 col-md-12 col-sm-12">
                                            <CardBody className="pb-0">
                                                <Row className="align-items-center">
                                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 pr-0">
                                                        <FormGroup>
                                                            <InputGroup>
                                                                <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0">
                                                                    <Card className="form-group row rounded-top-05 mb-0 border-0">
                                                                        <div className="col-12 pb-2 pt-3 pl-3">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Product</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["product"] : null}</Label>
                                                                                </div>

                                                                                <div className="col-3 borderLeft">
                                                                                    <Label className="primary-text">Stock On Hand</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["qty_lcd"] : null}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Description</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["product_name"] : null}</Label>
                                                                                </div>

                                                                                <div className="col-3 borderLeft">
                                                                                    <Label className="primary-text">Available Qty</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails.length > 0 ? stockDetails[0].qty_lcd : null}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Site</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails.length > 0 ? stockDetails[0].site : null}</Label>
                                                                                </div>
                                                                                <div className="col-3 borderLeft">
                                                                                    <Label className="primary-text">Expected In Qty</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails.length > 0 ? stockDetails[0].qty_lcd_expected : null}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Client</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    {/* <Label className="secondary-text">{this.state.UoM}</Label> */}
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0].client : null}</Label>
                                                                                </div>

                                                                                <div className="col-3 borderLeft">
                                                                                    <Label className="primary-text">Expected Out Qty</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails.length > 0 ? stockDetails[0].qty_lcd_committed : null}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">UoM</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    {/* <Label className="secondary-text">{this.state.UoM}</Label> */}
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0].packdesc_1 : null}</Label>
                                                                                </div>

                                                                                <div className="col-3 borderLeft">
                                                                                    <Label className="primary-text">Rotadate Type</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails.length > 0 ? stockDetails[0].rotadate_type : null} - Receipt Type</Label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Card>
                                                                </div>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </div>
                                                </Row>

                                                <Row className="align-items-center">
                                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
                                                        <Nav tabs>
                                                            <div className="input-group">
                                                                <NavItem className="col-6 col-lg-6 col-md-6 col-sm-12 pl-0 pr-0">
                                                                    <NavLink className={"nav-link-cust" + (activeTab === "1" ? " tab-custom" : "")} active={this.state.activeTab === "1"} onClick={() => this.activeTabIndex("1")}>
                                                                        <div className="row rowTabCustom align-items-center">
                                                                            <span className="tabTitleText">
                                                                                {activeTab === "1" ? tab1() : tab1Inactive()} Stock Details
                                                                            </span>
                                                                        </div>
                                                                    </NavLink>
                                                                </NavItem>

                                                                <NavItem className="col-6 col-lg-6 col-md-6 col-sm-12 pl-0 pr-0">
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

                                                <Row className="align-items-center">
                                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mt-0 pl-0 pr-0">
                                                        <TabContent className="border-0" activeTab={this.state.activeTab}>
                                                            <TabPane tabId="1">
                                                                <StockDetails isStockDetails={this.state.isStockDetails}
                                                                              stockDetails={this.state.stockDetails} />
                                                            </TabPane>

                                                            <TabPane tabId="2">
                                                                <StockBalanceForecast isForeshadowedBalance={this.state.isForeshadowedBalance}
                                                                                     stockBalanceForecast={this.state.stockBalanceForecast} />
                                                            </TabPane>
                                                        </TabContent>
                                                    </div>
                                                </Row>
                                            </CardBody>
										</div>
									</div>
								</div>
							</div>
                        </div>                          
                    </div>
				</div>
			break;

            case "NOT_FOUND" :
                content =
                <div className="col-12 d-flex h-100 position-relative">
                    <div className="d-flex h-100 position-relative">
                        <p className="notFoundMessage">{this.state.notFoundMessage ? this.state.notFoundMessage : "Data not found"}</p>
                    </div>
                </div>
            break;

			default :
				content =
				<div className="col-12 d-flex h-100 position-relative">
					<div className="bg-transparent mx-auto my-auto text-center">
                        <div className={"spinner" + (this.state.isLoaded ? "" : " d-none")} />
					</div>
				</div>
        }
        
		return <React.Fragment>{content}</React.Fragment>;
	}
}

export default StockHoldingDetails;
