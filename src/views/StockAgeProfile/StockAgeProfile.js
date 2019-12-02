import React, { Component } from 'react';
import { Card, CardBody,
		 Row, Table,
		 Button,
		 FormGroup, InputGroup
} from 'reactstrap';
import Paging from '../General/Paging';

class StockAgeProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: [],
			isLoaded: false,
			isSearch: false,
			displayContent: "INIT",
			showFilter: true,

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 5,
			maxPage: 5,

			column: [
				{ id: "site" },{ id: "productId" }, { id: "description" },
				 { id: "uom" },
				{ id: "lively" }, { id: "acceptable" }, { id: "marginal" }, { id: "shelfLife" }, { id: "dead" },
				{ id: "onHand" }, { id: "expectedIn" }, { id: "expectedOut" }
			],

			stockAgeProfile: [
				{ site: "A", productId: "TEST123", description: "1234567890ABCDEFGHIJ",
				  uom: "EACH",
				  lively: 10, acceptable: 10, marginal: 10, shelfLife: 10, dead: 10,
				  onHand: 50, expectedIn: 20, expectedOut: 25
				},
				{ site: "A", productId: "TEST123", description: "1234567890ABCDEFGHIJ",
				  uom: "EACH",
				  lively: 10, acceptable: 10, marginal: 10, shelfLife: 10, dead: 10,
				  onHand: 50, expectedIn: 20, expectedOut: 25
				},
				{ site: "A", productId: "TEST123", description: "1234567890ABCDEFGHIJ",
				  uom: "EACH",
				  lively: 10, acceptable: 10, marginal: 10, shelfLife: 10, dead: 10,
				  onHand: 50, expectedIn: 20, expectedOut: 25
			  	},
				{ site: "A", productId: "TEST123", description: "1234567890ABCDEFGHIJ",
				  uom: "EACH",
				  lively: 10, acceptable: 10, marginal: 10, shelfLife: 10, dead: 10,
				  onHand: 50, expectedIn: 20, expectedOut: 25
			  	},
				{ site: "A", productId: "TEST123", description: "1234567890ABCDEFGHIJ",
				  uom: "EACH",
				  lively: 10, acceptable: 10, marginal: 10, shelfLife: 10, dead: 10,
				  onHand: 50, expectedIn: 20, expectedOut: 25
			  	},
				{ site: "A", productId: "TEST123", description: "1234567890ABCDEFGHIJ",
				  uom: "EACH",
				  lively: 10, acceptable: 10, marginal: 10, shelfLife: 10, dead: 10,
				  onHand: 50, expectedIn: 20, expectedOut: 25
			  	}
			],
			masterResStockAgeProfile: []
		}
		// this.getLocalStorageColumn();
	}

	// getLocalStorageFilterData = () => {
	// 	// let self = this;
	// 	if (localStorage.getItem("filterStockHolding") && localStorage.getItem("filterStockHolding") !== "undefined") {
	// 		let filterItem = JSON.parse(localStorage.getItem("filterStockHolding"));
	// 		if (filterItem) {
	// 			// this.state.filterStockHolding = filterItem
	// 			this.setState(() => {
	// 				return { filterStockHolding: filterItem };
	// 			});
	// 		};
	// 	} else {
	// 		localStorage.setItem("filterStockHolding", JSON.stringify(this.state.filterStockHolding));
	// 	}
	// }

	// updateFilterData = (filterStockHolding) => {
	// 	if (localStorage.getItem("filterStockHolding")) {
	// 		localStorage.removeItem("filterStockHolding");
	// 		localStorage.setItem("filterStockHolding", JSON.stringify(filterStockHolding))
	// 	}
	// }

	// toggleAddFilterStockHolding = () => {
	// 	// if (this.state.masterResStockAgeProfile.length > 0) {
	// 		let filterStockHolding = this.state.filterStockHolding;
	// 		filterStockHolding.showPopup = !filterStockHolding.showPopup;

	// 		this.setState({ filterStockHolding: filterStockHolding });
	// 		this.updateFilterData(filterStockHolding);
	// 	// }
	// }

	triggerChangeFilter = (e) => {
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

	render() {
		let content;
		content =
		<div className="w-100">
		<Table className="table-condensed table-striped clickable-row rounded-bottom-175 mb-0">
			<thead>
				<tr>
					<th className="p-2 text-left border-bottom-0" rowSpan="2">Site</th>
					<th className="p-2 text-left border-bottom-0" rowSpan="2">Product ID</th>
					<th className="p-2 text-left border-bottom-0" rowSpan="2">Description</th>
					<th className="p-2 text-left border-bottom-0" rowSpan="2">UoM</th>

					<th className="p-2 text-left text-center border-left border-right border-bottom-0" colSpan="5">Age Profile</th>
					<th className="p-2 text-left text-center border-left border-right border-bottom-0" colSpan="3">Total Quantities</th>
				</tr>
				<tr>
					<th className="text-right border-left border-bottom-0 blueLabel">Lively</th>
					<th className="text-right border-bottom-0 blueLabel">Acceptable</th>
					<th className="text-right border-bottom-0 blueLabel">Marginal</th>
					<th className="text-right border-bottom-0 blueLabel">Shelf Life</th>
					<th className="text-right border-right border-bottom-0 blueLabel">Dead</th>

					<th className="text-right border-left border-bottom-0 blueLabel">On Hand</th>
					<th className="text-right border-bottom-0 blueLabel">Expected In</th>
					<th className="text-right border-right border-bottom-0 blueLabel">Expected Out</th>
				</tr>
			</thead>
			<tbody>
				{this.state.stockAgeProfile.map((item, idx) => (
					<tr key={idx}>
						{this.state.column.map((column, columnIdx) => {
							if (column.id === "site" || column.id === "productId" ||
								column.id === "description" ||
								column.id === "uom") {
									return <td key={columnIdx} className="px-2 text-left">{item[column.id]}</td>
							}
							return <td key={columnIdx} className={(column.id === "lively"?"px-2 text-right border-left":(column.id === "dead"? "px-2 text-right border-right":"px-2 text-right"))}>{item[column.id]}</td>
						})}
					</tr>
				))}
			</tbody>
		</Table>
			<div className="card-footer text-center border-company border-top-0">
				<div className="row">
						<div className="col-10">
								<Paging backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
								totalRows={this.state.totalRows} displayPage={this.state.displayPage}
								currentPage={this.state.currentPage} maxPage={this.state.maxPage}
								isActive={this.state.isActive}
								numberEventClick={this.numberEventClick} />
						</div>
						<div className="col-2 float-right pt-2">
								<button type="button" style={{width:"100%",height:"100%", "background-color":"#E0E3F2"}} className="border-0 rounded-175">
									<strong>Search</strong>
								</button>
						</div>
				</div>
			</div>
		</div>
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
															<h4 className="headerTitle font-weight-bold">Stock Age Profile</h4>
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
																	<Card className="form-group row rounded-top-175 mb-0">
																		<div className="input-group p-2">
																			<div className="input-group-prepend bg-white col-9">
																				<span className="input-group-text border-0 bg-white p-0">
																					<i className="fa fa-search fa-2x iconSpace" />
																				</span>
																				<input type="text" className="form-control border-0" placeholder="Enter a product or a description" />
																			</div>
																			<div className="col-3 text-right">
																				<Button className={"circle" + (this.state.showFilter ? " active" : "")} onClick={this.triggerChangeFilter}>
																					<i className="fa fa-sliders" />
																				</Button>

																				{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}

																				<button type="submit" className="search rounded-175">
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
			</React.Fragment>
		);
	}
}

export default StockAgeProfile;
