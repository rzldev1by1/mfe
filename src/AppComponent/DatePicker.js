import React from 'react';
import DayPicker from 'react-day-picker';
import Dropdown from './Dropdown';
import './DatePicker.css';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

const currentYear = new Date().getFullYear();
const fromMonth = new Date();
const toMonth = new Date(currentYear + 10, 11);

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
    if(e !== ""){
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
    <form className="DayPicker-Caption">
        <Dropdown placeHolder="Month"
                  optionList={months.toString()}
                  optionValue={monthsIndex.toString()}
                  getValue={handleChange}
                  style={{ width: '100px', height: '30px', float: 'left' }}
                  firstChecked={true}
                  optionSelected={current.getMonth()}
                  usedFor="Datepicker"
                  />
        <Dropdown placeHolder="Year"
                  optionList={years.toString()}
                  optionValue={years.toString()}
                  getValue={handleChange}
                  style={{ width: '75px', height: '30px', float: 'left', marginLeft: "10px" }}
                  firstChecked={true}
                  optionSelected={current.getFullYear()}
                  usedFor="Datepicker"
                  field="orderDate"
                  />
        {console.log(monthValue, yearValue)}
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

class DatePicker extends React.Component{
    constructor(props){
        super(props)
        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDay: null,
            showDatePicker: false,
            month : fromMonth
        }
    }

    componentDidMount() {
        // this.props.getDate(moment().format("YYYY-MM-DD"))
    }

    handleYearMonthChange = (month) => {
        this.setState({ month }); 
    }

    handleDayClick = (day, { selected }) => {
        this.setState({
            selectedDay: selected ? undefined : day,
        });
        this.props.getDate(moment(selected ? undefined : day).format("YYYY-MM-DD"))
        this.setState({ showDatePicker: false });
        this.refs['dateValue'].value = moment(day).format("DD-MM-YYYY");
    }
    currentDate = () => {
        return this.state.month;
    }

    dateValueProcess = (e) => {
        if(e.target.value.length >= 10) {
            let value = e.target.value.split("");
            let year = value[6] + value[7] + value[8] + value[9]
            let month = value[3] + value[4];
            let date = value[0] + value[1];
            if((month <= 12) && (date <= 31 )){
                this.setState({ selectedDay: new Date(year + "-" + month + "-" + date), month: new Date(year + "-" + month + "-" + date) })
            }
        };
    }

    disabledAlpha = (e) => {
        if(!(/^[0-9]+$/.test(e.key)) && (e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight") ){
            e.preventDefault();
        }
    }

    dateValueFormat = (e) => {
        if(/^[0-9]+$/.test(e.key)){
            if(e.target.value.length == 2) {
                e.target.value += "-";
            };
            if(e.target.value.length == 5) {
                e.target.value += "-"
            };
        }

    }



    render(){
        let placeHolder = "Select Date";
        const no = Math.floor(Math.random() * 100000) + 1;
        return(
            <React.Fragment>
                <ul className="select_date" style={ this.props.style } tabIndex={this.props.tabIndex ? this.props.tabIndex : null}>
                      <input type="text" 
                                ref="dateValue"
                                placeholder="DD-MM-YYYY" 
                                className="form-control" 
                                maxLength="10"
                                defaultValue={this.state.selectedDays ? moment(this.state.selectedDay).format("DD-MM-YYYY") : null} 
                                onChange={(e) => {this.dateValueProcess(e)} }
                                onFocus={() => this.setState({ showDatePicker: true })}
                                onKeyUp={(e) => this.dateValueFormat(e)}
                                onKeyDown={(e) => this.disabledAlpha(e)}
                                pattern={/^[-+]?[0-9]+$/} />
                    {/* <input className="select_date_close" type="radio" name={"select" + placeHolder + no} id={"select-close" + placeHolder + no} value="" defaultChecked/> */}
                    {/* <span className="select_date_label select_date_label-placeholder">{this.state.selectedDay ? moment(this.state.selectedDay).format("DD/MM/YYYY") : placeHolder}</span> */}
                    
                    {/* <li className="select_date_items"> */}
                        <input className="select_date_expand" ref="opener" type="checkbox" name={"select" + placeHolder + no} value="" checked={this.state.showDatePicker} id={"select-opener" + placeHolder + no}/>
                        <label className="select_date_closeLabel" htmlFor={"select-opener" + placeHolder + no} onClick={() => this.setState({ showDatePicker: false })}></label>
                        <div className={"select_date_options " + (this.props.field == "smallField " ? " smallField " : "") + ((this.props.top && !this.props.fixedTop) ? "top" : "") + ((this.props.top && this.props.fixedTop) || this.props.fixedTop ? "fixed-top-position" : "")}>
                            <div className="dateInfo">
                            {this.state.selectedDay ? moment(this.state.selectedDay).format(this.props.shortFormat ? "DD MMM YYYY" : "DD MMMM YYYY") : moment().format("DD MMMM YYYY")}
                            </div>
                            <DayPicker
                                className="datepicker-content"
                                tabIndex="-1"
                                selectedDays={this.state.selectedDay ? this.state.selectedDay : new Date()}
                                onDayClick={this.handleDayClick}
                                month={this.state.month}
                                fromMonth={fromMonth}
                                toMonth={toMonth}
                                onMonthChange={(e) => this.setState({ month: e })}
                                captionElement={({ date, localeUtils }) => (
                                    <YearMonthForm
                                    date={date}
                                    localeUtils={localeUtils}
                                    onChange={this.handleYearMonthChange}
                                    current={this.state.month}
                                    fromMonth={this.state.month}
                                    toMonth={new Date(new Date(this.state.month).getFullYear() + 10, 11)}
                                    />
                                )}
                            />
                        </div>
                        {/* <label className="select_date_expandLabel" htmlFor={"select-opener" + placeHolder + no}></label> */}
                    {/* </li> */}
                </ul>
                
            </React.Fragment>
        )
    }
}

export default DatePicker;
