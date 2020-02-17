import React from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

export default class BasicConcepts extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      day: new Date (moment())     
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
            <DayPicker month={new Date(this.state.day)} onDayClick={(day)=>this.dayclickhandler(day)}/>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}