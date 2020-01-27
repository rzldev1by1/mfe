import React, { Component } from 'react';
import { Card, CardBody,
		 Col, Row, Table,
		 Button, ButtonDropdown,
		 Form, FormGroup, Label,
		 Input, InputGroup, InputGroupAddon,
		 DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';
import { Link } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { isTSEnumMember } from '@babel/types';

// import StockHoldingEditColumn from './StockHoldingEditColumn';
import axios from 'axios';
import AppComponent from '../../AppComponent';
import Authentication from '../../Auth/Authentication';
import './StockMovement.css';
import {Helmet} from "react-helmet";
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import StockMovementTitle from './Component/StockMovementTitle';

const currentYear = 2019;
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
	
	  <Form inline className="DayPicker-Caption">
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
			<FormGroup>
				<Col xs="7" className="arrow-icon">
					<Input type="select" className="none-appearance col-12" name="month" onChange={handleChange} value={date.getMonth()}>
					{months.map((month, i) => (
						<option key={month} value={i}>
						{month}
						</option>
					))}
					</Input>
				</Col>
				<Col xs="5" className="arrow-icon">
					<Input type="select" className="none-appearance col-12" name="year" onChange={handleChange} value={date.getFullYear()}>
					{years.map(year => (
						<option key={year} value={year}>
						{year}
						</option>
					))}
					</Input>
				</Col>
			</FormGroup>
	  </Form>
	);
  }

class StockMovement extends Component {
	static defaultProps = {
		hoverRange: undefined,
		selectedDays: []
	};
	constructor(props) {
		super(props);
		this.handleDateFromClick = this.handleDateFromClick.bind(this);
		this.handleDateToClick = this.handleDateToClick.bind(this);
		this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
		this.state = {
			isLoaded: false,
			displayContent: "INIT",
			showContent: false,

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,
			selectExpand: false,
			showDatepicker: false,
			showDatepickerFrom: false,
			showDatepickerTo: false,
			columns: [
				{ id: "site", checkboxLabelText: "Site", tableHeaderText: "Site", isVisible: true, key: "site", class:"", subColumns: undefined},
				{ id: "product", checkboxLabelText: "Product", tableHeaderText: "Product", isVisible: true, key: "product", class:"", subColumns: undefined},
				{ id: "product_name", checkboxLabelText: "Description", tableHeaderText: "Description", isVisible: true, key: "product_name", class:"", subColumns: undefined},
				{ id: "packdesc", checkboxLabelText: "UoM", tableHeaderText: "UoM", isVisible: true, key: "packdesc", class:"", subColumns: undefined},
			],
			stockMovement: [],
			dateColumns: [],
			monthColumns: [],
			datepickerShow: false,
			dateRange: this.getInitialdaterange(),
			dateFrom: null,
			dateTo: null,
			dateFromConfirm: false,
			dateToConfirm: false,
			monthFromConfirm: false,
			monthToConfirm: false,
			dateLoops: {},
			month: fromMonth,
			monthFrom: fromMonth,
			monthTo: fromMonth,
			datepickerWeekly: {
				hoverRange: undefined,
				selectedDays: []
			},
			displayPeriod: "day",
			rangeDate: [],
			rangeMonth: [],

		}
	}

	componentDidMount() {
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

	formatDateISO = (date) => {
		var dayIndex = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var day = undefined;
		var month = undefined;

		if(dayIndex < 9){
			day = '0' + dayIndex;
		}else{
			day = '0' + dayIndex;
		}
	  
		if(monthIndex < 9){
			month = '0' + (monthIndex + 1) ;
		}else{
			month = monthIndex + 1;
		}

		return year + '-' + month + '-' + day;
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

	formatMonth = (date) => {
		var monthNames = [
		  "January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];
	  
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
	  
		return monthNames[monthIndex] + ' ' + year;
	}

	getInitialdaterange = () => {
		return {
		  from: undefined,
		  to: undefined,
		};
	}

	loadStockMovement = () => {
		let self = this;
		let from = undefined;
		let to = undefined;
		if(this.state.dateFromConfirm !== false && this.state.dateTo !== undefined){
			from = this.state.dateFrom;
			to = this.state.dateTo;
		}
		if(this.state.monthFromConfirm !== undefined && this.state.monthToConfirm !== undefined){
			from = this.state.monthFrom;
			to = this.state.monthTo;
		}
		let startDate = from ? this.formatDateISO(new Date(from)) : "";
		let endDate = to ? this.formatDateISO(new Date(to)) : "";
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

		self.setState({ isLoaded: true,
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
							isLoaded: false});
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
			}
			self.setState({ isLoaded: false});
		});
    }
	  
