import React, { Component } from 'react';
import { Card, Col, Row, FormGroup, InputGroup } from 'reactstrap';

import axios from 'axios';

import { endpoint, headers } from '../../AppComponent/ConfigEndpoint';

import mid from '../../assets/img/brand/field-idle.png';
import down from '../../assets/img/brand/field-bot.png';
import up from '../../assets/img/brand/field-top.png';

import HeaderTitle from '../../AppComponent/HeaderTitle';
import Search from '../../AppComponent/Search';
import Dropdown from '../../AppComponent/Dropdown';
import StockHoldingTable from './StockHoldingTable';
import Paging from '../../AppComponent/PagingNew';
import EditColumn from '../../AppComponent/EditColumn';
import Export from '../../AppComponent/Export'
import Authentication from '../../Auth/Authentication'
import './StockHolding.css';


class StockHolding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tampil: [],
			data: [],
			main:[],
			displayContent: "INIT",
			isLoaded: false,
			isSearch: false,
			notFoundMessage: "",
			showFilter: true,
			isVisible: [],
			showEditColumn: false,

			site: "",
			unit: "",
			status: "",

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,

			columns: [
				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site",type: "string",style:{width:"4%"},  sort: mid },
				{ id: "client", checkboxLabelText: "Client", tableHeaderText: "Client", isVisible: true, key: "client",type: "string",style:{width:"5%"}, sort: mid },
				{ id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "product", type: "string",style:{width:"5%"}, sort: mid },
				{ id: "product_name", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "product_name", type: "string",style:{width:"10%"}, sort: mid },
				{ id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: false, key: "disposition",type: "string",style:{width:"5%"}, sort: mid },
				{ id: "uom", checkboxLabelText: "UOM", tableHeaderText: "UOM", isVisible: true, key: "packdesc_1", type: "string",style:{width:"5%"}, sort: mid },
				{ id: "status", checkboxLabelText: "Status", tableHeaderText: "Status", isVisible: true, key: "status", type: "string",style:{width:"5%"}, sort: mid },
				{ id: "on_hand_qty", checkboxLabelText: "Stock On Hand", tableHeaderText: "Stock \n On Hand", isVisible: true, key: "on_hand_qty",type: "number",style:{width:"10%"}, sort: mid },
				{ id: "weight", checkboxLabelText: "On Hand Wgt", tableHeaderText: "On Hand \n Weight", isVisible: true, key: "weight", type: "number",style:{width:"10%"}, sort: mid },
				{ id: "expected_in_qty", checkboxLabelText: "Expected In Qty", tableHeaderText: "Expected \n In Qty", isVisible: true, key: "expected_in_qty",type: "number",style:{width:"10%"}, sort: mid },
				{ id: "expected_in_wgt", checkboxLabelText: "Expected In Wgt", tableHeaderText: "Expected \n In Weight", isVisible: true, key: "expected_in_wgt", type: "number",style:{width:"10%"}, sort: mid },
				{ id: "expected_out_qty", checkboxLabelText: "Expected Out Qty", tableHeaderText: "Expected \n Out Qty", isVisible: true, key: "expected_out_qty", type: "number",style:{width:"10%"}, sort: mid },
				{ id: "price", checkboxLabelText: "Price", tableHeaderText: "Price", isVisible: false, key: "price", type: "number",style:{width:"5%"}, sort: mid },
				{ id: "pallets", checkboxLabelText: "Pallets", tableHeaderText: "Pallets", isVisible: false, key: "pallet",type: "string",style:{width:"5%"}, sort: mid },
			],
			masterSite: [],
			masterUnit: ["MLB : MICROLISTICS", "MLS : Microlistics", "MLM : MICROLISTICS"],
			masterStatus: ["All Status","Ok", "Shortage"],
			masterResStockHolding: [],
			statusFilter: 'All',
			resetDropdownProcessed: false
		};

		this.searchForm = React.createRef();
	}

	componentDidMount() {
		this.getclient();
		this.getSite();
		this.loadStockHolding();
	}

	getLocalStorageColumnData = () => {

	}

	updateTableColumn = (columns) => {

		this.setState({ columns: columns });

	}

	unAuthorizeAAccess = (error) => {
		if(error.status === 401)
			this.props.history.push('/login');
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

		self.setState({
			displayContent: "FOUND",
			masterResStockHolding: respondRes,
			totalRows: respondRes.length
		});

		// self.numberEventClick(self.state.currentPage);
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
				this.unAuthorizeAAccess(error);
			})
			.then(function (result) {
				if (result) {
					self.setState({ masterSite: result });
				}
			});
	}
	getclient = () => {
		axios.get(endpoint.getClient, {
			headers: headers
		})
			.then(res => {
				const result = res.data
				this.setState({ clientdata: result })
			})
			.catch(error => {
				this.unAuthorizeAAccess(error);
			})
	}

	loadStockHolding = (page) => {
		let self = this;
		self.setState({
			isLoaded: true, isSearch: true,
			currentPage: 1,
			startIndex: 0, lastIndex: 0,
			totalRows: 0, maxPage: 0
		});
		
		let site_ = Authentication.getSite() 
		let url = "?"
		let pages = '&&page='+page
		if(site_ !== ""){
			url = 'site=' + site_
		}

		if(page) url+=  pages
  
		axios.get(endpoint.stockHoldingSummary+url, {
			headers: headers
		})
			.then(res => {
				// console.log(res.data.data.data);
				return res.data;
			})
			.catch(function (error) {
				self.unAuthorizeAAccess(error);
				self.setState({
					displayContent: "NOT_FOUND",
					isLoaded: false, isSearch: false
				});
				if (error.response) {
					self.setState({ notFoundMessage: error.response.data.message });
				}
				return error;
			})
			.then(function (result) {
				console.log(result.data.data);
				if (result.data.data) {					
					self.setPagination(result.data.data);
				}
				// self.setState({ isLoaded: false, isSearch: false });
				self.setState({ isLoaded: false, isSearch: false, main:result.data, masterResStockHolding:result.data.data, displayContent:"FOUND"});
			});
	}

	searchTextValue = (paramText) => {
		if(paramText)	
			return paramText;
		else
			return "";
	}

	searchData = () => {
		const { site, status, unit, clientSelected } = this.state;
		let self = this;

		self.setState({ statusFilter: status });

		self.setState({
			isLoaded: true, isSearch: true,
			currentPage: 1,
			startIndex: 0, lastIndex: 0,
			totalRows: 0, maxPage: 0, displayContent: "INIT"
		});

		let form = self.searchForm.current;
		let params = {};

		params.searchParam = form.searchInput.value;
		if (site !== "") { params.site = site }
		if (unit !== "") { params.unit = unit }
		if (status !== "") { params.status = status }
		if (clientSelected !== "") { params.client = clientSelected }

		axios.get(endpoint.stockHoldingSummary, {
			params: params,
			headers: headers
		})
			.then(res => {
				return res.data;
			})
			.catch(function (error) {
				self.unAuthorizeAAccess(error);
				self.setState({
					displayContent: "NOT_FOUND",
					isLoaded: false,
					isSearch: false
				});
				if (error.response) {
					self.setState({ notFoundMessage: error.response.data.message });
				}
				return error;
			})
			.then(function (result) {
				self.setState({ isLoaded: false, isSearch: false, main:result.data, masterResStockHolding:result.data.data, displayContent:"FOUND", isLoaded:false, isSearch:false});;
			});
	}

	selectedSite = (site) => {
		this.setState({ site: site });
	}

	selectedUnit = (unit) => {
		this.setState({ unit: unit });
	}

	selectedStatus = (status) => {
		this.setState({ status: status });
	}
	getClientSelected = (value) => {
		this.setState({ clientSelected: value });
	};

	resetDropdown = () => {
		this.setState({ site: null, status: null, clientSelected: null, resetDropdownProcessed: true }, () => this.setState({ resetDropdownProcessed: false }))
	}


	showDropdown = () => {
		let clientName = ["All Clients"];
		let clientValue = ["all"];
		let masterSite = ["All Sites"];
		let masterSiteValue = ["all"];
		let Masterstatus = []; 
		if (this.state.masterSite.length > 0) {
			this.state.masterSite.map((item) => {
				masterSite.push(item.site + ' : ' + item.name);
				masterSiteValue.push(item.site);
			});
		}
 
		if (this.state.clientdata) {
			this.state.clientdata.map((data) => {
				clientName.push(data.code + ' : ' + data.name);
				clientValue.push(data.code);
			})
		}

		let masterUnit = this.state.masterUnit.toString();
		let masterStatus = this.state.masterStatus;
		let masterStatusValue = [];


		if (this.state.masterStatus.length > 0) {
			this.state.masterStatus.map((item) => {
				if (item == "ALL") {
					masterStatusValue.push("");
				} else {
					masterStatusValue.push(item);
				}
			});
		}

		return (
			<React.Fragment> 
				
				{Authentication.getUserLevel() == "administrator" ? (
						<Dropdown placeHolder="Site" 
						optionList={masterSite.toString()}
						optionValue={masterSiteValue.toString()}
						getValue={this.selectedSite} className="filterDropdown"  />
				) : (
						<input
						readOnly
						value={Authentication.getSite()}
						id="site"
						className="form-control put filterDropdown"
						placeholder="Site"
						tabIndex='1'
						/>
				)}
 

				{Authentication.getUserLevel() == "administrator" ? (
				<Dropdown placeHolder="Client"
					className="filterDropdown"
					className="filterDropdown"
					optionList={clientName.toString()}
					optionValue={clientValue.toString()}
					getValue={this.getClientSelected} />
				) : (
					<input
					readOnly
					value={Authentication.getClient()}
					id="client"
					className="form-control put filterDropdown"
					placeholder="Client"
					tabIndex='1'
					/>
				)}

				<Dropdown placeHolder="Status"
					optionList={masterStatus.toString()}
					optionValue={masterStatusValue.toString()}
					getValue={this.selectedStatus} className="filterDropdown" />
				
				{/* empty dropdown sementara -dimas */}
				<div style={{width:"20%"}}></div>
			</React.Fragment>
		);
	}

	triggerShowFilter = (e) => {
		e.stopPropagation();
		this.setState((prevState) => {
			return { showFilter: !prevState.showFilter };
		});
	}

	sortHandler = (idx, sortBy) => {
		let data = [...this.state.masterResStockHolding];

		data.sort((a, b) => {
			if (a[sortBy] !== undefined && b[sortBy] !== undefined) {
				if (this.state.columns[idx]["sort"] === down) {
					if (a[sortBy] < b[sortBy]) return -1;
					if (a[sortBy] > b[sortBy]) return 1;
					return 0;
				} else {

					if (a[sortBy] < b[sortBy]) return 1;
					if (a[sortBy] > b[sortBy]) return -1;
					return 0;

				}
			}
		});

		this.setState({ masterResStockHolding: data });
	}

	arrowHandler = (idx, sortBy) => {
		let sortColumns = [...this.state.columns];
		let sortValue = sortColumns[idx]["sort"];

		sortColumns = this.state.columns.map((el) => {
			el.sort = mid;
			return el;
		});

		sortColumns[idx]["sort"] = sortValue !== mid && sortValue === down ? up : down;

		this.setState({ columns: sortColumns });


		this.sortHandler(idx, sortBy);
	}

	toggleDisplayMoreColumn = () => {
		this.setState((prevState) => {
			return { showEditColumn: !prevState.showEditColumn }
		});
	}

	loadExport = () => {

		let param = '?client=' + this.client
		axios.get(endpoint.stockHoldingSummary, {
			headers: headers
		})
			.then(res => {
				const result = res.data.data
				this.setState({ data: result })
				this.load()
			})
			.catch(error => {

			})
	}

	ExportName = () => {
		let filename = ""
		let strip = "-"
		let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let date = new Date();
		let date1 = date.getDate(),
			month = date.getMonth(),
			year = date.getFullYear(),
			Seconds = date.getSeconds(),
			Minutes = date.getMinutes(),
			Hours = date.getHours();
		return filename = ("Microlistics_StockHolding." + date1 + "-" + arrmonth[month] + "-" + year + "." + Hours + "-" + Minutes + "-" + Seconds)
	}

	ExportPDFName = () => {
		let name = ""
		return name = ("Stock Holding")
	}

	ExportHeader = () => {
		let header = [];
		this.state.columns.map((item, index) => {
			header.push(item.tableHeaderText)
		})
		return header
	}
	ExportData = () => {
		let data = this.state.masterResStockHolding.map(elt => [elt.site, elt.client, elt.product, elt.product_name, elt.disposition,
		elt.packdesc_1, elt.status, elt.on_hand_qty, elt.weight, elt.expected_in_qty,
		elt.expected_in_wgt, elt.expected_out_qty, elt.price, elt.pallet]);
		return data
	}
	ExportFont = () => {
		let Font = "8";
		return Font;
	};


	render() {
		let content;
		switch (this.state.displayContent) {
			case "FOUND":
				content =
					<StockHoldingTable isSearch={this.state.isSearch}
						startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
						isActive={this.state.isActive}
						columns={this.state.columns}
						masterResource={this.state.masterResStockHolding}
						toggleDisplayMoreColumn={this.toggleDisplayMoreColumn}
						history={this.props.history}
						arrowHandler={this.arrowHandler}
						statusFilter={this.state.statusFilter}
					/>
				break;

			default:
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
				<HeaderTitle title="Stock Holding" />
				<div className="animated fadeIn app-container">
					<div className="card w-100 mb-3">
						<form ref={this.searchForm} onSubmit={e => { e.preventDefault(); this.searchData() }}>
							<Search showFilter={this.state.showFilter}
								triggerShowFilter={this.triggerShowFilter}
								searchData={this.searchData}
								placeholder="Enter a Product or Description"
								getValue={this.searchTextValue}
								additionalComponent={this.state.resetDropdownProcessed ? null : this.showDropdown()}
								resetDropdown={() => this.resetDropdown()} />
						</form>
					</div>

					<div className="row pt-0 p-0 pl-1">
						<div className="d-flex col-12">
							{content}
						</div>
					</div>
				</div>

				<div className="fixed-bottom paginations">
				<Paging 
					//new props
					totalRows = {this.state.main.total}
					from = {this.state.main.from}
					to = {this.state.main.to}
					firstPage = {1}
					lastPage = {this.state.main.last_page}
					currentPage = {this.state.main.current_page}
					nextPage = {(page) => this.loadStockHolding(page)}
					prevPage = {(page) => this.loadStockHolding(page)}
					toFirstPage = {(page) => this.loadStockHolding(page)}
					toLastPage = {(page) => this.loadStockHolding(page)}
					toClickedPage = {(page) => this.loadStockHolding(page)}
					toSpecificPage = {(page) => this.loadStockHolding(page)}
					/>
					<Export ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
						ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={this.ExportFont} />
				</div>
				<EditColumn isOpen={this.state.showEditColumn}
					toggle={this.toggleDisplayMoreColumn}
					fields={this.state.columns}
					updateTableColumn={this.updateTableColumn}
					modulName="Stock Holding"
				/>
			</React.Fragment>
		);
	}
}

export default StockHolding;
