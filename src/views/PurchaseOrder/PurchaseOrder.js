import React, {Component, useState} from  'react'
import './PurchaseOrder.css'
import {
    Table,
    Button
    } from 'reactstrap'
import axios from 'axios'
import PurchaseOrderTable from './Component/PurchaseOrderTable'
import Dropdown from './Component/Dropdown'
import PurchaseOrderCreate from './Component/PurchaseOrderCreate'
import create from '../../assets/img/brand/button_create@2x.png'
import Dropdowns from './Component/Dropdowns'


class PurchaseOrder extends Component {
    constructor(props){
        super(props)

        this.potableref = React.createRef()

        this.state = {
            data:[{"menu":"Client", "subMenu":["MLS","MLB"], }, {"menu":"Site", "subMenu":["A","B","C"]},{"menu":"Status", "subMenu":["Open","Close"]},{"menu":"Supplier", "subMenu":["JohnDoe","JohnWick"]},{"menu":"Order Type", "subMenu":["Type 1", "Type 2"]}],
            client:null, site:null, status:null, supplier:null, ordertype:null, area:null, quantity:null, search:null,

            //filter
            filterclicked:false,

            //modal
            showmodal:false,
            complete:false,
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

    openModal = () => {
        this.setState({showmodal:true})
    }

    closeModal = () => {
        this.setState({showmodal:false})
    }

    search = (client,site,status,ordertype,supplier) => {
        this.potableref.current.searchPurchaseOrder(this.state.search,client,site,status,ordertype,supplier)
    }

    render(){        
        return(
        <div className='animated fadeIn pobody'>
            <div className='header'>
                <h2 style={{marginTop:'0.2%'}}>Purchase Order</h2>
                <div className='header2'>
                    <Button onClick={() => this.openModal()} color="primary" className='createpo'>
                        <img src={create} style={{width:'7%', marginTop:9, marginLeft:15}}/>
                        <label className='font'>Create Purchase Order</label>
                    </Button>
                </div>
            </div>
            
            <div className='searchbar'>
                <div className='inputgroup'>
                    <label className='iconU-search isearch'/>
                    <input onChange={(e) => this.onchangesearch(e) } type='text' className='searchinput' placeholder='Enter a site, order no. or client'/>
                </div>
                <Button onClick={() => this.setState({filterclicked: !this.state.filterclicked})} color="primary" className={'iconU-filter iconU-filters ' + ( this.state.filterclicked ? 'filterclicked' : null)}/>
                <Button onClick={() => this.search()} color="primary" className='btnsearch'><label className='font'>Search</label></Button>
            </div>

            <div className='filterbar'>
                <div style={{display:'flex', width:'70%'}}>
                    {
                        this.state.filterclicked ? null :
                        <Dropdowns filter = {(client,site,status,ordertype,supplier) => this.search(client,site,status,ordertype,supplier)}/>
                    }
                </div>               
            </div>

            <div className={'tablecontent ' + ( this.state.complete ? 'fades ' : 'hidden')}>
                <PurchaseOrderTable ref={this.potableref} className='animated fadeIn' style={{display:'none'}} loadCompleteHandler = {(v) =>  this.setState({complete: v})}/>
            </div>
            <div className={( this.state.complete ? 'hidden': 'spinner')}/>
            <PurchaseOrderCreate showmodal={this.state.showmodal} closemodal={() => this.closeModal()}/>
        </div>
           
            
        )
        
    }
}

export default PurchaseOrder