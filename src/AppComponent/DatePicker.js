import React from 'react';
import DayPicker from 'react-day-picker';
import './DatePicker.css';


class DatePicker extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            selectedDay: undefined
        }
    }

    render(){
        let placeHolder = "Select Date";
        const no = Math.floor(Math.random() * 100000) + 1;
        return(
            <React.Fragment>
                <ul className="select_date" style={ this.props.style } onClick={this.props.onClick}>
                    <input className="select_date_close" type="radio" name={"select" + placeHolder + no} id={"select-close" + placeHolder + no} value="" defaultChecked/>
                    <span className="select_date_label select_date_label-placeholder">{placeHolder}</span>
                    
                    <li className="select_date_items">
                        <input className="select_date_expand" type="radio" name={"select" + placeHolder + no} value="" id={"select-opener" + placeHolder + no}/>
                        <label className="select_date_closeLabel" htmlFor={"select-close" + placeHolder + no}></label>
                        
                        
                        <label className="select_date_expandLabel" htmlFor={"select-opener" + placeHolder + no}></label>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}

export default DatePicker;
