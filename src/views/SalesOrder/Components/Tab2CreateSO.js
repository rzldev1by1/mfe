import React,{Component} from 'react'
import Dropdown from '../../../AppComponent/Dropdown'
import date from '../../../assets/img/brand/field_date@2x.png'
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

        render = () => {
            return(
        <div className="tabcontents">
            <h3 className="fonts">Order Details</h3>
  
            <table className="createpotable">
                <tr>
                    <th>Site</th>
                    <th>Order Type</th>
                    <th>Customer PO No</th>
                    <th>Delivery Instructions</th>
                </tr>
                <tr>
                    <td><input className="form-control" readOnly/></td>
                    <td><input className="form-control" readOnly/></td>
                    <td><input className="form-control" readOnly/></td>
                    <td rowspan="3"><textarea className="form-control put dlv" style={{height:"8em"}} readOnly/></td>
                </tr>
  
                <tr>
                    <th>Order Type</th>
                    <th>Order No</th>
                    <th>Order Date</th>
                </tr>
                <tr>
                    <td><input className="form-control" readOnly/></td>
                    <td><input className="form-control" readOnly/></td>
                    <td><input className="form-control" readOnly/></td>
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
                    <td><input className="form-control put " readOnly/></td>
                    <td><input className="form-control put " readOnly/> </td>
                    <td><input className="form-control put " readOnly/> </td>
                    <td><input className="form-control put " readOnly/> </td>
                </tr>
                <tr>
                    <th>Address 4</th>
                    <th>Address 5</th>
                    <th>Suburb</th>
                    <th>Postcode</th>
                </tr>
                <tr>
                    <td><input className="form-control put " readOnly/></td>
                    <td><input className="form-control put " readOnly/> </td>
                    <td><input className="form-control put " readOnly/> </td>
                    <td><input className="form-control put " readOnly/> </td>
                </tr>
                <tr>
                    <th>State</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td><input className="form-control put " readOnly/></td>
                    <td><input className="form-control put " readOnly/> </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
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
                </tr>                  
              </table>
              
              <div className={"tablerow " + (this.state.rowlist.length >2 ? "scroll" : null )} style={{width:"98%"}} >
                {this.state.rowlist.map((list, i) => this.linedetailsrowreview(list, i))}
              </div>
              <tr>
                  <td style={{color:"transparent"}}>1</td>
                </tr>
              <div style={{marginTop:"7%"}}>
              {this.state.tab2isactive ? 
                  this.submit() :  
                  <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ></Button>
                } 
              </div>
          </div>)
        }

        linedetailsrowreview = (list, i) => {
            return(
              <table>
                <tr>
                    <td hidden id={list.id}></td>
                    <td style={{width:"2%", textAlign:"center"}}><input className="form-control inputs pec" value={list.id}  readOnly/></td>
                    <td style={{width:"12%"}}><input className="form-control inputs pec" readOnly/></td>
                    <td style={{width:"12%"}}><input className="form-control inputs pec" readOnly/></td>
                    <td style={{width:"3%"}}><input className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"5%"}}><input className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"5%"}}><input className="form-control inputs pec"  readOnly/></td>
                    <td style={{width:"6%"}}><input className="form-control inputs pec"  readOnly/></td>
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