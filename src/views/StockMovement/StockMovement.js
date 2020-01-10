import React, {Component} from 'react'
import { Card, CardBody,
         Col, Row, Table,
         Button, ButtonDropdown,
         FormGroup, Label,
         Input, InputGroup, InputGroupAddon,
         DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';
import { Helmet } from "react-helmet";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import moment from 'moment';
import axios from 'axios';
import AppComponent from '../../AppComponent';
import Authentication from '../../Auth/Authentication';
import { endpoint, headers } from '../../AppComponent/ConfigEndpoint'

import './StockMovement.css';

// import StockHoldingEditColumn from './StockHoldingEditColumn';

const currentYear = 2017;
const currentMonth = 0;
const fromMonth = new Date(currentYear, currentMonth);
const toMonth = new Date(currentYear + 10, 11);

function getWeekDays(weekStart) {
	const days = [weekStart];
	for (let i = 1; i < 7; i += 1) {
	  days.push(
		moment(weekStart)
		  .add(i, 'days')
		  .toDate()
	  );
	}
	return days;
  }
  
  function getWeekRange(date) {
	return {
	  from: moment(date)
		.startOf('week')
		.toDate(),
	  to: moment(date)
		.endOf('week')
		.toDate(),
	};
  }

function Navbar({
	nextMonth,
	previousMonth,
	onPreviousClick,
	onNextClick,
	className,
	localeUtils,
  }) {
	const months = localeUtils.getMonths();
	const prev = months[previousMonth.getMonth()];
	const next = months[nextMonth.getMonth()];
	const styleLeft = {
	  float: 'left',
	};
	const styleRight = {
	  float: 'right',
	};
	return (
	  <div className={className}>
		<button style={styleLeft} onClick={() => onPreviousClick()}>
		  ←
		</button>
		<button style={styleRight} onClick={() => onNextClick()}>
		   →
		</button>
	  </div>
	);
  }

function formatMonth(date){
	var monthNames = [
	  "January", "February", "March",
	  "April", "May", "June", "July",
	  "August", "September", "October",
	  "November", "December"
	];
  
	return monthNames[date];
}

function YearMonthForm({ date, localeUtils, onChange, no }) {
	let monthOption, yearOption;
	var monthExpand, yearExpand;
	monthExpand = [];
	yearExpand = [];
	monthExpand[no] = false;
	yearExpand[no] = false;
	const months = localeUtils.getMonths();
	const years = [];
	for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
	  years.push(i);
	}
  
	const handleChange = function handleChange(e) {
		if( typeof e !== '' ) {
			const { year, month } = e.target.form;
			monthOption = month.value ? month.value : date.getMonth();
			yearOption = year.value ? year.value : date.getFullYear();
			  onChange(new Date(yearOption, monthOption));
		}
	};

	var handleMonthExpand = function handleMonthExpand(){
		monthExpand[no] = !monthExpand[no];
		return monthExpand[no];
	}

	const handleYearExpand = function handleYearExpand(){
		return function(){
			yearExpand[no] = !yearExpand[no];
		}
	}
	var monthExpandStatus = [];
	monthExpandStatus[no] = handleMonthExpand.bind(); 
	return (
	
	  <form className="DayPicker-Caption">
		  {/* <ul className={"select-date month-option" + (handleMonthExpand ? " expand-period-sm" : "")} id="select">
			<li className="expand-style-date">
				<input className="select_close-date" type="radio" name="month" id={"awesomeness-close1" + (no)} value=""/>
				<span className="select_label-date select_label-placeholder-date">{formatMonth(date.getMonth())}</span>
			</li>
			
			<li className="select_items-date">
				<input className="select_expand-date" type="radio" name="month" id={"awesomeness-opener1" + (no)} value=""/>
				<label className="select_closeLabel-date" htmlFor={"awesomeness-close1" + (no)} ></label>

				<ul className="select_options-date">
				{months.map((month, i) => (
					<li className="select_option-date">
						<input className="select_input-date" key={month} type="radio" value={i} name="month" id={"month" + i} onChange={handleChange}></input>
						<label className="select_label-date" htmlFor={"month" + i} onClick={handleMonthExpand.bind(YearMonthForm)}>{month}</label>
					</li>
		 		 ))}
			</ul>


				<label className="select_expandLabel-date" htmlFor={"awesomeness-opener1" + (no)} onClick={handleMonthExpand.bind(YearMonthForm)}></label>
			</li>
		</ul>
		<ul className={"select-date year-option" + (yearExpand[no] ? " expand-period-sm" : "")} id="select">
			<li className="expand-style-date">
				<input className="select_close-date" type="radio" name="year" id={"awesomeness-close2" + (no)} value=""/>
				<span className="select_label-date select_label-placeholder-date">{date.getFullYear()}</span>
			</li>
			
			<li className="select_items-date">
				<input className="select_expand-date" type="radio" name="year" id={"awesomeness-opener2" + (no)} value=""/>
				<label className="select_closeLabel-date" htmlFor={"awesomeness-close2" + (no)} ></label>

				<ul className="select_options-date">
				{years.map(year => (
					<li className="select_option-date">
						<input className="select_input-date" key={year} type="radio" value={year} name="year" id={"year" + year} onChange={handleChange} ></input>
						<label className="select_label-date" htmlFor={"year" + year} onClick={handleYearExpand}>{year}</label>
					</li>
		 		 ))}
			</ul>


				<label className="select_expandLabel-date" htmlFor={"awesomeness-opener2" + (no)} onClick={handleYearExpand}></label>
			</li>
		</ul> */}
		<Input type="select" name="month" onChange={handleChange} value={date.getMonth()}>
		  {months.map((month, i) => (
			<option key={month} value={i}>
			  {month}
			</option>
		  ))}
		</Input>
		<Input type="select" name="year" onChange={handleChange} value={date.getFullYear()}>
		  {years.map(year => (
			<option key={year} value={year}>
			  {year}
			</option>
		  ))}
		</Input>
	  </form>
	);
  }

