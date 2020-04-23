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
             <div className="line">
              <table className=''>
                    <tr>
                         <th>
                              <div id='orderline-header-number-id'>#</div>
                         </th>

                         <th>
                              <div id='orderline-header-product-id'><div className='required-field'>Product</div></div>
                         </th>

                         <th>
                              <div id='orderline-header-description-id'>Description</div>
                         </th>

                         <th>
                              <div id='orderline-header-qty-id'><div className='required-field'>Qty</div></div>
                         </th>

                         <th>
                              <div id='orderline-header-weight-id'>Weight</div>
                         </th>

                         <th>
                              <div id='orderline-header-uom-id'><div className='required-field'>UOM</div></div>
                         </th>   
                         
                         <th>
                              <div id='orderline-header-rotadate-id'>Rota Date</div>
                         </th>                    
                    </tr>        
                    <tr>
                         <td>
                              <div id='orderline-header-number-val-id'>
                              <input   className       = "form-control put "
                                        id              = 'rowNumber'
                                        readOnly 
                                        value           = {number}/>
                              </div>
                         </td>
                         <td>
                         <div id='orderline-header-product-val-id'>
                              <Dropdown   optionSelected  = {productVal}
                                             getValue        = {(productVal, product) => props.setProduct(productVal, product, props.idx)} 
                                             placeHolder     = "Product"  
                                             style           = {{minWidth: "100%", zIndex:idx}} 
                                             optionList      = {props.productdata.code.toString()} 
                                             optionValue     = {props.productdata.code.toString()}/>
                         </div>
                         </td>
                         <td>
                         <div id='orderline-header-description-val-id'>
                              <input    className       = "form-control put "
                                        placeholder     = 'Product Name'
                                        readOnly 
                                        value           = {product}/>
                         </div>
                         </td>
                         <td>
                         <div id='orderline-header-qty-val-id'>
                              <input    id              = {'qty_'+idx}
                                        type            = 'number'
                                        maxLength       = '9'
                                        className       = "form-control put "
                                        placeholder     = 'Qty'
                                        value           = {qty}
                                        maxLength       = '9'
                                        onChange        = {(e) =>props.setQty(e.target.value, props.idx)}/>
                         </div>
                         </td>
                         <td>
                         <div id='orderline-header-weight-val-id'>
                              <input      id              = {'weight_'+idx}
                                        className       = "form-control put "
                                        placeholder     = 'Weight'
                                        value           = {weight}
                                        maxLength       = '9'
                                        onChange        = {(e) =>props.setWeight(e.target.value, props.idx)}/> 
                         </div>
                         </td>
                         <td>
                         <div id='orderline-header-uom-val-id'>
                              <Dropdown   optionSelected  = {uom}
                                             getValue        = {(uom) => props.setUom(uom, props.idx)} 
                                             placeHolder     = "UOM"  
                                             style           = {{minWidth: "250px", zIndex:idx}} 
                                             optionList      = {props.uomdata.toString()} 
                                             optionValue     = {props.uomdata.toString()}/>
                         </div>
                         </td>   
                         <td>
                         <div id='orderline-header-rotadate-val-id'>
                              <DatePicker getDate         = {(date) => props.setRotaDate(date, props.idx)} 
                                             style           = {{ minWidth: "250px" }}/>
                         </div>
                         </td>                    
                    </tr>                             
              </table>
            </div> 
        </div>
    )
}

export default OrderLine