import React, {Component, useState} from  'react'
import '../../StockHolding/StockHolding.css'

const PurchaseOrderTable = (props) => {
  const dataTable = () => {
    return (
        <tr onClick={()=> props.purchaseOrderDetailModal(props.tableData[0])}>
          {
            props.tableData.map(tableData => 
            <td>{tableData}</td>
          )}
          <td className='' style={{alignItems:'right'}}>
            <div className='circle' style={{alignItems:'center', paddingLeft:'12%', paddingTop:'10%'}}>
                <div className="dot"/>
                <div className="dot"/>
                <div className="dot"/>
            </div>            
          </td>
        </tr>
    )
}
    return(
        <tbody>        
          {dataTable()}
        </tbody>
    )
}

export default PurchaseOrderTable