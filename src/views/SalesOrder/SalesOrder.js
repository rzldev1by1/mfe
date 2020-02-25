import React, { Component } from 'react'
import ListOrderComponent from './Components/ListOrderComponent'
import FilterComponent from './Components/FilterComponent'
import {Button} from 'reactstrap'
import create from '../../assets/img/brand/button_create@2x.png'
import Dropdown from '../../AppComponent/Dropdown'
import "./SalesOrder.css"
class SalesOrder extends Component{
  constructor(props) {
      super(props);
      this.state = {
        tableheader : ["Site","Client","Order No", "Ship to Name", "Customer Name"," Status", "Date due", "Date Received", "Date Released", "Date Completed"],
          listOrder:{
            
            headers:["Site","Client","Order No", "Ship to Name", "Customer Name"," Status", "Date due", "Date Received", "Date Released", "Date Completed"],

            data:[
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1213","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1214","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1215","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1216","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              {"site":"A","client":"Josephat","orderNo":"SO-4312-1217","customer":"Alex Gaskarth","customerName":"Alex Gaskarth",
              "status":"1:available","datedue":"27/01/2019","datereceived":"27/01/2019","datereleased":"27/01/2019","datecompleted":"27/01/2019"},
              

            ],
          }
          
      }
      
  }
  openModal = () => {
    this.setState({showmodal:true})
}

closeModal = () => {
    this.setState({showmodal:false})
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
          
        <FilterComponent />
        <div className='filterbar'>
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
         
        {/* <ListOrderComponent/> */}
    </div>)
  }
}

export default SalesOrder;