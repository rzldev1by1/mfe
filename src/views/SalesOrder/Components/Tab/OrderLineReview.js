import React from 'react'

const OrderLineReview = (props) => {
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
    } = props.parameters.lineDetail
    return(
        <div>
           <table>
               <tr>
                   <td width='3%'>
                        <input      className       = "form-control put "
                                    id              = 'rowNumber'
                                    readOnly 
                                    value           = '1'/>
                   </td>

                   <td>
                   <input           className       = "form-control put "
                                    placeholder     = 'Product'
                                    readOnly 
                                    value           = {productVal}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    placeholder     = 'Product Name'
                                    readOnly 
                                    value           = {product}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Qty'
                                    readOnly
                                    value           = {qty}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Weight'
                                    readOnly
                                    value           = {weight}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Uom'
                                    readOnly
                                    value           = {uom}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    placeholder     = 'Rotadate'
                                    readOnly
                                    value           = {rotaDate}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Batch'
                                    readOnly
                                    value           = {batch}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Ref3'
                                    readOnly
                                    value           = {ref3}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'Ref4'
                                    readOnly
                                    value           = {ref4}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    placeholder     = 'Disposition'
                                    readOnly
                                    value           = {disposition}/>    
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    placeholder     = 'PackId'
                                    readOnly
                                    value           = {packId}/>
                   </td>
               </tr>
           </table>
        </div>
    )
}

export default OrderLineReview