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

const PurchaseOrderSearch = (props) => {
    const [boolFilter, setBoolFilter] = useState(false)
    const handleFilterChange = () => {
        props.onFilterChange(boolFilter)
    }

    const onFilterChange = ()=> {
        setBoolFilter(!boolFilter)
        handleFilterChange()
    }
    return(
        <div className='form-group row rounded-top-175 mb-0 border-0' style={{display:'flex', backgroundColor:'white', height:70,alignItems:'center',width:'100%', marginLeft:0}}>
            <div className="input-group p-2">
                <div className="input-group-prepend bg-white col-9">
                    <span className="input-group-text border-0 bg-white p-0">
                        <i className="fa fa-search fa-2x iconSpace" />
                    </span>
                    <input type="text" className="form-control border-0 pt-2" id="searchInput" name="searchInput" placeholder="Enter a Site, Order No. or Client" />
                </div>
                <div className="col-3 text-right">
                    <Button className={"circle"} onClick={()=>onFilterChange()}>
                        <i className="iconU-filter" />
                    </Button>
                    <Button type="submit" className="search rounded-175" >
                        <strong>Search</strong>
                    </Button>
                </div>
            </div>
        </div>
        
    )
}

export default PurchaseOrderSearch