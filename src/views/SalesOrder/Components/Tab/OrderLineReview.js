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
          <div className="line">
          <table className=''>
               <tr>
                    <th>
                         <div id='orderline-header-number-id'>#</div>
                    </th>

                    <th>
                         <div id='orderline-header-product-id'>Product</div>
                    </th>

                    <th>
                         <div id='orderline-header-description-id'>Description</div>
                    </th>

                    <th>
                         <div id='orderline-header-qty-id'>Qty</div>
                    </th>

                    <th>
                         <div id='orderline-header-weight-id'>Weight</div>
                    </th>

                    <th>
                         <div id='orderline-header-uom-id'>UOM</div>
                    </th>   
                    
                    <th>
                         <div id='orderline-header-rotadate-id'>Rota Date</div>
                    </th>                    
               </tr>
               <tr>
                    <td>
                         <div id='orderline-header-number-id'>
                              <input    className       = "form-control put "
                                        id              = 'rowNumber'
                                        readOnly 
                                        value           = {number}/>
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-product-id'>
                              <input    className       = "form-control put "
                                        readOnly 
                                        value           = {productVal}/>
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-description-id'>
                              <input    className       = "form-control put "
                                        readOnly 
                                        value           = {product}/>
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-qty-id'>
                              <input    className       = "form-control put "
                                        readOnly
                                        value           = {qty}/>
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-weight-id'>
                              <input    className       = "form-control put "
                                        readOnly
                                        value           = {weight}/>
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-uom-id'>
                              <input    className       = "form-control put "
                                        readOnly
                                        value           = {uom}/>
                         </div>
                    </td>   
                    
                    <td>
                         <div id='orderline-header-rotadate-id'>
                              <input    className       = "form-control put "
                                        readOnly
                                        value           = {rotaDate}/>
                         </div>
                    </td>                    
               </tr>
               </table>
          </div>
     </div>)
}

export default OrderLineReview