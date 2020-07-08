import React, { Component } from 'react'
import { Button } from 'reactstrap'
// import DatePicker from './../../PurchaseOrder/Component/DatePicker'
import moment from 'moment'
import Dropdown from '../../../AppComponent/Dropdown'
import DatePicker from '../../../AppComponent/DatePicker'
import axios from 'axios'
import { endpoint, headers } from '../../../AppComponent/ConfigEndpoint'
import AutoComplete from '../../../AppComponent/AutoComplete'
import DropdownPeriod from './DropdownPeriod'
import Authentication from '../../../Auth/Authentication'

export default class MovementSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            periodSelected: null,
            periodText: null,
            periodExpand: false,

            dateFromSelected: null,
            dateFromText: null,
            dateFromShow: false,

            dateToSelected: null,
            dateToText: null,
            dateToShow: false,

            //filter
            filterclicked: true,
            clientdata: [],
            sitedata: [],
            productdata: [],
            client: "",
            site: "",
            search: "",
            siteSelected: "",
            clientSelected: "",
            productSelected: "",

            //errmsg
            searchClicked:false,
            emptyPeriod:false,
            emptyDateFrom:false,
            emptyDateTo:false
        }
    }
    componentDidMount = () => {
        this.getclient();
        this.getsite();
        this.getSiteSelected('')
        //this.getproduct();
    }

    periodExpand = () => {
        this.setState({ periodExpand: !this.state.periodExpand })
    }

    periodHanlder = (any) => {
        // alert(any.periodSelected);
        this.setState({
            periodSelected: any.periodSelected,
            periodText: any.periodText,
            periodExpand: false,
            dateFromShow: true
        });
        this.openDatePicker('from')
    }

    openDatePicker = (type) => {
      console.log(type)
      if(type=='from'){
        this.refs["dateFrom"].openDatePicker() 
      }else if(type=="to"){
        this.refs["dateTo"].openDatePicker()  
      }
    }

    dateFromHandler = (day) => {
        let dateFrom = moment(day).format('YYYY-MM-DD')
        let dateFromText = moment(day).format('DD MMMM YYYY')
        this.setState({ dateFromSelected: dateFrom.toString(), dateFromText: dateFromText.toString(), dateFromShow: false, dateToShow: true })
    }

    dateToHandler = (day) => {
        let dateTo = moment(day).format('YYYY-MM-DD')
        let dateToText = moment(day).format('DD MMMM YYYY')
        this.setState({ dateToSelected: dateTo.toString(), dateToText: dateToText.toString(), dateToShow: false })
    }

    movementSearch = () => {
        this.setState({searchClicked:true})
        if (!this.state.dateFromSelected) {
           
        }
        else if (!this.state.dateToSelected) {
           
        }
        else if (!this.state.periodSelected) {
           
        }
        else {
            this.props.getStockMovement.current.getData(this.state.dateFromSelected,
                this.state.dateToSelected,
                this.state.periodSelected,
                this.state.siteSelected,
                this.state.clientSelected,
                this.state.productSelected
            )
        }
    }

    displayPeriod = () => {
        return (
            <div className='dropdown ddlSearchParam'>
                {/* <div className='searchParameterTitle dp'>Display Period</div> */}
                <div className='displayButtonToggle'>
                    <button style={{ color: '#7c878c' }} onClick={() => this.periodExpand()} className='btn dropdown-button ddlMovement default-box-height' data-toggle='dropdown'>
                        {this.state.periodSelected ? this.state.periodText : 'Display Period'}
                    </button>
                    <div className='dropdown-toggle' />
                </div>
                <div className={'dropdown-menu ' + (this.state.periodExpand ? 'show' : null)}>
                    <div style={{ color: '#7c878c' }} onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='day'>Daily</div>
                    <div style={{ color: '#7c878c' }} onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='week'>Weekly</div>
                    <div style={{ color: '#7c878c' }} onClick={(e) => this.periodHanlder(e)} className='dropdown-item' id='month'>Monthly</div>
                </div>
            </div>
        )
    }

    displayDate = () => {
        return (
            <div className='displayParent middles'>
                <div className='searchParameterTitleDate' style={{marginRight: 0}}>Date From</div>
                <div onMouseLeave={() => this.setState({ dateFromShow: false })}>
                    <div className='displayButtonToggle'>
                        <button style={{ color: '#7c878c' }} onClick={() => this.setState({ dateFromShow: !this.state.dateFromShow })} className='btn dropdown-button ddlMovementDate default-box-height' data-toggle='dropdown'>
                            {this.state.dateFromText ? this.state.dateFromText : 'Select Date'}
                        </button>
                        <div className='dropdown-toggle' />
                    </div>
                    <div className='datePicker'>
                        {this.state.dateFromShow ? <DatePicker selectedDays={moment(this.state.dateFromSelected)} getChosenDay={(day) => this.dateFromHandler(day)} /> : null}
                    </div>
                    <div id='date-from' className={(!this.state.dateFromSelected) && (this.state.searchClicked) ? 'stock-err' : 'stock-err-hidden'}>Please select date from</div>
                           
                </div>

                <div style={{ marginLeft: '26px' }} className='searchParameterTo'>To</div>
                <div onMouseLeave={() => this.setState({ dateToShow: false })}>
                    <div className='displayButtonToggle'>
                        <button style={{ color: '#7c878c' }} onClick={() => this.setState({ dateToShow: !this.state.dateToShow })} className='btn dropdown-button ddlMovementDate default-box-height' data-toggle='dropdown'>
                            {this.state.dateToText ? this.state.dateToText : 'Select Date'}
                        </button>
                        <div className='dropdown-toggle' />
                    </div>
                    <div className='datePicker'>
                        {this.state.dateToShow ? <DatePicker getChosenDay={(day) => this.dateToHandler(day)} /> : null}
                    </div>
                    <div id='date-to' className={(!this.state.dateToSelected) && (this.state.searchClicked) ? 'stock-err' : 'stock-err-hidden'}>Please select date to</div>
                </div>
            </div>
        )
    }

    search = () => {
        this.potableref.searchMove(this.state.search,
            this.state.clientSelected,
            this.state.siteSelected)
    }

    load = () => {
        this.props.loadCompleteHandler(true)
    }

    searchMove = (search, client, site) => {
        let param = search
        let url = '?searchParam=' + param
        if (param) { param = param.toUpperCase() }
  
        let client_ = Authentication.getClient()  
		if(client_ !== ""){
			url = '&site=' + client_
		}else  if (client) { 
            url += '&client=' + client 
        }
       

        let site_ = Authentication.getSite()  
		if(site_ !== ""){
			url = '&site=' + site_
		}else if (site) { 
            url += '&site=' + site 
        }

        this.props.loadCompleteHandler(false)
        axios.get(endpoint.stockMovement + url, {
            headers: headers
        })
            .then(res => {
                const result = res.data.data
                this.setState({ data: result })
                this.load(result)
            })
            .catch(error => {

            })
    }

    getclient = () => {
        axios.get(endpoint.getClient, {
            headers: headers
        })
            .then(res => {
                const result = res.data
                let productData = [];
                this.setState({ clientdata: result });

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
                this.setState({ sitedata: result })
            })
            .catch(error => {

            })
    }

    getproduct = () => {
        let self = this;

        //reset
        let tmp_data = []
        self.setState({ productdata: tmp_data })

        axios.get(endpoint.getProduct + '?client=' + this.state.clientSelected, {
            headers: headers
        })
            .then(res => {
                const result = res.data
                self.setState({ productdata: result })
            })
            .catch(error => {
                console.log(error);
            })
    }

    getSiteSelected = (value) => {
        this.setState({ siteSelected: value });
    };

    getClientSelected = (value) => {
        console.log(value)
        this.setState({ clientSelected: value }, () => { //async
            this.getproduct();
        });
    };

    getProductSelected = (value) => {
        this.setState({ productSelected: value });
    };


    showDropdowns = () => {
        let clientName = ["All Clients"];
        let clientValue = ["all"];
        let siteData = ["All Sites"];
        let siteValue = ["all"];
        let productData = ["All Products"];
        let productValue = ["all"];
 
        if (this.state.clientdata) {
            this.state.clientdata.map((data) => {
                clientName.push(data.code + ' : ' + data.name);
                clientValue.push(data.code);
            })
        } 
        
        if (this.state.sitedata) {
            this.state.sitedata.map((data) => {
                siteData.push(data.site + ' : ' + data.name);
                siteValue.push(data.site);
            })
        }
        if (this.state.productdata) {
            productData.push(this.state.productdata.code);
            productValue.push(this.state.productdata.code);
        }
        return (
            <React.Fragment> 
                
				{Authentication.getUserLevel() == "administrator" ? (
						<Dropdown placeHolder="Site"
                        className=""
                        optionList={siteData.toString()}
                        optionValue={siteValue.toString()}
                        getValue={this.getSiteSelected.bind(this)}
                        style={{width: "30%"}} />
				) : (
						<input
						readOnly
						value={Authentication.getSite()}
						id="site"
						className="form-control put"
						placeholder="Site"
                        tabIndex='1'
                        style={{width: "30%",marginRight:'1em'}}
						/>
				)}
 

                {Authentication.getUserLevel() == "administrator" ? (
                    <Dropdown placeHolder="Client" 
                    optionList={clientName.toString()}
                    optionValue={clientValue.toString()}
                    getValue={this.getClientSelected.bind(this)}
                    style={{width: "30%",marginRight:'1em'}}  />
                ) : (
                    <input
                    readOnly
                    value={Authentication.getClient()}
                    id="site"
                    className="form-control put "
                    placeholder="Site"
                    tabIndex='1'
                    style={{width: "30%",marginRight:'1em'}}
                    />
                )}
                
                <AutoComplete placeHolder="Product"
                    className=""
                    optionList={productData.toString()}
                    optionValue={productValue.toString()}
                    getValue={this.getProductSelected.bind(this)}
                    tabIndex="2" uppercase={true} 
                    style={{width: "40%"}}
                    />
            </React.Fragment>
        )
    }

    triggerShowFilter = () => {
        this.setState({ filterclicked: !this.state.filterclicked })
    }
    render() {
        return (
            <React.Fragment>
                        <div className="row p-3">
                            {/* <div className="col">{this.displayPeriod()}</div> */}
                            <div className="col-sm-2"><DropdownPeriod periodHandler={this.periodHanlder} /> 
                                <div id='period' className={(!this.state.periodSelected) && (this.state.searchClicked) ? 'stock-err' : 'stock-err-hidden'}>Please select display period</div> 
                            </div>
                            {/* <div className="col-4">
                                {this.displayDate()}
                            </div> */}
                            <div className="col-sm-4">
                                <div className='displayParent middles'>
                                    <div className='searchParameterTitleDate' style={{marginRight: "2%"}}>Date From</div>
                                    <DatePicker style={{ minWidth: '40%' }} 
                                        ref="dateFrom"
                                        onChange={(e) => {this.openDatePicker('to')}}
                                        getDate={(e) => { this.setState({ dateFromSelected: e.toString() })}}
                                        defaultValue={this.state.dateFromSelected} tabIndex="1" placeHolder="Select Date" fromMonth={this.props.fromMonth}
                                        toMonth={this.props.toMonth}
                                    />

                                    <div className='searchParameterTitleDate' style={{marginLeft: "2%", marginRight: "2%"}}>To</div>
                                    <DatePicker style={{ minWidth: '40%' }}
                                        ref="dateTo"
                                        getDate={(e) => { this.setState({ dateToSelected: e.toString() })}}
                                        defaultValue={this.state.dateToSelected} tabIndex="1" placeHolder="Select Date" fromMonth={this.props.fromMonth}
                                        toMonth={this.props.toMonth}
                                    />  
                                </div>
                            </div> 
                            <div className="col-sm-5" style={{ display: 'flex', maxWidth: '37%', flex: '40%', paddingLeft: 0 }}>{this.showDropdowns()}</div>
                            <div className="col-sm-1 " style={{flex: '0 0 10%', maxWidth:'10%'}} >
                                <Button style={{width: '100%'}} onClick={() => this.movementSearch()} className='movementBtnSearch default-box-height ' color="primary">SEARCH</Button>
                                {/* <Button  style={{marginLeft : "15px", marginRight : "14px"}} onClick={()=> this.search()} className='movementBtnSearch default-box-height ' color="primary">Search</Button> */}
                            </div>
                        </div>
            </React.Fragment>
                        
        )
    }
}