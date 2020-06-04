import React, { Component, useState } from 'react'
import './PurchaseOrder.css'
import {
  Table,
  Button
} from 'reactstrap'
import axios from 'axios'
import { FaPencilAlt } from "react-icons/fa"
import PurchaseOrderTable from './Component/PurchaseOrderTable'
import { endpoint, headers } from '../../AppComponent/ConfigEndpoint'
import Dropdown from '../../AppComponent/Dropdown'
import Search from '../../AppComponent/Search'
import PurchaseOrderCreate from './Component/PurchaseOrderCreate'
import create from '../../assets/img/brand/button_create@2x.png'
import EditColumn from '../../AppComponent/EditColumn'
import Dropdowns from './Component/Dropdowns'
import Movement from './Component/Movement'
import Authentication from '../../Auth/Authentication'
import HeaderTitle from '../../AppComponent/HeaderTitle'

class PurchaseOrder extends Component {
  constructor(props) {
    super(props)

    this.potableref = React.createRef()
    this.searchForm = React.createRef()

    this.state = {
      data: [{ "menu": "Client", "subMenu": ["MLS", "MLB"], }, { "menu": "Site", "subMenu": ["A", "B", "C"] }, { "menu": "Status", "subMenu": ["Open", "Close"] }, { "menu": "Supplier", "subMenu": ["JohnDoe", "JohnWick"] }, { "menu": "Order Type", "subMenu": ["Type 1", "Type 2"] }],
      client: null, site: null, status: null, supplier: null, ordertype: null, area: null, quantity: null, search: "",

      clientdata: [],
      sitedata: [],
      ordertypedata: [],
      ordertypefilterdata: [],

      //filter
      filterclicked: true,

      //modal
      showmodal: false,
      complete: false,

      //autocomplete
      autoText: null,
      autoArray: null,
      autoArrays: [],
      siteSelected: Authentication.getSite() ? Authentication.getSite() : null,
      clientSelected: Authentication.getClient() ? Authentication.getClient() : null,
      statusSelected: undefined,
      orderTypeSelected: undefined,

      orderTypeName: [],
      orderTypeValue: [],
      orderTypeFilterName: [],
      orderTypeFilterValue: [],
      showEditColumn: false,
      tableheader: [],
      resetDropdownProcessed: false
    }


  }

  componentDidMount = () => {
    this.getclient();
    this.getsite();
    this.getordertype();
  }

  resetDropdown = () => {
    this.setState({ siteSelected: null, clientSelected: null, statusSelected: null, orderTypeSelected: null, resetDropdownProcessed: true }, () => this.setState({ resetDropdownProcessed: false }))
  }

  selectedValue = (id, value) => {
    if (id == 'Client') {
      this.setState({ client: value })
    }
    else if (id == 'Site') {
      this.setState({ site: value })
    }
    else if (id == 'Status') {
      this.setState({ status: value })
    }
    else if (id == 'Supplier') {
      this.setState({ supplier: value })
    }
    else if (id == 'Order Type') {
      this.setState({ ordertype: value })
    }
    else if (id == 'Area') {
      this.setState({ area: value })
    }
    else if (id == 'Quantity') {
      this.setState({ quantity: value })
    }
  }

  onchangesearch = (props) => {
    this.setState({ search: props.target.value })
  }

  openModal = () => {
    this.setState({ showmodal: true })
  }

  closeModal = () => {
    this.setState({ showmodal: false })
  }

  search = () => {
    let self = this;
    self.potableref.current.searchPurchaseOrder(self.state.search, self.state.clientSelected, self.state.siteSelected, self.state.statusSelected, self.state.orderTypeSelected)
  }

  getclient = () => {
    axios.get(endpoint.getClient, {
      headers: headers
    })
      .then(res => {
        const result = res.data
        this.setState({ clientdata: result })
      })
      .catch(error => {

        console.log(error);
      })
  }

  getsite = () => {
    axios.get(endpoint.getSite, {
      headers: headers
    })
      .then(res => {
        const result = res.data
        this.setState({ sitedata: result })
      })
      .catch(error => {

      })
  }

  getordertype = () => {
    let self = this;
    axios.get(endpoint.getPOResources, {
      headers: headers
    })
      .then(res => {
        const result = res.data.orderType
        const result2 = res.data.orderTypeFilter
        self.setState({ ordertypedata: result });
        self.setState({ ordertypefilterdata: result2 });
        let orderTypeName = [];
        let orderTypeValue = [];
        let orderTypeFilterName = [];
        let orderTypeFilterValue = [];
        
        self.state.ordertypedata.map((data) => {
          orderTypeName.push(data.description);
          orderTypeValue.push(data.code); 
        })
        
        self.state.ordertypefilterdata.map((data) => {
          orderTypeFilterName.push(data.description);
          orderTypeFilterValue.push(data.code); 
        })

        self.setState({
          orderTypeName: orderTypeName,
          orderTypeValue: orderTypeValue,
          orderTypeFilterName: orderTypeFilterName,
          orderTypeFilterValue: orderTypeFilterValue
        })
        console.log(self.state.orderTypeFilterValue)
        
      })
      .catch(error => {

      })

  }
  getSiteSelected = (value) => {
    this.setState({ siteSelected: value });
  }

