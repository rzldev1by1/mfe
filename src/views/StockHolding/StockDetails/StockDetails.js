import React, { Component } from 'react';
import { Card, CardBody,
		 Row, Table,
		//  Button, ButtonDropdown,
		 FormGroup, InputGroup,
		 Label,
		//  Input, InputGroup, InputGroupAddon,
		//  DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';
// import { Link } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { isTSEnumMember } from '@babel/types';

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
				{ id: "site", checkboxLabelText: "Location", tableHeaderText: "Location", isVisible: true, key: "" },
				{ id: "batch", checkboxLabelText: "Location Type", tableHeaderText: "Location Type", isVisible: true, key: "" },
				{ id: "qty", checkboxLabelText: "Qty", tableHeaderText: "Qty", isVisible: true, key: "" },
				{ id: "packType", checkboxLabelText: "Pack Type", tableHeaderText: "Pack Type", isVisible: true, key: "" },
				{ id: "packSize", checkboxLabelText: "Pack Size", tableHeaderText: "Pack Size", isVisible: true, key: "" },
				{ id: "weight", checkboxLabelText: "Weight", tableHeaderText: "Weight", isVisible: true, key: "" },
				{ id: "volume", checkboxLabelText: "Volume", tableHeaderText: "Volume", isVisible: true, key: "" },,
				{ id: "rotaDate", checkboxLabelText: "RotaDate", tableHeaderText: "RotaDate", isVisible: true, key: "" },
				{ id: "dateStatus", checkboxLabelText: "Date Status", tableHeaderText: "Date Status", isVisible: false, key: "" },
				{ id: "ref2", checkboxLabelText: "Ref 2", tableHeaderText: "Ref 2", isVisible: true, key: "" },
				{ id: "ref3", checkboxLabelText: "Ref 3", tableHeaderText: "Ref 3", isVisible: true, key: "" },
				{ id: "ref4", checkboxLabelText: "Ref 4", tableHeaderText: "Ref 4", isVisible: false, key: "" },
				{ id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: false, key: "" },
				{ id: "alert", checkboxLabelText: "Alert", tableHeaderText: "Alert", isVisible: true, key: "" }
			],
			stockDetails: [
				{ site: "C", batch: "1203912309",
				  qty: "50", packType: "EACH", packSize: "10*5",
				  weight: "1", volume: "1",
				  rotaDate: "11/02/2019", dateStatus: "LIVE",
				  ref2: "", ref3: "", ref4: "",
				  disposition: "", alert: "No",
				},
				{ site: "F", batch: "1203912309",
				  qty: "87", packType: "EACH", packSize: "10*5",
				  weight: "12", volume: "12",
				  rotaDate: "11/02/2019", dateStatus: "LIVE",
				  ref2: "", ref3: "", ref4: "",
				  disposition: "", alert: "No",
				},
				{ site: "E", batch: "1203912309",
				  qty: "90", packType: "EACH", packSize: "10*5",
				  weight: "11", volume: "13",
				  rotaDate: "11/02/2019", dateStatus: "LIVE",
				  ref2: "", ref3: "", ref4: "",
				  disposition: "", alert: "No",
				},
				{ site: "C", batch: "1203912309",
				  qty: "150", packType: "EACH", packSize: "10*5",
				  weight: "20", volume: "20",
				  rotaDate: "11/02/2019", dateStatus: "LIVE",
				  ref2: "", ref3: "", ref4: "",
				  disposition: "", alert: "No",
				},
				{ site: "F", batch: "1203912309",
				  qty: "250", packType: "EACH", packSize: "10*5",
				  weight: "125", volume: "100",
				  rotaDate: "11/02/2019", dateStatus: "LIVE",
				  ref2: "", ref3: "", ref4: "",
				  disposition: "", alert: "No",
				}
			],
			masterResource: []
		}
		// this.getLocalStorageColumn();
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
						{this.state.stockDetails.map((item, idx) => (
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
															<h4 className="headerTitle">Stock Details</h4>
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
																			<div className="col-12">
																				<div className="row">
																					<div className="col-3">
																						<Label className="font-weight-bold">Product ID</Label>
																					</div>
																					<div className="col-3">
																						<label>10002</label>
																					</div>

																					<div className="col-3">
																						<Label className="font-weight-bold">Stock On Hand</Label>
																					</div>
																					<div className="col-3">
																						<label>75</label>
																					</div>
																				</div>

																				<div className="row">
																					<div className="col-3">
																						<Label className="font-weight-bold">Product Name</Label>
																					</div>
																					<div className="col-3">
																						<label>Example Product 2</label>
																					</div>
																					
																					<div className="col-3">
																						<Label className="font-weight-bold">Allocated Qty</Label>
																					</div>
																					<div className="col-3">
																						<label>0</label>
																					</div>
																				</div>

																				<div className="row">
																					<div className="col-3">
																						<Label className="font-weight-bold">UoM</Label>
																					</div>
																					<div className="col-3">
																						<label>EACH</label>
																					</div>
																					
																					<div className="col-3">
																						<Label className="font-weight-bold">Available Qty</Label>
																					</div>
																					<div className="col-3">
																						<label>75</label>
																					</div>
																				</div>

																				<div className="row">
																					<div className="col-3">
																						<Label className="font-weight-bold">RotaDate Type</Label>
																					</div>
																					<div className="col-3">
																						<label>R - Receipt Date</label>
																					</div>
																					
																					<div className="col-3">
																						<Label className="font-weight-bold">On Purchase Qty</Label>
																					</div>
																					<div className="col-3">
																						<label>0</label>
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