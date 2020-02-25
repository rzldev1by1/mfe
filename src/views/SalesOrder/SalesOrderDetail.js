import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import './SalesOrder.css';
import './SalesOrderDetail.css'
import axios from 'axios'
import {endpoint, headers} from '../../AppComponent/ConfigEndpoint'

class SalesOrderDetail extends Component {
  constructor(props) {
    super(props);

    this.potableref = React.createRef()
    this.state={
      complate : false,
      datahead:[],
      datadetail:[]
    }
  }

  componentDidMount(){
    this.getheaderdetail()
}

    getheaderdetail = () => {
        this.setState({complete:false})
        let param = window.location.href.split("/").pop()
        axios.get(endpoint.salesOrder + '/' +param, {
          headers: headers
        })
          .then(res => {
            const result = res.data.data
            this.setState({ datahead:result})
            
            
          })
          .catch(error => {
            // this.props.history.push("/logins")
          })
    }
    
    header = () =>{
      let site = this.state.datahead.length ? this.state.datahead[0].site : null
      let client = this.state.datahead.length ? this.state.datahead[0].client : null
      let orderNo = this.state.datahead.length ? this.state.datahead[0].order_no : null
      let dateDue = this.state.datahead.length ? this.state.datahead[0].date_due : null
      let orderType = this.state.datahead.length ? this.state.datahead[0].order_type : null
      let suppliedInFull = this.state.datahead.length ? this.state.datahead[0].supplied_in_full : null
      let consignmentNumber = this.state.datahead.length ? this.state.datahead[0].consignment_number : null
      let freightCharge = this.state.datahead.length ? this.state.datahead[0].freight_charge : null
      let custOrderNumber = this.state.datahead.length ? this.state.datahead[0].cust_order_number : null
      let customerPoNo = this.state.datahead.length ? this.state.datahead[0].customer_po_no : null
      let shipToName = this.state.datahead.length ? this.state.datahead[0].ship_to_name : null
      let dateReceived = this.state.datahead.length ? this.state.datahead[0].date_recd : null
      let dateReleased = this.state.datahead.length ? this.state.datahead[0].date_released : null
      let pickStart = this.state.datahead.length ? this.state.datahead[0].pick_start : null
      let dateCompleted = this.state.datahead.length ? this.state.datahead[0].date_completed : null
      let area = this.state.datahead.length ? this.state.datahead[0].area: null
      let customerName = this.state.datahead.length ? this.state.datahead[0].customer_name : null
      let pod = this.state.datahead.length ? this.state.datahead[0].pod : null
      let arrivalDateScheduled = this.state.datahead.length ? this.state.datahead[0].arrival_date_scheduled : null
      let arrivalDateActual = this.state.datahead.length ? this.state.datahead[0].arrival_date_actual: null
      let departureDateScheduled = this.state.datahead.length ? this.state.datahead[0].departure_date_scheduled : null

      let status = this.state.datahead.length ? this.state.datahead[0].status : null
      let deliveryAccount = this.state.datahead.length ? this.state.datahead[0].delivery_account : null
      let acceptedBy = this.state.datahead.length ? this.state.datahead[0].accepted_by: null
      let signatureDtime= this.state.datahead.length ? this.state.datahead[0].signature_dtime : null
      let dateLoaded= this.state.datahead.length ? this.state.datahead[0].date_loaded : null

      let loadoutStart = this.state.datahead.length ? this.state.datahead[0].loadout_start: null
      let loadoutFinish= this.state.datahead.length ? this.state.datahead[0].loadout_finish : null
      let lineCount= this.state.datahead.length ? this.state.datahead[0].line_count : null

      return(
        <div className='podheader fades'>                    
            <div className='sub'>                        
                <table style={{width:'70%'}}>
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
                        <td>{dateDue ? dateDue : '-'}</td>
                    </tr>
                    <tr>
                        <th>Order Type</th>
                        <td>{orderType ? orderType : '-'}</td>
                    </tr>
                    <tr>
                        <th>Supplied in Full</th>
                        <td>{suppliedInFull ? suppliedInFull : '-'}</td>
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
                        <th>Order Type</th>
                        <td>{orderType ? orderType : '-'}</td>
                    </tr>
                    <tr>
                        <th>Customer Order No</th>
                        <td>{custOrderNumber ? custOrderNumber : '-'}</td>
                    </tr>
                    <tr>
                        <th>Customer PO No</th>
                        <td>{customerPoNo ? customerPoNo : '-'}</td>
                    </tr>
                    <tr>
                        <th>Ship To Name</th>
                        <td>{shipToName ? shipToName : '-'}</td>
                    </tr>

                </table>
            </div>

            <div className='sub' style={{width:'70%'}}>
                <table className='tableborderss' style={{width:'90%'}}>
                     <tr>
                        <th>Date Received</th>
                        <td>{dateReceived ? dateReceived : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Released</th>
                        <td>{dateReleased ? dateReleased : '-'}</td>
                    </tr>
                    <tr>
                        <th>Pick Start</th>
                        <td>{pickStart ? pickStart : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Complate</th>
                        <td>{dateCompleted ? dateCompleted : '-'}</td>
                    </tr>
                    <tr>
                        <th>Area</th>
                        <td>{area ? area : '-'}</td>
                    </tr>
                    <tr>
                        <th>Customer Name</th>
                        <td>{customerName ? customerName : '-'}</td>
                    </tr>
                    <tr>
                        <th>POD</th>
                        <td>{pod ? pod : '-'}</td>
                    </tr>
                    <tr>
                        <th>Arrival Date Scheduled</th>
                        <td>{arrivalDateScheduled ? arrivalDateScheduled.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Arrical Date Actual</th>
                        <td>{arrivalDateActual ? arrivalDateActual.substring(0, 11) : '-'}</td>
                    </tr>
                    <tr>
                        <th>Departure Date Scheduled</th>
                        <td>{departureDateScheduled ? departureDateScheduled.substring(0, 11) : '-'}</td>
                    </tr>
                    
                </table>
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
                        <th>Accepted By</th>
                        <td>{acceptedBy ? acceptedBy : '-'}</td>
                    </tr>
                    <tr>
                        <th>Signature Time</th>
                        <td>{signatureDtime ? signatureDtime : '-'}</td>
                    </tr>
                    <tr>
                        <th>Date Loaded</th>
                        <td>{dateLoaded ? dateLoaded.substring(0, 11) : '-'}</td>
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
            </div>

        </div>
      )
    }


  render(){

    return(
      <div className='animated fadeIn pobody'>
          <div className='header headerss'>
              <div className='podbreadcrumb'>
                  <h2 onClick={() => window.location.replace(window.location.origin + '/#/sales-orders')} className='podtitle'>Purchase Orders</h2>
                  <h2 className='podtitle iconU-rightArrow' style={{fontSize:20}}/>
                  <h2 className='podetails'>{window.location.href.split("/").pop()}</h2>
              </div>
          </div>
          
          {
              this.state.datahead.length ? this.header() : null
          }
      </div>
    )
  }

}

export default SalesOrderDetail;
