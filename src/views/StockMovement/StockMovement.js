import React, { Component } from 'react';
import { Card, CardBody,
		 Col, Row, Table,
		 Button, ButtonDropdown,
		 FormGroup, Label,
		 Input, InputGroup, InputGroupAddon,
		 DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';
import { Link } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { isTSEnumMember } from '@babel/types';

// import StockHoldingEditColumn from './StockHoldingEditColumn';
import './StockMovement.css';
import {Helmet} from "react-helmet";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const fromMonth = new Date(currentYear, currentMonth);
const toMonth = new Date(currentYear + 10, 11);

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
	monthExpand = {};
	yearExpand = {};
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
			  console.log(yearOption, monthOption)
		}
	};

	const handleMonthExpand = function handleMonthExpand(e){
		return monthExpand[no] = !monthExpand[no];
	}

	const handleYearExpand = function handleYearExpand(e){
		return yearExpand[no] = !yearExpand[no];
	}
	console.log(monthExpand[no]);
	return (
	
	  <form className="DayPicker-Caption">
		  <ul className={"select-date month-option" + (monthExpand[no] ? " expand-period-sm" : "")} id="select">
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
						<label className="select_label-date" htmlFor={"month" + i} onClick={handleMonthExpand}>{month}</label>
					</li>
		 		 ))}
			</ul>


				<label className="select_expandLabel-date" htmlFor={"awesomeness-opener1" + (no)} onClick={handleMonthExpand}></label>
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
		</ul>
		{/* <select name="month" onChange={handleChange} value={date.getMonth()}>
		  {months.map((month, i) => (
			<option key={month} value={i}>
			  {month}
			</option>
		  ))}
		</select> */}
		{/* <select name="year" onChange={handleChange} value={date.getFullYear()}>
		  {years.map(year => (
			<option key={year} value={year}>
			  {year}
			</option>
		  ))}
		</select> */}
	  </form>
	);
  }

