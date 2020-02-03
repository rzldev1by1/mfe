import React from 'react';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';

export default class BasicConcepts extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      day: new Date().getDate(),
      month:parseInt(new Date().getMonth())+1,
      year: new Date().getFullYear(),
      monthNames :  ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"
                    ],
      
    }
  }

  dayclickhandler = (day) => {
    this.setState({day:day.toLocaleDateString()},()=> this.props.getChosenDay(this.state.day))
   
  }
  render() {
    return (
      <div className='datepicker'>
        <table>
          <tr>
            <td align='center' colSpan='3'>
            <DayPicker month={new Date(this.state.year, this.state.month-1)} onDayClick={(day)=>this.dayclickhandler(day)}/>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}