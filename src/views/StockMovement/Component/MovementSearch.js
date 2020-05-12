import React, {Component} from 'react'
import { Button} from 'reactstrap'
import DatePicker from './../../PurchaseOrder/Component/DatePicker'
import moment from 'moment'
import Dropdown from '../../../AppComponent/Dropdown'
import axios from 'axios'
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import AutoComplete from '../../../AppComponent/AutoComplete'

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
            dateToShow:false,

            //filter
            filterclicked:true,
            clientdata: [],
            sitedata: [],
            productdata:[],
        }
    }
    componentDidMount = () => {
        this.getclient();
        this.getsite();
        this.getproduct();
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
                    <button style={{color:'#7c878c'}} onClick={() => this.periodExpand()} className='btn dropdown-button ddlMovement default-box-height' data-toggle='dropdown'>
                        {this.state.periodSelected ? this.state.periodText :'Select Period'}
                    </button>
                    <div className='dropdown-toggle'/>
                    </div>
                    <div className={'dropdown-menu ' + (this.state.periodExpand ? 'show' : null)}>
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
                    <button style={{color:'#7c878c'}} onClick={()=> this.setState({dateFromShow:!this.state.dateFromShow})} className='btn dropdown-button ddlMovementDate default-box-height' data-toggle='dropdown'>
                        {this.state.dateFromText ? this.state.dateFromText : 'Select Date'}
                    </button>
                    <div className='dropdown-toggle'/>
                    </div>
                    <div  className='datePicker'>
                    {this.state.dateFromShow ? <DatePicker selectedDays={moment(this.state.dateFromSelected)} getChosenDay={(day) => this.dateFromHandler(day)}/> : null}
                    </div>
                </div> 

                <div style={{marginLeft:'26px'}} className='searchParameterTitleDate'>To</div>
                <div onMouseLeave={() => this.setState({dateToShow:false})}>
                <div className='displayButtonToggle'>
                    <button style={{color:'#7c878c'}} onClick={()=> this.setState({dateToShow:!this.state.dateToShow})} className='btn dropdown-button ddlMovementDate default-box-height' data-toggle='dropdown'>
                        {this.state.dateToText ? this.state.dateToText : 'Select Date'}
                    </button>
                    <div className='dropdown-toggle'/>
                    </div>
                    <div className='datePicker'>
                    {this.state.dateToShow ? <DatePicker getChosenDay={(day) => this.dateToHandler(day)}/> : null}
                    </div>
                </div>  
            </div> 
        )
    }


      
    getclient = () => {
        axios.get(endpoint.getClient, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ clientdata:result })
          })
          .catch(error => {
            
            console.log(error);
          })
    }

      getsite = () => {         
        axios.get(endpoint.getSite, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            this.setState({ sitedata:result })
          })
          .catch(error => {
            
          })
      }

      getproduct = () => {
        let self = this;
        axios.get(endpoint.getProduct + '?client=' + headers.client, {
          headers: headers
        })
          .then(res => {
            const result = res.data
            self.setState({ productdata:result })
          })
          .catch(error => {
            
            console.log(error);
          })
    }

      getSiteSelected = (value) => {
        this.setState({ siteSelected: value });
      };
    
      getClientSelected = (value) => {
        this.setState({ clientSelected: value });
      };

      getProductSelected = (value) => {
        this.setState({ productSelected: value });
      };

      showDropdowns = () => {
        let clientName = [];
        let clientValue = [];
        let siteData = [];
        let siteValue =[];
        let productData = [];
        let productValue =[];
        if(this.state.clientdata){
            this.state.clientdata.map((data) => {
                clientName.push(data.code + ' : '+data.name );
                clientValue.push(data.code);
            })
            clientName.push("All");
            clientValue.push("");
        }
        if(this.state.sitedata){
            this.state.sitedata.map((data) => {
                siteData.push(data.site +' : '+data.name );
                siteValue.push(data.site);
            })
            siteData.push("All");
            siteValue.push("");
        }
        if(this.state.productdata){
            productData.push(this.state.productdata.code);
            productValue.push(this.state.productdata.code);
    }
          return(
              <React.Fragment>
                  <Dropdown placeHolder="Site" 
                            className="filterDropdown"
                            optionList={siteData.toString()}
                            optionValue={siteValue.toString()} 
                            getValue={this.getSiteSelected.bind(this)}/>
                  <Dropdown placeHolder="Client"
                            className="filterDropdown"
                            optionList={clientName.toString()} 
                            optionValue={clientValue.toString()} 
                            getValue={this.getClientSelected.bind(this)}/>
                <AutoComplete   placeHolder="Product"
                                className="filterDropdown"
                                optionList={productData.toString()} 
                                optionValue={productValue.toString()} 
                                getValue={this.getProductSelected.bind(this)}
                                tabIndex="2" uppercase={true}  />
              </React.Fragment>
          )
      }

    triggerShowFilter = () => {
    this.setState({filterclicked: !this.state.filterclicked})
    }
    render(){
        return(
            <div>
                <table width='100%'>
						<tr>
							<td width='20%'>{this.displayPeriod()}</td>
							<td width='36%'>{this.displayDate()}</td>
							<td  width='30%' style={{textAlign: "right"}}>
                            <Button className={"filter default-box-height " + (this.state.filterclicked ? " active" : "")} onClick={this.triggerShowFilter}>
                                <i className="iconU-filter" />
                            </Button>   
                            <Button  style={{marginLeft : "15px"}} onClick={()=> this.movementSearch()} className='movementBtnSearch default-box-height ' color="primary">Search</Button>
							</td>
						</tr>
					</table>
                    <div style={{marginTop:"16px"}}>
                            <div className='filterbar'>
                                <div style={{display:'flex', width:'100%'}}>
                                    {
                                        this.state.filterclicked ? this.showDropdowns() :
                                        null
                                    }
                                </div>               
                            </div>
                        </div>
            </div>
        )
    }
}