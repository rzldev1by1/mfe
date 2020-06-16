import React, { Component } from "react";
import axios from "axios";
import { endpoint, headers } from "../../../AppComponent/ConfigEndpoint";
import Paging from "../../../AppComponent/PagingNew";
import Export from "../../../AppComponent/Export";
import mid from "../../../assets/img/brand/field-idle.png";
import down from "../../../assets/img/brand/field-bot.png";
import up from "../../../assets/img/brand/field-top.png";
import "../SalesOrder.css";
import moment from "moment";
import Authentication from "../../../Auth/Authentication";

class ListOrderComponent extends Component {
  constructor(props) {
    super(props);

    this.dropdownref = React.createRef();
    this._checkActiveSorting = this._checkActiveSorting.bind(this);

    this.state = {
      data: [],
      main:[],
      tableheader: [
        "Site",
        "Client",
        "Order No",
        "Order Type",
        "Customer",
        "Status",
        "Delivery Date",
        "Date Received",
        "Date Released",
        "Date Completed"
      ],
      activecolumnsort: null,
      activearrow: mid,
      sortparameter: "order_no",
      // sort :true,

      currentPage: 1,
      startIndex: 0,
      lastIndex: 0,
      displayPage: 50,
      totalRows: 0,
      maxPage: 0,
      client: null
    };
  }

  _checkActiveSorting(header) {
    if (header === this.state.activecolumnsort) {
      if (this.state.activearrow === mid) {
        return up;
      }

      if (this.state.activearrow === up) {
        return down;
      }

      if (this.state.activearrow === down) {
        return up;
      }
    } else {
      return mid;
    }
  }

  load = () => {
    this.props.loadCompleteHandler(true);
  };

  componentDidMount() {
    this.loadSalesOrder();
  }

  searchSalesOrder = (search, site, client, status, ordertype,task) => {
    this.setState({
      currentPage: 1,
      startIndex: 0,
      lastIndex: 0,
      totalRows: 0,
      maxPage: 0
    });

    let url = "?searchParam=" + search;

    let clientP = "&&client=" + client
    let siteP = "&&site=" + site
    let statusP = "&&status=" + status
    let ordertypeP = "&&orderType=" + ordertype
    let taskP = "&&task=" + task

    if (site) url = url + siteP
    if (client) url = url + clientP
    if (status) url = url + statusP
    if (ordertype) url = url + ordertypeP
    if(task) url = url + taskP

    this.props.loadCompleteHandler(false);
    axios
      .get(endpoint.salesOrder + url, {
        headers: headers
      })
      .then((res) => {
        const result = res.data.data;
        this.setState({ main: result });
        this.load();
        // this.setPagination(result);
      })
      .catch((error) => {

      });
  };

  setPagination = (result) => {
    let self = this;
    let respondRes = result;
    let totalPage = 0;

    if (respondRes.length > self.state.displayPage) {
      totalPage = respondRes % self.state.displayPage;
      if (totalPage > 0 && totalPage < 50) {
        totalPage = parseInt(respondRes.length / self.state.displayPage) + 1;
      } else {
        totalPage = respondRes.length / self.state.displayPage;
      }
      self.setState({ maxPage: totalPage });
    } else {
      self.setState({ maxPage: 1 });
    }

    self.setState({
      displayContent: "FOUND",
      masterResStockHolding: respondRes,
      totalRows: respondRes.length
    });

    self.numberEventClick(self.state.currentPage);
  };

  loadSalesOrder = (page) => {
    const site = Authentication.getSite()
    const client = Authentication.getClient()
    let param = '?'


    if (client) param = param + 'client=' + client
    if (site) param = param + '&&site=' + site
    if(page) param = param + '&&page=' +page

    this.setState({
      currentPage: 1,
      startIndex: 0,
      lastIndex: 0,
      totalRows: 0,
      maxPage: 0
    });
    axios
      .get(endpoint.salesOrder + param, {
        headers: headers
      })
      .then((res) => {
        const result = res.data.data.data;
        this.setState({ data: result, main:res.data.data }, () =>console.log(this.state.main));
        this.load();
        // this.setPagination(result);
      })
      .catch((error) => {

      });
  };

