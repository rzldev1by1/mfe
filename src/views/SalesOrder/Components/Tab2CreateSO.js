import React,{Component} from 'react'
import DatePicker from '../../../AppComponent/DatePicker'
import axios from 'axios'
import {endpoint, headers} from '../../../AppComponent/ConfigEndpoint'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

    class Tab2CreateSO extends Component{
        constructor(props){
            super(props)
            this.state ={
                tab1isactive:true,
                tab2isactive:false,
                parameters:this.props.parameters ? this.props.parameters : [],
                order:{
                  site:null,
                  orderno:null,
                  supplier:null,
                  orderref:null,
                  client:null,
                  orderdate:null,
                  rotedate:null,
                  ordertype:null,
                  vendorref:null,
                },
                rowlist:[
                  {
                    id:1,
                    productEntry:null,
                    productDes:null,
                    uom:null,
                    qty:null,
                    rodaDate:null,
                    batch:null,
                    ref3:null,
                    ref4:null,
                    disposition:null,
    
                    siteSelected: undefined,
    
                    rowlistidx: 1,
    
                  }
                ],
            }
        }

        createSalesOrder = () =>{
          axios.post(endpoint.salesOrderCreate, this.state.parameters, { headers: headers})
          .then(res =>{
            if(res.status === 200){
                alert('create sales order successfully')
                this.props.history.push("sales-orders/" + this.state.orderNo);
                }
          })
          .catch(error => {
          })
        }

        close = () => {
          this.props.close()
        }
        tabhandler= () => {
          this.props.tabhandler(this.state.parameters)
        }
    

        render = () => {
          console.log(this.state.parameters)
            return(
        <div className="tabcontents">
            <h3 className="fonts">Order Details</h3>
  
            <table className="createpotable">
                <tr>
                    <th>Site</th>
                    <th>Client</th>
                    <th>Order Type</th>
                    <th>Order Number</th>
                </tr>
                <tr>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.site} className="form-control" readOnly/></td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.client} className="form-control" readOnly/></td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.orderType} className="form-control" readOnly/></td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.orderId} className="form-control" readOnly/></td>
                </tr>
  
                <tr>
                    <th>Delivery Date</th>
                    <th>Customer Order Ref</th>
                    <th>Vendor Order Ref</th>                    
                </tr>
                <tr>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.deliveryDate} className="form-control" readOnly/></td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.customerOrderRef} className="form-control" readOnly/></td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.vendorOrderRef} className="form-control" readOnly/></td>
                </tr>  

                <tr>
                  <th>Delivery Instruction</th>
                </tr>

                <tr>
                <td rowspan="3"><textarea value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.deliveryInstruction} className="form-control put dlv" style={{height:"8em"}} readOnly/></td>
                </tr>
                            
            </table>

            <tr style={{color:"transparent"}}>1</tr>
            <h3 className="fonts">Costumer</h3>
            <table className="createpotable">
                <tr>
                    <th>Costumer</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                    <th>Address 3</th>
                </tr>
                <tr>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.customer} className="form-control put " readOnly/></td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.shipToAddress1} className="form-control put " readOnly/> </td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.shipToAddress2} className="form-control put " readOnly/> </td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.shipToAddress3} className="form-control put " readOnly/> </td>
                </tr>
                <tr>
                    <th>Address 4</th>
                    <th>Address 5</th>
                    <th>Suburb</th>
                    <th>Postcode</th>
                </tr>
                <tr>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.shipToAddress4} className="form-control put " readOnly/></td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.shipToAddress5} className="form-control put " readOnly/> </td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.city} className="form-control put " readOnly/> </td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.postCode} className="form-control put " readOnly/> </td>
                </tr>
                <tr>
                    <th>State</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.state} className="form-control put " readOnly/></td>
                    <td><input value={this.state.parameters.length == 0 ? null : this.state.parameters.orderDetails.country} className="form-control put " readOnly/> </td>
                </tr>
            </table>
  
            <br/>
            <h3 className="fonts">Line Details</h3>
  
            <table className="lineTableDtl">
                <tr >
                    <th style={{width:"2%", textAlign:"center"}}>#</th>
                    <th style={{width:"12%"}}>Product Entry</th>
                    <th style={{width:"12%"}}>Product Description</th>
                    <th style={{width:"3%"}}>Qty</th>
                    <th style={{width:"6%"}}>UOM</th>
                    <th style={{width:"6%"}}>Rota Date</th>
                    <th style={{width:"6%"}}>Batch</th>
                    <th style={{width:"5%"}}>Ref3</th>
                    <th style={{width:"5%"}}>Ref4</th>
                    <th style={{width:"6%"}}>Disposition</th>
                    <th style={{width:"6%"}}>packId</th>
                </tr>                  
              </table>
              
              <div className={"tablerow " + (this.state.rowlist.length >2 ? "scroll" : null )} style={{width:"98%"}} >
                {this.state.parameters.length == 0 ? null : this.state.parameters.orderLines.map((line, i) => 
                  this.linedetailsrowreview(line, i)
                )}
              </div>
              <tr>
                  <td style={{color:"transparent"}}>1</td>
                </tr>
              <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch back" ><label className="font">Back</label></Button>
              <Button onClick={() => this.createSalesOrder()} color="primary" className="btnsearch submit btnleft" style={{marginTop:"-50px"}} ><label className="font">Submit</label></Button> 
          </div>)
        }

        linedetailsrowreview = (line, i) => {
            return(
              <table>
                <tr>
                    <td hidden id={i+1}></td>
                    <td style={{width:"2%", textAlign:"center"}}><input value={i+1} className="form-control inputs pec" readOnly/></td>
                    <td style={{width:"12%"}}><input value={line.product} className="form-control inputs pec" readOnly/></td>
                    <td style={{width:"12%"}}><input value={line.product} className="form-control inputs pec" readOnly/></td>
                    <td style={{width:"3%"}}><input value={line.qty} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.uom} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.rotaDate} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.batch} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"5%"}}><input value={line.ref3} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"5%"}}><input value={line.ref4} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.disposition} className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input value={line.packId} className="form-control inputs pec"  readOnly/></td>
                  </tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{this.state.showdaterote ? <DatePicker getChosenDay={(day) => this.datePickerRote(day)}/> : null}</td>
              </table>
            )
          }

          
    } export default Tab2CreateSO