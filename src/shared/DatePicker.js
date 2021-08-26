import React from 'react';
import DayPicker from 'react-day-picker';
import Dropdown from './Dropdown';
import './DatePicker.css';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { Button } from 'reactstrap';
import ReactResizeDetector from 'react-resize-detector';
import RequiredMessage from '../Component/RequiredMessage';

// const currentYear = new Date().getFullYear();
// const fromMonth = new Date();
// const toMonth = new Date(currentYear + 10, 11);
const dateFormate= process.env.REACT_APP_API_URL_FORMATE;

function Navbar({
    // nextMonth,
    // previousMonth,
    onPreviousClick,
    onNextClick,
    className,
    // localeUtils,
}) {
    // const months = localeUtils.getMonths();
    // const prev = months[previousMonth.getMonth()];
    // const next = months[nextMonth.getMonth()];
    const styleLeft = {
        float: 'left',
        color: "#637175",
        backgroundColor: "#E9ECED",
        borderColor: "#E9ECED",
        boxShadow: "none",
        margin: "0px 6px"

    
    };
    const styleRight = {
        float: 'right',
        color: "#637175",
        backgroundColor: "#E9ECED",
        borderColor: "#E9ECED",
        boxShadow: "none",
        margin: "0px 6px"
    };
    return (
        <div className={className} style={{ marginTop: "14px", marginLeft: "19px", marginRight: "19px", position: "relative" }}>
            <Button color="secondary" style={styleLeft} onClick={() => onPreviousClick()}>
                <i className="iconU-leftArrow" style={{ fontSize: "10px" }}></i>
            </Button>
            <Button color="secondary" style={styleRight} onClick={() => onNextClick()}>
                <i className="iconU-rightArrow" style={{ fontSize: "10px" }}></i>
            </Button>
        </div>
    );
}

function YearMonthForm({ date, localeUtils, onChange, current, fromMonth, toMonth }) {
    const months = localeUtils.getMonths();

    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
        years.push(i);
    }

    let monthValue, yearValue;
    monthValue = date.getMonth();
    yearValue = date.getFullYear();

    const handleChange = function handleChange(e) {
        if (e !== "") {
            monthValue = e.length < 3 ? e : monthValue;
            yearValue = e.length > 2 ? e : yearValue;
            onChange(new Date(yearValue, monthValue));
        }
    };

    let monthsIndex = [];
    months.map((value, index) => {
        monthsIndex.push(index);
    })

    let yearIndex = [];
    years.forEach((value, index) => {
        yearIndex.push(index);
    })

    return (
        <form className="DayPicker-Caption" style={{ marginTop: "-16px", padding: "0 1.57em" }}>
            <Dropdown placeHolder="Month"
                optionList={months.toString()}
                optionValue={monthsIndex.toString()}
                getValue={handleChange}
                style={{ width: '110px', height: '35px', float: 'left', marginRight: "0.4em", marginLeft: "0.128em" }}
                firstChecked={true}
                optionSelected={current.getMonth()}
                usedFor="Datepicker"
            />
            <Dropdown placeHolder="Year"
                optionList={years.toString()}
                optionValue={years.toString()}
                getValue={handleChange}
                style={{ width: '75px', height: '35px', float: 'left', marginRight: "0" }}
                firstChecked={true}
                optionSelected={current.getFullYear()}
                usedFor="Datepicker"
                field="orderDate"
            />
            {/* <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select> */}
        </form>
    );
}

class DatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDay: props.defaultValue ? props.defaultValue : new Date(),
            showDatePicker: false,
            month: props.defaultValue ? props.defaultValue : new Date(),
            monthChange: false,
            top: null,
            left: null,
            defaultValue: props.defaultValue ? moment(props.defaultValue).format(dateFormate) : null
        }
    }

    // componentDidUpdate(prevProps, prevState){
    //     const datepicker = document.getElementsByClassName("select_date_options");
    //     const width = datepicker[1].clientWidth+6;

    //     if(this.state.left != width){
    //         this.setState({ left: width })
    //     }
    // }

    componentDidUpdate(prevProps){
        if(this.props.firstDate){
            if (moment(prevProps.firstDate).format(dateFormate) !== moment(this.props.firstDate).format(dateFormate)){
                if(!this.props.firstValue){
                    let firstDate = new Date(this.props.firstDate);
                    firstDate.setDate(firstDate.getDate() + 1)
                    this.setState({ month: firstDate, selectedDay: firstDate, defaultValue: moment(firstDate).format(dateFormate)});
                    this.props.getDate(moment(firstDate).format("YYYY-MM-DD"))
                }
            }
        }
    }

    componentDidMount() {
        if (this.props.showDatePicker) {
            this.props.showDatePicker(this.state.showDatePicker)
        }
    }

    handleYearMonthChange = (month) => {
        this.setState({ month, monthChange: true });
    }

    handleDayClick = (day, modifiers = {}) => {
        if(modifiers.disabled){
            return;
        }
        this.setState({
            selectedDay: day, defaultValue: moment(day).format(dateFormate)
        });
        this.props.getDate(moment(day).format("YYYY-MM-DD"))
        this.setState({ showDatePicker: false });
        // this.refs['dateValue'].value = moment(day).format(dateFormate);
        if (this.props.onChange) {
            this.props.onChange()
        }
    }
    currentDate = () => {
        return this.state.month;
    }

    dateValueProcess = (e) => {
        this.setState({ defaultValue: e.target.value })
        if (e.target.value.length >= 10) {
            let value = e.target.value.split("");
            let year = value[6] + value[7] + value[8] + value[9]
            let month = value[3] + value[4];
            let date = value[0] + value[1];
            if ((month <= 12) && (date <= 31)) {
                this.setState({ selectedDay: new Date(year + "-" + month + "-" + date), month: new Date(year + "-" + month + "-" + date) })
                this.props.getDate(moment(new Date(year + "-" + month + "-" + date)).format("YYYY-MM-DD"))

            }
        };
    }

    disabledAlpha = (e) => {
        if (!(/[0-9]/g.test(e.key)) && (e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) {
            e.preventDefault();
        }

        // limit spesific character to slash only
        if((e.target.selectionStart == 2) && ((e.key != "/") && (e.key !== "Backspace"))){
            e.preventDefault();
        }else if((e.target.selectionStart == 5) && ((e.key != "/") && (e.key !== "Backspace"))){
            e.preventDefault();
        }

        // limit date
        if((e.target.selectionStart == 0) && ((e.key !== "Backspace") && (e.key > 3))){
            e.preventDefault();
        }else if(((e.target.selectionStart == 1) && ((e.key !== "Backspace") && (e.key == 0))) && (e.target.value[0] == 0)){
            e.preventDefault();
        }else if(((e.target.selectionStart == 1) && ((e.key !== "Backspace") && (e.key > 1))) && (e.target.value[0] == 3)){
            e.preventDefault();
        }

        //limit month
        else if((e.target.selectionStart == 3) && ((e.key !== "Backspace") && (e.key > 1))){
            e.preventDefault();
        }else if(((e.target.selectionStart == 4) && ((e.key !== "Backspace") && (e.key == 0))) && (e.target.value[3] == 0)){
            e.preventDefault();
        }else if(((e.target.selectionStart == 4) && ((e.key !== "Backspace") && (e.key > 2))) && (e.target.value[3] == 1)){
            e.preventDefault();
        }

        // validate month

        // enable month that have more than 29 days if date is 29
        else if(((e.target.selectionStart == 4) && (e.key !== "Backspace")) && (((e.target.value[0] == 2) && ((e.target.value[1] == 9) && (e.target.value[3] == 0))) && (/[2]/g.test(e.key)))){
            e.preventDefault();
        }

        // enable month that have more than 30 days if date is 30
        else if(((e.target.selectionStart == 4) && (e.key !== "Backspace")) && (((e.target.value[0] == 3) && ((e.target.value[1] == 0) && (e.target.value[3] == 0))) && (/[2]/g.test(e.key)))){
            e.preventDefault();
        }

        // enable month that have 31 days if date is 31
        else if(((e.target.selectionStart == 4) && (e.key !== "Backspace")) && (((e.target.value[0] == 3) && ((e.target.value[1] == 1) && (e.target.value[3] == 0))) && !(/[1|3|5|7|8]/g.test(e.key)))){
            e.preventDefault();
        }else if(((e.target.selectionStart == 4) && (e.key !== "Backspace")) && (((e.target.value[0] == 3) && ((e.target.value[1] == 1) && (e.target.value[3] == 1))) && !(/[0|2]/g.test(e.key)))){
            e.preventDefault();
        }

        
        //limit year
        else if((e.target.selectionStart == 6) && ((e.key !== "Backspace") && ((e.key == 0) || (e.key > 2)))){
            e.preventDefault();
        }else if(((e.target.selectionStart == 7) && ((e.key !== "Backspace") && (e.key != 9))) && (e.target.value[6] == 1)){
            e.preventDefault();
        }else if(((e.target.selectionStart == 7) && ((e.key !== "Backspace") && (e.key > 1))) && (e.target.value[6] == 2)){
            e.preventDefault();
        }else if(((e.target.selectionStart == 8) && ((e.key > 3) && ((e.key !== "Backspace") && (e.key < 10)))) && (e.target.value[5] == 1)){
            e.preventDefault();
        }

        
    }

    dateValueFormat = (e) => {
        if (/^[0-9]+$/.test(e.key)) {
            if (e.target.value.length === 2) {
                e.target.value += "/";
            };
            if (e.target.value.length === 5) {
                e.target.value += "/"
            };
        }

    }

    openDatePicker = () => {
        this.setState({ showDatePicker: true })
        if (this.props.showDatePicker) {
            this.props.showDatePicker(true)
        }
    }

    closeDatePicker = () => {
        this.setState({ showDatePicker: false })
        if (this.props.showDatePicker) {
            if(!this.props.isShow){
                this.props.showDatePicker(false)
            }
        }
    }

    resetDateValue = () => {
        this.setState({ defaultValue: "" });
        // this.refs["dateValue"].value = this.state.defaultValue;
    }

    render() {
        let placeHolder = "Select Date";
        let firstDate = new Date(this.props.firstDate);
        firstDate.setDate(firstDate.getDate() + 1)
        const no = Math.floor(Math.random() * 100000) + 1;
        const className = `select_date ${this.state.showDatePicker && (this.props.for === "SalesOrderCreate") ? "datepickerForOrderLine" : ""}`
        const messageParam = this.props.messageParam;
        
        return (
            <React.Fragment>
                <ul className={className} style={this.props.style} tabIndex={this.props.tabIndex ? this.props.tabIndex : null}>
                    <input type="text"
                        ref="dateValue"
                        placeholder={this.props.placeHolder ? this.props.placeHolder : dateFormate}
                        className={this.props.classNameInput}
                        maxLength="10"
                        value={this.state.defaultValue}
                        onChange={(e) => { 
                            this.dateValueProcess(e);
                        }}
                        // onChange={(e) => { this.dateValueProcess(e); if(this.props.onChange) {this.props.onChange()} }}
                        onFocus={() => {this.openDatePicker(); if(this.props.onOpen) {this.props.onOpen()}}}
                        onKeyUp={(e) => this.dateValueFormat(e)}
                        onKeyDown={(e) => this.disabledAlpha(e)}
                        style={this.props.formStyle} />
                    {/* <input className="select_date_close" type="radio" name={"select" + placeHolder + no} id={"select-close" + placeHolder + no} value="" defaultChecked/> */}
                    {/* <span className="select_date_label select_date_label-placeholder">{this.state.selectedDay ? moment(this.state.selectedDay).format(dateFormate) : placeHolder}</span> */}

                    {/* <li className="select_date_items"> */}
                    <input className={"select_date_expand" + (this.props.arrowStyle ? " select_arrow_expand" : " select_calendar_expand")} ref="opener" type="checkbox" name={"select" + placeHolder + no} value="" checked={this.state.showDatePicker} id={"select-opener" + placeHolder + no} />
                    <label className="select_date_closeLabel" htmlFor={"select-opener" + placeHolder + no} onClick={() => this.closeDatePicker()}></label>
                    <ReactResizeDetector
                        handleWidth handleHeight
                        refreshRate={2000}
                    // bounds={true}
                    // onResize={contentRect => {
                    // this.setState({ top: contentRect.bounds.height, left: contentRect.bounds.width })
                    // }}
                    >
                        {({ width, height }) => (
                            <div
                                // onHeightReady={height => this.setState({ top: "-"+(height)+"px" })} 
                                className={"select_date_options " + (this.props.field === "smallField " ? " smallField " : "") + ((this.props.top && this.props.fixedTop) || this.props.fixedTop ? "fixed-top-position" : "")}
                                style={(((this.props.top && !this.props.fixedTop)) ? { marginTop: "-" + height + "px", marginLeft: "-" + (width + 6) + "px" } : null) || (((this.props.right && !this.props.fixedTop)) ? { marginTop: "-50px", marginLeft: (width + 24) + "px" } : null)}>
                                <div className="dateInfo">
                                    {this.state.selectedDay ? moment(this.state.selectedDay).format(this.props.shortFormat ? "DD MMM YYYY" : "DD MMMM YYYY") : moment().format("DD MMMM YYYY")}
                                </div>
                                <DayPicker
                                    className="datepicker-content"
                                    tabIndex="-1"
                                    selectedDays={this.state.selectedDay ? this.state.selectedDay : new Date()}
                                    onDayClick={this.handleDayClick}
                                    month={this.state.month}
                                    fromMonth={this.props.fromMonth ? new Date(this.props.fromMonth) : new Date(new Date().getFullYear() - 5, 0)}
                                    toMonth={this.props.toMonth ? new Date(new Date(this.props.toMonth).getFullYear(), 11) : new Date(new Date(this.state.month).getFullYear() + 10, 11)}
                                    disabledDays={this.props.fromMonth ? [{
                                        before: this.props.firstDate ? firstDate : new Date(this.props.fromMonth)
                                    }] : false}
                                    onMonthChange={(e) => this.setState({ month: e })}
                                    captionElement={({ date, localeUtils }) => (
                                        <YearMonthForm
                                            date={date}
                                            localeUtils={localeUtils}
                                            onChange={this.handleYearMonthChange}
                                            current={this.state.month}
                                            fromMonth={this.props.fromMonth ? new Date(this.props.fromMonth) : new Date(new Date().getFullYear() - 5, 0)}
                                            toMonth={this.props.toMonth ? new Date(new Date(this.props.toMonth).getFullYear(), 11) : new Date(new Date().getFullYear() + 5, 11)}

                                        />
                                    )}
                                    navbarElement={<Navbar />}
                                />
                            </div>
                        )}
                    </ReactResizeDetector>
                    {/* <label className="select_date_expandLabel" htmlFor={"select-opener" + placeHolder + no}></label> */}
                    {/* </li> */}
                </ul>
                {!this.props.messageRequired ? null : (
                    <RequiredMessage
                        messageShow={this.state.defaultValue === '' || messageParam.checkDateTo ? true : false}
                        column={messageParam.column}
                        columnText={messageParam.columnText}
                        value={this.state.defaultValue !== '' ? this.state.defaultValue : null }
                        fieldName={messageParam.fieldName}
                        style={messageParam.style}
                        checkDateTo={messageParam.checkDateTo}
                    />
                )}

            </React.Fragment>
        )
    }
}

export default DatePicker;
