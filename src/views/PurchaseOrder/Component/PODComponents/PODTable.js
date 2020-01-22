import React, {Component} from  'react'
import axios from 'axios'
import appCompoent from '../../../../../src/AppComponent'
import mid from '../../../../../src/assets/img/brand/field-idle.png'
import down from '../../../../assets/img/brand/field-bot.png'
import up from '../../../../assets/img/brand/field-top.png'

import {endpoint, headers} from '../../../../AppComponent/ConfigEndpoint'

class PurchaseOrderTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      data:[],
      tableheader : ['Product','Status Description','Quantity','UOM','Qty Processed','Weight Process','Rotadate','Disposition','Ref 3','Ref 4'],
      activearrow:mid,
      sortparameter:'order_no',
      sort:true
    }
  }

  componentDidMount() {
    this.loadPurchaseOrder()
  }

  loadPurchaseOrder = () => {
    axios.get('http://127.0.0.1:8000/purchaseOrder/'+window.location.href.split("/").pop(), {
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

  load = () => {
    this.props.loadCompleteHandler(true)
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

  sortby = (id) => {
    if(id == 'Site')
    {
      this.setState({sort:!this.state.sort, sortparameter:'site'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Order No')
    {
      this.setState({sort:!this.state.sort, sortparameter:'order_no'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Client')
    {
      this.setState({sort:!this.state.sort, sortparameter:'client'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Status')
    {
      this.setState({sort:!this.state.sort, sortparameter:'status'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Status Description')
    {
      this.setState({sort:!this.state.sort, sortparameter:'status_desc'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Due')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_due'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Received')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_received'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Released')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_released'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Completed')
    {
      this.setState({sort:!this.state.sort, sortparameter:'date_completed'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Supplier Name')
    {
      this.setState({sort:!this.state.sort, sortparameter:'ship_to_name'})
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

  render(){
    return(
      <div>
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
            
              {this.state.data.map((data,i) => 
                  <tr className='tr'>
                    <td>{data.product}</td>
                    <td>{data.status_desc}</td>
                    <td>{data.qty_lcd}</td>
                    <td>{data.packdesc_1}</td>
                    <td>{data.qty_processed}</td>
                    <td>{data.wgt_processed}</td>
                    <td>{data.dateReceived}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='iconU-option'></td>
                  </tr>
              )}       
          </tbody>
        </table>
      </div>
    )
  }
}

export default PurchaseOrderTable