import React, { Component } from 'react'
import ListOrderComponent from './Components/ListOrderComponent'
import FilterComponent from './Components/FilterComponent'
import {Button} from 'reactstrap'
import create from '../../assets/img/brand/button_create@2x.png'
import axios from 'axios';
import {endpoint, headers} from '../../AppComponent/ConfigEndpoint'
import mid from '../../assets/img/brand/field-idle.png'
import down from '../../assets/img/brand/field-bot.png'
import up from '../../assets/img/brand/field-top.png'


class SalesOrder extends Component{
  constructor(props) {
      super(props);
      this.state = {
        tableheader : ["Site","Client","Order No", "Ship to Name", "Customer Name"," Status", "Date due", "Date Received", "Date Released", "Date Completed"],
          listOrder:{
            
            headers:["Site","Client","Order No", "Ship to Name", "Customer Name"," Status", "Date due", "Date Received", "Date Released", "Date Completed"],
            activearrow:mid,
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



  componentDidMount(){
    this.getData()
    this.loadSalesOrder()
  }

  

  getData = () => {
    axios.get(endpoint.salesOrder, {
    headers: headers
    })
    .then(res => {
    const result = res.data.data
    let listOrders = this.state.listOrder
    listOrders.data = result
    this.setState({listOrder:listOrders})

    })
    .catch(error => {
    // this.props.history.push("/logins")
    })
}

loadSalesOrder = () => {

  axios.get(endpoint.salesOrder, {
    headers: headers
  })
    .then(res => {
      const result = res.data.data
      this.setState({ data:result })
    })
    .catch(error => {
      // this.props.history.push("/logins")
    })
}

sortby = (id) => {
  if(id == 'Site')
  {
    this.setState({sort:!this.state.sort, sortparameter:'site'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Client')
  {
    this.setState({sort:!this.state.sort, sortparameter:'client'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Order No')
  {
    this.setState({sort:!this.state.sort, sortparameter:'order_no'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Ship to Name')
  {
    this.setState({sort:!this.state.sort, sortparameter:'ship_to_name'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Customer Name')
  {
    this.setState({sort:!this.state.sort, sortparameter:'customer_name'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Status')
  {
    this.setState({sort:!this.state.sort, sortparameter:'status'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Date Received')
  {
    this.setState({sort:!this.state.sort, sortparameter:'date_due'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Date Rece')
  {
    this.setState({sort:!this.state.sort, sortparameter:'date_recd'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Date Released')
  {
    this.setState({sort:!this.state.sort, sortparameter:'date_released'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
  else if(id == 'Supplier Name')
  {
    this.setState({sort:!this.state.sort, sortparameter:'date_completed'})
    this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
  }
}

sorting = (data, param, sort) => {
  data.sort((a,b) => {
    if(a[param] !== null && b[param] !== null)
    {
      if(sort == true)
    {
      if(a[param].toLowerCase() < b[param].toLowerCase()) return -1
      if(a[param].toLowerCase() > b[param].toLowerCase()) return 1
      return 0
    }
    else if(sort == false)
    {
      if(a[param].toLowerCase() < b[param].toLowerCase()) return 1
      if(a[param].toLowerCase() > b[param].toLowerCase()) return -1
      return 0
    }
    }
  })
  this.setState({data:data})
}


arrowHandler = (e) => {
  let id = e.currentTarget.id
  let activearrow = this.state
  if(this.state.activearrow == mid)
    {
      this.setState({activearrow:up})
      this.sortby(id)
    }

    if(this.state.activearrow == up)
    {
      this.setState({activearrow:down})
      this.sortby(id)
    }

    if(this.state.activearrow == down)
    {
      this.setState({activearrow:up})
      this.sortby(id)
    }
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
        
        <FilterComponent >
        <div className='filterbar'>
                <div style={{display:'flex', width:'100%'}}>
                    {/* {
                        this.state.filterclicked ? null :
                        this.showDropdowns()
                    } */}
                    
                </div>               
            </div>
        </FilterComponent >

        
        <div>
          
        <div className='tablePage tablecontent'>
                    <table className="potable">
                        <thead>
                        <tr>
                            {this.state.tableheader.map(header =>
                                <th key={header} onClick={(e) => this.arrowHandler(e)} id={header}>{header} 
                                <img key={header} className='arrow' src={this.state.activearrow}/>
                                </th>
                            )}
                            
                            <th className='iconU-edit'></th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.data ? this.state.data.slice(this.state.startIndex, this.state.lastIndex).map((data,i) => 
                                <tr  className='tr'>
                                    <td>{data.site}</td>
                                    <td>{data.client}</td>
                                    <td>{data.order_no}</td>
                                    <td>{data.ship_to_name}</td>
                                    <td>{data.customer_name}</td>
                                    <td>{data.status}</td>
                                    <td>{data.date_due}</td>
                                    <td>{data.date_recd}</td>
                                    <td>{data.date_released}</td>
                                    <td>{data.date_completed}</td>
                                    {/* <td className='iconU-option'></td> */}
                                </tr>
                            ) : 
                                <div> No data available </div>
                                }  
                        </tbody>
                      </table>
          </div>
        </div>
        {/* <ListOrderComponent listOrder={this.state.listOrder}/> */}
                
    </div>)
  }
}

export default SalesOrder;