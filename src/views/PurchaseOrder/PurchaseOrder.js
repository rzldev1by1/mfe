import React, {Component, useState} from  'react'
import './PurchaseOrder.css'
import {
    Table,
    Button
    } from 'reactstrap'
import axios from 'axios'
import AppComponent from '../../AppComponent'
import PurchaseOrderHeader from './Component/PurchaseOrderHeader'
import PurchaseOrderSearch from './Component/PurchaseOrderSearch'
import PurchaseOrderTable from './Component/PurchaseOrderTable'
import Dropdown from './Component/Dropdown'
import CreatePurchaseOrder from './Component/CreatePurchaseOrder'
import {Tabs, Tab} from 'react-bootstrap-tabs';

class PurchaseOrder extends Component {
    constructor(props){
        super(props)

        this.state = {
            data:[{"menu":"Client", "subMenu":["MLS","MLB"], }, {"menu":"Site", "subMenu":["A","B","C"]},{"menu":"Status", "subMenu":["Open","Close"]},{"menu":"Supplier", "subMenu":["JohnDoe","JohnWick"]},{"menu":"Order Type", "subMenu":["Type 1", "Type 2"]},{"menu":"Area", "subMenu":["A Area", "B Area"]},{"menu":"Quantity", "subMenu":["Each", "Pallet"]}],
            client:null, site:null, status:null, supplier:null, ordertype:null, area:null, quantity:null, search:null
        }
    }

    selectedValue = (id, value) => {
        if(id == 'Client')
        {
            this.setState({client:value})
        }
        else if(id == 'Site')
        {
            this.setState({site:value})
        }
        else if(id == 'Status')
        {
            this.setState({status:value})
        }
        else if(id == 'Supplier')
        {
            this.setState({supplier:value})
        }
        else if(id == 'Order Type')
        {
            this.setState({ordertype:value})
        }
        else if(id == 'Area')
        {
            this.setState({area:value})
        }
        else if(id == 'Quantity')
        {
            this.setState({quantity:value})
        }
    }

    onchangesearch = (props) => {
        this.setState({search:props.target.value})        
    }

    render(){
        return(
            <div className='animated fadeIn'>
                <div className='header'>
                    <h1 style={{marginTop:'0.5%'}}>Purchase Order</h1>
                    <Button color="primary" className='createpo'><label className='iconU-edit'/><label className='font'>Create Purchase Order</label></Button>
                </div>
                
                <div className='searchbar'>
                    <div className='inputgroup'>
                        <label className='iconU-search'/>
                        <input onChange={(e) => this.onchangesearch(e) } type='text' className='searchinput' placeholder='Enter a site, order no. or client'/>
                    </div>
                    <Button color="secondary" className='iconU-filter'/>
                    <Button color="primary" className='btnsearch'><label className='font'>Search</label></Button>
                </div>

                <div className='filterbar'>
                    <div style={{display:'flex', width:'88.1%'}}>
                        {this.state.data.map((data,key) => 
                            <Dropdown data={data} key={key} selectedHandler = {(id, value) => this.selectedValue(id, value)}/>                            
                            )}
                    </div>               
                </div>

                <div className='tablecontent'>
                    <PurchaseOrderTable/>
                </div>
            </div>
            
        )
        
    }
}

export default PurchaseOrder