import React, { Component } from 'react';
import { Card, CardBody,
		 Col, Row, Table,
		 Button, ButtonDropdown,
		 FormGroup,
		 Input, InputGroup, InputGroupAddon,
		 DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { isTSEnumMember } from '@babel/types';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// import StockHoldingEditColumn from './StockHoldingEditColumn';
// import './StockHolding.css';

class StockHolding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: [],
			isLoaded: false,
			isSearch: false,
			stockHolding: [],
			displayMoreColumnModal: false,
			displayContent: "INIT",
			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,

			columns: [
				{ id: "location", checkboxLabelText: "Location", tableHeaderText: "Location", isVisible: true, key: "" },
				{ id: "locationType", checkboxLabelText: "Location Type", tableHeaderText: "Location Type", isVisible: true, key: "" },
				{ id: "packId", checkboxLabelText: "Pack ID", tableHeaderText: "Pack ID", isVisible: true, key: "" },
				{ id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "" },
				{ id: "description", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "" },
				{ id: "qty", checkboxLabelText: "Qty", tableHeaderText: "Qty", isVisible: true, key: "" },
				{ id: "plannedIn", checkboxLabelText: "Planned In", tableHeaderText: "Planned In", isVisible: true, key: "" },
				{ id: "plannedOut", checkboxLabelText: "Planned Out", tableHeaderText: "Planned Out", isVisible: true, key: "" },
				{ id: "packType", checkboxLabelText: "Pack Type", tableHeaderText: "Pack Type", isVisible: true, key: "" },
				{ id: "packSize", checkboxLabelText: "Pack Size", tableHeaderText: "Pack Size", isVisible: true, key: "" },
				{ id: "rotaDate", checkboxLabelText: "RotaDate", tableHeaderText: "RotaDate", isVisible: false, key: "" },
				{ id: "rotaType", checkboxLabelText: "RotaDate Type", tableHeaderText: "RotaDate Type", isVisible: false, key: "" },
				{ id: "dateStatus", checkboxLabelText: "Date Status", tableHeaderText: "Date Status", isVisible: true, key: "" },
				{ id: "zone", checkboxLabelText: "Zone", tableHeaderText: "Zone", isVisible: false, key: "" },
				{ id: "batch", checkboxLabelText: "Batch", tableHeaderText: "Batch", isVisible: false, key: "" },
				{ id: "ref2", checkboxLabelText: "Ref 2", tableHeaderText: "Ref 2", isVisible: false, key: "" },
				{ id: "ref3", checkboxLabelText: "Ref 3", tableHeaderText: "Ref 3", isVisible: false, key: "" },
				{ id: "ref4", checkboxLabelText: "Ref 4", tableHeaderText: "Ref 4", isVisible: false, key: "" },
				{ id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: false, key: "" },
				{ id: "alert", checkboxLabelText: "Alert", tableHeaderText: "Alert", isVisible: true, key: "" },
				{ id: "weight", checkboxLabelText: "Weight", tableHeaderText: "Weight", isVisible: true, key: "" },
				{ id: "volume", checkboxLabelText: "Volume", tableHeaderText: "Volume", isVisible: true, key: "" },
				{ id: "lastUpdated", checkboxLabelText: "Last Updated", tableHeaderText: "Last Updated", isVisible: false, key: "" },
			],
			filterData: {
				showPopup: false,
				item: {
					// "location": { text: "Location", isVisible: false },
					"locationType": { text: "Location Type", isVisible: false },
					// "packId": { text: "Pack ID", isVisible: false },
					// "product": { text: "Product", isVisible: false },
					// "descr	iption": { text: "Description", isVisible: false },
					// "qty": { text: "Qty", isVisible: false },
					// "plannedIn": { text: "Planned In", isVisible: false },
					// "plannedOut": { text: "Planned Out", isVisible: false },
					"packType": { text: "Pack Type", isVisible: false },
					// "packSize": { text: "Pack Size", isVisible: false },
					"rotaDate": { text: "RotaDate", isVisible: false },
					"rotaType": { text: "RotaDate Type", isVisible: false },
					"dateStatus": { text: "Date Status", isVisible: false },
					"zone": { text: "Zone", isVisible: false },
					// "batch": { text: "Batch", isVisible: false },
					// "ref2": { text: "Ref 2", isVisible: false },
					// "ref3": { text: "Ref 3", isVisible: false },
					// "ref4": { text: "Ref 4", isVisible: false },
					"disposition": { text: "Disposition", isVisible: false },
					"alert": { text: "Alert", isVisible: false },
					// "weight": { text: "Weight", isVisible: false },
					// "volume": { text: "Volume", isVisible: false },
					// "lastUpdated": { text: "Last Updated", isVisible: false },
				}
			},
			stockHolding: [
				{ location: "A0101A03", locationType: "Reserve", packId: "100000025",
				  product: "1001", description: "Example Product",
				  qty: "50", plannedIn: "0", plannedOut: "0",
				  packType: "EACH", packSize: "10*5",
				  rotaDate: "11/02/2019", rotaType: "R - Receipt Date",
				  dateStatus: "LIVE", zone: "A", batch: "",
				  ref2: "", ref3: "", ref4: "",
				  disposition: "", alert: "No",
				  weight: "1", volume: "1",
				  lastUpdated: ""				  				
				},
				{ location: "A0101A02", locationType: "Fixed Pickface", packId: "100000008",
				  product: "1002", description: "Example Product 2",
				  qty: "150", plannedIn: "0", plannedOut: "0",
				  packType: "EACH", packSize: "12*6",
				  rotaDate: "21/10/2019", rotaType: "R - Receipt Date",
				  dateStatus: "LIVE", zone: "B", batch: "",
				  ref2: "", ref3: "", ref4: "",
				  disposition: "", alert: "No",
				  weight: "1", volume: "1",
				  lastUpdated: ""				  				
				},
				{ location: "A0101A04", locationType: "Fixed Pickface", packId: "100000023",
				  product: "1003", description: "Example Product 3",
				  qty: "100", plannedIn: "50", plannedOut: "0",
				  packType: "EACH", packSize: "12*6",
				  rotaDate: "16/08/2019", rotaType: "R - Receipt Date",
				  dateStatus: "LIVE", zone: "C", batch: "",
				  ref2: "", ref3: "", ref4: "",
				  disposition: "", alert: "No",
				  weight: "12", volume: "1.76",
				  lastUpdated: ""				  				
				}
			],
			masterResource: []
		}
		// this.getLocalStorageColumn();
	}

	getLocalStorageFilterData = () => {
		// // let self = this;
		// if (localStorage.getItem("filterData") && localStorage.getItem("filterData") !== "undefined") {
		// 	let filterItem = JSON.parse(localStorage.getItem("filterData"));
		// 	if (filterItem) { this.state.filters = filterItem };
		// } else {
		// 	localStorage.setItem("filterData", JSON.stringify(this.state.filterData));
		// }
	}

	updateFilterData = (filterData) => {
		// if (localStorage.getItem("filterData")) {
		// 	localStorage.removeItem("filterData");
		// 	localStorage.setItem("filterData", JSON.stringify(filterData))	
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
		this.setState({ displayMoreColumnModal: !this.state.displayMoreColumnModal });
	}

	triggerChangeFilter = (e) => {
		e.stopPropagation();
	}



	render() {
		let content;
		content = 
		<Card className="init-table-content border-0">
			<CardBody className="p-0">
				<Table className="table-condensed table-responsive table-striped rounded-left-125 rounded-right-125 mb-0" size="sm">
					<thead>
						<tr>
							{this.state.columns.map((item, idx) => {
								if (item.isVisible) {
									return <th className="p-3 text-left align-middle headerBlue" key={idx}>{item.tableHeaderText}</th>
								}
							})}
						</tr>
					</thead>
					<tbody>
						{this.state.stockHolding.map((item, idx) => (
							<tr key={idx}>
								{this.state.columns.map((column, columnIdx) => {
									if (column.isVisible) {
										return <td key={columnIdx} className="px-3 text-left">{item[column.id]}</td>
									}
								})}
							</tr>
						))}
					</tbody>
				</Table>
			</CardBody>
		</Card>

		return(
			<React.Fragment>
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
															<h4 className="headerTitle">Stock Holding Summary</h4>
														</div>
													</InputGroup>
												</FormGroup>
											</div>
										</Row>
									</CardBody>
								</div>
							</div>

							<div className="row">
								<Card className="border-0 p-0">
									<div className="col-12 col-lg-12 col-md-12 col-sm-12">
										<form>
											<div className="form-group row">
												<div className="col-12 col-lg-12 col-md-12 col-sm-12">
													<Row className="align-items-center">
														<div className="col-12 col-lg-12 col-md-12 col-sm-12">
															<FormGroup>
																<InputGroup>
																	<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
																		<Card className="form-group row rounded-left-125 rounded-right-125">
																			<div className="input-group p-2">
																				<div className="input-group-prepend bg-white">
																					<span className="input-group-text col-2 border-0 rounded-left-125 bg-white">
																						<i className="fa fa-search iconSpace" />
																					</span>
																				</div>
																				<input type="text" className="form-control col-9 border-0 rounded-right-125" placeholder="Type here to Search" />
																				<div className="col-1 text-right">
																					<button type="submit" className="circle">
																						<i className="fa fa-sliders" />
																					</button>
																				</div>
																				<div className="col-1">
																					<button type="submit" className="search rounded-left-125 rounded-right-125">
																						<strong>Search</strong>
																					</button>
																				</div>
																			</div>
																		</Card>
																	</div>
																</InputGroup>
															</FormGroup>
														</div>
													</Row>

													<Row className="align-items-center">
														<div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0">
															{content}
														</div>
													</Row>
												</div>
											</div>
										</form>
									</div>
								</Card>
							</div>

							{/* <div className="row">
								<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
									{content}
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default StockHolding;