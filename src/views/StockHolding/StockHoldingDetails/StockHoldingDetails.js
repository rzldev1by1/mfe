import React, { Component } from 'react';
import { Card, CardBody,
		 Table, Row,
		 FormGroup, InputGroup,
		 Label,
		 Nav, NavItem, NavLink, Breadcrumb, BreadcrumbItem,
		 TabContent, TabPane
} from 'reactstrap';

import axios from 'axios';
import { endpoint, headers } from '../../../AppComponent/ConfigEndpoint';
// import { formatDate } from '../../../AppComponent/Helper';

import StockDetails from './StockDetails';
import ForeshadowedBalance from './ForeshadowedBalance';

import './StockHoldingDetails.css';

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
            foreshadowedBalance: [],
            
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
			self.setState({ displayContent: "NOT_FOUND" });
			if (error.response) {
				self.setState({ notFoundMessage: error.response.data.message })
			}
			return error;
		})
		.then(function(result) {
			if (result.data) {
				let respondRes = result.data;
				self.setState({ displayContent: "FOUND",
                                stockHolding: respondRes });
				// localStorage.setItem("masterResStockHolding", JSON.stringify(respondRes));
			}
			// self.setState({ isLoaded: false });
		});
    }

	loadStockDetails = () => {
		let self = this;
		// self.setState({ isLoaded: true });

		axios.get(endpoint.stockDetail + this.props.history.location.pathname.substring(20), {
            headers: headers
        })
		.then(res => {
			// res.isSuccess = true;
			return res.data;
		})
		.catch(function (error) {
			if (error.response) {
				// self.setState({ notFoundMessage: error.response.data.message })
			}
			return error;
		})
		.then(function(result) {
            if (result.data) {
                self.setState({ isStockDetails: true, stockDetails: result.data });
            }
			// self.setState({ isLoaded: false });
		});
	}

	loadForeshadowed = () => {
		let self = this;
		self.setState({ isLoaded: true });

		axios.get(endpoint.foreshadowedBalance + this.props.history.location.pathname.substring(20), {
            headers: headers
        })
		.then(res => {
			// res.isSuccess = true;
			// self.setState({ isLoaded: false })
			return res.data;
		})
		.catch(function (error) {
			if (error.response) {
				// self.setState({ notFoundMessage: error.response.data.message })
			}
			return error;
		})
		.then(function(result) {
            if (result.data) {
                self.setState({ isForeshadowedBalance: true, foreshadowedBalance: result.data });
            }
			self.setState({ isLoaded: false });
		});
    }

	activeTabIndex = (tabIndex) => {
		if (this.state.activeTab !== tabIndex) {
			this.setState({ activeTab: tabIndex });
		}
	}

	render() {
		const { stockHolding, stockDetails } = this.state;

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
                                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0">
                                                <FormGroup className="mb-0">
                                                    <InputGroup>
                                                        <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                                            {/* <Breadcrumb>
                                                                <BreadcrumbItem>
                                                                    <a href="#" className="breadcrumb">Detailed Information</a>
                                                                </BreadcrumbItem>
                                                                <BreadcrumbItem active>
                                                                    {decodeURIComponent(this.props.match.params.product)}
                                                                </BreadcrumbItem>
                                                            </Breadcrumb> */}
                                                            <h4 className="headerTitle">
                                                                Detailed Information : {decodeURIComponent(this.props.match.params.product)}
                                                            </h4>
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
                                            <CardBody>
                                                <Row className="align-items-center">
                                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                                                        <FormGroup>
                                                            <InputGroup>
                                                                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0">
                                                                    <Card className="form-group row rounded-top-05 mb-0 border-0">
                                                                        <div className="col-12 pb-2 pt-3 pl-3">
                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Product</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockHolding ? stockHolding[0]["product"] : null}</Label>
                                                                                </div>

                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Stock On Hand</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockHolding ? stockHolding[0]["qty_lcd"] : null}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Description</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockHolding ? stockHolding[0]["product_name"] : null}</Label>
                                                                                </div>

                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Allocated Qty</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails ? stockDetails[0].qty_lcd_committed : null}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">UoM</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    {/* <Label className="secondary-text">{this.state.UoM}</Label> */}
                                                                                    <Label className="secondary-text">{stockHolding ? stockHolding[0].packdesc_1 : null}</Label>
                                                                                </div>

                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Available Qty</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails ? stockDetails[0].qty_lcd : null}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">Rotadate Type</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails ? stockDetails[0].rotadate_type : null} - Receipt Type</Label>
                                                                                </div>

                                                                                <div className="col-3">
                                                                                    <Label className="primary-text">On Purchase Qty</Label>
                                                                                </div>
                                                                                <div className="col-3">
                                                                                    <Label className="secondary-text">{stockDetails ? stockDetails[0].qty_lcd_expected : null}</Label>
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
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                                        <Nav tabs>
                                                            <div className="input-group">
                                                                <NavItem className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pl-0 pr-0">
                                                                    <NavLink className={"nav-link-cust" + (this.state.activeTab === "1" ? " tab-custom" : "")} active={this.state.activeTab === "1"} onClick={() => this.activeTabIndex("1")}>
                                                                        <div className="row rowTabCustom align-items-center">
                                                                            <div className="tabTitleText">Stock Details</div>
                                                                        </div>
                                                                    </NavLink>
                                                                </NavItem>

                                                                <NavItem className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pl-0">
                                                                    <NavLink className={"nav-link-cust" + (this.state.activeTab === "2" ? " tab-custom" : "")} active={this.state.activeTab === "2"} onClick={() => this.activeTabIndex("2")}>
                                                                        <div className="row rowTabCustom align-items-center">
                                                                            <span className="tabTitleText">Foreshadowed Stock Balance</span>
                                                                        </div>
                                                                    </NavLink>
                                                                </NavItem>
                                                            </div>
                                                        </Nav>
                                                    </div>
                                                </Row>

                                                <Row className="align-items-center">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-0 pl-0">
                                                        <TabContent className="border-0" activeTab={this.state.activeTab}>
                                                            <TabPane tabId="1">
                                                                <StockDetails isStockDetails={this.state.isStockDetails}
                                                                              stockDetails={this.state.stockDetails} />
                                                            </TabPane>

                                                            <TabPane tabId="2">
                                                                <ForeshadowedBalance isForeshadowedBalance={this.state.isForeshadowedBalance}
                                                                                     foreshadowedBalance={this.state.foreshadowedBalance} />
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

			default :
				content =
				<div className="col-12 d-flex h-100 position-relative">
					<div className="bg-transparent mx-auto my-auto text-center">
                        <div className={"spinner" + (this.state.isLoaded ? "" : " d-none")} />
                        <p className={this.state.displayContent === "NOT_FOUND" ? "" : "d-none"}>{this.state.notFoundMessage}</p>
					</div>
				</div>
        }
        
		return <React.Fragment>{content}</React.Fragment>;
	}
}

export default StockHoldingDetails;
