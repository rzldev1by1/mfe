import React from 'react'
import Dropdown from '../../../../AppComponent/Dropdown'
import DatePicker from '../../../../AppComponent/DatePicker'

const OrderLine = (props) => {

    const {
        number           ,
        productVal       ,
        product          ,
        qty              ,
        weight           ,
        uom              ,
        rotaDate         ,
        batch            ,              
        ref3             ,
        ref4             ,
        dispositionVal   ,
        disposition      ,
        packId           ,
    } = props.parameters.lineDetail[0]
    return(
        <div style={{marginBottom:'3%'}}>
           <table>
               <tr>
                   <td width='3%'>
                        <input      className       = "form-control put "
                                    id              = 'rowNumber'
                                    readOnly 
                                    value           = '1'/>
                   </td>

                   <td>
                        <Dropdown   optionSelected  = {productVal}
                                    getValue        = {(productVal, product) => props.setProduct(productVal, product)} 
                                    placeHolder     = "Product"  
                                    style           = {{minWidth: "100%", zIndex:"1"}} 
                                    optionList      = {props.productdata.name.toString()} 
                                    optionValue     = {props.productdata.code.toString()}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    placeholder     = 'Product Name'
                                    readOnly 
                                    value           = {product}/>
                   </td>

                   <td width='7%'>
                        <input      id              = 'qty_'
                                    type            = 'number'
                                    className       = "form-control put "
                                    placeholder     = 'Qty'
                                    value           = {qty}
                                    onChange        = {(e) =>props.setQty(e.target.value)}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Weight'
                                    value           = {weight}
                                    onChange        = {(e) =>props.setWeight(e.target.value)}/>
                   </td>

                   <td width='7%'>
                        <Dropdown   optionSelected  = {uom}
                                    getValue        = {(uom) => props.setUom(uom)} 
                                    placeHolder     = "Uom"  
                                    style           = {{minWidth: "7%", zIndex:"1"}} 
                                    optionList      = {props.uomdata.toString()} 
                                    optionValue     = {props.uomdata.toString()}/>
                   </td>

                   <td>
                        <DatePicker getDate         = {(date) => props.setRotaDate(date)} 
                                    style           = {{ minWidth: "100%" }}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Batch'
                                    value           = {batch}
                                    onChange        = {(e) =>props.setBatch(e.target.value)}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Ref3'
                                    value           = {ref3}
                                    onChange        = {(e) =>props.setRef3(e.target.value)}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Ref4'
                                    value           = {ref4}
                                    onChange        = {(e) =>props.setRef4(e.target.value)}/>
                   </td>

                   <td>
                        <Dropdown   optionSelected  = {dispositionVal}
                                    getValue        = {(dispositionVal, dispositionName) => props.setDispoisition(dispositionVal, dispositionName)} 
                                    placeHolder     = "Disposition"  
                                    style           = {{minWidth: "100%", zIndex:"1"}} 
                                    optionList      = {props.dispositiondata.code.toString()} 
                                    optionValue     = {props.dispositiondata.code.toString()}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'PackId'
                                    value           = {packId}
                                    onChange        = {(e) =>props.setPackid(e.target.value)}/>
                   </td>
               </tr>
           </table>
        </div>
    )
}

export default OrderLine