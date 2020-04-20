import React,{Component} from 'react'
import Dropdown from '../../../../AppComponent/Dropdown'
import DatePicker from '../../../../AppComponent/DatePicker'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {headerValidation, lineDetailValidation} from '../../Components/Validation/Validation'
import AutoComplete from '../../../../AppComponent/AutoComplete'
import OrderLine from './OrderLine'

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
        clientName,   
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

      const {
        emptySite,
        emptyClient,
        emptyOrderType,
        emptyOrderNo,
        emptyDeliveryDate,

        emptyCustomer,
        emptyShipToAddress1,
        emptyPostCode,
        emptyState,
      } = this.props.validationCheck.header

      let emptyClassSite             = 'nmtrField'
      let emptyClassClient           = 'nmtrField'
      let emptyClassOrderType        = 'nmtrField'
      let emptyClassOrderNo          = 'nmtrField'
      let emptyClassDeliveryate      = 'nmtrField'

      let emptyClassCustomer         = 'nmtrField'
      let emptyClassShipToAddress1   = 'nmtrField'
      let emptyClassPostCode         = 'nmtrField'
      let emptyClassState            = 'nmtrField'

      if(emptySite) emptyClassSite                     = 'mtrFieldSelect'
      if(emptyClient) emptyClassClient                 = 'mtrField'
      if(emptyOrderType) emptyClassOrderType           = 'mtrFieldSelect'
      if(emptyOrderNo) emptyClassOrderNo               = 'mtrField'
      if(emptyDeliveryDate) emptyClassDeliveryate      = 'mtrField'

      if(emptyCustomer) emptyClassCustomer             = 'mtrFieldSelect'
      if(emptyShipToAddress1) emptyClassShipToAddress1 = 'mtrField'
      if(emptyPostCode) emptyClassPostCode             = 'mtrField'
      if(emptyState) emptyClassState                   = 'mtrField'

      let supplierName = []
      this.props.resources.supplier.name.map((data, idx) => {
        let code = this.props.resources.supplier.code[idx]
        supplierName.push(code+' ( '+ data + ' )')
      })
        return(
          <div className="tabcontents">
            <h3 className="fonts">Order Details</h3>
            <table className="createpotables">
                <tr>
                    <th className='required-field'>Site</th>
                    <th className='required-field'>Order Type</th>                    
                    <th>Customer Order Ref</th>
                    <th className='required-field'>Delivery Date</th>              
                </tr>
                <tr>
                    <td>
                      <Dropdown optionSelected  = {siteVal}
                                getValue        = {(siteVal, site) => this.props.setSite(siteVal, site)} 
                                placeHolder     = "Site"  
                                style           = {{minWidth: "100%", zIndex:"3"}} 
                                optionList      = {this.props.resources.site.name.toString()} 
                                optionValue     = {this.props.resources.site.code.toString()}/>
                    </td>

                    
                    <td>
                          <Dropdown optionSelected  = {orderTypeVal}
                                    getValue        = {(orderTypeVal, orderType) => this.props.setOrderType(orderTypeVal,orderTypeVal)} 
                                    placeHolder     = "Order Type" style={{minWidth: "100%"}} 
                                    optionList      = {this.props.resources.orderType.name.toString()} 
                                    optionValue     = {this.props.resources.orderType.code.toString()}/>     
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
                      <DatePicker getDate   = {(date) => this.props.setDeliveryDate(date)} 
                                  style     = {{ minWidth: "100%" }}/>
                    </td>
                </tr>

                <tr>
                    <td className={emptyClassSite}>{emptySite}</td>
                    <td className={emptyClassOrderType}>{emptyOrderType}</td>
                    <td className='nmtrField'></td>
                    <td className={emptyClassDeliveryate}>{emptyDeliveryDate}</td>                                      
                </tr>

                <tr>     
                  <th className='required-field'>Client</th>            
                  <th className='required-field'>Order No</th>
                  <th>Vendor Order Ref</th>     
                  <th>Delivery Instructions</th>               
                </tr>
                <tr>                
                  <td className='verticalAlignTop'>
                    {
                      this.props.userLevel == 'administrator' ? 
                      <Dropdown optionSelected  = {clientName}
                                getValue        = {(clientVal, clientName) => this.props.setClient(clientVal, clientName)} 
                                placeHolder     = "Client" 
                                style           = {{minWidth: "100%"}} 
                                optionList      = {this.props.clientName.toString()} 
                                optionValue     = {this.props.clientVal.toString()}/>  
                      :
                      <input  readOnly 
                            value             = {client} 
                            id                = 'client' 
                            className         = "form-control put " 
                            placeholder       = "Client"/> 
                    }
                    <div className={emptyClassClient+ ' verticalAlignTop'}>{emptyClient}</div>
                  </td>
                  <td className='verticalAlignTop'>
                    <input  value         = {orderId} 
                            onChange      = {(e) => this.props.setOrderId(e.target.value)}
                            id            = 'orderId' 
                            className     = "form-control put " 
                            placeholder   = "Order No"/>
                    <div className={emptyClassOrderNo}>{emptyOrderNo}</div>
                  </td>  
                  
                  <td className='verticalAlignTop'>
                    <input  value         = {vendorOrderRef}
                            onChange      = {(e) => this.props.setVendorOrderRef(e.target.value)}
                            maxLength     = "40" 
                            id            = 'vendorOrderRef' 
                            className     = "form-control put " 
                            placeholder   = "Vendor Order Ref"/> 
                  </td>  
                  
                  <td>
                    <textarea value       = {deliveryInstruction}
                              onChange    = {(e) => this.props.setDeliveryInstruction(e.target.value)}
                              id          = 'deliveryInstruction' 
                              className   = "form-control put dlv" 
                              style       = {{height:"8em"}} 
                              placeholder = "Delivery Instructions"/>
                  </td>  
                </tr>

                <tr>                  
                    <td className='nmtrField'></td>
                    <td className='nmtrField'></td>                    
                </tr>
            </table>
            <tr style={{color:"transparent"}}>1</tr>
            <h3 className="fonts">Customer  Details</h3>
            <table className="createpotables">
                <tr>
                    <th>Customer </th>
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
                              optionList      = {supplierName.toString()} 
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
                    <td className={emptyClassCustomer}>{emptyCustomer}</td>
                    <td className={emptyClassShipToAddress1}>{emptyShipToAddress1}</td>
                    <td className='nmtrField'></td>
                    <td className='nmtrField'></td>                    
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
                    <td className='nmtrField'></td>
                    <td className='nmtrField'></td>
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
                              maxLength   = "5" 
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

                <tr>
                    <td className='nmtrField'></td>
                    <td className={emptyClassPostCode}>{emptyPostCode}</td>
                    <td className={emptyClassState}>{emptyState}</td>
                    <td className='nmtrField'></td>                    
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
                      <th width ='3.7%' style={{ textAlign:"center"}}>#</th>
                      <th width ='10%'  className='required-field'>Product</th>
                      <th width ='13%'>Product Description</th>
                      <th width='8.5%' className='required-field'>Qty</th>
                      <th width='7.2%'>Weight</th>
                      <th width ='9.7%' className='required-field'>UOM</th>
                      <th width ='9.8%'>Rota Date</th>
                      <th width='6.4%' >Batch</th>
                      <th width='6%' >Ref3</th>
                      <th width='6%' >Ref4</th>
                      <th width ='11.1%'>Disposition</th>
                      <th width='7.3%'>Pack Id</th> 
                  </tr>                             
                </table>
              </div>
              
              {
                this.props.parameters.lineDetail.map((data,idx) => {
                  return(
                    <OrderLine  parameters      = {data}
                          idx             = {idx}
                          getUom          = {(productVal) => this.props.getUom(productVal)}
                          uomdata         = {this.props.uomdata}
                          productdata     = {this.props.productdata}
                          dispositiondata = {this.props.dispositiondata}
                          
                          setProduct              = {(productVal, product, idx) => this.props.setProduct(productVal,product, idx)}
                          setQty                  = {(qty, idx) => this.props.setQty(qty, idx)}
                          setWeight               = {(weight, idx) => this.props.setWeight(weight, idx)}
                          setUom                  = {(uom, idx) => this.props.setUom(uom, idx)}
                          setRotaDate             = {(rotaDate, idx) => this.props.setRotaDate(rotaDate, idx)}
                          setBatch                = {(batch, idx) => this.props.setBatch(batch, idx)}
                          setRef3                 = {(ref3, idx) => this.props.setRef3(ref3, idx)}
                          setRef4                 = {(ref4, idx) => this.props.setRef4(ref4, idx)}
                          setDispoisition         = {(disposition, dispositionVal, idx) => this.props.setDispoisition(disposition, dispositionVal, idx)}
                          setPackid               = {(packid, idx) => this.props.setPackid(packid, idx)}
                          
                          removeLineHandler       = {(idx) => this.props.removeLineHandler(idx)}/>
                  )
                })
              }
                {/* <div className={"tablerow " + (this.state.lineDetail.length >2 ? "scroll" : null )} style={{width:"98%"}}>
            
                </div> */}
                  <button onClick={() => this.props.addLineHandler()} type="button" className="btn-light font addlineSo">+</button> 
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