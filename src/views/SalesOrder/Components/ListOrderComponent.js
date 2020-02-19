import React, { Component } from 'react'
import { Table,Button, Card, CardBody, Label} from 'reactstrap'
import "../SalesOrder.css"


const ListOrderComponent = (props) => {
  const { headers, data } = props.listOrder;

  return(
    <div className="d-flex mt-3">
    <table className="table">
    <thead>
    <tr>
    {
        headers.map((element,index)=>{
        return <th key={index} className='headers'>
        <div className='d-flex flex-row'>
        <label className="mt-1 mb-0">{element}</label>
        {
          (element === '')?'': (<div className="d-flex flex-column ml-2">
          <span className="upArrow" style={{height:'10px'}}></span>
          <span className="downArrow" style={{height:'10px'}}></span>
          </div>)
        }


        </div>
        </th>
      })
    }
    </tr>
    </thead>
    <tbody>
    {
      data.map((element,index)=>{

        return <tr key={index} >
        {
          Object.keys(element).map((item,idx) => {
            return <td key={idx}>
                <label>{element[item]}</label>
            </td>
          })
        }
        </tr>
      })
    }


    </tbody>
    </table>
    </div>
  )
}


export default ListOrderComponent;
