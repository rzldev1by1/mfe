import React, {Component, useState} from  'react'
import '../StockHolding/StockHolding.css'
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
import Paging from '../General/Paging'
import axios from 'axios'
import AppComponent from '../../AppComponent'
import PurchaseOrderHeader from './Component/PurchaseOrderHeader'
import PurchaseOrderSearch from './Component/PurchaseOrderSearch'
import PurchaseOrderTable from './Component/PurchaseOrderTable'

const PurchaseOrder = () => {
    return(
            <div className='animated fadeIn'>
                <PurchaseOrderHeader/>
                <PurchaseOrderSearch/>
                <PurchaseOrderTable/>
            </div>
    )
}

export default PurchaseOrder