class StockMovement extends Component {
    static defaultProps = {
        hoverRange: undefined,
        selectedDays: []
    };

    constructor(props){
        super(props);
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
		this.state = {
			isVisible: [],
			isLoaded: false,
			isSearch: false,
			displayContent: "INIT",
			displayMoreColumnModal: false,
			showContent: false,

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,
			selectExpand: false,
			showDatepicker: false,
			columns: [
				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site", class:"", subColumns: undefined},
				{ id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "product", class:"", subColumns: undefined},
				{ id: "product_name", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "product_name", class:"", subColumns: undefined},
				{ id: "packdesc", checkboxLabelText: "UoM", tableHeaderText: "UoM", isVisible: true, key: "packdesc", class:"", subColumns: undefined},
			],
			stockMovement: [],
			dateColumns: [],
			datepickerShow: false,
			date: this.getInitialdate(),
			dateLoops: {},
			month: fromMonth,
			datepickerWeekly: {
				hoverRange: undefined,
				selectedDays: []
			},
			displayPeriod: "day",
			rangeDate: [],

		}
	}

	componentDidMount(){
        if (this.state.displayPeriod !== undefined && this.state.date.to !== undefined) {

        }
	}

	formatDate = (date) => {
		var monthNames = [
		  "January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];
	  
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
	  
		return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	formatDateDisplay = (date) => {
		var monthNames = [
		  "Jan", "Feb", "Mar",
		  "Apr", "May", "June", "July",
		  "Aug", "Sep", "Oct",
		  "Nov", "Dec"
		];
	  
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
	  
		return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	getInitialdate = () => {
		return {
		  from: undefined,
		  to: undefined,
		};
	}

	loadStockMovement = () => {
		let self = this;
		const { from, to } = this.state.date;
		let startDate = from ? new Date(from).toISOString().split('T')[0] : "";
		let endDate = to ? new Date(to).toISOString().split('T')[0] : "";
		let params = { 
			startDate: startDate,
			endDate: endDate,
			filterType: this.state.displayPeriod
		}
		let userAuth = JSON.parse(localStorage.getItem("user"));
		let headers = {
			'userLevel': userAuth.userLevel,
			'companyCode': userAuth.companyCode,
			'Authorization': 'Bearer ' + userAuth.token,
			'Content-Type': 'application/json'
		}

		self.setState({ isLoaded: true, isSearch: true,
						currentPage: 1,
						startIndex: 0, lastIndex: 0,
						totalRows: 0, maxPage: 0 });

		if(self.state.displayContent === "FOUND"){
			self.setState({ displayContent: "NOT_FOUND" });
		}

		axios.get(AppComponent.getBaseUrl() + "stockmovement", {
			params: params,
			headers: headers
		})
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
				self.setState({ notFoundMessage: error.response.data.message })
			}
			if (error.response.status === 401) {
				self.props.history.push('/login');
			}
			return error;
		})
		.then(function(result) {
			if (result.data) {
				let respondRes = result.data;
				self.setState({ displayContent: "FOUND",
								stockMovement: respondRes
							});
				// console.log(self.state.stockMovement);
				// self.numberEventClick(self.state.currentPage);
				// localStorage.setItem("masterResStockHolding", JSON.stringify(respondRes));
			}
			self.setState({ isLoaded: false, isSearch: false });
		});
    }
	  
