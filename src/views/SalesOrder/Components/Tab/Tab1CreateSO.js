import React,{Component} from 'react'
import Dropdown from '../../../../AppComponent/Dropdown'
import DatePicker from '../../../../AppComponent/DatePicker'
import axios from 'axios'
import {endpoint, headers} from '../../../../AppComponent/ConfigEndpoint'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Authentication from '../../../../Auth/Authentication';
import AutoComplete from '../../../../AppComponent/AutoComplete'

class Tab1CreateSO extends Component{
    constructor(props){
        super(props)
        this.state ={
            tab1isactive:true,
            tab2isactive:false,
        }
    }

    
    setData = () => {     
      this.props.tabhandler()
    }

    render= () => {    
      const {
        company,            
        site,  
        siteVal,
        client,       
        orderId,
        customerOrderRef,
        vendorOrderRef,
        customerVal,
        orderType,
        orderTypeVal,
        deliveryDate,
        customer,
        shipToAddress1,
        shipToAddress2,
        shipToAddress3,
        shipToAddress4,
        shipToAddress5,
        city,
        postCode,
        state,
        country,
        deliveryInstruction,

    } = this.props.parameters.header 

        return(
          <div className="tabcontents">
            <h3 className="fonts">Order Details</h3>
            <table className="createpotables">
                <tr>
                    <th className='required-field'>Site</th>
                    <th className='required-field'>Client</th>
                    <th className='required-field'>Order Type</th>
                    <th className='required-field'>Order No</th>                    
                </tr>
                <tr>
                    <td>
                      <Dropdown optionSelected  = {siteVal}
                                getValue        = {(siteVal, site) => this.props.setSite(siteVal, site)} 
                                placeHolder     = "Site"  
                                style           = {{minWidth: "100%", zIndex:"1"}} 
                                optionList      = {this.props.resources.site.name.toString()} 
                                optionValue     = {this.props.resources.site.code.toString()}/>
                    </td>

                    <td>
                      <input  readOnly 
                              value             = {client} 
                              id                = 'client' 
                              className         = "form-control put " 
                              placeholder       = "Client"/> 
                    </td>

                    <td>
                      <Dropdown optionSelected  = {orderTypeVal}
                                getValue        = {(orderTypeVal, orderType) => this.props.setOrderType(orderTypeVal,orderType)} 
                                placeHolder     = "Order Type" style={{minWidth: "100%"}} 
                                optionList      = {this.props.resources.orderType.name.toString()} 
                                optionValue     = {this.props.resources.orderType.code.toString()}/>        
                    </td>

                    <td>
                      <input  value         = {orderId} 
                              onChange      = {(e) => this.props.setOrderId(e.target.value)}
                              id            = 'orderId' 
                              className     = "form-control put " 
                              placeholder   = "Order No"/>
                    </td>                 
                    
                </tr>
                <tr>
                    <th className='required-field'>Delivery Date</th>
                    <th className='required-field'>Customer Order Ref</th>
                    <th>Vendor Order Ref</th>                    
                </tr>
                <tr>
                <td>
                  <DatePicker getDate   = {(date) => this.props.setDeliveryDate(date)} 
                              style     = {{ minWidth: "100%" }}/>
                </td>

                <td>
                  <input  value         = {customerOrderRef} 
                          onChange      = {(e) => this.props.setCustomerOrderRef(e.target.value)}
                          maxLength     = "40" 
                          minLength     = "4" 
                          id            = 'customerOrderRef' 
                          className     = "form-control put " 
                          placeholder   = "Customer Order Ref"/> 
                </td>
                
                <td>
                  <input  value         = {vendorOrderRef}
                          onChange      = {(e) => this.props.setVendorOrderRef(e.target.value)}
                          maxLength     = "40" 
                          id            = 'vendorOrderRef' 
                          className     = "form-control put " 
                          placeholder   = "Vendor Order Ref"/> 
                </td>     

                </tr>

                <tr>
                  <th>Delivery Instructions</th>
                </tr>
                
                <tr>
                  <td rowspan="3">
                    <textarea value       = {deliveryInstruction}
                              onChange    = {(e) => this.props.setDeliveryInstruction(e.target.value)}
                              id          = 'deliveryInstruction' 
                              className   = "form-control put dlv" 
                              style       = {{height:"8em"}} 
                              placeholder = "Delivery Instructions"/>
                  </td>
                </tr>
            </table>
            <tr style={{color:"transparent"}}>1</tr>
            <h3 className="fonts">Customer  Details</h3>
            <table className="createpotables">
                <tr>
                    <th className='required-field'>Customer </th>
                    <th className='required-field'>Address 1</th>
                    <th>Address 2</th>
                    <th>Address 3</th>
                </tr>
                <tr>
                    <td>
                      {
                      this.props.resources.identity ? 
                      <input  value       = {customer}
                              onChange    = {(e) => this.props.setCustomer(e.target.value)} 
                              id          = 'customerName' 
                              className   = "form-control put " 
                              placeholder = "Costumer" /> 
                      :
                      <Dropdown optionSelected  = {customerVal}
                              getValue        = {(customerVal) => this.props.getIdentity(customerVal)} 
                              placeHolder     = "Customer"  
                              style           = {{minWidth: "100%", zIndex:"1"}} 
                              optionList      = {this.props.resources.supplier.name.toString()} 
                              optionValue     = {this.props.resources.supplier.code.toString()}/>
                      } 

                      <input  value       = {customerVal}
                              type        = 'text'
                              id          = 'customerCode'
                              hidden/>
                    </td>

                    <td>
                      <input  value       = {shipToAddress1} 
                              onChange    = {(e) => this.props.setAddress1(e.target.value)}
                              id          = 'shipToAddress1' 
                              maxLength   = "200" 
                              className   = "form-control put " 
                              placeholder = "Address 1" /> 
                    </td>
                    <td>
                      <input  value       = {shipToAddress2} 
                              onChange    = {(e) => this.props.setAddress2(e.target.value)}
                              id          = 'shipToAddress2' 
                              maxLength   = "201" 
                              className   = "form-control put " 
                              placeholder = "Address 2" /> 
                    </td>
                    <td>
                      <input  value       = {shipToAddress3} 
                              onChange    = {(e) => this.props.setAddress3(e.target.value)}
                              id          = 'shipToAddress3' 
                              maxLength   = "203" 
                              className   = "form-control put " 
                              placeholder = "Address 3" /> 
                    </td>
                </tr>
                <tr>
                    <th>Address 4</th>
                    <th>Address 5</th>                    
                </tr>
                <tr>
                    <td>
                      <input  value       = {shipToAddress4}
                              onChange    = {(e) => this.props.setAddress4(e.target.value)} 
                              id          = 'shipToAddress4'
                              maxLength   = "204" 
                              className   = "form-control put " 
                              placeholder = "Address 4" />
                    </td>

                    <td>
                      <input  value       = {shipToAddress5} 
                              onChange    = {(e) => this.props.setAddress5(e.target.value)}
                              id          = 'shipToAddress5' 
                              maxLength   = "205" 
                              className   = "form-control put " 
                              placeholder = "Address 5" />
                    </td>
                </tr>

                <tr>
                    <th>Suburb</th>
                    <th className='required-field'>Postcode</th>
                    <th className='required-field'>State</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td>
                      <input  value       = {city} 
                              onChange    = {(e) => this.props.setCity(e.target.value)}
                              id          = 'city' 
                              maxLength   = "150" 
                              className   = "form-control put " 
                              placeholder = "Suburb" /> 
                    </td>

                    <td>
                      <input  value       = {postCode} 
                              onChange    = {(e) => this.props.setPostCode(e.target.value)}
                              id          = 'postCode' 
                              maxLength   = "20" 
                              className   = "form-control put " 
                              placeholder = "Postcode" /> 
                    </td>

                    <td>
                      <input  value       = {state} 
                              onChange    = {(e) => this.props.setStates(e.target.value)}
                              id          = 'state' 
                              maxLength   = "150" 
                              className   = "form-control put " 
                              placeholder = "State" />
                    </td>

                    <td>
                      <input  value       = {country} 
                              onChange    = {(e) => this.props.setCountry(e.target.value)}
                              id          = 'country' 
                              maxLength   = "30" 
                              className   = "form-control put " 
                              placeholder = "Country" />
                    </td>
                </tr>
            </table>
  
            <br/>
                <tr>
                  <td style={{color:"transparent"}}>1</td>
                </tr>
           
            <h3 className="fonts">Line Details</h3>
            <div className="line">
              <table className="lineTableDtl">
                  <tr>
                      <th style={{width:"2%", textAlign:"center"}}>#</th>
                      <th className='required-field' style={{width:"12%"}}>Product</th>
                      <th style={{width:"12%"}}>Product Description</th>
                      <th className='required-field' style={{width:"4%"}}>Qty</th>
                      <th style={{width:"4%"}}>Weight</th>
                      <th className='required-field' style={{width:"4%"}}>UOM</th>
                      <th style={{width:"8%"}}>Rota Date</th>
                      <th style={{width:"6%"}}>Batch</th>
                      <th style={{width:"5%"}}>Ref3</th>
                      <th style={{width:"5%"}}>Ref4</th>
                      <th style={{width:"5%"}}>Disposition</th>
                      <th style={{width:"6.3%"}}>Pack Id</th> 
                  </tr>                             
                </table>
              </div>
                {/* <div className={"tablerow " + (this.state.lineDetail.length >2 ? "scroll" : null )} style={{width:"98%"}}>
            
                </div> */}
                  <button onClick={() => this.addline()} type="button" class="btn btn-light font addline">+ Add Line</button>  
                  {this.state.tab2isactive ? this.submit() :  <Button onClick={() => this.setData()} color="primary" className="btnsearch next btnleft" ><label className="font btnLabel ">Next</label></Button>
                } 
         
          </div>
        )
      }
}

Tab1CreateSO.defaultProps = {
  resources:[]
};

export default Tab1CreateSO