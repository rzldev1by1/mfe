import React from 'react'

const OrderLineReview2 = (props) => {
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
                    <div id='orderline-header-number-id'/>
                </th>

                <th>
                    <div id='orderline-header-batch-id'>Batch</div>
                </th>

                <th>
                    <div id='orderline-header-ref3-id'>Ref3</div>
                </th>

                <th>
                    <div id='orderline-header-ref4-id'>Ref4</div>
                </th>

                <th>
                    <div id='orderline-header-disposition-id'>Disposition</div>
                </th>

                <th>
                    <div id='orderline-header-packid-id'>Pack Id</div>
                </th>                      
            </tr>  

               <tr>
                    <td>
                         <div id='orderline-header-number-id'>
                            
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-batch-id'>
                            <input  className       = "form-control put "
                                    readOnly
                                    value           = {batch}/>
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-ref3-id'>
                            <input  className       = "form-control put "
                                    readOnly
                                    value           = {ref3}/>
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-ref4-id'>
                            <input  className       = "form-control put "
                                    readOnly
                                    value           = {ref4}/>
                         </div>
                    </td>

                    <td>
                         <div id='orderline-header-disposition-id'>
                            <input  className       = "form-control put "
                                    readOnly
                                    value           = {disposition}/> 
                         </div>
                    </td>  
                    
                    <td>
                         <div id='orderline-header-rotadate-id'>
                            <input  className       = "form-control put "
                                    readOnly
                                    value           = {packId}/>
                         </div>
                    </td>                    
               </tr>
               </table>
          </div>
     </div>
    )
}

export default OrderLineReview2