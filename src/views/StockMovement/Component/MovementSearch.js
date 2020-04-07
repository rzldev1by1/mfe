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

    displayPeriod = () => {
        return(
            <div className='displayParent'>
                <div className='searchParameterTitle dp'>Display Period</div>
                <div className='dropdown ddlSearchParam'>
                    <div className='displayButtonToggle'>
                    <button style={{color:'#7c878c'}} onClick={() => this.periodExpand()} className='btn dropdown-button ddlMovement' data-toggle='dropdown'>
                        {this.state.periodSelected ? this.state.periodText :'Select Period'}
                    </button>
                    <div className='dropdown-toggle'/>
                    </div>
                    <div class={'dropdown-menu ' + (this.state.periodExpand ? 'show' : null)}>
                        <div style={{color:'#7c878c'}} onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='day'>Daily</div>
                        <div style={{color:'#7c878c'}} onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='week'>Weekly</div>
                        <div style={{color:'#7c878c'}} onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='month'>Monthly</div>
                    </div>
                </div>
            </div> 
        )
    }

    displayDate = () => {
        return(
            <div className='displayParent middles'>
                <div className='searchParameterTitleDate'>Date From</div>
                <div onMouseLeave={() => this.setState({dateFromShow:false})}>
                <div className='displayButtonToggle'>
                    <button style={{color:'#7c878c'}} onClick={()=> this.setState({dateFromShow:!this.state.dateFromShow})} className='btn dropdown-button ddlMovementDate' data-toggle='dropdown'>
                        {this.state.dateFromText ? this.state.dateFromText : 'Select Date'}
                    </button>
                    <div className='dropdown-toggle'/>
                    </div>
                    <div  class='datePicker'>
                    {this.state.dateFromShow ? <DatePicker selectedDays={moment(this.state.dateFromSelected)} getChosenDay={(day) => this.dateFromHandler(day)}/> : null}
                    </div>
                </div> 

                <div style={{marginLeft:'45px'}} className='searchParameterTitleDate'>To</div>
                <div onMouseLeave={() => this.setState({dateToShow:false})}>
                <div className='displayButtonToggle'>
                    <button style={{color:'#7c878c'}} onClick={()=> this.setState({dateToShow:!this.state.dateToShow})} className='btn dropdown-button ddlMovementDate' data-toggle='dropdown'>
                        {this.state.dateToText ? this.state.dateToText : 'Select Date'}
                    </button>
                    <div className='dropdown-toggle'/>
                    </div>
                    <div class='datePicker'>
                    {this.state.dateToShow ? <DatePicker getChosenDay={(day) => this.dateToHandler(day)}/> : null}
                    </div>
                </div>  
            </div> 
        )
    }

    render(){
        return(
            <div>
                <table width='100%'>
						<tr>
							<td width='20%'>{this.displayPeriod()}</td>
							<td width='36%'>{this.displayDate()}</td>
							<td  width='8%'>
                            <Button  onClick={()=> this.movementSearch()} className='movementBtnSearch' color="primary">Search</Button>
							</td>
						</tr>
					</table>
            </div>
        )
    }
}