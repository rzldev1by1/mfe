import React, { Component } from 'react';
import { Card, CardBody,
		 Col, Row, Table,
		 Button,
		//  ButtonDropdown,
		 FormGroup,
		 Breadcrumb, BreadcrumbItem,
         InputGroup,
        //  DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';

import axios from 'axios';
// import AppComponent from '../../AppComponent';
import { endpoint, headers } from '../../AppComponent/ConfigEndpoint';

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
			showFilter: true,
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
				{ id: "uom", checkboxLabelText: "UoM", tableHeaderText: "UoM", isVisible: true, key: "packdesc_1" },
				{ id: "on_hand_qty", checkboxLabelText: "On Hand Qty", tableHeaderText: "On Hand Qty", isVisible: true, key: "qty_lcd" },
				{ id: "on_hand_weight", checkboxLabelText: "On Hand Weight", tableHeaderText: "On Hand Weight", isVisible: true, key: "weight" },
				{ id: "expected_in_qty", checkboxLabelText: "Expected In Qty", tableHeaderText: "Expected In Qty", isVisible: true, key: "qty_lcd_expected" },
				{ id: "expected_out_qty", checkboxLabelText: "Expected In Weight", tableHeaderText: "Expected In Weight", isVisible: true, key: "wgt_expected" },
				{ id: "expected_out_qty", checkboxLabelText: "Expected Out Qty", tableHeaderText: "Expected Out Qty", isVisible: true, key: "qty_lcd_committed" },
			],
			filterStockHolding: {
				showPopup: false,
				item: {
					"site": { text: "Site", isVisible: true,},
					"status": { text: "Status", isVisible: true},
					"uom": { text: "UoM", isVisible: true,}
				}
			},
			masterResStockHolding: []
		}
		this.searchForm = React.createRef();
	}

	componentDidMount() {
		this.loadStockHolding();
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
	}

    loadStockHolding = () => {
		let self = this;
		self.setState({ isLoaded: true, isSearch: true,
						currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0 });

        axios.get(endpoint.stockHoldingSummary, { headers: headers })
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
		if (this.state.filterStockHolding.item["site"].isVisible) params.site = form.filterSite.value;
		if (this.state.filterStockHolding.item["status"].isVisible) params.status = form.filterStatus.value;
		if (this.state.filterStockHolding.item["uom"].isVisible) params.UOM = form.filterUom.value;		

        axios.get(endpoint.stockHoldingSummary, { headers: headers })
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
						<Table className="table-condensed table-responsive table-striped clickable-row mb-0" size="sm">
							<thead>{this.showHeader()}</thead>
							<tbody>{this.showData()}</tbody>
						</Table>
                        
                        <Paging backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                                totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                                currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                                isActive={this.state.isActive}
                                numberEventClick={this.numberEventClick} />
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
							<div className="row">
								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
									<CardBody>
										<Row className="align-items-center">
											<div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0">
												<FormGroup>
													<InputGroup>
														<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
															{/* <Breadcrumb>
																<BreadcrumbItem active>Stock Holding Summary</BreadcrumbItem>
															</Breadcrumb> */}
                                                            <h4 className="headerTitle">Stock Holding Summary</h4>
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
									<form ref={this.searchForm} onSubmit={e => { e.preventDefault() ; this.searchData() }}>
										<div className="form-group row mb-0">
											<div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
												<Row className="align-items-center mb-0">
													<div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
														<FormGroup>
															<InputGroup>
																<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
																	<Card className="form-group row mb-0 border-0">
																		<div className="input-group p-2">
																			<div className="col-9 input-group-prepend bg-white">
																				<span className="input-group-text border-0 bg-white p-0">
																					<i className="fa fa-search fa-2x iconSpace" />
																				</span>
																				<input type="text" className="form-control searchbox border-0 pt-2" id="searchInput" name="searchInput" placeholder="Enter a Product or Description" />
																			</div>
																			<div className="col-3 text-right">
																				<Button className={"filter mr-2" + (this.state.showFilter ? " active" : "")} onClick={this.triggerShowFilter}>
																					<i className="iconU-filter" />
																				</Button>

																				<Button type="submit" className="search" onClick={this.searchData}>
																					<strong>Search</strong>
																				</Button>
																			</div>
																		</div>

																		<div className={"row p-2" + (this.state.showFilter ? "" : " d-none")}>
                                                                            <Col lg="1">
                                                                                <select className="form-control" id="select_1" name="filterSite">
                                                                                    <option value="">Site</option>
                                                                                    <option value="M">Site M</option>
                                                                                    <option value="S">Site S</option>
                                                                                </select>
                                                                            </Col>
                                                                            <Col lg="1" className="pl-1">
                                                                                <select className="form-control" id="select_2" name="filterStatus">
                                                                                    <option value="">Status</option>
                                                                                    <option value="Q">Status Q</option>
                                                                                    <option value="D">Status D</option>
                                                                                    <option value="E">Status E</option>
                                                                                    <option value="I">Status I</option>
                                                                                    <option value="F">Status F</option>
                                                                                </select>
                                                                            </Col>
                                                                            <Col lg="1" className="pl-1">
                                                                                <select className="form-control" id="select_3" name="filterUom">
                                                                                    <option value="">UoM</option>
                                                                                    <option value="EACH">EACH</option>
                                                                                    <option value="CASE">CASE</option>
                                                                                    <option value="PALLET">PALLET</option>
                                                                                </select>
                                                                            </Col>
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
