import React from 'react'
import Dropdown from '../../../../AppComponent/Dropdown'
import DatePicker from '../../../../AppComponent/DatePicker'

const OrderLine = (props) => {
    return(
        <div>
           <table>
               <tr>
                   <td width='3%'>
                        <input      className       = "form-control put "
                                    id              = 'rowNumber'
                                    readOnly 
                                    value           = '10'/>
                   </td>

                   <td>
                        <Dropdown   optionSelected  = {null}
                                    getValue        = {(productVal, product) => alert(productVal+ product)} 
                                    placeHolder     = "Product"  
                                    style           = {{minWidth: "100%", zIndex:"1"}} 
                                    optionList      = {props.productdata.name.toString()} 
                                    optionValue     = {props.productdata.code.toString()}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    placeholder     = 'Product Name'
                                    readOnly 
                                    value           = {props.parameters.lineDetail.product}/>
                   </td>

                   <td width='5%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Qty'/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    placeholder     = 'Weight'/>
                   </td>

                   <td width='5%'>
                        <Dropdown   optionSelected  = {null}
                                    getValue        = {(uom) => alert(uom)} 
                                    placeHolder     = "Uom"  
                                    style           = {{minWidth: "5%", zIndex:"1"}} 
                                    optionList      = {props.uomdata.toString()} 
                                    optionValue     = {props.uomdata.toString()}/>
                   </td>

                   <td>
                        <DatePicker getDate         = {(date) => this.props.setDeliveryDate(date)} 
                                    style           = {{ minWidth: "100%" }}/>
                   </td>

                   <td width='5%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Batch'/>
                   </td>

                   <td width='5%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Ref3'/>
                   </td>

                   <td width='5%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Ref4'/>
                   </td>

                   <td>
                        <Dropdown   optionSelected  = {null}
                                    getValue        = {(dispositionVal, dispositionName) => alert(dispositionVal+dispositionName)} 
                                    placeHolder     = "Disposition"  
                                    style           = {{minWidth: "100%", zIndex:"1"}} 
                                    optionList      = {props.dispositiondata.name.toString()} 
                                    optionValue     = {props.dispositiondata.code.toString()}/>
                   </td>

                   <td width='5%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'PackId'/>
                   </td>
               </tr>
           </table>
        </div>
    )
}

export default OrderLine