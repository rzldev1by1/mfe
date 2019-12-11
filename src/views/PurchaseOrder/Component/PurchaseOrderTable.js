import React, {Component, useState} from  'react'
import '../../StockHolding/StockHolding.css'
import {
    Card,
    CardBody,
    Row,
    Table,
    Button,
    FormGroup,
    InputGroup,
    Breadcrumb, 
    BreadcrumbItem,
    Input, 
    InputGroupAddon,
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle
    } from 'reactstrap'
import axios from 'axios'

const PurchaseOrderTable = () => {
    return(
        <Table responsive>
      <thead>
        <tr>
          <th>Site</th>
          <th>Order No</th>
          <th>Client</th>
          <th>Status</th>
          <th>Satus Description</th>
          <th>Date due</th>
          <th>Date Received</th>
          <th>Date Released</th>
          <th>Date Completed</th>
          <th>Supplier</th>
          <th style={{textAlign:'center'}}><span className='glyphicon glyphicon-pencil'></span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A</td>
          <td>PO-4312-1213</td>
          <td>Josaphat</td>
          <td>Open</td>
          <td>Description of Status</td>
          <td>27/01/2019</td>
          <td>27/01/2019</td>
          <td>27/01/2019</td>
          <td>27/01/2019</td>
          <td className=''>sdf</td>
          <td className='' style={{alignItems:'right'}}>
            <div className='circle' style={{alignItems:'center', paddingLeft:'12%', paddingTop:'10%'}}>
                <div className="dot"/>
                <div className="dot"/>
                <div className="dot"/>
            </div>            
          </td>
        </tr>
        <tr>
          <td>A</td>
          <td>PO-4312-1213</td>
          <td>Josaphat</td>
          <td>Open</td>
          <td>Description of Status</td>
          <td>27/01/2019</td>
          <td>27/01/2019</td>
          <td>27/01/2019</td>
          <td>27/01/2019</td>
          <td className=''>sdf</td>
          <td className='' style={{alignItems:'right'}}>
            <div className='circle' style={{alignItems:'center', paddingLeft:'12%', paddingTop:'10%'}}>
                <div className="dot"/>
                <div className="dot"/>
                <div className="dot"/>
            </div>            
          </td>
        </tr>
      </tbody>
    </Table>
    )
}

export default PurchaseOrderTable