import React, { Component } from 'react';
import { Card, CardBody,
		 Col, Row, Table,
		 Button,
		//  ButtonDropdown,
		 FormGroup,
		 InputGroup,
		Breadcrumb, BreadcrumbItem
} from 'reactstrap';
// import { TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

import axios from 'axios';
import AppComponent from '../../AppComponent';
import Paging from '../General/Paging';

import './StockHolding.css';
import StockHoldingEditColumn from './StockHoldingEditColumn';


class StockHolding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: [],
			isLoaded: false,
			isSearch: false,
			displayContent: "INIT",
			showEditColumn: false,
			showFilter: false,
			notFoundMessage: "",

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,

			columns: [
				// { id: "location", checkboxLabelText: "Location", tableHeaderText: "Location", isVisible: true, key: "" },
				// { id: "locationType", checkboxLabelText: "Location Type", tableHeaderText: "Location Type", isVisible: true, key: "" },
				// { id: "packId", checkboxLabelText: "Pack ID", tableHeaderText: "Pack ID", isVisible: true, key: "" },
				// { id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "" },
				// { id: "description", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "" },
				// { id: "qty", checkboxLabelText: "Qty", tableHeaderText: "Qty", isVisible: true, key: "" },
				// { id: "plannedIn", checkboxLabelText: "Planned In", tableHeaderText: "Planned In", isVisible: true, key: "" },
				// { id: "plannedOut", checkboxLabelText: "Planned Out", tableHeaderText: "Planned Out", isVisible: true, key: "" },
				// { id: "packType", checkboxLabelText: "Pack Type", tableHeaderText: "Pack Type", isVisible: true, key: "" },
				// { id: "packSize", checkboxLabelText: "Pack Size", tableHeaderText: "Pack Size", isVisible: true, key: "" },
				// { id: "rotaDate", checkboxLabelText: "Rotadate", tableHeaderText: "Rotadate", isVisible: false, key: "" },
				// { id: "rotaType", checkboxLabelText: "Rotadate Type", tableHeaderText: "Rotadate Type", isVisible: false, key: "" },
				// { id: "dateStatus", checkboxLabelText: "Date Status", tableHeaderText: "Date Status", isVisible: true, key: "" },
				// { id: "zone", checkboxLabelText: "Zone", tableHeaderText: "Zone", isVisible: false, key: "" },
				// { id: "batch", checkboxLabelText: "Batch", tableHeaderText: "Batch", isVisible: true, key: "" },
				// { id: "ref2", checkboxLabelText: "Ref 2", tableHeaderText: "Ref 2", isVisible: true, key: "" },
				// { id: "ref3", checkboxLabelText: "Ref 3", tableHeaderText: "Ref 3", isVisible: false, key: "" },
				// { id: "ref4", checkboxLabelText: "Ref 4", tableHeaderText: "Ref 4", isVisible: false, key: "" },
				// { id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: false, key: "" },
				// { id: "alert", checkboxLabelText: "Alert", tableHeaderText: "Alert", isVisible: true, key: "" },
				// { id: "weight", checkboxLabelText: "Weight", tableHeaderText: "Weight", isVisible: true, key: "" },
				// { id: "volume", checkboxLabelText: "Volume", tableHeaderText: "Volume", isVisible: true, key: "" },
				// { id: "lastUpdated", checkboxLabelText: "Last Updated", tableHeaderText: "Last Updated", isVisible: false, key: "" },


				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site" },
				{ id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "product" },
				{ id: "description", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "product_name" },
				{ id: "status", checkboxLabelText: "Status", tableHeaderText: "Status", isVisible: true, key: "status" },
				{ id: "uom", checkboxLabelText: "UoM", tableHeaderText: "UoM", isVisible: true, key: "" },
				{ id: "onHandQty", checkboxLabelText: "On Hand Qty", tableHeaderText: "On Hand Qty", isVisible: true, key: "qty_lcd" },
				{ id: "onHandWeight", checkboxLabelText: "On Hand Weight", tableHeaderText: "On Hand Weight", isVisible: true, key: "weight" },
				{ id: "expectedInQty", checkboxLabelText: "Expected In Qty", tableHeaderText: "Expected In Qty", isVisible: true, key: "qty_lcd_expected" },
				{ id: "expectedInWeight", checkboxLabelText: "Expected In Weight", tableHeaderText: "Expected In Weight", isVisible: true, key: "wgt_expected" },
				{ id: "expectedOutQty", checkboxLabelText: "Expected Out Qty", tableHeaderText: "Expected Out Qty", isVisible: true, key: "qty_lcd_committed" },
			],
			filterStockHolding: {
				showPopup: false,
				item: {
					// "location": { id: "location", text: "Location", isVisible: false },
					// "locationType": { id: "locationType", text: "Location Type", isVisible: false },
					// "packType": { id: "packType", text: "Pack Type", isVisible: false },
					// "rotaDate": { id: "rotaDate", text: "Rotadate", isVisible: false },
					// "rotaType": { id: "rotaType", text: "Rotadate Type", isVisible: false },
					// "dateStatus": { id: "dateStatus", text: "Date Status", isVisible: false },
					// "zone": { id: "zone", text: "Zone", isVisible: false },
					// "disposition": { id: "disposition", text: "Disposition", isVisible: false },
					// "alert": { id: "alert", text: "Alert", isVisible: false },
					site: { id: "site", text: "Site", isVisible: false, options: "" },
					status: { id: "status", text: "Status", isVisible: false, options: ["EACH", "BAG", "RPT", "CARTON"] },
					uom: { id: "uom", text: "UoM", isVisible: false, options: "" }
				}
			},
			masterResStockHolding: []
		}
		this.searchForm = React.createRef();
	}

	componentDidMount() {
		if (localStorage.getItem("masterResStockHolding") && localStorage.getItem("masterResStockHolding") !== "undefined" ) {
			let masterResStockHolding =  JSON.parse(localStorage.getItem("masterResStockHolding"));
			if (masterResStockHolding) {
				this.setState(() => {
					return { masterResStockHolding: masterResStockHolding };
				});
				this.setPagination(masterResStockHolding);
			}
		} else {
			this.loadStockHolding();
		}
	}

	getLocalStorageFilterData = () => {
		// let self = this;
		if (localStorage.getItem("filterStockHolding") && localStorage.getItem("filterStockHolding") !== "undefined") {
			let filterItem = JSON.parse(localStorage.getItem("filterStockHolding"));
			if (filterItem) {
				// this.state.filterStockHolding = filterItem
				this.setState(() => {
					return { filterStockHolding: filterItem };
				});
			};
		} else {
			localStorage.setItem("filterStockHolding", JSON.stringify(this.state.filterStockHolding));
		}
	}

	updateFilterData = (filterStockHolding) => {
		if (localStorage.getItem("filterStockHolding")) {
			localStorage.removeItem("filterStockHolding");
			localStorage.setItem("filterStockHolding", JSON.stringify(filterStockHolding))
		}
	}

	toggleAddFilterStockHolding = () => {
		// if (this.state.masterResStockHolding.length > 0) {
			let filterStockHolding = this.state.filterStockHolding;
			filterStockHolding.showPopup = !filterStockHolding.showPopup;

			this.setState({ filterStockHolding: filterStockHolding });
			this.updateFilterData(filterStockHolding);
		// }
	}

	getLocalStorageColumnData = () => {
		// // let self = this;
		// if (localStorage.getItem("columnData") && localStorage.getItem("columnData") !== "undefined") {
		// 	let columnItem = JSON.parse(localStorage.getItem("columnData"));
		// 	if (columnItem) { this.state.columns = columnItem };
		// } else {
		// 	localStorage.setItem("columnData", JSON.stringify(this.state.columns));
		// }
	}

	updateTableColumn = (columns) => {
		// // let self = this;
		// this.setState({ columns: columns });
		// localStorage.setItem("columnData", JSON.stringify(this.state.columns));
	}

	setPagination = (result) => {
		let self = this;
		let respondRes = result;
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
						masterResStockHolding: respondRes,
						totalRows: respondRes.length });

		self.numberEventClick(self.state.currentPage);
		localStorage.setItem("masterResStockHolding", JSON.stringify(respondRes));
	}

    loadStockHolding = () => {
		let self = this;
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
			axios.get(AppComponent.getBaseUrl() + "stockholding")
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
					self.setPagination(result.data);
				}
				self.setState({ isLoaded: false, isSearch: false });
			});
		// }
    }

	searchData = () => {
		let self = this;
		self.setState({ isLoaded: true, isSearch: true,
						currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0, displayContent: "NOT_FOUND"});

		let params = {};
		let form = self.searchForm.current;
		let searchTerm = form.searchForm.value;

		// if (!searchTerm) { return };
		params.searchParam = searchTerm;

		axios.get(AppComponent.getBaseUrl() + "stockholding",
		{
			params: params,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}
		})
		.then(res => {
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
				self.setPagination(result.data);
			}
			self.setState({ isLoaded: false, isSearch: false });
		});
	}

	toggleDisplayMoreColumn = () => {
		this.setState((prevState) => {
			return { showEditColumn: !prevState.showEditColumn }
		});
	}

	triggerShowFilter = (e) => {
		e.stopPropagation();
		this.setState((prevState) => {
			return { showFilter: !prevState.showFilter };
		});
	}

	triggerChangeFilter = (key) => {
		this.setState((state) => {
			state.filterStockHolding.item[key].isVisible = !state.filterStockHolding.item[key].isVisible;
			return state;
		});
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

	rowClicked = (productCode) => {
		this.props.history.push("/stock/stockholding/" + encodeURIComponent(productCode));
		// window.location = "/stock/stockholding/" + encodeURIComponent(productCode);
		// return <Link className="company-link p-1" to={"/stock/stockholding/" + encodeURIComponent(productCode)}>{productCode}</Link>;
	}

	showHeader = () => {
		return (
			<tr>
				{this.state.columns.map((item, idx) => {
					if (item.isVisible) {
						if (item.id === "onHandQty" ||
							item.id === "onHandWeight" ||
							item.id === "expectedInQty" ||
							item.id === "expectedInWeight" ||
							item.id === "expectedOutQty") {
							return <th className="p-3 text-right" key={idx} width="10%">{item.tableHeaderText}</th>;
						}

						return <th className="p-3 text-left" key={idx} width="10%">{item.tableHeaderText}</th>;
					}
				})}
				<th className="p-3 text-left">
					<button type="button" className="btn btn-outline-light editColumnBtn"  onClick={this.toggleDisplayMoreColumn}>
						<span className="glyphicon glyphicon-pencil editColumnLogo" />
					</button>
				</th>
			</tr>
		);
	}

	showData = () => {
		return (
			this.state.masterResStockHolding.slice(this.state.startIndex, this.state.lastIndex).map((item, idx) => (
				<tr key={idx} onClick={() => this.rowClicked(item["product"])}>
					{this.state.columns.map((column, columnIdx) => {
						if (column.isVisible) {
							if (column.id === "onHandQty" ||
								column.id === "onHandWeight" ||
								column.id === "expectedInQty" ||
								column.id === "expectedInWeight" ||
								column.id === "expectedOutQty") {
								return <td key={columnIdx} className="px-3 text-right">{item[column.key]}</td>;
							}

							return <td key={columnIdx} className="px-3 text-left">{item[column.key]}</td>;
						}
					})}
					<td className="px-3 text-left">
						{/* <a href="#" className="dots"> */}
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
						{/* </a> */}
					</td>
				</tr>
			))
		);
	}

	createFilter = (item, key) => {
		return (
			<ul className={"select" + (item.isVisible ? " expand" : "")}
				id="select" name="select">
				<li className="expand-style">
					<input type="radio" className="select-close" id={item.id + "-close"} name={item.id} value="" />
					<span className="select-label select-label-placeholder">{item.text}</span>
				</li>

				<li className="select-items">
					<input type="radio" className="select-expand" id={item.id + "-opener"} name={item.id} />
					<label className="select-closeLabel" htmlFor={item.id + "-close"} onClick={() => this.triggerChangeFilter(key)} />

					<ul className="select-options">
						<li className="select-option">
							<input type="checkbox" className="inp-cbx-filter d-none"
							name={item.id} id={item.id + item} checked/>
							<label className="select-label cbx-filter" htmlFor={item.id + item}>
								<span>
									<svg viewBox="0 0 12 10" width="12px" height="10px">
										<polyline points="1.5 6 4.5 9 10.5 1" />
									</svg>
								</span>
								<span>TEST123</span>
							</label>
						</li>
						<li className="select-option">
							<input type="checkbox" className="inp-cbx-filter d-none"
								name={item.id} id={item.id + "-test234"} />
								<label className="select-label option-radius cbx-filter" htmlFor={item.id + "-test234"}>
									<span>
										<svg viewBox="0 0 12 10" width="12px" height="10px">
											<polyline points="1.5 6 4.5 9 10.5 1" />
										</svg>
									</span>
									<span>TEST123</span>
								</label>
						</li>
					</ul>

					<label className="select-expandLabel" htmlFor={item.id + "-opener"} onClick={() => this.triggerChangeFilter(key)} />
				</li>
			</ul>
		);
	}

	render() {
		let content;
		switch (this.state.displayContent) {
			case "FOUND" :
				content =
				<div className="col-12 p-0">
					<div className={this.state.isSearch ? "spinner" : "d-none"} />
					<div className={this.state.isSearch ? "d-none" : ""}>
						<Table className="table-condensed table-responsive table-striped clickable-row rounded-bottom-175 mb-0" size="sm">
							<thead>{this.showHeader()}</thead>
							<tbody>{this.showData()}</tbody>
						</Table>
						<div className="bg-transparent card-footer text-center border-company border-top-0">
							<Paging backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
									totalRows={this.state.totalRows} displayPage={this.state.displayPage}
									currentPage={this.state.currentPage} maxPage={this.state.maxPage}
									isActive={this.state.isActive}
									numberEventClick={this.numberEventClick} />
						</div>
					</div>
				</div>
				break;

			default :
				content =
				<div className="col-12 d-flex h-100 position-relative">
					<div className="bg-transparent mx-auto my-auto text-center">
						<div className={this.state.isSearch ? "" : "d-none"}>
							<div className={"spinner" + (this.state.isLoaded ? "" : " d-none")} />
							<p className={this.state.displayContent === "NOT_FOUND" ? "" : "d-none"}>{this.state.notFoundMessage}</p>
						</div>
					</div>
				</div>
		}

		return (
			<React.Fragment>
				<div className="animated fadeIn">
					<div className="row">
						<div className="col-12 p-0">
							<div className="row mb-0 p-0">
								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
									<CardBody className="p-0">
										<Row className="align-items-center">
											<div className="col-12 col-lg-12 col-md-12 col-sm-12">
												<FormGroup className="mb-1">
													<InputGroup>
														<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
															<Breadcrumb>
																		<BreadcrumbItem active>
																		Stock Holding Summary
																		{/*<h4 className="headerTitle font-weight-bold stockholding-title">Stock Holding Summary</h4>**/}
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

							<div className="row mb-0 p-0">
								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
									<form ref={this.searchForm} onSubmit={e => { e.preventDefault() ; this.searchData(); }}>
										<div className="form-group row mb-0">
											<div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
												<Row className="align-items-center mb-0">
													<div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
														<FormGroup>
															<InputGroup>
																<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
																	<Card className="form-group row rounded-top-175 mb-0 border-0">
																		<div className="input-group p-2">
																			<div className="input-group-prepend bg-white col-9">
																				<span className="input-group-text border-0 bg-white p-0">
																					<i className="fa fa-search fa-2x iconSpace" />
																					{/* <i className="iconU-search" /> */}
																				</span>
																				<input type="text" className="form-control border-0 pt-2"
																						id="searchForm" name="searchForm" placeholder="Enter a Product or Description" />
																			</div>
																			<div className="col-3 text-right">
																				<Button className={"circle" + (this.state.showFilter ? " active" : "")} onClick={this.triggerShowFilter}>
																					{/* <i className="fa fa-sliders" /> */}
																					<i className="iconU-filter" />
																				</Button>

																				{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}

																				<Button type="submit" className="search rounded-175" onClick={this.searchData}>
																					<strong>Search</strong>
																				</Button>
																			</div>
																		</div>
																		<div className={"input-group p-2" + (this.state.showFilter ? "" : " d-none")}>
																			<div className="filter-show">
																				<span className="filter-label-show">Each</span>
																				<button type="button" className="btn btn-outline-light filter-show-btn">
																					<span className="iconU-close filter-close-icon" />
																				</button>
																			</div>
																		</div>

																		<hr className={this.state.showFilter ? "m-0" : " d-none"}/>

																		<div className={"input-group p-2" + (this.state.showFilter ? "" : " d-none")}>
																			<Row>
																				<Col lg="auto" md="2" sm="6">{'\u00A0'}</Col>
																				{Object.keys(this.state.filterStockHolding.item).map((key, idx) => {
																					let item = this.state.filterStockHolding.item[key];
																					return (
																						<Col lg="auto" md="5" sm="6" className={idx === 0 ? "" : "pl-0"} key={idx}>
																							{this.createFilter(item, key)}
																						</Col>
																					);
																				})}
																			</Row>
																		</div>
																	</Card>
																</div>
															</InputGroup>
														</FormGroup>
													</div>
												</Row>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div className="row">
								<div className="d-flex col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
									{content}
								</div>
							</div>
						</div>
					</div>
				</div>
				<StockHoldingEditColumn isOpen={this.state.showEditColumn}
										toggle={this.toggleDisplayMoreColumn}
										fields={this.state.columns}
										updateTableColumn={this.updateTableColumn} />
			</React.Fragment>
		);
	}
}

export default StockHolding;