class StockMovement extends Component {
	static defaultProps = {
	  numberOfMonths: 2,
	};
	constructor(props) {
		super(props);
		this.handleDayClick = this.handleDayClick.bind(this);
		this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
		this.state = {
			isVisible: [],
			isLoaded: false,
			isSearch: false,
			displayContent: "INIT",
			displayMoreColumnModal: false,
			showFilter: true,

			currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 50,
			totalRows: 0,
			maxPage: 0,
			selectExpand: false,
			showDatepicker: false,
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
				{ id: "rotaDate", checkboxLabelText: "Rotadate", tableHeaderText: "Rotadate", isVisible: false, key: "" },
				{ id: "rotaType", checkboxLabelText: "Rotadate Type", tableHeaderText: "Rotadate Type", isVisible: false, key: "" },
				{ id: "dateStatus", checkboxLabelText: "Date Status", tableHeaderText: "Date Status", isVisible: true, key: "" },
				{ id: "zone", checkboxLabelText: "Zone", tableHeaderText: "Zone", isVisible: false, key: "" },
				{ id: "batch", checkboxLabelText: "Batch", tableHeaderText: "Batch", isVisible: true, key: "" },
				{ id: "ref2", checkboxLabelText: "Ref 2", tableHeaderText: "Ref 2", isVisible: true, key: "" },
				{ id: "ref3", checkboxLabelText: "Ref 3", tableHeaderText: "Ref 3", isVisible: false, key: "" },
				{ id: "ref4", checkboxLabelText: "Ref 4", tableHeaderText: "Ref 4", isVisible: false, key: "" },
				{ id: "disposition", checkboxLabelText: "Disposition", tableHeaderText: "Disposition", isVisible: false, key: "" },
				{ id: "alert", checkboxLabelText: "Alert", tableHeaderText: "Alert", isVisible: true, key: "" },
				{ id: "weight", checkboxLabelText: "Weight", tableHeaderText: "Weight", isVisible: true, key: "" },
				{ id: "volume", checkboxLabelText: "Volume", tableHeaderText: "Volume", isVisible: true, key: "" },
				{ id: "lastUpdated", checkboxLabelText: "Last Updated", tableHeaderText: "Last Updated", isVisible: false, key: "" },
			],
			filterStockHolding: {
				showPopup: false,
				item: {
					"location": { text: "Location", isVisible: false },
					"locationType": { text: "Location Type", isVisible: false },
					// "packId": { text: "Pack ID", isVisible: false },
					// "product": { text: "Product", isVisible: false },
					// "description": { text: "Description", isVisible: false },
					// "qty": { text: "Qty", isVisible: false },
					// "plannedIn": { text: "Planned In", isVisible: false },
					// "plannedOut": { text: "Planned Out", isVisible: false },
					"packType": { text: "Pack Type", isVisible: false },
					// "packSize": { text: "Pack Size", isVisible: false },
					"rotaDate": { text: "Rotadate", isVisible: false },
					"rotaType": { text: "Rotadate Type", isVisible: false },
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
				  product: "1001", description: "AbcdefghijKlmnopqrst",
				  qty: "50", plannedIn: "0", plannedOut: "0",
				  packType: "EACH", packSize: "10*5",
				  rotaDate: "11/02/2019", rotaType: "R - Receipt Date",
				  dateStatus: "LIVE", zone: "A", batch: "",
				  ref2: "1234", ref3: "1234", ref4: "1234",
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
			datepickerShow: false,
			date: this.getInitialdate(),
			month: fromMonth

		}
		// this.getLocalStorageColumn();
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
	  
		return day + ' ' + monthNames[monthIndex];
	}

	getInitialdate = () => {
		return {
		  from: undefined,
		  to: undefined,
		};
	  }

	handleDayClick = (day) => {
		const range = DateUtils.addDayToRange(day, this.state.date);
		this.setState({
			date: range
		});
	}

	handleYearMonthChange = (month) => {
		this.setState({ month });
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
		// this.setState({ showFilter: !this.state.showFilter });
	}

	triggerShowDatepicker = (e) => {
		e.stopPropagation();
		this.setState((prevState) => {
			return { showDatepicker: !prevState.showDatepicker };
		});
		// this.setState({ showFilter: !this.state.showFilter });
	}

	rowClicked = (productCode) => {
		this.props.history.push("/stockholding/" + encodeURIComponent(productCode));
	}

	render() {
		const { from, to } = this.state.date;
		const modifiers = { start: this.state.from, end: this.state.to };
		let content;
		content = 
		<Table className="table-condensed table-responsive table-striped clickable-row rounded-175 mb-0" size="sm">
			<thead>
				<tr>
					{this.state.columns.map((item, idx) => {
						if (item.isVisible) {
							if (item.id === "qty" ||
								item.id === "plannedIn" ||
								item.id === "plannedOut" ||
								item.id === "weight" ||
								item.id === "volume") {
								return <th className="p-3 text-right align-middle" key={idx} width="10%">{item.tableHeaderText}</th>
							}

							return <th className="p-3 text-left align-middle" key={idx} width="10%">{item.tableHeaderText}</th>
						}
					})}
					<th className="p-3 text-left align-middle">
						<button type="button" className="btn btn-outline-light"  onClick={this.toggleDisplayMoreColumn} style={{backgroundColor: '#FFFFFF', padding: '0.1rem 0.4rem', borderRadius: '100%'}}>
							<span className="glyphicon glyphicon-pencil" style={{ color: '#388DCD', fontSize: '11px' }}></span>
						</button>
					</th>
				</tr>
			</thead>
			<tbody>
				{this.state.stockHolding.map((item, idx) => (
					<tr key={idx} onClick={() => this.rowClicked(item["product"])}>
						{this.state.columns.map((column, columnIdx) => {
							if (column.isVisible) {
								if (column.id === "product") {
									return (
										<td key={columnIdx} className="px-3 text-left">
											{item[column.id]}
										</td>
									);
								}

								if (column.id === "qty" ||
									column.id === "plannedIn" ||
									column.id === "plannedOut" ||
									column.id === "weight" ||
									column.id === "volume") {
									return (
										<td key={columnIdx} className="px-3 text-right">
											{item[column.id]}
										</td>
									);
								}
								
								return <td key={columnIdx} className="px-3 text-left">{item[column.id]}</td>
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
															<h4 className="headerTitle font-weight-bold">Stock Movement</h4>
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
																	<Card className="form-group row rounded-175 filter-bar" style={{padding: '17px'}}>
																		<div className="input-group p-2">
																			<div className="input-group-prepend bg-white col-9">
																				<Label htmlFor="select" className="filter_label">Display Period</Label>
																				<ul className={"select-sm" + (this.state.selectExpand ? " expand-period-sm" : "")} id="select">
																					<li className="expand-style-sm">
																						<input className="select_close-sm" type="radio" name="period" id="awesomeness-close" value=""/>
																						<span className="select_label-sm select_label-placeholder-sm">Select Period</span>
																					</li>
																					
																					<li className="select_items-sm">
																						<input className="select_expand-sm" type="radio" name="period" id="awesomeness-opener"/>
																						<label className="select_closeLabel-sm" htmlFor="awesomeness-close" onClick={this.triggerChangeFilter}></label>

																						<ul className="select_options-sm">
																							<li className="select_option-sm">
																								<input className="select_input-sm" type="radio" name="period" id="daily"></input>
																								<label className="select_label-sm" htmlFor="daily" onClick={this.triggerChangeFilter}>Daily</label>
																							</li>
																							<li className="select_option-sm">
																								<input className="select_input-sm" type="radio" name="period" id="weekly"></input>
																								<label className="select_label-sm" htmlFor="weekly" onClick={this.triggerChangeFilter}>Weekly</label>
																							</li>
																							<li className="select_option-sm">
																								<input className="select_input-sm" type="radio" name="period" id="monthly"></input>
																								<label className="select_label-sm option_radius-sm" htmlFor="monthly" onClick={this.triggerChangeFilter}>Monthly</label>
																							</li>
																						</ul>


																						<label className="select_expandLabel-sm" htmlFor="awesomeness-opener" onClick={this.triggerChangeFilter}></label>
																					</li>
																				</ul>
																				<Label htmlFor="date" className="filter_label" style={{paddingLeft: '107px'}}>Select Date</Label>
																				<ul className={"select-sm" + (this.state.date.from && this.state.date.to ? " date-info" : "")} id="date" onClick={this.triggerShowDatepicker}>
																					<span className="select_label-sm select_label-placeholder-sm" id="datepicker1" ref="datepicker1" name="datepicker1">{from &&
																																																	to &&
																																																	`${this.formatDate(from)} -
																																																		${this.formatDate(to)}`}{' '}</span>
																					<input className="select_expand-sm" type="radio" name="asdas"/>
																				</ul>
																				
																			</div>
																			<div className="col-3 text-right">
																				{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}

																				<button type="submit" className="search rounded-175">
																					<strong>Search</strong>
																				</button>
																			</div>
																		</div>
																		
																	</Card>
																	<div className="col-md-8 offset-md-4">
																		<DayPicker
																				className={(this.state.showDatepicker ? "Selectable datepicker-tab" : "d-none")}
																				numberOfMonths={this.props.numberOfMonths}
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
				
				{/* <div className="row mt-2">
					<div className="d-flex col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
						{content}
					</div>
				</div> */}

				{/* <StockHoldingEditColumn isOpen={this.state.displayMoreColumnModal}
										toggle={this.toggleDisplayMoreColumn}
										fields={this.state.columns}
										updateTableColumn={this.updateTableColumn} /> */}
			</React.Fragment>
		);
	}
}

export default StockMovement;