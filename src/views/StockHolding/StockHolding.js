import React, { Component } from 'react';
import { Card, CardBody,
		 Col, Row, Table,
		 Button,
		 ButtonDropdown,
		 FormGroup,

		Breadcrumb, BreadcrumbItem,
         Input, InputGroup, InputGroupAddon,
         DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';
// import { TableHeaderColumn } from 'react-bootstrap-table';
// import { Link } from 'react-router-dom';

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
					"site": { text: "Site", isVisible: false,},
					"status": { text: "Status", isVisible: false},
					"uom": { text: "UoM", isVisible: false,}
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

	getLocStockHolding = () => {
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

	updateStockHolding = (filterStockHolding) => {
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

	toggleAddFilter = () => {
			let filterStockHolding = this.state.filterStockHolding;
			filterStockHolding.showPopup = !filterStockHolding.showPopup;
			// filterData.item = this.getRawFilterDataItem();
			this.setState({ filterStockHolding: filterStockHolding });
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

		let form = self.searchForm.current;

		// if (!searchTerm) { return };
		let params = {};
		params.searchParam = form.searchInput.value;
		if (this.state.filterStockHolding.item["site"].isVisible) params.site = form.xxx.value;
		if (form.status.value && this.state.filterStockHolding.item["status"].isVisible) params.status = form.status.value;
		if (form.uom.value && this.state.filterStockHolding.item["uom"].isVisible) params.uom = form.uom.value;

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

	itemFilterClick = (key, e) => {
		e.stopPropagation();
		this.toggleItemFilterShow(key);
	}

	toggleItemFilterShow = (key) => {
		var self = this;
		this.setState((state) => {
			state.filterStockHolding.item[key].isVisible = !state.filterStockHolding.item[key].isVisible;
			return state;
		});
	}

	itemFilterCheckedClick = (key, e) => {
		let isChecked = e.currentTarget.checked;
		let filterdata = this.state.filterStockHolding;
		if (isChecked) {
			filterdata.item[key].isVisible = isChecked;
		} else {
			filterdata.item[key].isVisible = false;
		}
		this.setState({ filterStockHolding: filterdata });
		e.stopPropagation();
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

	createFilter = (item, key, options) => {
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
						{/* <li className="select-option">
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
						</li> */}

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
																				<input type="text" className="form-control border-0 pt-2" id="searchInput" name="searchInput" placeholder="Enter a Product or Description" />
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
																			{/* <div className="filter-show">
																				<span className="filter-label-show">Each</span>
																				<button type="button" className="btn btn-outline-light filter-show-btn">
																					<span className="iconU-close filter-close-icon" />
																				</button>
																			</div> */}
																		</div>

																		<hr className={this.state.showFilter ? "m-0" : " d-none"}/>

																		<div className={"mb-xl-n4 row p-2" + (this.state.showFilter ? "" : " d-none")}>
																			<div className="col-lg-10">
																				<div className="row">
																					<Col lg="3" className={"mb-1" + (this.state.filterStockHolding.item["site"].isVisible ? "" : " d-none")}>
																							<Input className="select-color-border" name="xxx" type="select" id="select_1">
																								<option value="1">Site 1</option>
																								<option value="2">Site 2</option>
																								<option value="3">Site 3</option>
																							</Input>
																					</Col>

																					<Col lg="3" className={"mb-1" + (this.state.filterStockHolding.item["status"].isVisible ? "" : " d-none")}>
																							<Input className="select-color-border" name="status" type="select" id="select_2">
																								<option value="a">Status a</option>
																								<option value="b">Status b</option>
																								<option value="c">Status c</option>
																							</Input>
																					</Col>

																					<Col lg="3" className={"mb-1" + (this.state.filterStockHolding.item["uom"].isVisible ? "" : " d-none")}>
																						<InputGroup className="input-group-custom">
																							<Input className="select-color-border" name="uom" type="select" id="select_3">
																								<option value="I">Uom I</option>
																								<option value="II">Uom II</option>
																								<option value="III">Uom III</option>
																							</Input>
																						</InputGroup>
																					</Col>


																				</div>
																			</div>
																			<div className="col-lg-2">
																					<ButtonDropdown isOpen={this.state.filterStockHolding.showPopup} toggle={this.toggleAddFilter} className="button-dropdown-display-block">
																						<DropdownToggle className="float-right">
																							<span className="p-1"> Add Filter </span>
																						</DropdownToggle>
																						<DropdownMenu right className="rounded-0" style={{border: "1px solid #000000"}}>
																							{Object.keys(this.state.filterStockHolding.item).map((key, idx) => {
																								let item = this.state.filterStockHolding.item[key];
																								if (key !== "serviceItem" && key !== "companyItem") {
																									return (
																										<DropdownItem key={key} id={key} className="border-0" onClick={ (e) => {this.itemFilterClick(key,e);} }>
																											<div className="div-dropdownItem" onClick={ (e) => { this.itemFilterClick(key, e)} }>
																												<div className="form-check">
																													<input className="form-check-input" type="checkbox" checked={ item.isVisible } value={ item.text } id={ key } onChange={(e) => { this.itemFilterCheckedClick(key,e);}} onClick={ (e) => { this.itemFilterCheckedClick(key,e);} } />
																													<label className="form-check-label" htmlFor={key}>{item.text}</label>
																												</div>
																											</div>
																										</DropdownItem>
																									)
																								}
																							})}
																						</DropdownMenu>
																					</ButtonDropdown>
																			</div>
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
