import React, { Component } from "react";
import ListOrderComponent from "./Components/ListOrderComponent";
import FilterComponent from "./Components/FilterComponent";
import { Button } from "reactstrap";
import create from "../../assets/img/brand/button_create@2x.png";
import Dropdown from "../../AppComponent/Dropdown";
import Search from "../../AppComponent/Search";
import SalesOrderCreate from "./Components/SalesOrderCreate";
import axios from "axios";
import { endpoint, headers } from "../../AppComponent/ConfigEndpoint";
import Authentication from "../../Auth/Authentication";
import EditColumn from "./Components/Modal/Modal";
import { column } from './Components/Validation/defaultColumn'
import { FaPencilAlt } from "react-icons/fa"
import HeaderTitle from '../../AppComponent/HeaderTitle'
import DD from '../../AppComponent/Dropdown/index'

import "./SalesOrder.css";
class SalesOrder extends Component {
  constructor(props) {
    super(props);
    this.potableref = React.createRef();
    this.searchForm = React.createRef();
    this.state = {
      tableheader: [
        "Site",
        "Client",
        "Order No",
        "Ship to Name",
        "Customer Name",
        " Status",
        "Date due",
        "Date Received",
        "Date Released",
        "Date Completed"
      ],
      search: "",
      client: null,
      site: null,
      status: null,
      ordertype: null,
      task:null,
      ordertypefilter: null,

      siteSelected: Authentication.getSite() ? Authentication.getSite() : null,
      clientSelected: Authentication.getClient() ? Authentication.getClient() : null,

      clientdata: [],
      sitedata: [],
      productdata: [],
      dispositiondata: [],
      taskData:[],

      //modal
      showmodal: false,
      complete: false,

      //filter
      filterclicked: true,

      //resources
      resources: [],

      loaded: false,

      showEditColumn: false,

      column: Authentication.getSavedColumn() ? Authentication.getSavedColumn() : column,
      updatedColumn: Authentication.getSavedColumn() ? Authentication.getSavedColumn() : column,

      resetDropdownProcessed: false
    };
  }

  componentDidMount = () => {
    this.getclient();
    this.getsite();
    this.getResources();
    this.getProduct();
    this.getDisposition();

  };

  editColumnHandler = (idx, active) => {
    let newColumn = this.state.updatedColumn
    newColumn[idx].active = active
    this.setState({ updatedColumn: newColumn })

  };

  saveColumnHandler = () => {
    let updateColumn = [...this.state.updatedColumn]
    this.setState({ column: updateColumn }, localStorage.setItem('savedColumn', JSON.stringify(this.state.column)))
  };

  openModal = () => {
    this.setState({ showmodal: true });
  };

  closeModal = () => {
    this.setState({ showmodal: false });
  };

  search = () => {
    let self = this;
    self.potableref.current.searchSalesOrder(
      self.state.search,
      self.state.siteSelected,
      self.state.clientSelected,
      self.state.status,
      self.state.ordertype,
      self.state.task
    );
  };

  resetDropdown = () => {
    this.setState({ resetDropdownProcessed: true, site: null, client: null, status: null, ordertype: null , ordertypefilter: null }, () => this.setState({ resetDropdownProcessed: false }))
  }

  getclient = () => {
    axios
      .get(endpoint.getClient, {
        headers: headers
      })
      .then((res) => {
        const result = res.data;
        this.setState({ clientdata: result });
      })
      .catch((error) => {

        console.log(error);
      });
  };

  getsite = () => {
    axios
      .get(endpoint.getSite, {
        headers: headers
      })
      .then((res) => {
        const result = res.data;
        this.setState({ sitedata: result });
      })
      .catch((error) => {

      });
  };

  getTask = () => {
    const {clientSelected,siteSelected} = this.state
    let param = '?client='+clientSelected+'&&site='+siteSelected+'&&order=so'
    axios.get(endpoint.getTask+param, {
      headers: headers
    })
      .then(res => {
        const result = res.data
        this.setState({ taskData: result })
      })
      .catch(error => {

        console.log(error);
      })
  }

  getResources = (clientParam) => {
    let company = Authentication.getCompanyCode();
    let client = Authentication.getClient();
    if (!company) company = null
    if (!client) client = null
    if (clientParam) client = clientParam;
    axios
      .get(
        endpoint.getSoResources + "?company=" + company + "&&client=" + client,
        {
          headers: headers
        }
      )

      .then((res) => {
        let result = res.data;
        this.setState({ resources: result, loaded: true });
      })
      .catch((error) => { });
  };

  getProduct = (clientparam) => {
    let client = Authentication.getClient();
    if (!client) client = null
    if (clientparam) client = clientparam;
    let param = "?client=" + client;
    axios
      .get(endpoint.getProduct + param, {
        headers: headers
      })
      .then((res) => {
        let result = res.data;
        this.setState({ productdata: result });
      });
  };

