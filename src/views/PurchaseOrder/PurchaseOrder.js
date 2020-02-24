import React, {Component, useState} from  'react'
import './PurchaseOrder.css'
import {
    Table,
    Button
    } from 'reactstrap'
import axios from 'axios'
import PurchaseOrderTable from './Component/PurchaseOrderTable'
import {endpoint, headers} from '../../AppComponent/ConfigEndpoint'
import Dropdown from '../../AppComponent/Dropdown'
import PurchaseOrderCreate from './Component/PurchaseOrderCreate'
import create from '../../assets/img/brand/button_create@2x.png'
import Dropdowns from './Component/Dropdowns'
import Movement from './Component/Movement'

class PurchaseOrder extends Component {
    constructor(props){
        super(props)

        this.potableref = React.createRef()

        this.state = {
            data:[{"menu":"Client", "subMenu":["MLS","MLB"], }, {"menu":"Site", "subMenu":["A","B","C"]},{"menu":"Status", "subMenu":["Open","Close"]},{"menu":"Supplier", "subMenu":["JohnDoe","JohnWick"]},{"menu":"Order Type", "subMenu":["Type 1", "Type 2"]}],
            client:null, site:null, status:null, supplier:null, ordertype:null, area:null, quantity:null, search:null,

            clientdata: [],
            sitedata: [],
            ordertypedata: [],

            //filter
            filterclicked:false,

            //modal
            showmodal:false,
            complete:false,

            //autocomplete
            autoText:null,
            autoArray:null,
            autoArrays:[],
            siteSelected: undefined,
            clientSelected: undefined,
            statusSelected: undefined,
            orderTypeSelected: undefined,

            orderTypeName: [],
            orderTypeValue: []
        }
    }

    componentDidMount = () => {
        this.getclient();
        this.getsite();
        
    }

    selectedValue = (id, value) => {
        if(id == 'Client')
        {
            this.setState({client:value})
        }
        else if(id == 'Site')
        {
            this.setState({site:value})
        }
        else if(id == 'Status')
        {
            this.setState({status:value})
        }
        else if(id == 'Supplier')
        {
            this.setState({supplier:value})
        }
        else if(id == 'Order Type')
        {
            this.setState({ordertype:value})
        }
        else if(id == 'Area')
        {
            this.setState({area:value})
        }
        else if(id == 'Quantity')
        {
            this.setState({quantity:value})
        }
    }

    onchangesearch = (props) => {
        this.setState({search:props.target.value})
    }

    openModal = () => {
        this.setState({showmodal:true})
    }

    closeModal = () => {
        this.setState({showmodal:false})
    }

    search = (client,site,status,ordertype,supplier) => {
        this.potableref.current.searchPurchaseOrder(this.state.search,client,site,status,ordertype,supplier)
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
            // this.props.history.push("/logins")
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
            // this.props.history.push("/logins")
          })
      }

      getordertype = () => {
        if(this.state.clientSelected && this.state.siteSelected)
        {
            axios.get(endpoint.getOrderType  + '?client='+this.state.clientSelected + '&site='+this.state.siteSelected, {
                headers: headers
              })
                .then(res => {
                  const result = res.data
                  this.setState({ ordertypedata:result }); 
                  let orderTypeName = [];
                  let orderTypeValue = [];
                  console.log(this.state.ordertypedata)
                  this.state.ordertypedata.map((data) => {
                      orderTypeName.push(data.description);
                      orderTypeValue.push(data.code);
                  })
                  this.setState({
                      orderTypeName: orderTypeName,
                      orderTypeValue: orderTypeValue
                  })
                })
                .catch(error => {
                  // this.props.history.push("/logins")
                })
        }
    }
      getSiteSelected = (value) => {
        this.setState({siteSelected: value});
      }

      getClientSelected = (value) => {
        this.setState({clientSelected: value}, () => {
            this.getordertype();
        });
      }

      getStatusSelected = (value) => {
        this.setState({statusSelected: value});
      }

      getOrderTypeSelected = (value) => {
        this.setState({orderTypeSelected: value});
      }
    
      showDropdowns = () => {
        let clientName = [];
        let clientValue = [];
        let siteData = [];
          let status = ["Unavailable", "Available", "Released", "Part Released", "Completed", "All"];
        if(this.state.clientdata){
            this.state.clientdata.map((data) => {
                clientName.push(data.name);
                clientValue.push(data.code);
            })
        }
        if(this.state.sitedata){
            this.state.sitedata.map((data) => {
                siteData.push(data.site);
            })
        }
          return(
              <React.Fragment>
                  <Dropdown placeHolder="Site" style={{width: "102px", marginRight: "1em"}} optionList={siteData.toString()} optionValue={siteData.toString()} getValue={this.getSiteSelected}/>
                  <Dropdown placeHolder="Client" style={{width: "218px", marginRight: "1em"}} optionList={clientName.toString()} optionValue={clientValue.toString()} getValue={this.getClientSelected}/>
                  <Dropdown placeHolder="Status" style={{marginRight: "1em"}} optionList={status.toString()} optionValue={status.toString()} getValue={this.getStatusSelected}/>
                  <Dropdown placeHolder="Order Type" style={{width: "180px"}} optionList={this.state.orderTypeName.toString()} optionValue={this.state.orderTypeValue.toString()} getValue={this.getStatusSelected}/>
              </React.Fragment>
          )
      }
    
    render(){ 
        return(
        <div className='animated fadeIn pobody'>
        <div>{this.state.autoArray}</div>
            {
                this.state.autoArrays.map(data => <div onClick={(e) => this.selectedName(e)}>{data}</div>)
            }
            <div className='header'>
                <h2 style={{marginTop:'0.2%'}}>Purchase Orders</h2>
                <div className='header2'>
                    <Button onClick={() => this.openModal()} color="primary" className='createpo'>
                        <img src={create} style={{width:'7%', marginTop:6, marginLeft:15}}/>
                        <label className='font'>Create Purchase Order</label>
                    </Button>
                </div>
            </div>
            
            <div className='searchbar'>
                <div className='inputgroup' style={{width:'82%'}}>
                    <label className='iconU-search isearch'/>
                    <input onChange={(e) => this.onchangesearch(e) } type='text' className='searchinput' placeholder='Enter a Site, Order No, Client or Supplier'/>
                </div>
                <Button onClick={() => this.setState({filterclicked: !this.state.filterclicked})} color="primary" className={'iconU-filter iconU-filters ' + ( this.state.filterclicked ? 'filterclicked' : null)}/>
                <Button onClick={() => this.search()} color="primary" className='btnsearch'><label className='font'>Search</label></Button>
            </div>

            <div className='filterbar'>
                <div style={{display:'flex', width:'100%'}}>
                    {
                        this.state.filterclicked ? null :
                        this.showDropdowns()
                    }
                    
                </div>               
            </div>
            <div className={' ' + ( this.state.complete ? 'fades ' : 'hidden')}>
                <PurchaseOrderTable ref={this.potableref} className='animated fadeIn' loadCompleteHandler = {(v) =>  this.setState({complete: v})}/>
            </div>
            <div className={( this.state.complete ? 'hidden': 'spinner')}/>
            <PurchaseOrderCreate showmodal={this.state.showmodal} closemodal={() => this.closeModal()}/>
        </div>
           
            
        )
        
    }
}

export default PurchaseOrder