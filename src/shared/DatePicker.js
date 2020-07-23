import React from 'react';
import DayPicker from 'react-day-picker';
import Dropdown from './Dropdown';
import './DatePicker.css';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { Button } from 'reactstrap';
import ReactResizeDetector from 'react-resize-detector';

// const currentYear = new Date().getFullYear();
// const fromMonth = new Date();
// const toMonth = new Date(currentYear + 10, 11);

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
        borderColor: "#E9ECED"
    };
    const styleRight = {
        float: 'right',
        color: "#637175",
        backgroundColor: "#E9ECED",
        borderColor: "#E9ECED"
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
    years.map((value, index) => {
        yearIndex.push(index);
    })

    return (
        <form className="DayPicker-Caption" style={{ marginTop: "-16px", padding: "0 1.87em" }}>
            <Dropdown placeHolder="Month"
                optionList={months.toString()}
                optionValue={monthsIndex.toString()}
                getValue={handleChange}
                style={{ width: '100px', height: '35px', float: 'left', marginRight: "0.6em" }}
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
            selectedDay: null,
            showDatePicker: false,
            month: new Date(),
            monthChange: false,
            top: null,
            left: null
        }
    }

    // componentDidUpdate(prevProps, prevState){
    //     const datepicker = document.getElementsByClassName("select_date_options");
    //     const width = datepicker[1].clientWidth+6;

    //     if(this.state.left != width){
    //         this.setState({ left: width })
    //     }
    // }

    componentDidMount() {
        if (this.props.showDatePicker) {
            this.props.showDatePicker(this.state.showDatePicker)
        }
    }

    handleYearMonthChange = (month) => {
        this.setState({ month, monthChange: true });
    }

    handleDayClick = (day, { selected }) => {
        this.setState({
            selectedDay: selected ? undefined : day,
        });
        this.props.getDate(moment(selected ? undefined : day).format("YYYY-MM-DD"))
        this.setState({ showDatePicker: false });
        this.refs['dateValue'].value = moment(day).format("DD/MM/YYYY");
        if (this.props.onChange) {
            this.props.onChange()
        }
    }
    currentDate = () => {
        return this.state.month;
    }

    dateValueProcess = (e) => {
        if (e.target.value.length >= 10) {
            let value = e.target.value.split("");
            let year = value[6] + value[7] + value[8] + value[9]
            let month = value[3] + value[4];
            let date = value[0] + value[1];
            if ((month <= 12) && (date <= 31)) {
                this.setState({ selectedDay: new Date(year + "-" + month + "-" + date), month: new Date(year + "-" + month + "-" + date) })
            }
        };
    }

    disabledAlpha = (e) => {
        if (!(/^[0-9]+$/.test(e.key)) && (e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) {
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

    render() {
        let placeHolder = "Select Date";
        const no = Math.floor(Math.random() * 100000) + 1;
        const className = `select_date ${this.state.showDatePicker && (this.props.for === "SalesOrderCreate") ? "datepickerForOrderLine" : ""}`
        return (
            <React.Fragment>
                <ul className={className} style={this.props.style} tabIndex={this.props.tabIndex ? this.props.tabIndex : null}>
                    <input type="text"
                        ref="dateValue"
                        placeholder={this.props.placeHolder ? this.props.placeHolder : "DD/MM/YYYY"}
                        className="form-control"
                        maxLength="10"
                        defaultValue={this.state.selectedDays ? moment(this.state.selectedDay).format("DD/MM/YYYY") : null}
                        onChange={(e) => { this.dateValueProcess(e) }}
                        onFocus={() => this.openDatePicker()}
                        onKeyUp={(e) => this.dateValueFormat(e)}
                        onKeyDown={(e) => this.disabledAlpha(e)}
                        style={this.props.formStyle}
                        pattern={/^[-+]?[0-9]+$/} />
                    {/* <input className="select_date_close" type="radio" name={"select" + placeHolder + no} id={"select-close" + placeHolder + no} value="" defaultChecked/> */}
                    {/* <span className="select_date_label select_date_label-placeholder">{this.state.selectedDay ? moment(this.state.selectedDay).format("DD/MM/YYYY") : placeHolder}</span> */}

                    {/* <li className="select_date_items"> */}
                    <input className="select_date_expand" ref="opener" type="checkbox" name={"select" + placeHolder + no} value="" checked={this.state.showDatePicker} id={"select-opener" + placeHolder + no} />
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
                                style={((this.props.top && !this.props.fixedTop)) ? { marginTop: "-" + height + "px", marginLeft: "-" + (width + 6) + "px" } : null}>
                                <div className="dateInfo">
                                    {this.state.selectedDay ? moment(this.state.selectedDay).format(this.props.shortFormat ? "DD MMM YYYY" : "DD MMMM YYYY") : (this.props.fromMonth ? moment(this.props.fromMonth).format("DD MMMM YYYY") : moment().format("DD MMMM YYYY"))}
                                </div>
                                <DayPicker
                                    className="datepicker-content"
                                    tabIndex="-1"
                                    selectedDays={this.state.selectedDay ? this.state.selectedDay : (this.props.fromMonth ? new Date(this.props.fromMonth) : new Date())}
                                    onDayClick={this.handleDayClick}
                                    month={this.props.fromMonth ? (this.state.monthChange ? this.state.month : new Date(this.props.fromMonth)) : this.state.month}
                                    fromMonth={this.props.fromMonth ? new Date(this.props.fromMonth) : this.state.month}
                                    toMonth={this.props.toMonth ? new Date(new Date(this.props.toMonth).getFullYear(), 11) : new Date(new Date(this.state.month).getFullYear() + 10, 11)}
                                    onMonthChange={(e) => this.setState({ month: e })}
                                    captionElement={({ date, localeUtils }) => (
                                        <YearMonthForm
                                            date={date}
                                            localeUtils={localeUtils}
                                            onChange={this.handleYearMonthChange}
                                            current={this.props.fromMonth ? (this.state.monthChange ? this.state.month : new Date(this.props.fromMonth)) : this.state.month}
                                            fromMonth={this.props.fromMonth ? new Date(this.props.fromMonth) : this.state.month}
                                            toMonth={this.props.toMonth ? new Date(new Date(this.props.toMonth).getFullYear(), 11) : new Date(new Date(this.state.month).getFullYear() + 10, 11)}

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

            </React.Fragment>
        )
    }
}

export default DatePicker;
