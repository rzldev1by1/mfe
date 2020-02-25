import React, { Component } from 'react';
import { Card, Col, Row, FormGroup, InputGroup } from 'reactstrap';

import axios from 'axios';
// import AppComponent from '../../AppComponent';
import { endpoint, headers } from '../../AppComponent/ConfigEndpoint';

import HeaderTitle from '../../AppComponent/HeaderTitle';
import Search from '../../AppComponent/Search';
import Dropdown from '../../AppComponent/Dropdown';
import StockHoldingTable from './StockHoldingTable';
import Paging from '../General/Paging';
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
            
            site: "",
            status: "",
            unit: "",

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 5,
			totalRows: 0,
            maxPage: 0,

			columns: [
                { id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site", type: "string", sort: false },
                { id: "client", checkboxLabelText: "Client", tableHeaderText: "Client", isVisible: true, key: "client", type: "string", sort: false },
				{ id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "product", type: "string", sort: false },
				{ id: "description", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "product_name", type: "string", sort: false },
				{ id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: false, key: "status", type: "string", sort: false },
				{ id: "uom", checkboxLabelText: "UOM", tableHeaderText: "UOM", isVisible: true, key: "packdesc_1", type: "string", sort: false },
				{ id: "on_hand_qty", checkboxLabelText: "On Hand Qty", tableHeaderText: "On Hand Qty", isVisible: true, key: "qty_lcd", type: "number", sort: false },
				{ id: "on_hand_weight", checkboxLabelText: "On Hand Weight", tableHeaderText: "On Hand Weight", isVisible: true, key: "weight", type: "number", sort: false },
				{ id: "expected_in_qty", checkboxLabelText: "Expected In Qty", tableHeaderText: "Expected In Qty", isVisible: true, key: "qty_lcd_expected", type: "number", sort: false },
				{ id: "expected_in_weight", checkboxLabelText: "Expected In Weight", tableHeaderText: "Expected In Weight", isVisible: true, key: "wgt_expected", type: "number", sort: false },
				{ id: "expected_out_qty", checkboxLabelText: "Expected Out Qty", tableHeaderText: "Expected Out Qty", isVisible: true, key: "qty_lcd_committed", type: "number", sort: false },
            ],
            masterSite: [],
            masterStatus: ["All", "Unavailable", "Available", "Released", "Part Released", "Completed"],
            masterUnit: ["EACH", "CASE", "PALLET"],
			masterResStockHolding: []
        };
        
		this.searchForm = React.createRef();
	}

	componentDidMount() {
        this.getSite();
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

    getSite = () => {   
        let self = this;

        axios.get(endpoint.getSite, {
          headers: headers
        })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            // this.props.history.push("/logins")
        })
        .then(function (result) {
            if (result) {
                self.setState({ masterSite: result });
            }
        });
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
        .then(function (result) {
            if (result.data) {
                self.setPagination(result.data);
            }
            self.setState({ isLoaded: false, isSearch: false });
        });
    }

	searchData = () => {
        const { site, status, unit } = this.state;
        let self = this;
        
		self.setState({ isLoaded: true, isSearch: true,
						currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0, displayContent: "INIT" });

		let form = self.searchForm.current;
        let params = {};
        
		params.searchParam = form.searchInput.value;
        if (site !== "") { params.site = site }
        if (status !== "") { params.status = status }
        if (unit !== "") { params.unit = unit }

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

    selectedSite = (site) => {
        this.setState({ site: site });
    }

    selectedStatus = (status) => {
        this.setState({ status: status });
    }

    selectedUnit = (unit) => {
        this.setState({ unit: unit });
    }

    showDropdown = () => {
        let masterSite = [];
        if (this.state.masterSite.length > 0) {
            this.state.masterSite.map((item) => {
                masterSite.push(item.site);
            });
        }

        let masterStatus = this.state.masterStatus.toString();
        let masterUnit = this.state.masterUnit.toString();

        return (
            <div className={"input-group filterSection" + (this.state.showFilter ? "" : " d-none")}>
                <Dropdown placeHolder="Site"
                          optionList={masterSite.toString()}
                          optionValue={masterSite.toString()}
                          getValue={this.selectedSite} />

                <Dropdown placeHolder="Status"
                        optionList={masterStatus}
                        optionValue={masterStatus}
                        getValue={this.selectedStatus} />

                <Dropdown placeHolder="UOM"
                        optionList={masterUnit}
                        optionValue={masterUnit}
                        getValue={this.selectedUnit} />
            </div>
        );
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

    firstPageClick = () => {
        if (this.state.currentPage > 1) {
            this.setState({ currentPage: 1 }, () => {
                this.changeStartIndex(1);
                this.changeLastIndex(1);
            });
        }
        return;
    }   

	nextPageClick = () => {
		if (this.state.currentPage < this.state.maxPage) {
			this.setState((prev) => { 
                currentPage: prev.currentPage++;
            }, () => {
				this.changeStartIndex(this.state.currentPage);
				this.changeLastIndex(this.state.currentPage);
			});
        }
        return;
	}

	backPageClick = () => {
		if (this.state.currentPage > 1) {
			this.setState((prev) => { 
                currentPage: prev.currentPage--;
            }, () => {
				this.changeStartIndex(this.state.currentPage);
				this.changeLastIndex(this.state.currentPage);
			});
        }
        return;
	}

    lastPageClick = () => {
        if (this.state.currentPage < this.state.maxPage) {
            let currentPage = parseInt(this.state.maxPage + 1 );

            this.setState({ currentPage: currentPage});
            this.changeStartIndex(currentPage);
            this.changeLastIndex(currentPage);
        }
        return;
    }

	render() {
		let content;
		switch (this.state.displayContent) {
			case "FOUND" :
				content =
                <StockHoldingTable isSearch={this.state.isSearch}
                                    startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                                    isActive={this.state.isActive}
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
                                                                        {this.showDropdown()}
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

                            <div className="row mt-0 p-0">
								<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <Paging lastPageClick={this.lastPageClick} backPageClick={this.backPageClick}
                                            nextPageClick={this.nextPageClick} firstPageClick={this.firstPageClick}
                                            totalRows={this.state.totalRows} displayPage={this.state.displayPage}
                                            currentPage={this.state.currentPage} maxPage={this.state.maxPage}
                                            startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
                                            isActive={this.state.isActive}
                                            numberEventClick={this.numberEventClick} />
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
