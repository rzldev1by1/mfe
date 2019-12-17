import React, { Component } from 'react';
import { Card, CardBody,
		 Table, Row,
		 FormGroup, InputGroup,
		 Label,
		 Nav, NavItem, NavLink, Breadcrumb, BreadcrumbItem,
		 TabContent, TabPane
} from 'reactstrap';

import axios from 'axios';
import AppComponent from '../../../AppComponent';
// import { formatDate } from '../../../AppComponent/Helper';

import StockDetails from './StockDetails';
import ForeshadowedBalance from './ForeshadowedBalance';

// import './StockHoldingDetails.css';

class StockHoldingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// isVisible: [],
			isLoaded: false,
			activeTab: "2",
			displayContent: "INIT",
			UoM: [],

			stockHolding: [],
			isStockDetails: false,
			stockDetails: [],
			isForeshadowedBalance: false,
			foreshadowedBalance: [],
		}
		console.log(this.state.stockDetails);
	}

	componentDidMount() {
		this.loadStockDetails();
		this.loadForeshadowed();
		this.loadStockHolding();
	}

	loadStockHolding = () => {
		let self = this;
		let productId = this.props.history.location.pathname.substring(20);
		let params = { 'searchParam': productId }

		self.setState({ isLoaded: true, isSearch: true,
						currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0 });

		axios.get(AppComponent.getBaseUrl() + "stockholding", {
			params: params
		})
		.then(res => {
			// res.isSuccess = true;
			// self.setState({ isLoaded: false })
			return res.data;
		})
		.catch(function (error) {
			self.setState({ displayContent: "NOT_FOUND",
							isLoaded: false,
							isSearch: false });
			if (error.response) {
				// self.setState({ notFoundMessage: error.response.data.message })
			}
			return error;
		})
		.then(function(result) {
			if (result.data) {
				let respondRes = result.data;
				self.setState({ displayContent: "FOUND",
								stockHolding: respondRes });

				// self.numberEventClick(self.state.currentPage);
				// localStorage.setItem("masterResStockHolding", JSON.stringify(respondRes));
			}
			self.setState({ isLoaded: false, isSearch: false });
		});
    }

	loadStockDetails = () => {
		let self = this;
		self.setState({ isLoaded: true, currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0 });

		axios.get(AppComponent.getBaseUrl() + "stockdetail/" + this.props.history.location.pathname.substring(20))
		.then(res => {
			// res.isSuccess = true;
			// self.setState({ isLoaded: false })
			return res.data;
		})
		.catch(function (error) {
			self.setState({ displayContent: "NOT_FOUND",
							isLoaded: false,
							isSearch: false });
			if (error.response) {
				// self.setState({ notFoundMessage: error.response.data.message })
			}
			return error;
		})
		.then(function(result) {
			if (result.data) {
				let respondRes = result.data;
				let totalPage = 0;

				if (respondRes.length > self.state.displayPage) {
					totalPage = respondRes % self.state.displayPage;
					if (totalPage > 0 && totalPage < 50) {
						totalPage = parseInt(respondRes.length / self.state.displayPage) + 1;
					} else {
						totalPage = respondRes.length / self.state.displayPage;
					}
					self.setState({ maxPage: totalPage });
				} else {
					self.setState({ maxPage: 1 });
				}

				self.setState({ displayContent: "FOUND",
								stockDetails: respondRes,
								totalRows: respondRes.length });

				// self.numberEventClick(self.state.currentPage);
				localStorage.setItem("stockDetails", JSON.stringify(respondRes));
			}
			self.setState({ isLoaded: false, isSearch: false });
		});
	}

	loadForeshadowed = () => {
		let self = this;
		self.setState({ isLoaded: true, currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0 });

		axios.get(AppComponent.getBaseUrl() + "foreshadowedstockbalance/" + this.props.history.location.pathname.substring(20))
		.then(res => {
			// res.isSuccess = true;
			// self.setState({ isLoaded: false })
			return res.data;
		})
		.catch(function (error) {
			self.setState({ displayContent: "NOT_FOUND",
							isLoaded: false,
							isSearch: false });
			if (error.response) {
				// self.setState({ notFoundMessage: error.response.data.message })
			}
			return error;
		})
		.then(function(result) {
			if (result.data) {
				let respondRes = result.data;
				let totalPage = 0;

				if (respondRes.length > self.state.displayPage) {
					totalPage = respondRes % self.state.displayPage;
					if (totalPage > 0 && totalPage < 50) {
						totalPage = parseInt(respondRes.length / self.state.displayPage) + 1;
					} else {
						totalPage = respondRes.length / self.state.displayPage;
					}
					self.setState({ maxPage: totalPage });
				} else {
					self.setState({ maxPage: 1 });
				}

				self.setState({ displayContent: "FOUND",
								foreshadowedBalance: respondRes,
								totalRows: respondRes.length });

				// self.numberEventClick(self.state.currentPage);
				localStorage.setItem("foreshadowedData", JSON.stringify(respondRes));
			}
			self.setState({ isLoaded: false, isSearch: false });
		});
    }

	activeTabIndex = (tabIndex) => {
		if (this.state.activeTab !== tabIndex) {
			this.setState({ activeTab: tabIndex });
		}
	}

	render() {
		const { stockHolding } = this.state;

		let content;
		switch (this.state.displayContent) {
			case "FOUND" :
				content =
				<div className="animated fadeIn">
					<div className="row">
						<div className="col-12 p-0">
							<div className="row">
								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
									<CardBody className="px-0">
										<Row className="align-items-center">
											<div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0">
												<FormGroup>
													<InputGroup>
														<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
															<h4 className="headerTitle font-weight-bold">
																<Breadcrumb>
																		<BreadcrumbItem>
																				<a href="#" className="breadcrumb">Detailed Information</a>
																		</BreadcrumbItem>
																		<BreadcrumbItem active>
																				{decodeURIComponent(this.props.match.params.product)}
																		</BreadcrumbItem>
																</Breadcrumb>
															</h4>
														</div>
														{/*eslint-disable-next-line*/}
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
											<Row className="align-items-center">
												<div className="col-12 col-lg-12 col-md-12 col-sm-12">
													<FormGroup>
														<InputGroup>
															<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0">
																<Card className="form-group row rounded-top-05 mb-0 border-0">
																	<div className="col-12 pb-2 pt-3 pl-3">
																		<div className="row">
																			<div className="col-3">
																				<Label className="font-weight-bold primary-text">Product</Label>
																			</div>
																			<div className="col-3">
																				<Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["product"] : null}</Label>
																			</div>

																			<div className="col-3">
																				<Label className="font-weight-bold primary-text">Stock On Hand</Label>
																			</div>
																			<div className="col-3">
																				<Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["qty_lcd"] : null}</Label>
																			</div>
																		</div>

																		<div className="row">
																			<div className="col-3">
																				<Label className="font-weight-bold primary-text">Description</Label>
																			</div>
																			<div className="col-3">
																				<Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["product_name"] : null}</Label>
																			</div>

																			<div className="col-3">
																				<Label className="font-weight-bold primary-text">Allocated Qty</Label>
																			</div>
																			<div className="col-3">
																				<Label className="secondary-text">{this.state.stockDetails[0].qty_lcd_committed}</Label>
																			</div>
																		</div>

																		<div className="row">
																			<div className="col-3">
																				<Label className="font-weight-bold primary-text">UoM</Label>
																			</div>
																			<div className="col-3">
																				<Label className="secondary-text">{this.state.UoM}</Label>
																			</div>

																			<div className="col-3">
																				<Label className="font-weight-bold primary-text">Available Qty</Label>
																			</div>
																			<div className="col-3">
																				<Label className="secondary-text">{this.state.stockDetails[0].qty_lcd}</Label>
																			</div>
																		</div>

																		<div className="row">
																			<div className="col-3">
																				<Label className="font-weight-bold primary-text">Rotadate Type</Label>
																			</div>
																			<div className="col-3">
																				<Label className="secondary-text"></Label>
																			</div>

																			<div className="col-3">
																				<Label className="font-weight-bold primary-text">On Purchase Qty</Label>
																			</div>
																			<div className="col-3">
																				<Label className="secondary-text">{this.state.stockDetails[0].qty_lcd_expected}</Label>
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
															<NavItem className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pl-0">
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
												<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3 pl-0">
													<TabContent className="border-0" activeTab={this.state.activeTab}>
														<TabPane tabId="1">
															<StockDetails history={this.props.history}
																			isStockDetails={this.state.isStockDetails}
																			stockDetails={this.state.stockDetails} />
														</TabPane>

														<TabPane tabId="2">
															<ForeshadowedBalance history={this.props.history}
																					isForeshadowedBalance={this.state.isForeshadowedBalance}
																					foreshadowedBalance={this.state.foreshadowedBalance} />
														</TabPane>
													</TabContent>
												</div>
											</Row>
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
