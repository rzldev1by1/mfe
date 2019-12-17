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

const PurchaseOrderSearch = () => {
    return(
        <div className='form-group row rounded-top-175 mb-0 border-0 marginBottom' style={{display:'flex', backgroundColor:'white', height:70,alignItems:'center'}}>
            <div className="input-group p-2">
                <div className="input-group-prepend bg-white col-9">
                    <span className="input-group-text border-0 bg-white p-0">
                        <i className="fa fa-search fa-2x iconSpace" />
                    </span>
                    <input type="text" className="form-control border-0 pt-2" id="searchInput" name="searchInput" placeholder="Enter a Site, Order No. or Client" />
                </div>
                <div className="col-3 text-right">
                    <Button className={"circle"} >
                        <i className="iconU-filter" />
                    </Button>

                    {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}

                    <Button type="submit" className="search rounded-175" >
                        <strong>Search</strong>
                    </Button>
                </div>
            </div>
        </div>
        
    )
}

export default PurchaseOrderSearch