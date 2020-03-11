import React, { Component } from 'react'
import ListOrderComponent from './Components/ListOrderComponent'
import FilterComponent from './Components/FilterComponent'
import {Button} from 'reactstrap'
import create from '../../assets/img/brand/button_create@2x.png'
import Dropdown from '../../AppComponent/Dropdown'
import Search from '../../AppComponent/Search'
import SalesOrderCreate from './Components/SalesOrderCreate'
import axios from 'axios';
import {endpoint, headers,} from '../../AppComponent/ConfigEndpoint'

import "./SalesOrder.css"
class SalesOrder extends Component{
  constructor(props) {
      super(props)
      this.potableref = React.createRef()
      this.searchForm = React.createRef()
      this.state = {
        tableheader : ["Site","Client","Order No", "Ship to Name", "Customer Name"," Status", "Date due", "Date Received", "Date Released", "Date Completed"],    
        search: "", client : null, site: null, status: null, ordertype : null,

        siteSelected: undefined,
        clientSelected: undefined,

        clientdata : [],
        sitedata : [],

        //modal
        showmodal : false,
        complete : false,

         //filter
         filterclicked:false,
      }
      
  }

        componentDidMount = () => {
          this.getclient();
          this.getsite();
          
      }

      openModal = () => {
          this.setState({showmodal:true})
      }

      closeModal = () => {
          this.setState({showmodal:false})
      }

      search =() =>{
        let self = this;
        self.potableref.current.searchSalesOrder(self.state.search,
                                                  self.state.clientSelected,
                                                  self.state.siteSelected,
                                                  self.state.statusSelected,
                                                  self.state.ordertypeSelected,
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
            // this.props.history.push("/logins")
            console.log(error);
          })
    }

      getsite = () => {     
        console.log(endpoint.getSite)    
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


      getSiteSelected = (value) => {
        this.setState({siteSelected: value});
      }

      getClientSelected = (value) => {
        this.setState({clientSelected: value});
      }

      showDropdowns = () => {
        let clientName = [];
        let clientValue = [];
        let siteData = [];
          let status = [];
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
            <Dropdown placeHolder="Site" style={{width: "102px", height:"3em"}} optionList={siteData.toString()} optionValue={siteData.toString()} getValue={this.getSiteSelected.bind(this)}/>
            <Dropdown placeHolder="Client" style={{width: "210px", height:"3em"}} optionList={clientName.toString()} optionValue={clientValue.toString()} getValue={this.getClientSelected.bind(this)}/>
            <Dropdown placeHolder="Order No" style={{height:"3em"}} optionList="hard,code" optionValue="hard,code" getValue={(v)=> alert(v)}/>

        </React.Fragment>
    )
}

  render(){
console.log(this.state.listOrder)
    return(<div style={{marginLeft:"-9px"}}>
       <div className='header'>
          <h2 style={{marginTop:'0.2%'}}>Sales Orders</h2>
              <div className='header2'>
                  <Button onClick={() => this.openModal()}   color="primary" className='createpo'>
                      <img src={create} style={{width:'7%', marginTop:9, marginLeft:15}}/>
                      <label className='font'>Create Sales Orders</label>
                  </Button>
                </div>
        </div> 
        <div style={{marginTop:"15px"}}>
        <Search getValue={(v) => this.setState({search: v})}
                showFilter={this.state.filterclicked}
                triggerShowFilter={() => this.setState({filterclicked: !this.state.filterclicked})}
                searchData={() => this.search()}
                placeholder="Enter a Product or Description"  />
        </div>

        <div className='dropdowns'>
                <div style={{display:'flex', width:'100%'}}>
                    {
                        this.state.filterclicked ? null :
                        this.showDropdowns()
                    }
                    
                </div>               
            </div>

        <div className={'' + ( this.state.complete ? 'fades' : 'hidden')}>
        <ListOrderComponent ref={this.potableref} className='animated fadeIn' loadCompleteHandler = {(v) =>  this.setState({complete: v})} />
        </div>
        <div className={( this.state.complete ? 'hidden': 'spinner')}/>
        <SalesOrderCreate showmodal={this.state.showmodal} closemodal={() => this.closeModal()}/>
    </div>)
  }
}

export default SalesOrder;