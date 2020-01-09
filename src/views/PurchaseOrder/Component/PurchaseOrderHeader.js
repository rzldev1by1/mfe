import React, {Component} from 'react'
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

const PurchaseOrderHeader = (props) => {
    const showCreatePurchaseOrder = () => {
        props.showPOModal(true)
    }
    return (
        <div style={{display:'flex'}}>
                <div style={{width:'85%'}}>
                    <Breadcrumb className='breadCrumbPO'>
                        <BreadcrumbItem active className='breadCrumbPO'>
                            Purchase Order
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>                
                <div style={{marginTop:10}}>
                    <Button onClick={()=> showCreatePurchaseOrder()} type="submit" className="search rounded-175 create" style={{width:300, backgroundColor:'#E0E3F2', alignItems:'right', font: 'Bold 20px/27px Nunito',color: '#212F61'}}>
                    <i className="iconU-edit" style={{marginRight:10}}/>
                        <strong>Create Purchase Order</strong>
                    </Button>
                </div>
            </div>
    )
}

export default PurchaseOrderHeader