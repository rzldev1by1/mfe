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

      siteSelected: null,
      clientSelected: null,

      clientdata: [],
      sitedata: [],
      productdata: [],
      dispositiondata: [],

      //modal
      showmodal: false,
      complete: false,

      //filter
      filterclicked: true,

      //resources
      resources: [],

      loaded: false,

      showEditColumn: false
    };
  }

  componentDidMount = () => {
    this.getclient();
    this.getsite();
    this.getResources();
    this.getProduct();
    this.getDisposition();
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
      self.state.clientSelected
    );
  };

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

  getResources = (clientParam) => {
    let company = Authentication.getCompanyCode();
    let client = Authentication.getClient();

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
    this.setState({ siteSelected: value });
  };

  getClientSelected = (value) => {
    this.setState({ clientSelected: value });
  };

  openEditModal = () => {
    this.setState({ showEditColumn: true });
  };

  showDropdowns = () => {
    let clientName = [];
    let clientValue = [];
    let siteData = [];
    let siteName = [];
    let orderType = [];
    let status = [];
    if (this.state.clientdata) {
      this.state.clientdata.map((data) => {
        clientName.push(data.name);
        clientValue.push(data.code);
      });
    }
    if (this.state.sitedata) {
      this.state.sitedata.map((data) => {
        siteName.push(data.site + ' : ' + data.name)
        siteData.push(data.site);
      });
    }

    if(this.state.resources)
    {
      let resource = {...this.state.resource}
      orderType = resource.orderType
      console.log(this.state.resources)
    }
    return (
      <React.Fragment>
        <div className='so-dropdown-wrapper'>
          <div>
            <Dropdown
              placeHolder="Site"
              style={{ width: "142px" }}
              optionList={siteName.toString()}
              optionValue={siteData.toString()}
              getValue={this.getSiteSelected.bind(this)}
            />
          </div>
          <div>
            <Dropdown
              placeHolder="Client"
              style={{ width: "142px" }}
              optionList={clientValue.toString()}
              optionValue={clientValue.toString()}
              getValue={this.getClientSelected.bind(this)}
            />
          </div>
{/* 
          <Dropdown placeHolder="Status" 
                    style={{marginRight: "1em"}} 
                    optionList={status.toString()} 
                    optionValue={statusValue.toString()} 
                    getValue={this.getStatusSelected.bind(this)}/> */}
          {/* <Dropdown placeHolder="Order Type" 
                    style={{width: "180px"}} 
                    optionList={orderType.name.toString()} 
                    optionValue={orderType.code.toString()} 
                    getValue={this.getOrderTypeSelected.bind(this)}/> */}
        </div>


        {/* <Dropdown placeHolder="Order No" style={{height:"1em"}} optionList="hard,code" optionValue="hard,code" getValue={(v)=> console.log(v)}/> */}
      </React.Fragment>
    );
  };

  render() {
    return (
      <div style={{ marginLeft: "-9px", width: "101.5%" }}>
        <div className="header">
          <h2 style={{ marginTop: "0.2%" }}>Sales Orders</h2>
          <div className="header2">
            <Button
              onClick={() => (this.state.loaded ? this.openModal() : null)}
              color="primary"
              className="createpo default-box-height"
            >
              <img
                src={create}
                style={{ width: "7%", marginTop: 9, marginLeft: 15 }}
              />
              <label className="font">Create Sales Orders</label>
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <Search
            style={{ marginTop: "none" }}
            getValue={(v) => this.setState({ search: v })}
            showFilter={this.state.filterclicked}
            triggerShowFilter={() =>
              this.setState({ filterclicked: !this.state.filterclicked })
            }
            searchData={() => this.search()}
            placeholder="Enter a Order No"
          />
        </div>

        <div className="dropdowns">
          <div style={{ display: "flex", width: "100%" }}>
            {this.state.filterclicked ? this.showDropdowns() : null}
          </div>
        </div>

        <div className={"" + (this.state.complete ? "fades" : "hidden")}>
          <ListOrderComponent
            openEditModal={() => this.openEditModal()}
            ref={this.potableref}
            className="animated fadeIn"
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
          showEditColumn={this.state.showEditColumn}
          closeModal={() => this.setState({ showEditColumn: false })}
        />
      </div>
    );
  }
}

export default SalesOrder;
