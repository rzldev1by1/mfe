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
  render() {
    return (
      <div className='datepicker'>
        <table>
          <tr>
            <td align='center'>
              <select className='selectinput' onChange={(e)=> this.setState({month:parseInt(e.target.value)+1})}>
                {this.state.monthNames.map(
                    (month, i) => <option value={i}>{month}</option>
                )}
              </select>
            </td>
            <td></td>
            <td align='center'>
              <select className='selectinput' onChange={(e)=> this.setState({year:parseInt(e.target.value)})}>
                {
                  this.state.monthNames.map(
                  (month,i) => <option value={new Date().getFullYear()-i}>{new Date().getFullYear()-i}</option>
                  )
                }
              </select>
            </td>
          </tr>
          <tr>
            <td align='center' colSpan='3'>
            <DayPicker month={new Date(this.state.year, this.state.month-1)} onDayClick={(day)=>this.setState({day:day.toLocaleDateString()})}/>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align='center'><button className='primary'>Confirm</button></td>  
          </tr> 
        </table>
        <div>{this.state.day}</div>
        <div>{this.state.month}</div>
        <div>{this.state.year}</div>
      </div>
    );
  }
}