  sortby = (id) => {
    if (id === "site") {
      this.setState({ sort: !this.state.sort, sortparameter: "site" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "client") {
      this.setState({ sort: !this.state.sort, sortparameter: "client" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "orderNo") {
      this.setState({ sort: !this.state.sort, sortparameter: "orderno" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "orderType") {
      this.setState({ sort: !this.state.sort, sortparameter: "ordertype" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    }else if (id === "isisTask") {
      this.setState({ sort: !this.state.sort, sortparameter: "isisTask" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "customerName") {
      this.setState({ sort: !this.state.sort, sortparameter: "customername" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "status") {
      this.setState({ sort: !this.state.sort, sortparameter: "status" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "deliveryDate") {
      this.setState({ sort: !this.state.sort, sortparameter: "deliverydate" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "dateReceived") {
      this.setState({ sort: !this.state.sort, sortparameter: "datereceived" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "dateReleased") {
      this.setState({ sort: !this.state.sort, sortparameter: "datereleased" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "dateCompleted") {
      this.setState({ sort: !this.state.sort, sortparameter: "datecompleted" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "customerPoNo") {
      this.setState({ sort: !this.state.sort, sortparameter: "customerpono" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "vendorOrderNo") {
      this.setState({ sort: !this.state.sort, sortparameter: "vendororderno" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "address1") {
      this.setState({ sort: !this.state.sort, sortparameter: "address1" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "address2") {
      this.setState({ sort: !this.state.sort, sortparameter: "address2" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "address3") {
      this.setState({ sort: !this.state.sort, sortparameter: "address3" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "address4") {
      this.setState({ sort: !this.state.sort, sortparameter: "address4" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "address5") {
      this.setState({ sort: !this.state.sort, sortparameter: "address5" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "suburb") {
      this.setState({ sort: !this.state.sort, sortparameter: "city" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "postcode") {
      this.setState({ sort: !this.state.sort, sortparameter: "postcode" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "state") {
      this.setState({ sort: !this.state.sort, sortparameter: "state" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "country") {
      this.setState({ sort: !this.state.sort, sortparameter: "country" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "loadNumber") {
      this.setState({ sort: !this.state.sort, sortparameter: "loadnumber" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "loadoutStart") {
      this.setState({ sort: !this.state.sort, sortparameter: "loadoutstart" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "loadoutFinish") {
      this.setState({ sort: !this.state.sort, sortparameter: "loadoutfinish" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "consigmentNo") {
      this.setState({ sort: !this.state.sort, sortparameter: "consigmentno" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "freightCharge") {
      this.setState({ sort: !this.state.sort, sortparameter: "freightcharge" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id === "customer") {
      this.setState({ sort: !this.state.sort, sortparameter: "customer" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    }
  };

  sorting = (data, param, sort) => {
    let datas = [...data]
    datas.sort((a, b) => {
      if (a[param] !== null && b[param] !== null) {
        if (sort === true) {
          if (a[param] < b[param]) return -1;
          if (a[param] > b[param]) return 1;
          return 0;
        } else if (sort === false) {
          if (a[param] < b[param]) return 1;
          if (a[param] > b[param]) return -1;
          return 0;
        }
      }
    });
    this.setState({ data: datas });
  };
  changeStartIndex = (currentPage) => {
    this.setState({
      startIndex:
        parseInt(currentPage) * this.state.displayPage - this.state.displayPage
    });
  };

  changeLastIndex = (currentPage) => {
    this.setState({
      lastIndex: parseInt(currentPage) * this.state.displayPage
    });
  };

  numberEventClick = (currentPage) => {
    let page = parseInt(currentPage);
    this.setState({ currentPage: page });
    this.changeStartIndex(page);
    this.changeLastIndex(page);
  };

  nextPageClick = () => {
    if (this.state.currentPage < this.state.maxPage) {
      this.setState((prev) => {
        prev.currentPage++;
        this.changeStartIndex(prev.currentPage);
        this.changeLastIndex(prev.currentPage);
      });
    }
    return;
  };

  backPageClick = () => {
    if (this.state.currentPage > 1) {
      this.setState((prev) => {
        prev.currentPage--;
        this.changeStartIndex(prev.currentPage);
        this.changeLastIndex(prev.currentPage);
      });
    }
    return;
  };

  lastPageClick = () => {
    if (this.state.currentPage < this.state.maxPage) {
      let currentPage = parseInt(this.state.maxPage + 1);

      this.setState({ currentPage: currentPage });
      this.changeStartIndex(currentPage);
      this.changeLastIndex(currentPage);
    }
    return;
  };

  firstPageClick = () => {
    if (this.state.currentPage > 1) {
      let currentPage = 1;

      this.setState({ currentPage: currentPage });
      this.changeStartIndex(currentPage);
      this.changeLastIndex(currentPage);
    }
    return;
  };
  arrowHandler = (e) => {
    let id = e.currentTarget.id;
    this.setState({ activecolumnsort: id });

    let activearrow = this.state;
    if (this.state.activearrow === mid) {
      this.setState({ activearrow: up });
      this.sortby(id);
    }

    if (this.state.activearrow === up) {
      this.setState({ activearrow: down });
      this.sortby(id);
    }

    if (this.state.activearrow === down) {
      this.setState({ activearrow: up });
      this.sortby(id);
    }
  };

  ExportName = () => {
    let filename = "";
    let strip = "-";
    let arrmonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let date = new Date();
    let date1 = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      Seconds = date.getSeconds(),
      Minutes = date.getMinutes(),
      Hours = date.getHours();
    return (filename =
      "Microlistics_SalesOrder." +
      date1 +
      "-" +
      arrmonth[month] +
      "-" +
      year +
      "." +
      Hours +
      "-" +
      Minutes +
      "-" +
      Seconds);
  };

  ExportPDFName = () => {
    let name = "";
    return (name = "Sales Order");
  };

  ExportHeader = () => {
    let headers = ["Site", "Client", "Order No", "Order Type", "Customer", "Status", "Delivery Date",
      "Date Received", "Date Released", "Date Completed", "Customer Po No", "Vendor Order No",
      "Address 1", "Address 2", "Address 3", "Address 4", "Address 5", "Suburb", "Post Code",
      "State", "Country"];
    return headers;
  };

  ExportData = () => {
    let data = this.state.data.map((elt) => [
      elt.site,
      elt.client,
      elt.orderno,
      elt.ordertype,
      elt.customername,
      elt.status,
      elt.deliverydate,
      elt.datereceived,
      elt.datereleased,
      elt.datecompleted,
      elt.customerpono,
      elt.vendororderno,
      elt.address1,
      elt.address2,
      elt.address3,
      elt.address4,
      elt.address5,
      elt.city,
      elt.postcode,
      elt.state,
      elt.country,
    ]);
    return data;
  };

  ExportFont = () => {
    let Font = "6";
    return Font;
  };

  modifiedCustomerData = (code, name) => {
    if (code && name) return code + ' ( ' + name + ' )'
    if (!code && name) return name
    if (!code && !name) return '-'
    if (code && !name) return code
  }

  filterDataHandler = (key, value, idx) => {
    let newValue = value
    switch (key) {
      case 'deliverydate':
        if (newValue !== null) newValue = moment(newValue).format("DD/MM/YYYY")
        break
      case 'datereceived':
        if (newValue !== null) newValue = moment(newValue).format("DD/MM/YYYY")
        break
      case 'datereleased':
        if (newValue !== null) newValue = moment(newValue).format("DD/MM/YYYY")
        break
      case 'datecompleted':
        if (newValue !== null) newValue = moment(newValue).format("DD/MM/YYYY")
        break
      case 'customername':
        let cust = [...this.state.data]
        let code = cust[idx].customer
        let name = cust[idx].customername
        newValue = this.modifiedCustomerData(code, name)



    }
    return newValue
  }
  
  //table used
  render() {
    const {data, main} = this.state
    return (
      <React.Fragment>
        <div className='tablePage tablecontent'>
          <table className="defaultTable so-table">
            <thead>
              <tr style={{ borderBottom: "3px solid #f0f0f0 !important" }}>
                {this.props.column.map((header, idx) =>
                  <th key={idx}
                    onClick={(e) => this.arrowHandler(e)}
                    id={header.id}
                    className={header.active ? '' : 'hidden'}>
                    <div>
                      <span>{header.name}</span>
                      <img key={idx}
                        className='sort-icon'
                        src={this._checkActiveSorting(header.id)}
                        alt={idx}
                      />
                    </div>

                  </th>
                )}
                <th>
                  <div onClick={() => this.props.openEditModal()}
                    className="iconU-edit icon-u-edit-blue"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {
                main.data ? main.data.map((data, i) => {
                  const dataa = Object.entries(data)
                  return (
                    <tr onClick={() => window.location.replace(window.location.origin + '/#/sales-orders/' + data.client + '/' + data.site + '/' + data.orderno)} className='tr'>
                      {dataa.map((data, idx) => <td className={'so-table-row ' + (this.props.column[idx].active ? '' : 'hidden')}>{this.filterDataHandler(data[0], data[1], i)}</td>)}
                      <td></td>
                    </tr>
                  )
                }) : <div> No data available </div>
              }
            </tbody>
          </table>

          <table className="defaultTable so-table d-none" id="excel">
            <thead>
              <tr style={{ borderBottom: "3px solid #f0f0f0 !important" }}>
                {this.props.column.map((header, idx) =>
                  <th key={idx}
                    onClick={(e) => this.arrowHandler(e)}
                    id={header.id}
                    className={header.active ? '' : 'hidden'}>
                    <div className='so-table-header'>
                      <span>{header.name}</span>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {/* {
                this.state.data ? this.state.data.map((data, i) => {
                  const dataa = Object.entries(data)
                  return (
                    <tr onClick={() => window.location.replace(window.location.origin + '/#/sales-orders/' + data.client + '/' + data.site + '/' + data.orderno)} className='tr'>
                      {dataa.map((data, idx) => <td className={'so-table-row ' + (this.props.column[idx].active ? '' : 'hidden')}>{this.filterDataHandler(data[0], data[1], i)}</td>)}
                      <td></td>
                    </tr>
                  )
                }) : <div> No data available </div>
              } */}
            </tbody>
          </table>

        </div>

        <div className='fixed-bottom paginations m-0'>
          <Paging firstPageClick={this.firstPageClick} lastPageClick={this.lastPageClick}
            backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
            totalRows={this.state.totalRows} displayPage={this.state.displayPage}
            currentPage={this.state.currentPage} maxPage={this.state.maxPage}
            startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
            isActive={this.state.isActive}
            numberEventClick={this.numberEventClick}
            
            //new props
            totalRows = {main.total}
            from = {main.from}
            to = {main.to}
            firstPage = {1}
            lastPage = {main.last_page}
            currentPage = {main.current_page}
            nextPage = {(page) => this.loadSalesOrder(page)}
            prevPage = {(page) => this.loadSalesOrder(page)}
            toFirstPage = {(page) => this.loadSalesOrder(page)}
            toLastPage = {(page) => this.loadSalesOrder(page)}
            toClickedPage = {(page) => this.loadSalesOrder(page)}
            toSpecificPage = {(page) => this.loadSalesOrder(page)}

            />
          <Export ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
            ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={this.ExportFont} />
        </div>
      </React.Fragment>
    )
  }
}
export default ListOrderComponent;