  getDisposition = () => {
    axios
      .get(endpoint.getDisposition, {
        headers: headers
      })
      .then((res) => {
        let result = res.data;
        this.setState({ dispositiondata: result });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getSiteSelected = (value) => {
    this.setState({ siteSelected: value },() => {
      if(this.state.siteSelected) this.getTask()
    });
  };

  getClientSelected = (value) => {
    this.setState({ clientSelected: value },() => {
      if(this.state.siteSelected) this.getTask()
    });
  };

  openEditModal = () => {
    this.setState({ showEditColumn: true });
  };

  showDropdowns = () => {
    let clientName = ["All Clients"];
    let clientValue = ["all"];
    let siteData = ["all"];
    let siteName = ["All Sites"];
    let orderTypeName = ["All Order Types"];
    let orderTypeValue = ["all"];
    let orderTypeFilterName = ["All Order Types"];
    let orderTypeFilterValue = ["all"];
    let statusName = ["All Status","0: Unavailable", "1: Available", "2: Released", "3: Part Released", "4: Completed", "<>4: Open"];
    let statusValue = ['all',"unavailable", "available", "released", "part_released", "completed", "open"];
    let statuss = [];
    if (this.state.clientdata) { 
      this.state.clientdata.map((data) => {
        clientName.push(data.code + ' : ' + data.name);
        clientValue.push(data.code);
      });
    }
    if (this.state.sitedata) { 
      this.state.sitedata.map((data) => {
        siteName.push(data.site + ' : ' + data.name)
        siteData.push(data.site);
      });
    }

    if (this.state.resources.orderType !== undefined) {
      this.state.resources.orderType.name.map((data, i) => {
        let combine = null
        let cCode = this.state.resources.orderType.code[i]
        combine = cCode+ ' : ' + data
        orderTypeName.push(combine)
      })
      this.state.resources.orderType.code.map((data, i) => {
        orderTypeValue.push(data)
      })
    }

    if (this.state.resources.orderTypeFilter !== undefined) {
      this.state.resources.orderTypeFilter.name.map((data, i) => {
        orderTypeFilterName.push(data)
      })
      this.state.resources.orderTypeFilter.code.map((data, i) => {
        orderTypeFilterValue.push(data)
      })
    }

    const { client, site, status, ordertype, ordertypefilter,taskData,task } = this.state
    let taskName = ["All Tasks"];
    let taskValue = ["All"];
    if(taskData)
    {
      taskName = taskName.concat(taskData.name)
      taskValue = taskValue.concat(taskData.code)      
    }
    return (
      <React.Fragment>
        {Authentication.getUserLevel() == "administrator" ? (
          <Dropdown optionSelected={site}
            placeHolder="Site"
            optionList={siteName.toString()}
            optionValue={siteData.toString()}
            getValue={this.getSiteSelected.bind(this)}
            className="filterDropdown" />
        ) : (
            <input readOnly
              value={Authentication.getSite()}
              id="site"
              className="form-control put filterDropdown"
              placeholder="Site"
              tabIndex='1' />
          )}

        {Authentication.getUserLevel() == "administrator" ? (
          <Dropdown optionSelected={client}
            placeHolder="Client"
            optionList={clientName.toString()}
            optionValue={clientValue.toString()}
            getValue={this.getClientSelected.bind(this)}
            className="filterDropdown" />
        ) : (
            <input readOnly
              value={Authentication.getClient()}
              id="site"
              className="form-control put filterDropdown"
              placeholder="Site"
              tabIndex='1' />
          )}

        <Dropdown optionSelected={status}
          placeHolder="Status"
          optionList={statusName.toString()}
          optionValue={statusValue.toString()}
          getValue={(code) => this.setState({ status: code })}
          className="filterDropdown" />

        <Dropdown optionSelected={ordertype}
          placeHolder="Order Type"
          optionList={orderTypeName.toString()}
          optionValue={orderTypeValue.toString()}
          getValue={(code) => this.setState({ ordertype: code })}
          className="filterDropdown" />

        <Dropdown optionSelected={task}
                  placeHolder="Task"
                  optionList={taskName.toString()}
                  optionValue={taskValue.toString()}
                  getValue={(code) => this.setState({ task: code })}
                  className="filterDropdown" />
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <HeaderTitle
          title="Sales Orders"
          button={
            <Button onClick={this.openModal} color="primary" className='btn btn-primary float-right btn-create'>
              <FaPencilAlt className="mb-2" /> &nbsp; <label className='font'>Create Sales Order</label>
            </Button>
          }
        />
        <div className="app-container animated fadeIn">
          <div>
            <Search
              getValue={(v) => this.setState({ search: v })}
              triggerShowFilter={() =>
                this.setState({ filterclicked: !this.state.filterclicked })
              }
              searchData={() => this.search()}
              placeholder="Enter an Order No"
              additionalComponent={this.state.resetDropdownProcessed ? null : this.showDropdowns()}
              resetDropdown={() => this.resetDropdown()} />
          </div>
          <div className="dropdowns">
          <div style={{ display: "flex", width: "100%" }}>
            {this.state.filterclicked ? null : null }
          </div>
        </div>


         <div className={"" + (this.state.complete ? "fades" : "hidden")}>
            <ListOrderComponent
              column={this.state.column}
              openEditModal={() => this.openEditModal()}
              ref={this.potableref}
              loadCompleteHandler={(v) => this.setState({ complete: v })}
            />
          </div>
          <div className={this.state.complete ? "hidden" : "spinner"} />
          {this.state.loaded ? (
            <SalesOrderCreate
              getResources={(client) => this.getResources(client)}
              loadSalesOrder={() => this.potableref.current.loadSalesOrder()}
              clientdata={this.state.clientdata}
              productdata={this.state.productdata}
              getClientProduct={(client) => this.getProduct(client)}
              dispositiondata={this.state.dispositiondata}
              resources={this.state.resources}
              showmodal={this.state.showmodal}
              closemodal={() => this.closeModal()}
            />
          ) : null}
          <EditColumn
            editColumnHandler={(idx, active) => this.editColumnHandler(idx, active)}
            showEditColumn={this.state.showEditColumn}
            closeModal={() => this.setState({ showEditColumn: false })}
            column={this.state.updatedColumn}
            saveColumnHandler={() => this.saveColumnHandler()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SalesOrder;
