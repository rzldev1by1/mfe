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
    } = props.parameters
    return(
        <div style={{marginBottom:'1%'}}>
           <table>
               <tr>
                   <td width='3%'>
                        <input      className       = "form-control put "
                                    id              = 'rowNumber'
                                    readOnly 
                                    value           = {number}/>
                   </td>

                   <td>
                   <input           className       = "form-control put "
                                    readOnly 
                                    value           = {productVal}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    readOnly 
                                    value           = {product}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {qty}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {weight}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {uom}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {rotaDate}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {batch}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {ref3}/>
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {ref4}/>
                   </td>

                   <td>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {disposition}/>    
                   </td>

                   <td width='7%'>
                        <input      className       = "form-control put "
                                    readOnly
                                    value           = {packId}/>
                   </td>
               </tr>
           </table>
        </div>
    )
}

export default OrderLineReview