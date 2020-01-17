import React, {Component} from  'react'
import axios from 'axios'
import appCompoent from '../../../../src/AppComponent'
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'

import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'

class PurchaseOrderTable extends Component {
  constructor(props){
    super(props)

    this.dropdownref = React.createRef()

    this.state = {
      data:[],      
      tableheader : ['Site','Order No','Client','Status','Status Desc','Date Due','Date Recv','Date Released','Date Completed','Supplier Name'],
      tablebody : ['A','PO-4312','Josaphat','1','Available','27/01/2020','27/01/2020','27/01/2020','27/01/2020', 'Swann-wq12'],
      activearrow:mid,
      sortparameter:'orderNo',
      sort:true
    }
  }

  componentDidMount() {
    this.loadPurchaseOrder()
  }

  loadPurchaseOrder = () => {
    axios.get(endpoint.purchaseOrder, {
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

  searchPurchaseOrder = (search,client,site,status,ordertype,supplier) => {
    let param = search

    if(client)
    {
      param = client
    }

    else if(site)
    {
      param = status
    }
    else if(ordertype)
    {
      param = ordertype
    }
    else if(supplier)
    {
      param = supplier
    }

    this.props.loadCompleteHandler(false)
    axios.get(endpoint.purchaseOrder + '?searchParam='+param.toUpperCase(), {
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
      this.setState({sort:!this.state.sort, sortparameter:'orderNo'})
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
      this.setState({sort:!this.state.sort, sortparameter:'sub_status'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Due')
    {
      this.setState({sort:!this.state.sort, sortparameter:'dateDue'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Received')
    {
      this.setState({sort:!this.state.sort, sortparameter:'dateReceived'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Released')
    {
      this.setState({sort:!this.state.sort, sortparameter:'dateReleased'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Date Completed')
    {
      this.setState({sort:!this.state.sort, sortparameter:'dateCompleted'})
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    }
    else if(id == 'Supplier Name')
    {
      this.setState({sort:!this.state.sort, sortparameter:'supplier'})
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
            
              {this.state.data ? this.state.data.map((data,i) => 
                  <tr onClick={() => window.location.replace(window.location.origin + '/#/purchaseorder/1')} className='tr'>
                    <td>{data.site}</td>
                    <td>{data.orderNo}</td>
                    <td>{data.client}</td>
                    <td>{data.sub_status}</td>
                    <td>{data.status}</td>
                    <td>{data.dateDue}</td>
                    <td>{data.dateReceived}</td>
                    <td>{data.dateReleased}</td>
                    <td>{data.dateCompleted}</td>
                    <td>{data.supplier}</td>
                    <td className='iconU-option'></td>
                  </tr>
              ) : null}       
          </tbody>
        </table>
      </div>
    )
  }
}

export default PurchaseOrderTable