	handleDayClick = (day) => {
		const range = DateUtils.addDayToRange(day, this.state.dateRange);
		this.setState({
			date: range
		});
	}

	handleDateFromClick(day, { selected }) {
		this.setState({
			dateFrom: selected ? undefined : day
		});
	}

	handleDateToClick(day, { selected }) {
		this.setState({
			dateTo: selected ? undefined : day
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

	triggerShowDatepickerFrom = (e) => {
		e.stopPropagation();
		if(this.state.showDatepickerTo){
			this.setState({
				showDatepickerTo: false 
			});
		}
		this.setState((prevState) => {
			return { showDatepickerFrom: !prevState.showDatepickerFrom };
		});
	}

	triggerShowDatepickerTo = (e) => {
		e.stopPropagation();
		if(this.state.showDatepickerFrom){
			this.setState({
				 showDatepickerFrom: false 
			});
		}
		this.setState((prevState) => {
			return { showDatepickerTo: !prevState.showDatepickerTo };
		});
	}
	
	triggerConfirmDateFrom = (e) => {
		e.stopPropagation();
		this.setState({ 
			dateFromConfirm: true,
			monthFromConfirm: false,
			showDatepickerFrom: false
		});
	}

	triggerConfirmDateTo = (e) => {
		e.stopPropagation();
		this.setState({
			dateToConfirm: true,
			monthToConfirm: false,
			showDatepickerTo: false
		});
	}

	triggerConfirmMonthFrom = (e) => {
		e.stopPropagation();
		this.setState({ 
			dateFromConfirm: false,
			monthFromConfirm: true,
			showDatepickerFrom: false
		});
	}

	triggerConfirmMonthTo = (e) => {
		e.stopPropagation();
		this.setState({
			dateToConfirm: false,
			monthToConfirm: true,
			showDatepickerTo: false
		});
	}

	monthFromChange = (date) => {
		this.setState({
			monthFrom: date
		})
	}

	monthToChange = (date) => {
		this.setState({
			monthTo: date
		})
	}

	triggerShowContent = (e) => {
		e.stopPropagation();
		this.loadStockMovement();
		this.setState({
			 showContent: true,
			 showDatepickerFrom: false,
			 showDatepickerTo: false
		});
		if(this.state.dateFromConfirm !== false && this.state.dateTo !== undefined){
			let dateColumns = [];
			let rangeDate = [];
			if(dateColumns > 0 && rangeDate > 0){
				dateColumns = [];
				rangeDate = [];
			}
			const from = this.state.dateFrom;
			const to = this.state.dateTo;
			for (const d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
				dateColumns.push({  
					id: this.formatDateISO(d), 
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
				rangeDate.push(this.formatDateISO(d));
			}

			this.setState({
				dateColumns: dateColumns,
				rangeDate: rangeDate
			});
		}
		if(this.state.monthFromConfirm !== undefined && this.state.monthToConfirm !== undefined){
			let monthColumns = [];
			let rangeMonth = [];
			if(monthColumns > 0 && rangeMonth > 0){
				monthColumns = [];
				rangeMonth = [];
			}
			let from = new Date(this.state.monthFrom);
			let to = new Date(this.state.monthTo);
			let period = undefined;
			if(to.getFullYear() > from.getFullYear()){
				let sumOfPeriod = to.getFullYear() - from.getFullYear();
				period = ((sumOfPeriod * 12) - from.getMonth()) + to.getMonth();
			}else{
				period = to.getMonth() - from.getMonth();
			}
			for (let d = 0; d <= period; d++) {
				let monthValue = new Date(from);
				monthValue.setMonth(monthValue.getMonth() + d);
				monthColumns.push({  
					id: this.formatDateISO(monthValue), 
					checkboxLabelText: this.formatMonth(monthValue), 
					tableHeaderText: this.formatMonth(monthValue),
					class:"border-left borderless-bottom",
					subColumns: [
						{ id: "sa_plus", checkboxLabelText: "SA +", tableHeaderText: "SA +", value: [], isVisible: true, key: "sa_plus", class: "border-left" },
						{ id: "sa_minus", checkboxLabelText: "SA -", tableHeaderText: "SA -", value: [], isVisible: true, key: "sa_minus", class: "" },
						{ id: "recv_weight", checkboxLabelText: "Rec", tableHeaderText: "Rec", value: [], isVisible: true, key: "recv_weight", class: "" },
						{ id: "send_weight", checkboxLabelText: "Send", tableHeaderText: "Send", value: [], isVisible: true, key: "send_weight", class: "" }
					],
					value: []
				});
				rangeMonth.push(this.formatDateISO(monthValue));
			}

			this.setState({
				monthColumns: monthColumns,
				rangeMonth: rangeMonth
			});
		}
	}

	showData = () => {
		return (
			this.state.stockMovement.map((item, idx) => {
				return (
					<tr key={idx}>
						{this.state.columns.map((column, columnIdx) => {
							return <td key={columnIdx} className="px-3 text-left">{item[column.id]}</td>
						})}
						{this.state.dateToConfirm ? this.state.dateColumns.map((dateColumn, dataIdx) => {
							if(item.details.date === dateColumn.id){
								return (
									dateColumn.subColumns.map((column, columnIdx) => {
									return (
										<td key={columnIdx} className="px-3 text-left">
											{item.details[column.id] ? item.details[column.id] : "-"}
										</td>
									)
								}))
							}else{
								return (
									dateColumn.subColumns.map((column, columnIdx) => {
									return (
										<td key={columnIdx} className="px-3 text-left">
											-
										</td>
									)
								}))
							}
						}): null}
						{this.state.monthToConfirm ? this.state.monthColumns.map((monthColumn, dataIdx) => {
							if(item.details.date === monthColumn.id){
								return (
									monthColumn.subColumns.map((column, columnIdx) => {
									return (
										<td key={columnIdx} className="px-3 text-left">
											{item.details[column.id] ? item.details[column.id] : "-"}
										</td>
									)
								}))
							}else{
								return (
									monthColumn.subColumns.map((column, columnIdx) => {
									return (
										<td key={columnIdx} className="px-3 text-left">
											-
										</td>
									)
								}))
							}
						}): null}
					</tr>
				);
			})
		)
	}

	rowClicked = (productCode) => {
		this.props.history.push("/stockholding/" + encodeURIComponent(productCode));
	}

	render() {
		let data = {value: {dataValue: this.state.stockMovement}};
		const { hoverRange, selectedDays } = this.state.datepickerWeekly;
		const { from, to } = this.state.dateRange;
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
					<Table className={"table-condensed table-responsive table-striped clickable-row rounded-175 mb-0" + (this.state.showDatepickerFrom || this.state.showDatepickerTo ? " table-fixed" : "") + (this.state.selectExpand ? " smm-table" : "")} size="md" width="100%">
						<thead>
							<tr>
								{this.state.columns.map((item, idx) => {
									return <th className={" text-left " + item.class} key={idx} rowSpan="2" width="20%">{item.tableHeaderText}</th>
								})}
								{this.state.dateToConfirm ? this.state.dateColumns.map((item, idx) => {
									return <th className={" text-left " + item.class} key={idx} colSpan="4" width="20%">{item.tableHeaderText}</th>
								}): null}
								{this.state.monthToConfirm ? this.state.monthColumns.map((item, idx) => {
									return <th className={" text-left " + item.class} key={idx} colSpan="4" width="20%">{item.tableHeaderText}</th>
								}): null}
							</tr>
							<tr>
								{this.state.dateToConfirm ? this.state.dateColumns.map((item, idx) => {
									return (
										item.subColumns !== undefined ? 
											item.subColumns.map((item, idx) => {
												return <th className={" text-center blueLabel " + item.class} key={idx} width="15%">{item.tableHeaderText}</th>
											}) 
										: "")
								}): ""}
								{this.state.monthToConfirm ? this.state.monthColumns.map((item, idx) => {
									return (
										item.subColumns !== undefined ? 
											item.subColumns.map((item, idx) => {
												return <th className={" text-center blueLabel " + item.class} key={idx} width="15%">{item.tableHeaderText}</th>
											}) 
										: "")
								}): ""}
							</tr>
						</thead>

						<tbody>{this.showData()}</tbody>
					</Table>
			break;

			default:
				content =
				<div className="col-12 d-flex h-100 position-relative">
					<div className="bg-transparent mx-auto my-auto text-center">
						<div className={"spinner" + (this.state.isLoaded ? "" : " d-none")} />
						<p className={this.state.displayContent === "NOT_FOUND" ? "" : "d-none"}>{this.state.notFoundMessage}</p>
					</div>
				</div>
		}
		
		

		return(
			<React.Fragment>
				<div className="animated fadeIn">
					<div className="row">
						<div className="col-12 p-0">
							<StockMovementTitle />
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
																				<Col className="arrow-icon select-filter" xs={3}>
																					<Input type="select" className="none-appearance" name="select" id="select" onChange={this.handlePeriod}>
																						<option value="day">Daily</option>
																						<option value="week">Weekly</option>
																						<option value="month">Monthly</option>
																					</Input>
																				</Col>
																				
																				<Label htmlFor="from" className="filter_label from-label">Date From</Label>
																				<Col className="arrow-icon select-filter">
																					<Input className="none-appearance" name="from" id="from" onChange={this.handlePeriod} placeholder={(this.state.dateFrom && this.state.dateFromConfirm ? this.formatDate(this.state.dateFrom) : (this.state.monthFromConfirm ? this.formatMonth(this.state.monthFrom) : "Select From"))} readOnly onClick={this.state.displayPeriod ? this.triggerShowDatepickerFrom : null}></Input>
																				</Col>
																				<Label htmlFor="to" className="filter_label to-label">To</Label>
																				<Col className="arrow-icon select-filter">
																					<Input className="none-appearance" name="to" id="to" onChange={this.handlePeriod} placeholder={(this.state.dateTo && this.state.dateToConfirm ? this.formatDate(this.state.dateTo) : (this.state.monthToConfirm ? this.formatMonth(this.state.monthTo) : "Select From"))} readOnly onClick={this.state.displayPeriod ? this.triggerShowDatepickerTo : null}></Input>
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

																				<Button type="submit" color="info" className="col-7 search-movement search-btn rounded-175" onClick={this.state.displayPeriod && ((this.state.dateFromConfirm && this.state.dateToConfirm) || (this.state.monthFromConfirm & this.state.monthToConfirm)) ? this.triggerShowContent : null}>
																					<strong>Search</strong>
																				</Button>
																			</div>
																		</div>
																		
																	</Card>
																		<div className={(this.state.showDatepickerFrom ? (this.state.displayPeriod === "day" ? "Selectable datepickerdaily-tab col-md-5 col-lg-5 offset-md-3" : "d-none") : "d-none") + " select-from"}>
																			<DayPicker
																				month={this.state.month}
																				fromMonth={fromMonth}
																				toMonth={toMonth}
																				selectedDays={this.state.dateFrom}
																				onDayClick={this.handleDateFromClick}
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
																				<Button type="submit" color="info" className="col-3 search-movement search-btn confirm-btn rounded-175" onClick={this.triggerConfirmDateFrom}>
																					<strong>Confirm</strong>
																				</Button>
																		</div>
																		<div className={(this.state.showDatepickerTo ? (this.state.displayPeriod === "day" ? "Selectable datepickerdaily-tab col-md-5 col-lg-5 offset-md-6" : "d-none") : "d-none") + " select-to"}>
																			<DayPicker
																				month={this.state.month}
																				fromMonth={fromMonth}
																				toMonth={toMonth}
																				selectedDays={this.state.dateTo}
																				onDayClick={this.handleDateToClick}
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
																				<Button type="submit" color="info" className="col-3 search-movement search-btn confirm-btn rounded-175" onClick={this.triggerConfirmDateTo}>
																					<strong>Confirm</strong>
																				</Button>
																		</div>
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
																		<div className={(this.state.showDatepickerFrom ? (this.state.displayPeriod === "month" ? "Selectable datepickerdaily-tab col-md-5 col-lg-5 offset-md-3" : "d-none") : "d-none") + " select-from"}>
																			<DayPicker
																				month={this.state.monthFrom}
																				fromMonth={fromMonth}
																				toMonth={toMonth}
																				disabledDays={day => day >= fromMonth}
																				selectedDays={this.state.month}
																				captionElement={({ date, localeUtils }) => (
																					<YearMonthForm
																					date={date}
																					localeUtils={localeUtils}
																					onChange={this.monthFromChange}
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
																				<Button type="submit" color="info" className="col-3 search-movement search-btn confirm-btn rounded-175" onClick={this.triggerConfirmMonthFrom}>
																					<strong>Confirm</strong>
																				</Button>
																		</div>
																		<div className={(this.state.showDatepickerTo ? (this.state.displayPeriod === "month" ? "Selectable datepickerdaily-tab col-md-5 col-lg-5 offset-md-6" : "d-none") : "d-none") + " select-from"}>
																			<DayPicker
																				month={this.state.monthTo}
																				fromMonth={fromMonth}
																				toMonth={toMonth}
																				disabledDays={day => day < toMonth}
																				captionElement={({ date, localeUtils }) => (
																					<YearMonthForm
																					date={date}
																					localeUtils={localeUtils}
																					onChange={this.monthToChange}
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
																				<Button type="submit" color="info" className="col-3 search-movement search-btn confirm-btn rounded-175" onClick={this.triggerConfirmMonthTo}>
																					<strong>Confirm</strong>
																				</Button>
																		</div>
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
			</React.Fragment>
		);
	}
}

export default StockMovement
