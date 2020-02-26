import React, {Component} from 'react'
import { Button} from 'reactstrap'
import DatePicker from './../../PurchaseOrder/Component/DatePicker'
import moment from 'moment'

export default class MovementSearch extends Component {
    constructor(props){
        super(props)

        this.state = {
            periodSelected:null,
            periodText:null,
            periodExpand:false,
            
            dateFromSelected:null,
            dateFromText:null,
            dateFromShow:false,

            dateToSelected:null,
            dateToText:null,
            dateToShow:false
        }
    }

    periodExpand = () => {
        this.setState({periodExpand: !this.state.periodExpand})
    }

    periodHanlder = (e) => {
        this.setState({periodSelected: e.target.id, periodText:e.target.textContent, periodExpand:false, dateFromShow:true})
    }

    dateFromHandler = (day) => {
        let dateFrom = moment(day).format('YYYY-MM-DD')
        let dateFromText = moment(day).format('DD MMMM YYYY')
        this.setState({dateFromSelected:dateFrom.toString(), dateFromText:dateFromText.toString(), dateFromShow:false, dateToShow:true})
    }

    dateToHandler = (day) => {
        let dateTo = moment(day).format('YYYY-MM-DD')
        let dateToText = moment(day).format('DD MMMM YYYY')
        this.setState({dateToSelected:dateTo.toString(), dateToText:dateToText.toString(), dateToShow:false})
    }

    movementSearch = () => {
        if(!this.state.dateFromSelected)
        {
            alert('please select date from')
        }
        else if(!this.state.dateToSelected)
        {
            alert('please select date to')
        }
        else if(!this.state.periodSelected)
        {
            alert('please select period')
        }
        else
        {
            this.props.getStockMovement(this.state.dateFromSelected, this.state.dateToSelected, this.state.periodSelected)
        }
    }

    render(){
        return(
            <div>
                <table width='100%'>
						<tr>
							<td className='searchParameterTitle' width='5.5%'>Display Period</td>

							<td width='10%'>
                                <div className='dropdown'>
                                    <button onClick={() => this.periodExpand()} className='btn dropdown-button dropdown-toggle ddlMovement' data-toggle='dropdown'>
                                        {this.state.periodSelected ? this.state.periodText :'Display Period'}
                                    </button>
                                    <div class={'dropdown-menu ' + (this.state.periodExpand ? 'show' : null)}>
                                        <div onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='day'>Daily</div>
                                        <div onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='week'>Weekly</div>
                                        <div onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='month'>Monthly</div>
                                    </div>
                                </div>
							</td>

							<td className='searchParameterTitle' width='4%'>Date From</td>

							<td width='10%'>
                                <div>
                                    <div onMouseLeave={() => this.setState({dateFromShow:false})}>
                                        <button onClick={()=> this.setState({dateFromShow:!this.state.dateFromShow})} className='btn dropdown-button dropdown-toggle ddlMovementDate' data-toggle='dropdown'>
                                            {this.state.dateFromText ? this.state.dateFromText : 'Select Date'}
                                        </button>
                                        <div  class='datePicker'>
                                        {this.state.dateFromShow ? <DatePicker selectedDays={moment(this.state.dateFromSelected)} getChosenDay={(day) => this.dateFromHandler(day)}/> : null}
                                        </div>
                                    </div> 
                                </div>                                  
							</td>

							<td className='searchParameterTitle' width='3%'>Date To</td>

							<td width='10%'>
                                <div onMouseLeave={() => this.setState({dateToShow:false})}>
                                    <button onClick={()=> this.setState({dateToShow:!this.state.dateToShow})} className='btn dropdown-button dropdown-toggle ddlMovementDate' data-toggle='dropdown'>
                                        {this.state.dateToText ? this.state.dateToText : 'Select Date'}
                                    </button>
                                    <div class='datePicker'>
                                    {this.state.dateToShow ? <DatePicker getChosenDay={(day) => this.dateToHandler(day)}/> : null}
                                    </div>
                                </div>                                   
							</td>

							<td width='5%'>
                            <Button className='movementSearchButton' onClick={()=> this.movementSearch()} className='movementBtnSearch' color="primary">Search</Button>
							</td>
						</tr>
					</table>
            </div>
        )
    }
}