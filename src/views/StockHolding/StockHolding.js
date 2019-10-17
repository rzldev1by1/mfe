import React, { Component } from 'react';
import { Card, CardBody,
		 Col, Row, Table,
		 Button, ButtonDropdown,
		 FormGroup,
		 InputGroup,
		 DropdownToggle
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
				// { id: "rotaDate", checkboxLabelText: "RotaDate", tableHeaderText: "RotaDate", isVisible: false, key: "" },
				// { id: "rotaType", checkboxLabelText: "RotaDate Type", tableHeaderText: "RotaDate Type", isVisible: false, key: "" },
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


				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "" },
				{ id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "" },
				{ id: "description", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "" },
				{ id: "status", checkboxLabelText: "Status", tableHeaderText: "Status", isVisible: true, key: "" },
				{ id: "uom", checkboxLabelText: "UoM", tableHeaderText: "UoM", isVisible: true, key: "" },
				{ id: "onHandQty", checkboxLabelText: "On Hand Qty", tableHeaderText: "On Hand Qty", isVisible: true, key: "" },
				{ id: "onHandWeight", checkboxLabelText: "On Hand Weight", tableHeaderText: "On Hand Weight", isVisible: true, key: "" },
				{ id: "expectedInQty", checkboxLabelText: "Expected In Qty", tableHeaderText: "Expected In Qty", isVisible: true, key: "" },
				{ id: "expectedInWeight", checkboxLabelText: "Expected In Weight", tableHeaderText: "Expected In Weight", isVisible: true, key: "" },
				{ id: "expectedOutQty", checkboxLabelText: "Expected Out Qty", tableHeaderText: "Expected Out Qty", isVisible: true, key: "" },
			],
			filterStockHolding: {
				showPopup: false,
				item: {
					// "location": { id: "location", text: "Location", isVisible: false },
					// "locationType": { id: "locationType", text: "Location Type", isVisible: false },
					// "packType": { id: "packType", text: "Pack Type", isVisible: false },
					// "rotaDate": { id: "rotaDate", text: "RotaDate", isVisible: false },
					// "rotaType": { id: "rotaType", text: "RotaDate Type", isVisible: false },
					// "dateStatus": { id: "dateStatus", text: "Date Status", isVisible: false },
					// "zone": { id: "zone", text: "Zone", isVisible: false },
					// "disposition": { id: "disposition", text: "Disposition", isVisible: false },
					// "alert": { id: "alert", text: "Alert", isVisible: false },
					site: { id: "site", text: "Site", isVisible: false },
					uom: { id: "uom", text: "UoM", isVisible: false },
					status: { id: "status", text: "Status", isVisible: false }
				}
			},
			stockHolding: [
				// { location: "A0101A03", locationType: "Reserve", packId: "100000025",
				//   product: "1001", description: "AbcdefghijKlmnopqrst",
				//   qty: "50", plannedIn: "0", plannedOut: "0",
				//   packType: "EACH", packSize: "10*5",
				//   rotaDate: "11/02/2019", rotaType: "R - Receipt Date",
				//   dateStatus: "LIVE", zone: "A", batch: "",
				//   ref2: "1234", ref3: "1234", ref4: "1234",
				//   disposition: "", alert: "No",
				//   weight: "1", volume: "1",
				//   lastUpdated: ""
				// },
				{ site: "A", product: "1001", description: "Example Product 1001",
				  status: "LIVE", uom: "EACH", onHandQty: "50", onHandWeight: "100",
				  expectedInQty: "176", expectedInWeight: "352", expectedOutQty: "69"
				},
				{ site: "NZ01", product: "1002", description: "AbcdefghijKlmnopqrst",
				  status: "LIVE", uom: "EACH", onHandQty: "109", onHandWeight: "218",
				  expectedInQty: "167", expectedInWeight: "334", expectedOutQty: "96"
				},
				{ site: "B", product: "1003", description: "Example Product Description 1003",
				  status: "LIVE", uom: "EACH", onHandQty: "2090", onHandWeight: "4180",
				  expectedInQty: "111", expectedInWeight: "222", expectedOutQty: "2025"
				},
				{ site: "A", product: "1004", description: "AbcdefghijKlmnopqrst",
				  status: "LIVE", uom: "EACH", onHandQty: "50", onHandWeight: "100",
				  expectedInQty: "176", expectedInWeight: "352", expectedOutQty: "69"
				},
				{ site: "C", product: "1005", description: "AbcdefghijKlmnopqrst",
				  status: "LIVE", uom: "EACH", onHandQty: "50", onHandWeight: "100",
				  expectedInQty: "176", expectedInWeight: "352", expectedOutQty: "69"
				}
			],
			masterResStockHolding: []
		}
		// this.getLocalStorageColumn();
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

	rowClicked = (productCode) => {
		this.props.history.push("/stockholding/" + encodeURIComponent(productCode));
		// return <Link className="company-link p-1" to={"/stockholding/" + encodeURIComponent(productCode)}>{productCode}</Link>;
	}

	render() {
		let content;
		content = 
		<Table className="table-condensed table-responsive table-striped clickable-row rounded-175 mb-0" size="md">
			<thead>
				<tr>
					{this.state.columns.map((item, idx) => {
						if (item.isVisible) {
							// if (item.id === "qty" ||
							// 	item.id === "plannedIn" ||
							// 	item.id === "plannedOut" ||
							// 	item.id === "weight" ||
							// 	item.id === "volume") {
							// 	return <th className="p-3 text-right align-middle" key={idx} width="10%">{item.tableHeaderText}</th>;
							// }

							if (item.id === "onHandQty" ||
								item.id === "onHandWeight" ||
								item.id === "expectedInQty" ||
								item.id === "expectedInWeight" ||
								item.id === "expectedOutQty") {
								return <th className="p-3 text-right align-middle" key={idx} width="10%">{item.tableHeaderText}</th>;
							}

							return <th className="p-3 text-left align-middle" key={idx} width="10%">{item.tableHeaderText}</th>;
						}
					})}
					<th className="p-3 text-left align-middle">
						<button type="button" className="btn btn-outline-light editColumnBtn"  onClick={this.toggleDisplayMoreColumn}>
							<span className="glyphicon glyphicon-pencil editColumnLogo"></span>
						</button>
					</th>
				</tr>
			</thead>
			<tbody>
				{this.state.stockHolding.map((item, idx) => (
					<tr key={idx} onClick={() => this.rowClicked(item["product"])}>
						{this.state.columns.map((column, columnIdx) => {
							if (column.isVisible) {
								// if (column.id === "qty" ||
								// 	column.id === "plannedIn" ||
								// 	column.id === "plannedOut" ||
								// 	column.id === "weight" ||
								// 	column.id === "volume") {
								// 	return <td key={columnIdx} className="px-3 text-right">{item[column.id]}</td>;
								// }

								if (column.id === "onHandQty" ||
									column.id === "onHandWeight" ||
									column.id === "expectedInQty" ||
									column.id === "expectedInWeight" ||
									column.id === "expectedOutQty") {
									return <td key={columnIdx} className="px-3 text-right">{item[column.id]}</td>;
								}
								
								return <td key={columnIdx} className="px-3 text-left">{item[column.id]}</td>;
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
				))}
			</tbody>
		</Table>

		return(
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
															<h4 className="headerTitle font-weight-bold">Stock Holding Summary</h4>
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
										<div className="form-group row mb-0">
											<div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
												<Row className="align-items-center mb-0">
													<div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
														<FormGroup>
															<InputGroup>
																<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
																	<Card className="form-group row rounded-175">
																		<div className="input-group p-2">
																			<div className="input-group-prepend bg-white col-9">
																				<span className="input-group-text border-0 rounded-left-175 bg-white p-0">
																					<i className="fa fa-search fa-2x iconSpace" />
																				</span>
																				<input type="text" className="form-control border-0" placeholder="Type here to Search" />
																			</div>
																			<div className="col-3 text-right">
																				<Button className={"circle" + (this.state.showFilter ? " active" : "")} onClick={this.triggerShowFilter}>
																					<i className="fa fa-sliders" />
																				</Button>

																				{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}

																				<button type="submit" className="search rounded-175">
																					<strong>Search</strong>
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
																							{/* <ButtonDropdown isOpen={this.state.filterStockHolding.showPopup}
																											toggle={this.toggleAddFilterStockHolding}>
																								<DropdownToggle className="custom-dropDown">
																									{item.text}
																									<hr className={this.state.filterStockHolding.showPopup ? "ml-0 mt-1 mb-1 mr-0" : "d-none"}/>
																									<div className={this.state.filterStockHolding.showPopup ? "form-check" : "d-none"} key={key} id={key}>
																										<input type="checkbox" className="form-check-input"
																												id="" name=""
																												value=""
																												defaultChecked={false} />
																										<label className="form-check-label">EACH</label>
																									</div>
																								</DropdownToggle>
																							</ButtonDropdown> */}

																							<ul className={"select" + (item.isVisible ? " expand" : "")}
																								id="select" name="select">
																								<li className="expand-style">
																									<input type="radio" className="select-close" id={item.id + "-close"} name={item.id} value="" />
																									<span className="select-label select-label-placeholder">{item.text}</span>
																								</li>

																								<li className="select-items">
																									<input type="radio" className="select-expand"
																											id={item.id + "-opener"} name={item.id} />
																									<label className="select-closeLabel" htmlFor={item.id + "-close"} onClick={() => this.triggerChangeFilter(key)} />

																									<ul className="select-options">
																										<li className="select-option">
																											<input type="radio" className="select-input"
																											name={item.id} />
																											<label className="select-label" htmlFor={item.id + "-test123"}>TEST123</label>
																										</li>
																										<li className="select-option">
																											<input type="radio" className="select-input"
																											name={item.id} />
																											<label className="select-label option-radius" htmlFor={item.id + "-test234"}>TEST234</label>
																										</li>
																									</ul>

																									<label className="select-expandLabel" htmlFor={item.id + "-opener"} onClick={() => this.triggerChangeFilter(key)} />
																								</li>
																							</ul>
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
				
				{/* <div className="row mt-2">
					<div className="d-flex col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
						{content}
					</div>
				</div> */}

				<StockHoldingEditColumn isOpen={this.state.showEditColumn}
										toggle={this.toggleDisplayMoreColumn}
										fields={this.state.columns}
										updateTableColumn={this.updateTableColumn} />
			</React.Fragment>
		);
	}
}

export default StockHolding;