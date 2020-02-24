import React, { Component } from 'react'
import ListOrderComponent from './Components/ListOrderComponent'
import FilterComponent from './Components/FilterComponent'
import {Button} from 'reactstrap'
import create from '../../assets/img/brand/button_create@2x.png'
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
        {/* <div className={' ' + ( this.state.complete ? 'fades ' : 'hidden')}>
        <ListOrderComponent ref={this.potableref} className='animated fadeIn' loadCompleteHandler = {(v) =>  this.setState({complete: v})} />
        </div>
        <div className={( this.state.complete ? 'hidden': 'spinner')}/>
        <ListOrderComponent showmodal={this.state.showmodal} closemodal={() => this.closeModal()} />       */}
        <ListOrderComponent/>
    </div>)
  }
}

export default SalesOrder;