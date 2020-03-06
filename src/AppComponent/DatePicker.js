import React from 'react';
import DayPicker from 'react-day-picker';
import './DatePicker.css';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

const currentYear = new Date('2019').getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
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
      </select>
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

    handleYearMonthChange = (month) => {
        this.setState({ month }); 
    }

    handleDayClick = (day, { selected }) => {
        this.setState({
            selectedDay: selected ? undefined : day,
        });
    }

    render(){
        let placeHolder = "Select Date";
        const no = Math.floor(Math.random() * 100000) + 1;
        return(
            <React.Fragment>
                <ul className="select_date" style={ this.props.style }>
                    {/* <input type="checkbox" className="select_date_expand" name="select_opener" id={"select-opener" + placeHolder + no}></input> */}
                    {/* <input className="select_date_close" type="radio" name={"select" + placeHolder + no} id={"select-close" + placeHolder + no} value="" defaultChecked/> */}
                    <span className="select_date_label select_date_label-placeholder">{this.state.selectedDay ? moment(this.state.selectedDay).format(this.props.shortFormat ? "DD MMM YYYY" : "DD MMMM YYYY") : placeHolder}</span>
                    
                    <li className="select_date_items">
                        <input className="select_date_expand" type="checkbox" name={"select" + placeHolder + no} value="" id={"select-opener" + placeHolder + no}/>
                        <label className="select_date_closeLabel" htmlFor={"select-opener" + placeHolder + no}></label>
                        
                        <DayPicker
                            className="select_date_options"
                            selectedDays={this.state.selectedDay}
                            onDayClick={this.handleDayClick}
                            month={this.state.month}
                            fromMonth={fromMonth}
                            toMonth={toMonth}
                            captionElement={({ date, localeUtils }) => (
                                <YearMonthForm
                                date={date}
                                localeUtils={localeUtils}
                                onChange={this.handleYearMonthChange}
                                />
                            )}
                        />
                        
                        <label className="select_date_expandLabel" htmlFor={"select-opener" + placeHolder + no}></label>
                    </li>
                </ul>
                
            </React.Fragment>
        )
    }
}

export default DatePicker;