	handleDayClick = (day) => {
		const range = DateUtils.addDayToRange(day, this.state.date);
		this.setState({
			date: range,
			dateLoops: range
		});
	}

	handleYearMonthChange = (month) => {
		this.setState({ month });
	}
	handleDayChange = (date, {selected}) => {
		this.setState({
			datepickerWeekly: {
				selectedDays: getWeekDays(getWeekRange(date).from),
			}
		});
		const selectedDays = getWeekDays(getWeekRange(date).from);
		if (selected) {
		  const selectedIndex = selectedDays.findIndex(selectedDay =>
			DateUtils.isSameDay(selectedDay, date)
		  );
		  selectedDays.splice(selectedIndex, 8);
		} else {
		  selectedDays.push(date);
		}
		this.setState({ datepickerWeekly: {
			selectedDays: selectedDays,
		} });
	  
	};

	handleDayEnter = date => {
		this.setState({
			hoverRange: getWeekRange(date),
		});
	};

	handleDayLeave = () => {
		this.setState({
			hoverRange: undefined,
		});
	};

	handleWeekClick = (weekNumber, days, e) => {
		this.setState({
			selectedDays: days,
		});
	};

	handlePeriod = (event) =>{
		this.setState({
			displayPeriod: event.target.value
		});
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
		this.setState({ displayMoreColumnModal: !this.state.displayMoreColumnModal });
	}

	triggerChangeFilter = (e) => {
		e.stopPropagation();
		this.setState((prevState) => {
			return { selectExpand: !prevState.selectExpand };
		});
	}

	triggerShowDatepicker = (e) => {
		e.stopPropagation();
		this.setState((prevState) => {
			return { showDatepicker: !prevState.showDatepicker };
		});
	}
	
