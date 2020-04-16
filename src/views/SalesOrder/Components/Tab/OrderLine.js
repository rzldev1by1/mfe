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
    } = props.parameters

    let idx = props.idx + 1;

    
    return(
        <div style={{marginBottom:'1%'}}>
           <table>
               <tr>
                   <td width='4%'>
                        <input      className       = "form-control put "
                                    id              = 'rowNumber'
                                    readOnly 
                                    value           = {number}/>
                   </td>

                   <td>
                        <Dropdown   optionSelected  = {productVal}
                                    getValue        = {(productVal, product) => props.setProduct(productVal, product, props.idx)} 
                                    placeHolder     = "Product"  
                                    style           = {{minWidth: "100%", zIndex:idx}} 
                                    optionList      = {props.productdata.code.toString()} 
                                    optionValue     = {props.productdata.code.toString()}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    placeholder     = 'Product Name'
                                    readOnly 
                                    value           = {product}/>
                   </td>

                   <td width='8%'>
                        <input      id              = {'qty_'+idx}
                                    type            = 'number'
                                    maxLength       = '9'
                                    className       = "form-control put "
                                    placeholder     = 'Qty'
                                    value           = {qty}
                                    onChange        = {(e) =>props.setQty(e.target.value, props.idx)}/>
                   </td>

                   <td width='7%'>
                        <input      id              = {'weight_'+idx}
                                    className       = "form-control put "
                                    placeholder     = 'Weight'
                                    value           = {weight}
                                    onChange        = {(e) =>props.setWeight(e.target.value, props.idx)}/>
                   </td>

                   <td width='3%'>
                        <Dropdown   optionSelected  = {uom}
                                    getValue        = {(uom) => props.setUom(uom, props.idx)} 
                                    placeHolder     = "UOM"  
                                    style           = {{minWidth: "3%", zIndex:idx}} 
                                    optionList      = {props.uomdata.toString()} 
                                    optionValue     = {props.uomdata.toString()}/>
                   </td>

                   <td>
                        <DatePicker getDate         = {(date) => props.setRotaDate(date, props.idx)} 
                                    style           = {{ minWidth: "100%" }}/>
                   </td>

                   <td width='6%'>
                        <input      id              = {'batch_'+idx}
                                    className       = "form-control put "
                                    placeholder     = 'Batch'
                                    value           = {batch}
                                    onChange        = {(e) =>props.setBatch(e.target.value, props.idx)}/>
                   </td>

                   <td width='6%'>
                        <input      id              = {'ref3_'+idx}
                                    className       = "form-control put "
                                    placeholder     = 'Ref3'
                                    value           = {ref3}
                                    onChange        = {(e) =>props.setRef3(e.target.value, props.idx)}/>
                   </td>

                   <td width='6%'>
                        <input      id              = {'ref4_'+idx}
                                    className       = "form-control put "
                                    placeholder     = 'Ref4'
                                    value           = {ref4}
                                    onChange        = {(e) =>props.setRef4(e.target.value, props.idx)}/>
                   </td>

                   <td>
                        <Dropdown   optionSelected  = {dispositionVal}
                                    getValue        = {(dispositionVal, dispositionName) => props.setDispoisition(dispositionVal, dispositionName, props.idx)} 
                                    placeHolder     = "Disposition"  
                                    style           = {{minWidth: "100%", zIndex:idx}} 
                                    optionList      = {props.dispositiondata.code.toString()} 
                                    optionValue     = {props.dispositiondata.code.toString()}/>
                   </td>

                   <td width='11%'>
                        <input      id              = {'packId_'+idx}
                                    className       = "form-control put "
                                    placeholder     = 'PackId'
                                    value           = {packId}
                                    onChange        = {(e) =>props.setPackid(e.target.value, props.idx)}/>
                   </td>
                   
                   <td>
                        <label onClick={() => props.removeLineHandler(idx)} className="iconU-delete"/>
                   </td>
               </tr>
           </table>
        </div>
    )
}

export default OrderLine