import React, { Component } from 'react';
import { Card, CardBody,
		 Row,
		 FormGroup, InputGroup,
		 Label,
		 Nav, NavItem, NavLink,
		 TabContent, TabPane } from 'reactstrap';

import axios from 'axios';
import { endpoint, headers } from '../../../AppComponent/ConfigEndpoint';
import { tab1, tab1Inactive, tab2, tab2Inactive } from '../../../AppComponent/Helper';

import mid from '../../../assets/img/brand/field-idle.png';
import down from '../../../assets/img/brand/field-bot.png';
import up from '../../../assets/img/brand/field-top.png';

import StockDetails from './StockDetails';
import StockBalanceForecast from './StockBalanceForecast';


class StockHoldingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// isVisible: [],
			isLoaded: false,
			activeTab: "1",
			displayContent: "INIT",
			UoM: [],

			stockHolding: [],
			isStockDetails: false,
			stockDetails: [],
			isForeshadowedBalance: false,
            stockBalanceForecast: [],
						openingBalance:0,
						closingBalance:0,
						openingDate:"",
						closingDate:"",
            notFoundMessage: "",


            stockDetailsColumns: [
				{ id: "rotadate", checkboxLabelText: "Rotadate", tableHeaderText: "Rotadate", isVisible: true, key: "rotadate", type: "string", sort: mid },
				{ id: "batch", checkboxLabelText: "Batch", tableHeaderText: "Batch", isVisible: true, key: "batch", type: "string", sort: mid },
				{ id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: true, key: "disposition", type: "string", sort: mid },
				{ id: "ref3", checkboxLabelText: "Ref 3", tableHeaderText: "Ref 3", isVisible: true, key: "ref3", type: "string", sort: mid },
				{ id: "ref4", checkboxLabelText: "Ref 4", tableHeaderText: "Ref 4", isVisible: true, key: "ref4", type: "string", sort: mid },
				{ id: "qty", checkboxLabelText: "Qty", tableHeaderText: "Qty", isVisible: true, key: "qty", type: "number", sort: mid }
            ],

			foreshadowedColumns: [
				{ id: "type", checkboxLabelText: "Type of Displacement", tableHeaderText: "Type of Displacement", isVisible: true, key: "type", type: "string", sort: mid },
				{ id: "id", checkboxLabelText: "Customer No.", tableHeaderText: "Customer No.", isVisible: true, key: "company", type: "string", sort: mid },
				{ id: "order_no", checkboxLabelText: "Order No", tableHeaderText: "Order No", isVisible: true, key: "orderno", type: "string", sort: mid },
				{ id: "effectivedate", checkboxLabelText: "Order Date", tableHeaderText: "Order Date", isVisible: true, key: "effectivedate", type: "date", sort: mid },
				{ id: "qty_rec", checkboxLabelText: "Expected In", tableHeaderText: "Expected In", isVisible: true, key: "qtyexpected", type: "number", sort: mid },
				{ id: "qtycommitted", checkboxLabelText: "Expected Out", tableHeaderText: "Expected Out", isVisible: true, key: "qtycommitted", type: "number", sort: mid },
				{ id: "balance", checkboxLabelText: "Balance", tableHeaderText: "Balance", isVisible: true, key: "balance", type: "number", sort: mid }
            ]
		}
	}

	componentDidMount() {
		this.loadStockHolding();
	}

	loadStockHolding = () => {
		let self = this;
        // let productId = this.props.history.location.pathname.substring(20);
        let productId = decodeURIComponent(this.props.match.params.productId);
        let client = decodeURIComponent(this.props.match.params.client);
        let site = decodeURIComponent(this.props.match.params.site);
		let params = {
            "client": client,
            "site": site
        };

		self.setState({ isLoaded: true });

		axios.get(endpoint.stockHoldingDetail + productId, {
            params: params,
            headers: headers
		})
		.then(res => {
			// res.isSuccess = true;
			return res.data;
		})
		.catch(function (error) {
            self.setState({ displayContent: "NOT_FOUND",
                            notFoundMessage: error.response ? error.response.data.message : "Failed to process your data" });
			return error;
		})
		.then(function(result) {
			if (result.data) {
				let respondRes = result.data;
				self.setState({ displayContent: "FOUND",
                                stockHolding: respondRes });
                // localStorage.setItem("masterResStockHolding", JSON.stringify(respondRes));

                self.loadStockDetails();
                self.loadForeshadowed();
            }
            return;
		});
    }

	loadStockDetails = () => {
        let self = this;
        let productId = decodeURIComponent(this.props.match.params.productId);
        let client = decodeURIComponent(this.props.match.params.client);
        let site = decodeURIComponent(this.props.match.params.site);
        let params = {
            "client": client,
            "site": site
        };

		axios.get(endpoint.stockDetail + productId, {
            params: params,
            headers: headers
        })
		.then(res => {
			// res.isSuccess = true;
			return res.data;
		})
		.catch(function (error) {
            self.setState({ displayContent: "NOT_FOUND",
                            notFoundMessage: error.response ? error.response.data.message : "Failed to process your data" });
			return error;
		})
		.then(function(result) {
            if (result.data) {
                self.setState({ isStockDetails: true, stockDetails: result.data });
            }
            return;
		});
	}

	loadForeshadowed = () => {
        let self = this;
        let productId = decodeURIComponent(this.props.match.params.productId);
        let client = decodeURIComponent(this.props.match.params.client);
        let site = decodeURIComponent(this.props.match.params.site);
        let params = {
            "client": client,
            "site": site
        };

		self.setState({ isLoaded: true });

		axios.get(endpoint.stockBalanceForecast + productId, {
            headers: headers,
            params: params
        })
		.then(res => {
			// res.isSuccess = true;
			// self.setState({ isLoaded: false })

			return res.data;
		})
		.catch(function (error) {
            self.setState({ displayContent: "NOT_FOUND",
                            notFoundMessage: error.response ? error.response.data.message : "Failed to process your data" });
			return error;
		})
		.then(function(result) {
						if (result) {
								let history = result.history;
								let openingDate = "";
								let closingDate = "";
								if(history.length){
									openingDate = history[0]["effectivedate"];
									closingDate = history[history.length - 1]["effectivedate"];
								}
                self.setState({ isForeshadowedBalance: true, stockBalanceForecast: result.history,
									openingBalance:result.openingBalance, closingBalance:result.closingBalance,
									openingDate:openingDate,closingDate:closingDate });
            }
            self.setState({ isLoaded: false });
            return;
		});
    }

	activeTabIndex = (tabIndex) => {
		if (this.state.activeTab !== tabIndex) {
			this.setState({ activeTab: tabIndex });
		}
	}

    arrowHandler = (section, idx, sortBy) => {
        let sortColumns = section === "stockDetails" ? [...this.state.stockDetailsColumns] : [...this.state.foreshadowedColumns];
        let sortValue = sortColumns[idx]["sort"];

        sortColumns = sortColumns.map((el) => {
            el.sort = mid;
            return el;
        });

        sortColumns[idx]["sort"] = sortValue !== mid && sortValue === down ? up : down;

        this.setState({ columns: sortColumns });

        this.sortHandler(section, idx, sortBy);
    }

    sortHandler = (section, idx, sortBy) => {
        let columns = section === "stockDetails" ? [...this.state.stockDetailsColumns] : [...this.state.foreshadowedColumns];
        let data = section === "stockDetails" ? [...this.state.stockDetails] : [...this.state.stockBalanceForecast];

        data.sort((a, b) => {
            if (a[sortBy] !== undefined && b[sortBy] !== undefined) {
                if (columns[idx]["sort"] === down) {
                    if (a[sortBy] < b[sortBy]) return -1;
                    if (a[sortBy] > b[sortBy]) return 1;
                    return 0;
                } else {
                    // if (a[sortBy] !== undefined && b[sortBy] !== undefined) {
                        if (a[sortBy] < b[sortBy]) return 1;
                        if (a[sortBy] > b[sortBy]) return -1;
                        return 0;
                    // }
                }
            }
        });

        if (section === "stockDetails") {
            this.setState({ stockDetails: data });
        } else {
            this.setState({ stockBalanceForecast: data });
        }
    }

    showStockBalanceForecast = (stockHolding) => {
        let isValid = true;

        if (stockHolding.length > 0) {
            let stockOnHand = parseInt(stockHolding[0]["stock_on_hand"]);
            let expectedIn = parseInt(stockHolding[0]["expected_in_qty"]);
            let expectedOut = parseInt(stockHolding[0]["expected_out_qty"]);

            if (expectedIn === 0 && expectedOut === 0 && (stockOnHand + expectedIn) >= expectedOut) isValid = false;
        }

        return isValid;
    }

		gotoSummary = () => {
			this.props.history.push('/stock/stockholding');
		}

	render() {
		const { stockHolding, activeTab,stockBalanceForecast } = this.state;

		let content;
		switch (this.state.displayContent) {
			case "FOUND" :
				content =
				<div className="animated fadeIn">
					<div className="row">
						<div className="col-12 p-0">
							<div className="row pl-3">
								<div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                    <CardBody className="pt-2 pb-0 pl-1 pt-3">
                                        <Row className="align-items-center pl-0">
                                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 pr-0">
                                                <FormGroup className="mb-0">
                                                    <InputGroup>
                                                        <div className="col-12 col-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                                            {/* <Breadcrumb>
                                                                <BreadcrumbItem>
                                                                    <a href="#" className="breadcrumb">Detailed Information</a>
                                                                </BreadcrumbItem>
                                                                <BreadcrumbItem active>
                                                                    {decodeURIComponent(this.props.match.params.product)}
                                                                </BreadcrumbItem>
                                                            </Breadcrumb> */}
                                                            <div className="headerTitle">
                                                                <h2 onClick={(e)=>{this.gotoSummary()}} style={{ marginRight: "20px", cursor:"pointer" }}>Stock Holding Summary</h2>
                                                                <h2 style={{ marginRight: "20px" }}><i className="iconU-rightArrow" style={{ fontSize: "20px" }} /></h2>
                                                                <h2 style={{ marginRight: "20px",color:"#22ABE3" }}>{decodeURIComponent(this.props.match.params.productId)}</h2>
                                                            </div>
                                                        </div>
                                                    </InputGroup>
                                                </FormGroup>
                                            </div>
                                        </Row>
                                    </CardBody>
								</div>
							</div>

							<div className="row pl-1">
								<div className="col-12 col-lg-12 col-md-12 col-sm-12">
									<div className="form-group row">
										<div className="col-12 col-lg-12 col-md-12 col-sm-12">
                                            <CardBody className="pb-0 pl-0 pt-2">
                                                <Row className="align-items-center ml-0">
                                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 pr-0">
                                                        <FormGroup>
                                                            <InputGroup>
                                                                <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0">
                                                                    <Card className="form-group row rounded-top-05 mb-0 border-0">
                                                                        <div className="col-12 pb-2 pt-3 pl-3">
                                                                            <div className="row">
                                                                                <div className="col-2">
                                                                                    <Label className="primary-text">Product</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    <Label className="secondary-text">{stockHolding[0]["product"]}</Label>
                                                                                </div>

                                                                                <div className="col-2 borderLeft">
                                                                                    <Label className="primary-text">Stock On Hand</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    <Label className="secondary-text">{stockHolding[0]["stock_on_hand"]}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-2">
                                                                                    <Label className="primary-text">Description</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    <Label className="secondary-text">{stockHolding[0]["description"]}</Label>
                                                                                </div>

                                                                                <div className="col-2 borderLeft">
                                                                                    <Label className="primary-text">Available Qty</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    <Label className="secondary-text">{stockHolding[0]["available_qty"]}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-2">
                                                                                    <Label className="primary-text">Site</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    <Label className="secondary-text">{stockHolding[0]["site"]}</Label>
                                                                                </div>
                                                                                <div className="col-2 borderLeft">
                                                                                    <Label className="primary-text">Expected In Qty</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    <Label className="secondary-text">{stockHolding[0]["expected_in_qty"]}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-2">
                                                                                    <Label className="primary-text">Client</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    {/* <Label className="secondary-text">{this.state.UoM}</Label> */}
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["client"] : null}</Label>
                                                                                </div>

                                                                                <div className="col-2 borderLeft">
                                                                                    <Label className="primary-text">Expected Out Qty</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["expected_out_qty"] : null}</Label>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row">
                                                                                <div className="col-2">
                                                                                    <Label className="primary-text">UOM</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    {/* <Label className="secondary-text">{this.state.UoM}</Label> */}
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["uom"] : null}</Label>
                                                                                </div>

                                                                                <div className="col-2 borderLeft">
                                                                                    <Label className="primary-text">Rotadate Type</Label>
                                                                                </div>
                                                                                <div className="col-4">
                                                                                    <Label className="secondary-text">{stockHolding.length > 0 ? stockHolding[0]["rotadate_type"] : null}</Label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Card>
                                                                </div>
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </div>
                                                </Row>

                                                <Row className="align-items-center ml-0">
                                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 pl-0 pr-0">
                                                        <Nav tabs>
                                                            <div className="input-group">
                                                                <NavItem className="pl-0 pr-0">
                                                                    <NavLink className={"nav-link-cust" + (activeTab === "1" ? " tab-custom" : "")} active={this.state.activeTab === "1"} onClick={() => this.activeTabIndex("1")}>
                                                                        <div className="row rowTabCustom align-items-center">
                                                                            <span className="tabTitleText">
                                                                                {activeTab === "1" ? tab1() : tab1Inactive()} Stock Details
                                                                            </span>
                                                                        </div>
                                                                    </NavLink>
                                                                </NavItem>

                                                                <NavItem className={"pl-2 pr-0 "+(stockBalanceForecast.length?'':'d-none')}>
                                                                    <NavLink className={"nav-link-cust" + (activeTab === "2" ? " tab-custom" : "")} active={this.state.activeTab === "2"} onClick={() => this.activeTabIndex("2")}>
                                                                        <div className="row rowTabCustom align-items-center">
                                                                            <span className="tabTitleText">
                                                                                {activeTab === "2" ? tab2() : tab2Inactive()} Stock Balance Forecast
                                                                            </span>
                                                                        </div>
                                                                    </NavLink>
                                                                </NavItem>
                                                            </div>
                                                        </Nav>
                                                    </div>
                                                </Row>

                                                <Row className="align-items-center ml-0">
                                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mt-0 pl-0 pr-0">
                                                        <TabContent className="border-0" activeTab={this.state.activeTab}>
                                                            <TabPane className="p-0" tabId="1">
                                                                <StockDetails isStockDetails={this.state.isStockDetails}
                                                                              stockDetails={this.state.stockDetails}
                                                                              stockDetailsColumns={this.state.stockDetailsColumns}
                                                                              sortHandler={this.sortHandler}
                                                                              arrowHandler={this.arrowHandler} />
                                                            </TabPane>
                                                            <TabPane className={this.showStockBalanceForecast(stockHolding) ? "p-0" : "d-none"} tabId="2">
                                                                <StockBalanceForecast isForeshadowedBalance={this.state.isForeshadowedBalance}
                                                                                      stockBalanceForecast={this.state.stockBalanceForecast}
                                                                                      foreshadowedColumns={this.state.foreshadowedColumns}
                                                                                      sortHandler={this.sortHandler}
                                                                                      arrowHandler={this.arrowHandler}
																																											openingBalance={this.state.openingBalance}
																																											openingDate={this.state.openingDate}
																																											closingBalance={this.state.closingBalance}
																																											closingDate={this.state.closingDate} />
                                                            </TabPane>
                                                        </TabContent>
                                                    </div>
                                                </Row>
                                            </CardBody>
										</div>
									</div>
								</div>
							</div>
                        </div>
                    </div>
				</div>
			break;

            case "NOT_FOUND" :
                content =
                <div className="col-12 d-flex h-100 position-relative">
                    <div className="d-flex h-100 position-relative">
                        <p className="notFoundMessage">{this.state.notFoundMessage ? this.state.notFoundMessage : "Data not found"}</p>
                    </div>
                </div>
            break;

			default :
				content =
				<div className="col-12 d-flex h-100 position-relative">
					<div className="bg-transparent mx-auto my-auto text-center">
                        <div className={"spinner" + (this.state.isLoaded ? "" : " d-none")} />
					</div>
				</div>
        }

		return <React.Fragment>{content}</React.Fragment>;
	}
}

export default StockHoldingDetails;