	triggerShowContent = (e) => {
		e.stopPropagation();
		this.loadStockMovement();
		this.setState({
			 showContent: true,
			 showDatepicker: false
		});
		if(this.state.date.from !== undefined && this.state.date.to !== undefined){
			let dateColumns = [];
			let rangeDate = [];
			if(dateColumns > 0 && rangeDate > 0){
				dateColumns = [];
				rangeDate = [];
			}
			const { from, to } = this.state.date;
			for (const d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
				dateColumns.push({  
					id: d.toISOString().split('T')[0], 
					checkboxLabelText: this.formatDate(d), 
					tableHeaderText: this.formatDate(d),
					class:"border-left borderless-bottom",
					subColumns: [
						{ id: "sa_plus", checkboxLabelText: "SA +", tableHeaderText: "SA +", value: [], isVisible: true, key: "sa_plus", class: "border-left" },
						{ id: "sa_minus", checkboxLabelText: "SA -", tableHeaderText: "SA -", value: [], isVisible: true, key: "sa_minus", class: "" },
						{ id: "recv_weight", checkboxLabelText: "Rec", tableHeaderText: "Rec", value: [], isVisible: true, key: "recv_weight", class: "" },
						{ id: "send_weight", checkboxLabelText: "Send", tableHeaderText: "Send", value: [], isVisible: true, key: "send_weight", class: "" }
					],
					value: []
				});
				rangeDate.push(d.toISOString().split('T')[0]);
			}

			this.setState({
				dateColumns: dateColumns,
				rangeDate: rangeDate
			});
		}
	}

	showData = () => {
		return (
			this.state.stockMovement.map((item, idx) => {
				return (
					item[this.state.rangeDate[idx]].map((value, valueIdx) => {
						return (
							<tr key={valueIdx}>
								{this.state.columns.map((column, columnIdx) => {
									return <td key={columnIdx} className="px-3 text-left">{value[column.id]}</td>
								})}
								{this.state.dateColumns.map((dateColumn, dataIdx) => {
									if(dateColumn.id === this.state.rangeDate[idx]){
										item[this.state.rangeDate[idx]].map((element, index) => {
											return (
												<td key={index} className="px-3 text-left">
													{element[dateColumn.subColumns.id] ? element[dateColumn.subColumns.id] : "-"}
												</td>
											)
										})
									}
									// dateColumn.subColumns.map((element, idx) => {
									// 	console.log(value[element.id])
									// 	return (
									// 		<td key={dataIdx} className="px-3 text-left">
									// 			{value[element.id] ? value[element.id] : "-"}
									// 		</td>
									// 	)
									// });
									// console.log(value[dateColumn.subColumns.id]);
									// return (
									// 	<td key={dataIdx} className="px-3 text-left">
									// 		{value[dateColumn.subColumns.id] ? value[dateColumn.subColumns.id] : "-"}
									// 	</td>
									// )
								})}
							</tr>
						);
					})
				)
			})
		);
	}

	rowClicked = (productCode) => {
		this.props.history.push("/stockholding/" + encodeURIComponent(productCode));
	}

