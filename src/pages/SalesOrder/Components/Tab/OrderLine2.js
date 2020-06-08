import React from 'react'
import Dropdown from 'shared/Dropdown'
import DatePicker from 'shared/DatePicker'

const OrderLine2 = (props) => {

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
                        <div id='orderline-header-number-val-id'>
                            
                        </div>
                    </td>
                    <td>
                        <div id='orderline-header-batch-val-id'>
                            <input      id              = {'batch_'+idx}
                                        className       = "form-control put "
                                        placeholder     = 'Batch'
                                        value           = {batch}
                                        maxLength       = '9'
                                        onChange        = {(e) =>props.setBatch(e.target.value, props.idx)}/>
                        </div>
                    </td>
                    <td>
                        <div id='orderline-header-ref3-val-id'>
                            <input      id              = {'ref3_'+idx}
                                        className       = "form-control put "
                                        placeholder     = 'Ref3'
                                        value           = {ref3}
                                        onChange        = {(e) =>props.setRef3(e.target.value, props.idx)}/>
                        </div>
                    </td>
                    <td>
                        <div id='orderline-header-ref4-val-id'>
                            <input      id              = {'ref4_'+idx}
                                        className       = "form-control put "
                                        placeholder     = 'Ref4'
                                        value           = {ref4}
                                        onChange        = {(e) =>props.setRef4(e.target.value, props.idx)}/>
                        </div>
                    </td>
                    <td>
                        <div id='orderline-header-disposition-val-id'>
                            <Dropdown   optionSelected  = {dispositionVal}
                                        getValue        = {(dispositionVal, dispositionName) => props.setDispoisition(dispositionVal, dispositionName, props.idx)} 
                                        placeHolder     = "Disposition"  
                                        style           = {{minWidth: "100%", zIndex:idx}} 
                                        optionList      = {props.dispositiondata.code.toString()} 
                                        optionValue     = {props.dispositiondata.code.toString()}/>
                        </div>
                    </td>
                    <td>
                        <div id='orderline-header-packid-val-id'>
                        <input      id              = {'packId_'+idx}
                                    className       = "form-control put "
                                    placeholder     = 'Pack Id'
                                    value           = {packId}
                                    onChange        = {(e) =>props.setPackid(e.target.value, props.idx)}/>
                        </div>
                    </td>   
                    <td>
                        <div id='orderline-header-number-val-id'>
                            <label onClick={() => props.removeLineHandler(idx)} className="iconU-delete"/>
                        </div>
                    </td>                    
                </tr>     
           </table>
        </div>
    )
}

export default OrderLine2