  getClientSelected = (value) => {
    this.setState({ clientSelected: value });
  }

  getStatusSelected = (value) => {
    this.setState({ statusSelected: value });
  }

  getOrderTypeSelected = (value) => {
    this.setState({ orderTypeSelected: value });
  }

  showDropdowns = () => {
    let clientName = ["All"];
    let clientValue = ["all"];
    let siteData = ["All"];
    let siteValue = ["all"];
    let status = [ "All" ,"0: Unavailable","1: Available", "2: Released", "3: Part Released", "4 :Completed","<>4: Open"];
    let statusValue = ["all" ,"unavailable","available", "released", "part_released", "completed","open"];
    let orderTypeName = ["All"];
    let orderTypeValue = ["all"];
    let orderTypeFilterName = ["All"];
    let orderTypeFilterValue = ["all"];
    if (this.state.clientdata) { 
      this.state.clientdata.map((data) => {
        clientName.push(data.code + ' : ' + data.name);
        clientValue.push(data.code);
      })
    }
    if (this.state.sitedata) { 
      this.state.sitedata.map((data) => {
        siteData.push(data.site + ' : ' + data.name);
        siteValue.push(data.site);
      })
    }
    if (this.state.orderTypeValue.length > 1) {  
      this.state.orderTypeValue.map((data) => {
        orderTypeName.push(data);
      })
    } 
    if (this.state.orderTypeValue.length > 1) { 
      this.state.orderTypeValue.map((data) => {
        orderTypeValue.push(data);

      })
      orderTypeValue.push("")
    }

    
    if (this.state.orderTypeFilterValue.length > 1) {  
      this.state.orderTypeFilterValue.map((data) => {
        orderTypeFilterName.push(data);
        orderTypeFilterValue.push(data);
      })
    }  

    return (
      <React.Fragment>
        {Authentication.getUserLevel() == "administrator" ? (
          <Dropdown placeHolder="Site"
            className="filterDropdown"
            optionList={siteData.toString()}
            optionValue={siteValue.toString()}
            getValue={this.getSiteSelected.bind(this)} />
        ) : (
            <input
              readOnly
              value={Authentication.getSite()}
              id="site"
              className="form-control put filterDropdown"
              placeholder="Site"
              tabIndex='1'
            />
          )}

        {Authentication.getUserLevel() == "administrator" ? (
          <Dropdown placeHolder="Client"
            className="filterDropdown"
            optionList={clientName.toString()}
            optionValue={clientValue.toString()}
            getValue={this.getClientSelected.bind(this)} />
        ) : (
            <input
              readOnly
              value={Authentication.getClient()}
              id="site"
              className="form-control put filterDropdown"
              placeholder="Site"
              tabIndex='1'
            />
          )}

        <Dropdown placeHolder="Status"
          className="filterDropdown"
          optionList={status.toString()}
          optionValue={statusValue.toString()}
          getValue={this.getStatusSelected.bind(this)} />
        <Dropdown placeHolder="Order Type"
          className="filterDropdown"
          optionList={orderTypeFilterName.toString()}
          optionValue={orderTypeFilterValue.toString()}
          getValue={this.getOrderTypeSelected.bind(this)} />
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <HeaderTitle
          title="Purchase Orders"
          button={
            <Button onClick={this.openModal} color="primary" className='btn btn-primary float-right btn-create'>
              <FaPencilAlt className="mb-2" /> &nbsp; <label className='font'>Create Purchase Order</label>
            </Button>
          }
        />
        <div className='animated fadeIn app-container'>
          <div>{this.state.autoArray}</div>
          {
            this.state.autoArrays.map(data => <div onClick={(e) => this.selectedName(e)}>{data}</div>)
          }
          <div className='searchbar'>
            <Search style={{ marginTop: "none" }}
              getValue={(v) => this.setState({ search: v })}
              triggerShowFilter={() => this.setState({ filterclicked: !this.state.filterclicked })}
              searchData={() => this.search()}
              placeholder="Enter an Order No"
              additionalComponent={this.state.resetDropdownProcessed ? null : this.showDropdowns()}
              resetDropdown={() => this.resetDropdown()} />
          </div>
          {/* <div className='filterbar'>
                <div style={{display:'flex', width:'100%'}}>
                    {
                        this.state.filterclicked ? null :
                        null
                    }
                </div>               
            </div> */}
          <div className={' ' + (this.state.complete ? 'fades ' : 'hidden')}>
            <PurchaseOrderTable ref={this.potableref}
              className='animated fadeIn'
              loadCompleteHandler={(v) => this.setState({ complete: v })}
              getTableHeader={(e) => this.setState({ tableheader: e })}
              showEditColumn={(e) => this.setState({ showEditColumn: e })}
            />
          </div>

          <div className={(this.state.complete ? 'hidden createPoModal' : 'spinner')} />
          <PurchaseOrderCreate showmodal={this.state.showmodal} closemodal={() => this.closeModal()} />
          <EditColumn isOpen={this.state.showEditColumn}
            toggle={() => this.setState({ showEditColumn: false })}
            fields={this.state.tableheader}
            updateTableColumn={(columns) => this.setState({ tableheader: columns, tableheaderstatus: true })}
            modulName="Purchase Order"
          />
        </div>

      </React.Fragment>
    )

  }
}

export default PurchaseOrder