	render() {
		let data = {value: {dataValue: this.state.stockMovement}};
		const { hoverRange, selectedDays } = this.state.datepickerWeekly;
		const { from, to } = this.state.date;
		// const modifiers = { start: this.state.from, end: this.state.to };
		const daysAreSelected = selectedDays.length > 0;

		const modifiers = {
			hoverRange,
			selectedRange: daysAreSelected && {
				from: selectedDays[0],
				to: selectedDays[6],
			},
			hoverRangeStart: hoverRange && hoverRange.from,
			hoverRangeEnd: hoverRange && hoverRange.to,
			selectedRangeStart: daysAreSelected && selectedDays[0],
			selectedRangeEnd: daysAreSelected && selectedDays[6],
		};
		
		let content;
		switch (this.state.displayContent) {
			case "FOUND" :
				content = 
					<Table className={"table-condensed table-responsive table-striped clickable-row rounded-175 mb-0" + (this.state.showDatepicker ? " table-fixed" : "") + (this.state.selectExpand ? " smm-table" : "")} size="md" width="100%">
						<thead>
							<tr>
								{this.state.columns.map((item, idx) => {
									return <th className={" text-left " + item.class} key={idx} rowSpan="2" width="20%">{item.tableHeaderText}</th>
								})}
								{this.state.dateColumns.map((item, idx) => {
									return <th className={" text-left " + item.class} key={idx} colSpan="4" width="20%">{item.tableHeaderText}</th>
								})}
							</tr>
							<tr>
								{this.state.dateColumns.map((item, idx) => {
									return (
										item.subColumns !== undefined ? 
											item.subColumns.map((item, idx) => {
												return <th className={" text-center blueLabel " + item.class} key={idx} width="15%">{item.tableHeaderText}</th>
											}) 
										: "")
								})}
							</tr>
						</thead>

						<tbody>{this.showData()}</tbody>
					</Table>
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
															<h4 className="headerTitle font-weight-bold sm-header-title">Stock Movement</h4>
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
										<div className="form-group row mb-0">
											<div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
												<Row className="align-items-center mb-0">
													<div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-0">
														<FormGroup>
															<InputGroup>
																<div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
																	<Card className="form-group row rounded-175 filter-bar" style={{paddingLeft: '6px'}}>
																		
																		<div className="input-group p-2">
																			<div className="input-group-prepend bg-white col-9">
																				<Label htmlFor="select" className="filter_label">Display Period</Label>
																				<Col className="arrow-icon" xs={3}>
																					<Input type="select" className="none-appearance" name="select" id="select" onChange={this.handlePeriod}>
																						<option value="day">Daily</option>
																						<option value="week">Weekly</option>
																						<option value="month">Monthly</option>
																					</Input>
																				</Col>
																				
																				<Label htmlFor="from" className="filter_label from-label">Date From</Label>
																				<Col className="arrow-icon">
																					<Input className="none-appearance" name="from" id="from" onChange={this.handlePeriod} placeholder="Select From" readOnly onClick={this.state.displayPeriod ? (this.state.displayPeriod === "month" ? null : this.triggerShowDatepicker) : null}></Input>
																				</Col>
																				<Label htmlFor="to" className="filter_label to-label">To</Label>
																				<Col className="arrow-icon">
																					<Input className="none-appearance" name="to" id="to" onChange={this.handlePeriod} placeholder="Select To" readOnly onClick={this.state.displayPeriod ? (this.state.displayPeriod === "month" ? null : this.triggerShowDatepicker) : null}></Input>
																				</Col>
																				{/* <ul className={"select-sm" + (this.state.date.from && this.state.date.to ? " date-info" : "")} id="date" onClick={this.state.displayPeriod ? (this.state.displayPeriod === "month" ? null : this.triggerShowDatepicker) : null}>
																					<span className="select_label-sm select_label-placeholder-sm" id="datepicker1" ref="datepicker1" name="datepicker1">{from &&
																																																	to &&
																																																	`${this.formatDateDisplay(from)} -
																																																		${this.formatDateDisplay(to)}`}{' '}</span>
																					<input className="select_expand-sm" type="radio" name="asdas"/>
																				</ul> */}
																				
																			</div>
																			<div className="col-3 text-right">
																				{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}

																				<Button type="submit" color="info" className="col-7 search-movement search-btn rounded-175" onClick={this.state.displayPeriod && from && to ? this.triggerShowContent : null}>
																					<strong>Search</strong>
																				</Button>
																			</div>
																		</div>
																		
																	</Card>
																	<div className="col-md-12 col-lg-12 offset-md-4 offset-lg-3">
																		<DayPicker
																				className={(this.state.showDatepicker ? (this.state.displayPeriod === "day" ? "Selectable datepickerdaily-tab" : "d-none") : "d-none")}
																				numberOfMonths={1}
																				month={this.state.month}
																				fromMonth={fromMonth}
																				toMonth={toMonth}
																				selectedDays={[from, { from, to }]}
																				modifiers={modifiers}
																				onDayClick={this.handleDayClick}
																				captionElement={({ date, localeUtils }) => (
																					<YearMonthForm
																					  date={date}
																					  localeUtils={localeUtils}
																					  onChange={this.handleYearMonthChange}
																					  no={Math.floor(Math.random() * 100000)}
																					/>
																				  )}
																				/>
																				<Helmet>
																					<style>{`
																						.showDatepicker{
																							transition: 1s;
																						}
																						.Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
																							position: static;
																							background-color: #f0f8ff !important;
																							color: #4a90e2;
																						}
																						.Selectable .DayPicker-Day {
																							border-radius: 0 !important;
																						}
																						.Selectable .DayPicker-Day--start {
																							border-top-left-radius: 50% !important;
																							border-bottom-left-radius: 50% !important;
																						}
																						.Selectable .DayPicker-Day--end {
																							border-top-right-radius: 50% !important;
																							border-bottom-right-radius: 50% !important;
																						}
																						`}</style>
																				</Helmet>
																			<DayPicker
																				className={(this.state.showDatepicker ? (this.state.displayPeriod === "week" ? "Selectable datepickerweekly-tab" : "d-none") : "d-none")}
																				numberOfMonths={1}
																				showWeekNumbers
																				showOutsideDays
																				selectedDays={selectedDays}
																				modifiers={modifiers}
																				onDayClick={this.handleDayChange}
																				onDayMouseEnter={this.handleDayEnter}
																				onDayMouseLeave={this.handleDayLeave}
																				onWeekClick={this.handleWeekClick}
																				captionElement={({ date, localeUtils }) => (
																					<YearMonthForm
																					  date={date}
																					  localeUtils={localeUtils}
																					  onChange={this.handleYearMonthChange}
																					  no={Math.floor(Math.random() * 100000)}
																					/>
																				  )}
																				/>
																				<Helmet>
																					<style>{`
																						.SelectedWeekExample .DayPicker-Month {
																							border-collapse: separate;
																						}
																						.SelectedWeekExample .DayPicker-WeekNumber {
																							outline: none;
																						}
																						.SelectedWeekExample .DayPicker-Day {
																							outline: none;
																							border: 1px solid transparent;
																						}
																						.SelectedWeekExample .DayPicker-Day--hoverRange {
																							background-color: #EFEFEF !important;
																						}

																						.SelectedWeekExample .DayPicker-Day--selectedRange {
																							background-color: #fff7ba !important;
																							border-top-color: #FFEB3B;
																							border-bottom-color: #FFEB3B;
																							border-left-color: #fff7ba;
																							border-right-color: #fff7ba;
																						}

																						.SelectedWeekExample .DayPicker-Day--selectedRangeStart {
																							background-color: #FFEB3B !important;
																							border-left: 1px solid #FFEB3B;
																						}

																						.SelectedWeekExample .DayPicker-Day--selectedRangeEnd {
																							background-color: #FFEB3B !important;
																							border-right: 1px solid #FFEB3B;
																						}

																						.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
																							position: static;
																						}
																						.SelectedWeekExample .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
																						.SelectedWeekExample .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
																							border-radius: 0 !important;
																							color: black !important;
																						}
																						.SelectedWeekExample .DayPicker-Day--hoverRange:hover {
																							border-radius: 0 !important;
																						}
																					`}</style>
																				</Helmet>
																		</div>
																		{}
																</div>
															</InputGroup>
														</FormGroup>
													</div>
												</Row>
											</div>
										</div>
								</div>
							</div>

							{/* <div className="row">
								<div className="d-flex col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
									{content}
								</div>
							</div> */}
						</div>
					</div>
				</div>
				
				<div className={"row rem " + (this.state.showContent ? "" : "d-none")}>
					<div className="d-flex col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
						{content}
					</div>
				</div>

				{/* <StockHoldingEditColumn isOpen={this.state.displayMoreColumnModal}
										toggle={this.toggleDisplayMoreColumn}
										fields={this.state.columns}
										updateTableColumn={this.updateTableColumn} /> */}
			</React.Fragment>
		);
	}
}

export default StockMovement;
