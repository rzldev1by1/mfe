import React, {Component} from  'react'
import axios from 'axios'
import appCompoent from '../../../../src/AppComponent'
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'

class PurchaseOrderTable extends Component {
  constructor(props){
    super(props)

    this.state = {
      data:[],
      tableheader : ['Site','Order No','Client','Status','Status Description','Date Due','Date Received','Date Released','Date Completed','Supplier Name'],
      tablebody : ['A','PO-4312','Josaphat','1','Available','27/01/2020','27/01/2020','27/01/2020','27/01/2020', 'Swann-wq12'],
      activearrow:mid,

      id:'Site'
    }
  }

  componentDidMount() {
    this.loadPurchaseOrder()
  }

  loadPurchaseOrder = () => {
    axios.get(appCompoent.getBaseUrl()+ 'purchaseOrder', {
      headers: {
        companyCode: 'eyJpdiI6IkptWlZtMGZuWHBIRStDS0dkNkRHRHc9PSIsInZhbHVlIjoieUp3MlRJbkJubDZuS2hFcUZRWkR2UT09IiwibWFjIjoiZjBlOGQ3MmI1ZDJlODRmZmRlZWI0MDM0NWZmZTY2ZDAzZTQwYWMxZjg2ZTY1ZjdmZWI1ZGE0MDY1YmJmY2E2YSJ9',
        userLevel: 'eyJpdiI6IkpsbG5Kc0ZFN2s2bmNuVENwVEc0MUE9PSIsInZhbHVlIjoiUjFOdGJDQ3BnMXIzTDU1MjNUeFhmUT09IiwibWFjIjoiMDJjN2NkZWI3Njc1MWU3ZTQ4ZGQxMTc0MmM1OWZiOWEzNTJmYzk3YmJlNjI1NzFhNjkzZDcyNDdiMjIyZGY3OCJ9',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8zLjE5LjIwNy4yMDJcL21pY3JvbGlzdGljc2FwaVwvcHVibGljXC91c2VybG9naW4iLCJpYXQiOjE1NzgwNDA4MTMsImV4cCI6MTU3ODA0NDQxMywibmJmIjoxNTc4MDQwODEzLCJqdGkiOiJHRklWR2JOWm5jYjVObnhZIiwic3ViIjoiTUxTMTIzNDUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.f4VOR6kmPWxXfgnHHn4GhVeVaVjPkYx3PnDIFkfjjcs'
      }
    })
      .then(res => {
        const result = res.data.data
        this.setState({ data:result })
      })
  }


  arrowHandler = (e) => {
    let id = e.currentTarget.id
    let activearrow = this.state
    if(this.state.activearrow == mid)
      {
        this.setState({activearrow:up})
        alert('up')
      }

      if(this.state.activearrow == up)
      {
        this.setState({activearrow:down})
      }

      if(this.state.activearrow == down)
      {
        this.setState({activearrow:up})
      }

    if(id == 'Site')
    {
      alert('site')
    }
    else if(id == 'Order No')
    {
      alert('order no')
    }
    else if(id == 'Client')
    {
      alert('client')
    }
    else if(id == 'Status')
    {
      alert('')
    }
    else if(id == 'Status Description')
    {
      alert('')
    }
    else if(id == 'Date Due')
    {
      alert('')
    }
    else if(id == 'Date Received')
    {
      alert('')
    }
    else if(id == 'Date Released')
    {
      alert('')
    }
    else if(id == 'Date Completed')
    {
      alert('a')
    }
    else if(id == 'Supplier Name')
    {
      alert('Supplier Name')
    }
  }

  render(){
    console.log(this.state.data)
    console.log(this.state.data[0])
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
                    <td>{data.site}</td>
                    <td>{data.order_no}</td>
                    <td>{data.client}</td>
                    <td>{data.status}</td>
                    <td>{data.status_desc}</td>
                    <td>{data.date_due}</td>
                    <td>{data.date_received}</td>
                    <td>{data.date_released}</td>
                    <td>{data.date_completed}</td>
                    <td>{data.ship_to_name}</td>
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