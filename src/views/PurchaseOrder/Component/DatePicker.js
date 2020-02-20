import React from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

export default class BasicConcepts extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      day: new Date (moment()),  
      month: moment().format('MM') ,
      year: moment().format('YYYY')
    }
  }

  dayclickhandler = (day) => {
    this.setState({day:day},()=> this.props.getChosenDay(this.state.day))   
  }
  render() {
    return (
      <div className='datepicker'>
        <table>
          <tr>
            <td align='center' colSpan='3'>
            <DayPicker month={new Date(parseInt(moment().format('YYYY')) , moment(this.state.day).subtract('M', 1).format('MM'))} onDayClick={(day)=>this.dayclickhandler(day)}/>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}