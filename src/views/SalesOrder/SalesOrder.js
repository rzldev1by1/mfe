import React, { Component } from 'react'
import ListOrderComponent from './Components/ListOrderComponent'
import FilterComponent from './Components/FilterComponent'
import {Button} from 'reactstrap'
import create from '../../assets/img/brand/button_create@2x.png'
import Dropdown from '../../AppComponent/Dropdown'
import Search from '../../AppComponent/Search'
// import SalesOrderCreate from './Components/SalesOrderCreate'
import "./SalesOrder.css"
class SalesOrder extends Component{
  constructor(props) {
      super(props)
      this.potableref = React.createRef()
      this.searchForm = React.createRef()
      this.state = {
        tableheader : ["Site","Client","Order No", "Ship to Name", "Customer Name"," Status", "Date due", "Date Received", "Date Released", "Date Completed"],    
        search: null, client : null, site: null, status: null, ordertype : null,
        siteSelected: undefined,
        clientSelected: undefined,
        statusSelected: undefined,
        ordertypeSelected : undefined,

        clientdata : [],
        sitedata : [],

        //modal
        showcreate : false,
        complete : false,

         //filter
         filterclicked:false,
      }
      
  }


      openModal = () => {
          this.setState({showcreate:true})
      }

      closeCreate = () => {
          this.setState({showcreate:false})
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
            <Dropdown placeHolder="Site" style={{width: "102px", marginRight: "1em"}} optionList={siteData.toString()} optionValue={siteData.toString()} getValue={this.getSiteSelected}/>
            <Dropdown placeHolder="Client" style={{width: "102px", marginRight: "1em"}} optionList={clientName.toString()} optionValue={clientValue.toString()} getValue={this.getClientSelected}/>
            <Dropdown placeHolder="Order No" style={{marginRight: "1em"}} optionList={status.toString()} optionValue={status.toString()} getValue={this.getStatusSelected}/>

        </React.Fragment>
    )
}

  render(){
console.log(this.state.listOrder)
    return(<div>
       <div className='header'>
          <h2 style={{marginTop:'0.2%'}}>Sales Orders</h2>
              <div className='header2'>
                  <Button  color="primary" className='createpo'>
                      <img src={create} style={{width:'7%', marginTop:9, marginLeft:15}}/>
                      <label className='font'>Create Sales Orders</label>
                  </Button>
                </div>
        </div> 
          
        <Search getValue={(v) => this.setState({search: v})}
                showFilter={this.state.filterclicked}
                triggerShowFilter={() => this.setState({filterclicked: !this.state.filterclicked})}
                searchData={() => this.search()}
                placeholder="Enter a Product or Description"  />

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
        {/* <SalesOrderCreate showcreate={this.state.showcreate} closemodal={() => this.closeCreate()}/> */}
    </div>)
  }
}

export default SalesOrder;