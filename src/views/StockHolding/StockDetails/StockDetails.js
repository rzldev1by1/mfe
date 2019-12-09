import React, { Component } from 'react';
import { Card, CardBody,
		 Table, Row,
		 FormGroup, InputGroup,
		 Label,
		 Nav, NavItem, NavLink,Breadcrumb, BreadcrumbItem
} from 'reactstrap';

import axios from 'axios';
import AppComponent from '../../../AppComponent';
import { formatDate } from '../../../AppComponent/Helper';
import Paging from '../../General/Paging';

import './StockDetails.css';

class StockDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: [],
			isLoaded: false,
			activeTabIndex: 1,
			displayMoreColumnModal: false,
			displayContent: "INIT",
			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 150,
			maxPage: 3,
			columns: [
				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site" },
				{ id: "batch", checkboxLabelText: "Batch", tableHeaderText: "Batch", isVisible: true, key: "batch" },
				{ id: "effective_date", checkboxLabelText: "Rotadate", tableHeaderText: "Rotadate", isVisible: true, key: "" },
				{ id: "receipt_disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: true, key: "" },
				{ id: "ref3", checkboxLabelText: "Ref 3", tableHeaderText: "Ref 3", isVisible: true, key: "" },
				{ id: "ref4", checkboxLabelText: "Ref 4", tableHeaderText: "Ref 4", isVisible: true, key: "" },
				{ id: "weight", checkboxLabelText: "Quantity", tableHeaderText: "Quantity", isVisible: true, key: "" }
			],
			foreshadowedColumn: [
				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site" },
				{ id: "id", checkboxLabelText: "Customer ID", tableHeaderText: "Customer ID", isVisible: true, key: "id" },
				{ id: "order_no", checkboxLabelText: "Order No", tableHeaderText: "Order No", isVisible: true, key: "order_no" },
				{ id: "sm_dtm", checkboxLabelText: "Order Date", tableHeaderText: "Order Date", isVisible: true, key: "" },
				{ id: "qty_rec", checkboxLabelText: "In", tableHeaderText: "In", isVisible: true, key: "" },
				{ id: "qty_send", checkboxLabelText: "Out", tableHeaderText: "Out", isVisible: true, key: "" },
				{ id: "", checkboxLabelText: "Balance", tableHeaderText: "Balance", isVisible: true, key: "" }
			],
			masterResStockHolding: [],
			stockHolding: [],
			stockDetails: [],
			foreshadowedData: [],
			masterResource: [],
			UoM: []
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
		self.setState({ isLoaded: true, isSearch: true,
						currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0 });

		// if (localStorage.getItem("masterResStockHolding")) {
		// 	let masterResStockHolding = JSON.parse(localStorage.getItem("masterResStockHolding"));
		// 	this.setState({ masterResStockHolding: masterResStockHolding });
		// } else {
			// let params = {'activeonly': 'N'}
			// let endpoint = "scale/_proc/API_ProductList";
			// axios.get(AppComponent.getBaseUrl() + endpoint, {
			axios.get(AppComponent.getBaseUrl() + "stockholding")
			//     params: params,
			//     headers: {
			//         'Content-Type': 'application/json',
			//         'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
			//         'X-Company-Code': Authentication.getCompanyCode(),
			//         'X-DreamFactory-Session-Token': Authentication.getToken(),
			//         'Accept':'application/json'
			//     }
			// })
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
									masterResStockHolding: respondRes.find(x => x.product === productId),
									totalRows: respondRes.length });

					self.numberEventClick(self.state.currentPage);
					localStorage.setItem("masterResStockHolding", JSON.stringify(respondRes));
				}
				self.setState({ isLoaded: false, isSearch: false });
			});
		// }
    }

	loadStockDetails = () => {
		let self = this;
		self.setState({ isLoaded: true, currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0 });

		// if (localStorage.getItem("masterResStockHolding")) {
		// 	let masterResStockHolding = JSON.parse(localStorage.getItem("masterResStockHolding"));
		// 	this.setState({ masterResStockHolding: masterResStockHolding });
		// } else {
			// let params = {'activeonly': 'N'}
			// let endpoint = "scale/_proc/API_ProductList";
			axios.get(AppComponent.getBaseUrl() + "stockdetail/" + this.props.history.location.pathname.substring(20))
			// axios.get(AppComponent.getBaseUrl() + endpoint, {
			//     params: params,
			//     headers: {
			//         'Content-Type': 'application/json',
			//         'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
			//         'X-Company-Code': Authentication.getCompanyCode(),
			//         'X-DreamFactory-Session-Token': Authentication.getToken(),
			//         'Accept':'application/json'
			//     }
			// })
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

					self.numberEventClick(self.state.currentPage);
					localStorage.setItem("stockDetails", JSON.stringify(respondRes));
				}
				self.setState({ isLoaded: false, isSearch: false });
			});
		// }
	}

	loadForeshadowed = () => {
		let self = this;
		self.setState({ isLoaded: true, currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0 });

		// if (localStorage.getItem("masterResStockHolding")) {
		// 	let masterResStockHolding = JSON.parse(localStorage.getItem("masterResStockHolding"));
		// 	this.setState({ masterResStockHolding: masterResStockHolding });
		// } else {
			// let params = {'activeonly': 'N'}
			// let endpoint = "scale/_proc/API_ProductList";
			axios.get(AppComponent.getBaseUrl() + "foreshadowedstockbalance/" + this.props.history.location.pathname.substring(20))
			// axios.get(AppComponent.getBaseUrl() + endpoint, {
			//     params: params,
			//     headers: {
			//         'Content-Type': 'application/json',
			//         'X-DreamFactory-API-Key': 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272',
			//         'X-Company-Code': Authentication.getCompanyCode(),
			//         'X-DreamFactory-Session-Token': Authentication.getToken(),
			//         'Accept':'application/json'
			//     }
			// })
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
									foreshadowedData: respondRes,
									totalRows: respondRes.length });

					self.numberEventClick(self.state.currentPage);
					localStorage.setItem("foreshadowedData", JSON.stringify(respondRes));
				}
				self.setState({ isLoaded: false, isSearch: false });
			});
		// }
    }

	updateTableColumn = (columns) => {
		// // let self = this;
		// this.setState({ columns: columns });
		// localStorage.setItem("columnData", JSON.stringify(this.state.columns));
	}

	toggleDisplayMoreColumn = () => {
		this.setState((prevState) => {
			return { displayMoreColumnModal: !prevState.displayMoreColumnModal }
		});
	}

	activeTabIndex = (tabIndex) => {
		this.setState({ activeTabIndex: tabIndex });
	}

	changeStartIndex = (currentPage) => {
		this.setState({ startIndex: (parseInt(currentPage) * this.state.displayPage) - this.state.displayPage });
	}

	changeLastIndex = (currentPage) => {
		this.setState({ lastIndex: parseInt(currentPage) * this.state.displayPage });
	}

	numberEventClick = (currentPage) => {
		let page = parseInt(currentPage);
		this.setState({ currentPage: page });
		this.changeStartIndex(page);
		this.changeLastIndex(page);
	}

	nextPageClick = () => {
		if (this.state.currentPage < this.state.maxPage) {
			this.setState((prev) => {
				currentPage: prev.currentPage++;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
		}
	}

	backPageClick = () => {
		if (this.state.currentPage > 1) {
			this.setState((prev) => {
				currentPage: prev.currentPage--;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
		}
	}

	showStockDetailsHeader = () => {
		return (
			<tr>
				{this.state.columns.map((item, idx) => {
					if (item.isVisible) {
						if (item.id === "qty" ||
							item.id === "weight" ||
							item.id === "volume") {
							return <th className="p-3 text-right" key={idx} style={{ width: "auto" }}>{item.tableHeaderText}</th>
						}
						return <th className="p-3 text-left" key={idx} style={{ width: "auto" }}>{item.tableHeaderText}</th>
					}
				})}
			</tr>
		);
	}

	showStockDetailsData = () => {
		return (
			this.state.stockDetails.map((item, idx) => (
				<tr key={idx}>
					{this.state.columns.map((column, columnIdx) => {
						if (column.isVisible) {
							if (column.id === "qty" ||
								column.id === "weight" ||
								column.id === "volume") {
								return <td key={columnIdx} className="px-3 text-right" style={{ width: "auto" }}>{item[column.id]}</td>
							}
							return (
								<td key={columnIdx} className="px-3 text-left" style={{ width: "auto" }}>
									{column.id === "effective_date" ? formatDate(item[column.id]) : item[column.id]}
								</td>
							)
						}
					})}
				</tr>
			))
		);
	}

	showForeshadowedHeader = () => {
		return (
			<tr>
				{this.state.foreshadowedColumn.map((item, idx) => {
					if (item.isVisible) {
						if (item.id === "qty" ||
							item.id === "weight" ||
							item.id === "volume") {
							return <th className="p-3 text-right" key={idx} width="10%">{item.tableHeaderText}</th>
						}
						return <th className="p-3 text-left" key={idx} width="10%">{item.tableHeaderText}</th>
					}
				})}
			</tr>
		);
	}

	showForeshadowedData = () => {
		return (
			this.state.foreshadowedData.map((item, idx) => (
				<tr key={idx}>
					{this.state.foreshadowedColumn.map((column, columnIdx) => {
						if (column.isVisible) {
							if (column.id === "qty" ||
								column.id === "weight" ||
								column.id === "volume") {
								return <td key={columnIdx} className="px-3 text-right" width="10%">{item[column.id]}</td>
							}

							return (
								<td key={columnIdx} className="px-3 text-left" width="10%">
									{column.id === "sm_dtm" ? formatDate(item[column.id]) : item[column.id]}
								</td>
							)
						}
					})}
				</tr>
			))
		);
	}

	render() {
		let content;
		let stockHoldingTable;
		let foreshadowedTable;
		this.state.stockDetails.map(item => (this.state.UoM.push(item["packdesc_2"])));

		if (this.state.stockDetails) {
			stockHoldingTable =
				<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0">
					<Table className="table-condensed  table-striped rounded-bottom-175 mb-0" size="xl" width="100%">
						<thead>{this.showStockDetailsHeader()}</thead>
						<tbody>{this.showStockDetailsData()}</tbody>
					</Table>

					<div className="bg-transparent card-footer text-center border-company border-top-0">
						<Paging backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
								totalRows={this.state.totalRows} displayPage={this.state.displayPage}
								currentPage={this.state.currentPage} maxPage={this.state.maxPage}
								isActive={this.state.isActive}
								numberEventClick={this.numberEventClick} />
					</div>
				</div>
		} else {
			stockHoldingTable =
				<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
					<span>No data found</span>
				</div>
		}

		if (this.state.foreshadowedData) {

			foreshadowedTable =
				<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0">
					<Table className="table-condensed  table-striped rounded-bottom-175 mb-0" size="lg">
						<thead>{this.showForeshadowedHeader()}</thead>
						<tbody>{this.showForeshadowedData()}</tbody>
					</Table>

					<div className="bg-transparent card-footer text-center border-company border-top-0">
						<Paging backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
								totalRows={this.state.totalRows} displayPage={this.state.displayPage}
								currentPage={this.state.currentPage} maxPage={this.state.maxPage}
								isActive={this.state.isActive}
								numberEventClick={this.numberEventClick} />
					</div>
				</div>
		} else {
			foreshadowedTable =
				<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0">
					<span>No data found</span>
				</div>
		}

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
															<Breadcrumb>
															{/*eslint-disable-next-line*/}
																<BreadcrumbItem>
																		<a href="#" className="breadcrumb">Stock Holding Summary</a>
																</BreadcrumbItem>
																<BreadcrumbItem active>
																		{decodeURIComponent(this.props.match.params.product)}
																	  { /*<h4 className="headerTitle font-weight-bold">Detailed Information</h4>**/}
																</BreadcrumbItem>
															</Breadcrumb>
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
									<form>
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
																					<Label className="secondary-text">{this.state.masterResStockHolding.product}</Label>
																				</div>

																				<div className="col-3">
																					<Label className="font-weight-bold primary-text">Stock On Hand</Label>
																				</div>
																				<div className="col-3">
																					<Label className="secondary-text">{this.state.masterResStockHolding.qty_lcd}</Label>
																				</div>
																			</div>

																			<div className="row">
																				<div className="col-3">
																					<Label className="font-weight-bold primary-text">Description</Label>
																				</div>
																				<div className="col-3">
																					<Label className="secondary-text">{this.state.masterResStockHolding.product_name}</Label>
																				</div>

																				<div className="col-3">
																					<Label className="font-weight-bold primary-text">Allocated Qty</Label>
																				</div>
																				<div className="col-3">
																					<Label className="secondary-text"></Label>
																				</div>
																			</div>

																			<div className="row">
																				<div className="col-3">
																					<Label className="font-weight-bold primary-text">UoM</Label>
																				</div>
																				<div className="col-3">
																					<Label className="secondary-text">{this.state.UoM[0]}</Label>
																				</div>

																				<div className="col-3">
																					<Label className="font-weight-bold primary-text">Available Qty</Label>
																				</div>
																				<div className="col-3">
																					<Label className="secondary-text"></Label>
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
																					<Label className="secondary-text"></Label>
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
																	<NavLink className={"nav-link-cust" + (this.state.activeTabIndex === 1 ? " tab-custom" : "")} active={this.state.activeTabIndex === 1} onClick={() => this.activeTabIndex(1)}>
																		<div className="row rowTabCustom align-items-center">
																			<div className="tabTitleText">Stock Details</div>
																		</div>
																	</NavLink>
																</NavItem>

																<NavItem className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pl-0">
																	<NavLink className={"nav-link-cust" + (this.state.activeTabIndex === 2 ? " tab-custom" : "")} active={this.state.activeTabIndex === 2} onClick={() => this.activeTabIndex(2)}>
																		<div className="row rowTabCustom align-items-center">
																			<span className="tabTitleText">Foreshadowed Stock Balance</span>
																		</div>
																	</NavLink>
																</NavItem>
															</div>
														</Nav>
													</div>
												</Row>

												{/* <Row className="align-items-center">
													<div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0">
														<TabContent>
															<TabPane tabId="1">

															</TabPane>

															<TabPane tabId="2">

															</TabPane>
														</TabContent>
													</div>
												</Row> */}
												<Row className="align-items-center">
													<div className="d-flex col-12 col-lg-12 col-md-12 col-sm-12 mt-3 pl-0">
														{this.state.activeTabIndex === 1 ? stockHoldingTable : null}
														{this.state.activeTabIndex === 2 ? foreshadowedTable : null}
													</div>
												</Row>
											</div>
										</div>
									</form>
								</div>
							</div>

							{/* <div className="row">
								<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
									{content}
								</div>
							</div> */}
						</div>
					</div>
				</div>
			break;

			default :
				content =
				<div className="col-12 d-flex h-100 position-relative">
					<div className="bg-transparent mx-auto my-auto text-center">
							{/* <div className={"sk-double-bounce" + (this.state.isLoaded ? "" : " d-none")}>
								<div className="sk-child sk-double-bounce1" />
								<div className="sk-child sk-double-bounce2" />
							</div> */}
							{/* <div className={"sk-spinner sk-spinner-pulse" + (this.state.isLoaded ? "" : " d-none")} /> */}
							<div className={"spinner" + (this.state.isLoaded ? "" : " d-none")} />
							<p className={this.state.displayContent === "NOT_FOUND" ? "" : "d-none"}>{this.state.notFoundMessage}</p>
					</div>
				</div>
		}

		return (
			<React.Fragment>
				{content}
			</React.Fragment>
		);
	}
}

export default StockDetails;
