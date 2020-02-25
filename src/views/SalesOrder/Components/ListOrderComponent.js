import React, { Component } from 'react'
import axios from 'axios';
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import "../SalesOrder.css"


class ListOrderComponent extends Component {
  constructor(props){
    super(props)
   
    this.dropdownref = React.createRef()

    this.state = {
      data:[],      
      tableheader :  ["Site","Client","Order No", "Ship to Name", "Customer Name"," Status", "Date due", "Date Received", "Date Released", "Date Completed"],
      activearrow:mid,
      sortparameter:'orderNo',
      

      currentPage: 1,
			startIndex: 0,
			lastIndex: 0,
			displayPage: 30,
			totalRows: 0,
			maxPage: 0,
    }
  }


  load = () => {
    this.props.loadCompleteHandler(true)
  }

  componentDidMount(){
    this.loadSalesOrder()
  }

  loadSalesOrder = () => {
    this.setState({ currentPage: 1,
                    startIndex: 0, lastIndex: 0,
                    totalRows: 0, maxPage: 0})

    axios.get(endpoint.salesOrder, {
      headers: headers
    })
      .then(res => {
        const result = res.data.data
        this.setState({ data:result })
        this.load()
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
      return(
        <div>
          <div className='tablePage tablecontent'>
               <table className="potable">
                  <thead>
                     <tr>
                       {this.state.tableheader.map(header =>
                        <th key={header} onClick={(e) => this.arrowHandler(e)} id={header}>{header} 
                           <img key={header} className='arrow' style={{marginLeft:'0.3em' , width:'0.6em'}} src={this.state.activearrow}/>
                        </th>
                              )}  
                              <th className='iconU-edit'></th>
                       </tr>
                    </thead>
                    <tbody>
                          {this.state.data ? this.state.data.map((data,i) => 
                                  <tr onClick={() => window.location.replace(window.location.origin + '/#/sales-orders/'+data.orderNo + '/detail')} className='tr'>
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
                                      <td className='iconU-option'></td>
                                  </tr>
                              ) : 
                                  <div> No data available </div>
                                  }  
                      </tbody>
                        </table>
            </div>
                  
          </div>)
    }
}
export default ListOrderComponent;