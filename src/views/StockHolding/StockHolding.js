import React, { Component } from 'react';
import { Card, Col, Row, FormGroup, InputGroup } from 'reactstrap';

import axios from 'axios';
// import AppComponent from '../../AppComponent';
import { endpoint, headers } from '../../AppComponent/ConfigEndpoint';

import HeaderTitle from '../../AppComponent/HeaderTitle';
import Search from '../../AppComponent/Search';
import StockHoldingTable from './StockHoldingTable';
import EditColumn from '../../AppComponent/EditColumn';
import './StockHolding.css';


class StockHolding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayContent: "INIT",
			isLoaded: false,
			isSearch: false,
			notFoundMessage: "",
			showFilter: true,
			isVisible: [],
			showEditColumn: false,

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,

			columns: [
                { id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site", type: "string" },
                { id: "client", checkboxLabelText: "Client", tableHeaderText: "Client", isVisible: true, key: "client", type: "string" },
				{ id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "product", type: "string" },
				{ id: "description", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "product_name", type: "string" },
				{ id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: false, key: "status", type: "string" },
				{ id: "uom", checkboxLabelText: "UOM", tableHeaderText: "UOM", isVisible: true, key: "packdesc_1", type: "string" },
				{ id: "on_hand_qty", checkboxLabelText: "On Hand Qty", tableHeaderText: "On Hand Qty", isVisible: true, key: "qty_lcd", type: "number" },
				{ id: "on_hand_weight", checkboxLabelText: "On Hand Weight", tableHeaderText: "On Hand Weight", isVisible: true, key: "weight", type: "number" },
				{ id: "expected_in_qty", checkboxLabelText: "Expected In Qty", tableHeaderText: "Expected In Qty", isVisible: true, key: "qty_lcd_expected", type: "number" },
				{ id: "expected_in_weight", checkboxLabelText: "Expected In Weight", tableHeaderText: "Expected In Weight", isVisible: true, key: "wgt_expected", type: "number" },
				{ id: "expected_out_qty", checkboxLabelText: "Expected Out Qty", tableHeaderText: "Expected Out Qty", isVisible: true, key: "qty_lcd_committed", type: "number" },
			],
			masterResStockHolding: []
		};
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

        axios.get(endpoint.stockHoldingSummary, { 
            headers: headers 
        })
        .then(res => {
            // res.isSuccess = true;
            // self.setState({ isLoaded: false })
            return res.data;				
        })
        .catch(function (error) {
            self.setState({ displayContent: "NOT_FOUND",
                            isLoaded: false, isSearch: false });
            if (error.response) {
                self.setState({ notFoundMessage: error.response.data.message });
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
						totalRows: 0, maxPage: 0, displayContent: "INIT" });

		let form = self.searchForm.current;

		// if (!searchTerm) { return };
		let params = {};
		params.searchParam = form.searchInput.value;
		if (form.filterSite.value) { params.site = form.filterSite.value; }
		if (form.filterStatus.value) { params.status = form.filterStatus.value; }
		if (form.filterUoM.value) { params.packdesc_1 = form.filterUoM.value; }

        axios.get(endpoint.stockHoldingSummary, {
            params: params,
            headers: headers
        })
		.then(res => {
			return res.data;
		})
		.catch(function (error) {
			self.setState({ displayContent: "NOT_FOUND",
							isLoaded: false,
							isSearch: false });
			if (error.response) {
				self.setState({ notFoundMessage: error.response.data.message });
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

	triggerShowFilter = (e) => {
		e.stopPropagation();
		this.setState((prevState) => {
			return { showFilter: !prevState.showFilter };
		});
	}

	toggleDisplayMoreColumn = () => {
		this.setState((prevState) => {
			return { showEditColumn: !prevState.showEditColumn }
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
				prev.currentPage++;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
        }
        return;
	}

	backPageClick = () => {
		if (this.state.currentPage > 1) {
			this.setState((prev) => {
				prev.currentPage--;
				this.changeStartIndex(prev.currentPage);
				this.changeLastIndex(prev.currentPage);
			});
        }
        return;
	}

	render() {
		let content;
		switch (this.state.displayContent) {
			case "FOUND" :
				content =
                <StockHoldingTable isSearch={this.state.isSearch}
                                    backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
                                    totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                                    currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                                    startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                                    isActive={this.state.isActive}
                                    numberEventClick={this.numberEventClick}
                                    columns={this.state.columns}
                                    masterResource={this.state.masterResStockHolding}
                                    rowClicked={this.rowClicked}
                                    toggleDisplayMoreColumn={this.toggleDisplayMoreColumn}
                                    history={this.props.history} />
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
                                <HeaderTitle headerTitle="Stock Holding Summary" />
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
                                                                        <Search showFilter={this.state.showFilter}
                                                                                triggerShowFilter={this.triggerShowFilter}
                                                                                searchData={this.searchData}
                                                                                placeholder="Enter a Product or Description" />
                                                                        <div className={"input-group filterSection" + (this.state.showFilter ? "" : " d-none")}>
                                                                            <Col className="filterDropdown arrow-icon">
                                                                                <select className="form-control selectDropdown" id="filterSite" name="filterSite">
                                                                                    <option value="">Site</option>
                                                                                    <option value="M">Site M</option>
                                                                                    <option value="S">Site S</option>
                                                                                </select>
                                                                            </Col>

                                                                            <Col className="filterDropdown arrow-icon">
                                                                                <select className="form-control selectDropdown" id="filterStatus" name="filterStatus">
                                                                                    <option value="">Status</option>
                                                                                    <option value="Q">Status Q</option>
                                                                                    <option value="D">Status D</option>
                                                                                    <option value="E">Status E</option>
                                                                                    <option value="I">Status I</option>
                                                                                    <option value="F">Status F</option>
                                                                                </select>
                                                                            </Col>

                                                                            <Col className="filterDropdown arrow-icon">
                                                                                <select className="form-control selectDropdown" id="filterUoM" name="filterUoM">
                                                                                    <option value="">UOM</option>
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
				<EditColumn isOpen={this.state.showEditColumn}
                            toggle={this.toggleDisplayMoreColumn}
                            fields={this.state.columns}
                            updateTableColumn={this.updateTableColumn} />
			</React.Fragment>
		);
	}
}

export default StockHolding;
