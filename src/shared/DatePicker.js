import React from 'react';
import DayPicker from 'react-day-picker';
import './DatePicker.css';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { Button } from 'reactstrap';
import ReactResizeDetector from 'react-resize-detector';
import RequiredMessage from '../Component/RequiredMessage';
import endpoints from '../helpers/endpoints'
import Dropdown from './Dropdown';

const dateFormate = endpoints.env.REACT_APP_API_URL_FORMATE;

function Navbar({
  onPreviousClick,
  onNextClick,
  className,
}) {
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
        <i className="iconU-leftArrow" style={{ fontSize: "10px" }} />
      </Button>
      <Button color="secondary" style={styleRight} onClick={() => onNextClick()}>
        <i className="iconU-rightArrow" style={{ fontSize: "10px" }} />
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

  let monthValue;
  let yearValue;
  monthValue = date.getMonth();
  yearValue = date.getFullYear();

  const handleChange = (e) => {
    if (e !== "") {
      monthValue = e.length < 3 ? e : monthValue;
      yearValue = e.length > 2 ? e : yearValue;
      onChange(new Date(yearValue, monthValue));
    }
  };

  const monthsIndex = [];
  months.forEach((_value, index) => {
    monthsIndex.push(index);
  })

  const yearIndex = [];
  years.forEach((_value, index) => {
    yearIndex.push(index);
  })

  return (
    <form className="DayPicker-Caption" style={{ marginTop: "-16px", padding: "0 1.57em" }}>
      <Dropdown
        placeHolder="Month"
        optionList={months.toString()}
        optionValue={monthsIndex.toString()}
        getValue={handleChange}
        style={{ width: '110px', height: '35px', float: 'left', marginRight: "0.4em", marginLeft: "0.128em" }}
        firstChecked
        optionSelected={current.getMonth()}
        usedFor="Datepicker"
      />
      <Dropdown
        placeHolder="Year"
        optionList={years.toString()}
        optionValue={years.toString()}
        getValue={handleChange}
        style={{ width: '75px', height: '35px', float: 'left', marginRight: "0" }}
        firstChecked
        optionSelected={current.getFullYear()}
        usedFor="Datepicker"
        field="orderDate"
      />
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

  componentDidMount() {
    const { showDatePicker } = this.props
    if (showDatePicker) {
      showDatePicker(this.state.showDatePicker)
    }
  }

  componentDidUpdate(prevProps) {
    const { firstDate, firstValue, getDate } = this.props
    if (firstDate) {
      if (moment(prevProps.firstDate).format(dateFormate) !== moment(firstDate).format(dateFormate)) {
        if (!firstValue) {
          const firstDateData = new Date(firstDate);
          firstDateData.setDate(firstDateData.getDate() + 1)
          this.setState({ month: firstDateData, selectedDay: firstDateData, defaultValue: moment(firstDateData).format(dateFormate) });
          getDate(moment(firstDateData).format("YYYY-MM-DD"))
        }
      }
    }
  }

  handleYearMonthChange = (month) => {
    this.setState({ month, monthChange: true });
  }

  handleDayClick = (day, modifiers = {}) => {
    const { getDate, onChange } = this.props
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      selectedDay: day, defaultValue: moment(day).format(dateFormate)
    });
    getDate(moment(day).format("YYYY-MM-DD"))
    this.setState({ showDatePicker: false });
    if (onChange) {
      onChange()
    }
  }

  currentDate = () => {
    const { month } = this.state
    return month;
  }

  dateValueProcess = (e) => {
    this.setState({ defaultValue: e.target.value })
    const dateNumber = dateFormate === ('MM/DD/YYYY') ? 3 : 0
    const dateNumber2 = dateFormate === ('MM/DD/YYYY') ? 4 : 1
    const monthNumber = dateFormate === ('MM/DD/YYYY') ? 0 : 3
    const monthNumber2 = dateFormate === ('MM/DD/YYYY') ? 1 : 4
    const { getDate } = this.props
    if (e.target.value.length >= 10) {
      const value = e.target.value.split("");
      const year = value[6] + value[7] + value[8] + value[9]
      const month = value[monthNumber] + value[monthNumber2];
      const date = value[dateNumber] + value[dateNumber2];
      if ((month <= 12) && (date <= 31)) {
        this.setState({ selectedDay: new Date(`${year}-${month}-${date}`), month: new Date(`${year}-${month}-${date}`) })
        getDate(moment(new Date(`${year}-${month}-${date}`)).format("YYYY-MM-DD"))
      }
    }
  }

  disabledAlpha = (e) => {
    const dateNumber = dateFormate === ('MM/DD/YYYY') ? 2 : 1
    const dateNumber2 = dateFormate === ('MM/DD/YYYY') ? 1 : 3
    const monthNumber = dateFormate === ('MM/DD/YYYY') ? 3 : 1

    if (!(/[0-9]/g.test(e.key)) && (e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) {
      e.preventDefault();
    }

    // limit spesific character to slash only
    if ((e.target.selectionStart === 2) && ((e.key !== "/") && (e.key !== "Backspace"))) {
      e.preventDefault();
    } else if ((e.target.selectionStart === 5) && ((e.key !== "/") && (e.key !== "Backspace"))) {
      e.preventDefault();
    }

    // limit date
    if ((e.target.selectionStart === 0) && ((e.key !== "Backspace") && (e.key > dateNumber2))) {
      e.preventDefault();
    } else if (((e.target.selectionStart === 1) && ((e.key !== "Backspace") && (e.key === 0))) && (e.target.value[0] === 0)) {
      e.preventDefault();
    } else if (((e.target.selectionStart === 1) && ((e.key !== "Backspace") && (e.key > 1))) && (e.target.value[0] === dateNumber)) {
      e.preventDefault();
    }

    // limit month
    else if ((e.target.selectionStart === 3) && ((e.key !== "Backspace") && (e.key > monthNumber))) {
      e.preventDefault();
    } else if (((e.target.selectionStart === 4) && ((e.key !== "Backspace") && (e.key === 0))) && (e.target.value[3] === 0)) {
      e.preventDefault();
    } else if (((e.target.selectionStart === 4) && ((e.key !== "Backspace") && (e.key > 2))) && (e.target.value[3] === monthNumber)) {
      e.preventDefault();
    }

    // validate month

    // enable month that have more than 29 days if date is 29
    else if (((e.target.selectionStart === 4) && (e.key !== "Backspace")) && (((e.target.value[0] === 2) && ((e.target.value[1] === 9) && (e.target.value[3] === 0))) && (/[2]/g.test(e.key)))) {
      e.preventDefault();
    }

    // enable month that have more than 30 days if date is 30
    else if (((e.target.selectionStart === 4) && (e.key !== "Backspace")) && (((e.target.value[0] === 3) && ((e.target.value[1] === 0) && (e.target.value[3] === 0))) && (/[2]/g.test(e.key)))) {
      e.preventDefault();
    }

    // enable month that have 31 days if date is 31
    else if (((e.target.selectionStart === 4) && (e.key !== "Backspace")) && (((e.target.value[0] === 3) && ((e.target.value[1] === 1) && (e.target.value[3] === 0))) && !(/[1|3|5|7|8]/g.test(e.key)))) {
      e.preventDefault();
    } else if (((e.target.selectionStart === 4) && (e.key !== "Backspace")) && (((e.target.value[0] === 3) && ((e.target.value[1] === 1) && (e.target.value[3] === 1))) && !(/[0|2]/g.test(e.key)))) {
      e.preventDefault();
    }


    // limit year
    else if ((e.target.selectionStart === 6) && ((e.key !== "Backspace") && ((e.key === 0) || (e.key > 2)))) {
      e.preventDefault();
    } else if (((e.target.selectionStart === 7) && ((e.key !== "Backspace") && (e.key !== 9))) && (e.target.value[6] === 1)) {
      e.preventDefault();
    } else if (((e.target.selectionStart === 7) && ((e.key !== "Backspace") && (e.key > 1))) && (e.target.value[6] === 2)) {
      e.preventDefault();
    } else if (((e.target.selectionStart === 8) && ((e.key > 3) && ((e.key !== "Backspace") && (e.key < 10)))) && (e.target.value[5] === 1)) {
      e.preventDefault();
    }


  }

  dateValueFormat = (e) => {
    if (/^[0-9]+$/.test(e.key)) {
      if (e.target.value.length === 2) {
        e.target.value += "/";
      } else if (e.target.value.length === 5) {
        e.target.value += "/"
      }
    }

  }

  openDatePicker = () => {
    const { showDatePicker } = this.props
    this.setState({ showDatePicker: true })
    if (showDatePicker) {
      showDatePicker(true)
    }
  }

  closeDatePicker = () => {
    const { isShow, showDatePicker } = this.props
    this.setState({ showDatePicker: false })
    if (this.props.showDatePicker) {
      if (!isShow) {
        showDatePicker(false)
      }
    }
  }

  resetDateValue = () => {
    this.setState({ defaultValue: "" });
  }

  render() {
    const {
      firstDate, messageParam, style, tabIndex, placeHolder, classNameInput, onOpen, formStyle, arrowStyle, field, top, fixedTop, right, shortFormat, fromMonth, toMonth, messageRequired
    } = this.props
    const { showDatePicker, defaultValue, selectedDay, month } = this.state
    const placeHolderDate = "Select Date";
    const firstDates = new Date(firstDate);
    firstDates.setDate(firstDates.getDate() + 1)
    const no = Math.floor(Math.random() * 100000) + 1;
    const className = `select_date ${showDatePicker && (this.props.for === "SalesOrderCreate") ? "datepickerForOrderLine" : ""}`
    const messageParams = messageParam;
    const defaultValues = defaultValue !== '' ? defaultValue : null
    const messageParamShow = defaultValue === '' || messageParams.checkDateTo ? true : false
    const selectedDays = selectedDay ? moment(selectedDay).format(shortFormat ? "DD MMM YYYY" : "DD MMMM YYYY") : moment().format("DD MMMM YYYY")

    return (
      <>
        <ul className={className} style={style} tabIndex={tabIndex ? tabIndex : null}>
          <input
            type="text"
            ref="dateValue"
            placeholder={placeHolder ?? dateFormate}
            className={classNameInput}
            maxLength="10"
            value={defaultValue}
            onChange={(e) => {
              this.dateValueProcess(e);
            }}
            onFocus={() => { this.openDatePicker(); if (onOpen) { onOpen() } }}
            onKeyUp={(e) => this.dateValueFormat(e)}
            onKeyDown={(e) => this.disabledAlpha(e)}
            style={formStyle}
          />
          <input
            className={`select_date_expand ${arrowStyle ? "select_arrow_expand" : "select_calendar_expand"}`}
            ref="opener"
            type="checkbox"
            name={`select${placeHolderDate}${no}`}
            value=""
            checked={showDatePicker}
            id={`select-opener${placeHolderDate}${no}`}
          />
          <label
            className="select_date_closeLabel"
            htmlFor={`select-opener${placeHolderDate}${no}`}
            onClick={() => this.closeDatePicker()}
            aria-hidden="true"
          />
          <ReactResizeDetector
            handleWidth
            handleHeight
            refreshRate={2000}
          >
            {({ width, height }) => (
              <div
                className={`select_date_options ${field === "smallField " ? " smallField " : ""} ${top && fixedTop || fixedTop ? "fixed-top-position" : ""}`}
                style={(top && !fixedTop) ? { marginTop: `-${height}px`, marginLeft: `-${width + 6}px` } : null || (right && !fixedTop ? { marginTop: "-50px", marginLeft: `${width + 24}px` } : null)}
              >
                <div className="dateInfo">
                  {selectedDays}
                </div>
                <DayPicker
                  className="datepicker-content"
                  tabIndex="-1"
                  selectedDays={selectedDay ?? new Date()}
                  onDayClick={this.handleDayClick}
                  month={month}
                  fromMonth={fromMonth ? new Date(fromMonth) : new Date(new Date().getFullYear() - 5, 0)}
                  toMonth={toMonth ? new Date(new Date(toMonth).getFullYear(), 11) : new Date(new Date(month).getFullYear() + 10, 11)}
                  disabledDays={fromMonth ? [{
                    before: firstDate ? firstDates : new Date(fromMonth)
                  }] : false}
                  onMonthChange={(e) => this.setState({ month: e })}
                  captionElement={({ date, localeUtils }) => (
                    <YearMonthForm
                      date={date}
                      localeUtils={localeUtils}
                      onChange={this.handleYearMonthChange}
                      current={month}
                      fromMonth={fromMonth ? new Date(fromMonth) : new Date(new Date().getFullYear() - 5, 0)}
                      toMonth={toMonth ? new Date(new Date(toMonth).getFullYear(), 11) : new Date(new Date().getFullYear() + 5, 11)}
                    />
                  )}
                  navbarElement={<Navbar />}
                />
              </div>
            )}
          </ReactResizeDetector>
        </ul>
        {!messageRequired ? null : (
          <RequiredMessage
            messageShow={messageParamShow}
            column={messageParams.column}
            columnText={messageParams.columnText}
            value={defaultValues}
            fieldName={messageParams.fieldName}
            style={messageParams.style}
            checkDateTo={messageParams.checkDateTo}
          />
        )}

      </>
    )
  }
}

export default DatePicker;
