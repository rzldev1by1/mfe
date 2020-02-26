import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import './SalesOrder.css';
import './SalesOrderDetail.css'
// import SODTable from './Components/SODTable'
import axios from 'axios'
import {endpoint, headers} from '../../AppComponent/ConfigEndpoint'

class SalesOrderDetail extends Component {
  constructor(props) {
    super(props);

    this.potableref = React.createRef()
    this.state={
        complete : false,
      head:[],
      datadetail:[]
    }
  }

  componentDidMount(){
    this.getheaderdetail()
    // this.load()
}

    getheaderdetail = () => {
        axios.get(endpoint.salesOrder ,{
          headers: headers
        })
          .then(res => {
            const result = res.data.data
            this.setState({ head:result})
            
            
          })
          .catch(error => {
            // this.props.history.push("/logins")
          })
    }
    
    head = () =>{
      let site = this.state.head.length ? this.state.head[0].site : null
      let client = this.state.head.length ? this.state.head[0].client : null
      let orderNo = this.state.head.length ? this.state.head[0].order_no : null
      let dateDue = this.state.head.length ? this.state.head[0].date_due : null
      let orderType = this.state.head.length ? this.state.head[0].order_type : null
      let consignmentNumber = this.state.head.length ? this.state.head[0].consignment_number : null
      let freightCharge = this.state.head.length ? this.state.head[0].freight_charge : null
      let custOrderNumber = this.state.head.length ? this.state.head[0].cust_order_number : null
      let customerPoNo = this.state.head.length ? this.state.head[0].customer_po_no : null
      let shipToName = this.state.head.length ? this.state.head[0].ship_to_name : null
      let dateReceived = this.state.head.length ? this.state.head[0].date_recd : null
      let dateReleased = this.state.head.length ? this.state.head[0].date_released : null
      let pickStart = this.state.head.length ? this.state.head[0].pick_start : null
      let dateCompleted = this.state.head.length ? this.state.head[0].date_completed : null
      let customerName = this.state.head.length ? this.state.head[0].customer_name : null
      let status = this.state.head.length ? this.state.head[0].status : null
      let deliveryAccount = this.state.head.length ? this.state.head[0].delivery_account : null
      let dateLoaded= this.state.head.length ? this.state.head[0].date_loaded : null
      let loadoutStart = this.state.head.length ? this.state.head[0].loadout_start: null
      let loadoutFinish= this.state.head.length ? this.state.head[0].loadout_finish : null
      let lineCount= this.state.head.length ? this.state.head[0].line_count : null

      return(
        <div className='podheader fades'>                    
            <div className='sub'>                        
                <table style={{width:'100%'}}>
                    <tr>
                        <th>Site</th>
                        <td>{site ? site : '-'}</td>
                    </tr>
                    <tr>
                        <th>Client</th>
                        <td>{client ? client : '-'}</td>
                    </tr>
                    <tr>
                        <th>Order No</th>
                        <td>{orderNo ? orderNo : '-'}</td>
                    </tr>
                    <tr>
                        <th>Order Due</th>
                        <td>{dateDue ? dateDue.substring(0, 11)  : '-'}</td>
                    </tr>
                    <tr>
                        <th>Order Type</th>
                        <td>{orderType ? orderType : '-'}</td>
                    </tr>
                    <tr>
                        <th>Consignment No</th>
                        <td>{consignmentNumber ? consignmentNumber : '-'}</td>
                    </tr>
                    <tr>
                        <th>Freight Charge</th>
                        <td>{freightCharge ? freightCharge : '-'}</td>
                    </tr>
                    <tr>
                        <th>Customer Order No</th>
                        <td>{custOrderNumber ? custOrderNumber : '-'}</td>
                    </tr>

                </table>
            </div>

            <div className='sub' style={{width:'70%'}}>
                
                <table className='tableborderss' style={{width:'100%'}}>
                    
                     <tr>
                        <th>Customer PO No</th>
                        <td>{customerPoNo ? customerPoNo : '-'}</td>
                    </tr>
                    <tr>
                        <th>Ship To Name</th>
                        <td>{shipToName ? shipToName : '-'}</td>
                    </tr>
                     <tr>
                        <th>Date Received</th>
                        <td>{dateReceived ? dateReceived.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Released</th>
                        <td>{dateReleased ? dateReleased.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Pick Start</th>
                        <td>{pickStart ? pickStart : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Complate</th>
                        <td>{dateCompleted ? dateCompleted.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Customer Name</th>
                        <td>{customerName ? customerName : '-'}</td>
                    </tr>
                </table>
                <div className='hori'/>
            </div>
            <div className='sub'  style={{width:'65%'}}>
                <table className='tableborderss' style={{width:'90%'}}>
                    <tr>
                        <th>Status</th>
                        <td>{status ? status : '-'}</td>
                    </tr>
                    <tr>
                        <th>Delivery Account</th>
                        <td>{deliveryAccount ? deliveryAccount : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Loaded</th>
                        <td>{dateLoaded ? dateLoaded.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Load Released</th>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <th>Loadout Start</th>
                        <td>{loadoutStart ? loadoutStart.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Loadout Finish</th>
                        <td>{loadoutFinish ? loadoutFinish.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Line Count</th>
                        <td>{lineCount ? lineCount : '-'}</td>
                    </tr>
                </table>
                <div className='hori'/>
            </div>

        </div>
      )
    }


  render(){

    return(
      <div className='animated fadeIn pobody'>
          <div className='header headerss'>
              <div className='podbreadcrumb'>
                  <h2 onClick={() => window.location.replace(window.location.origin + '/#/sales-orders')} className='podtitle'>Sales Orders</h2>
                  <h2 className='podtitle iconU-rightArrow' style={{fontSize:20}}/>
                  <h2 className='podetails'>{window.location.href.split("/").pop()}</h2>
              </div>
          </div>
          
          {
              this.state.head.length ? this.head() : null
          }
            {/* <div className={'tablecontent ' + ( this.state.head.length ? 'fades ' : 'hidden')}>
            <SODTable ref={this.potableref} className='animated fadeIn' style={{display:'none'}} head = {this.state.head}><tr></tr></SODTable>
            </div>
            <div className={( this.state.head.length ? 'hidden': 'spinner')}/> */}
           
      </div>
    )
  }

}

export default SalesOrderDetail;
