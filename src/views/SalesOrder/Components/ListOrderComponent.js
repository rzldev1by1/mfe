import React, { Component } from "react";
import axios from "axios";
import { endpoint, headers } from "../../../AppComponent/ConfigEndpoint";
import Paging from "../../../AppComponent/Paging";
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

    this.state = {
      data: [],
      tableheader: [
        "Site",
        "Client",
        "Order No",
        "Order Type",
        "Customer",
        " Status",
        "Delivery Date",
        "Date Received",
        "Date Released",
        "Date Completed"
      ],
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

  load = () => {
    this.props.loadCompleteHandler(true);
  };

  componentDidMount() {
    this.loadSalesOrder();
  }

  searchSalesOrder = (search, site, client) => {
    this.setState({
      currentPage: 1,
      startIndex: 0,
      lastIndex: 0,
      totalRows: 0,
      maxPage: 0
    });

    let param = search;
    let url = "?searchParam=" + param;

    if (client) {
      url = "?searchParam=" + param + "&&client=" + client;
    }

    if (site && !client) {
      url = "?searchParam=" + param + "&&site=" + site;
    }

    if (client && site) {
      url = "?client=" + client + "&&site=" + site;
    }
    if (param && client && site) {
      param = param.toUpperCase();
      url = "?searchParam=" + param + "&&client=" + client + "&&site=" + site;
    }

    this.props.loadCompleteHandler(false);
    axios
      .get(endpoint.salesOrder + url, {
        headers: headers
      })
      .then((res) => {
        const result = res.data.data;
        this.setState({ data: result });
        this.load();
        this.setPagination(result);
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

  loadSalesOrder = () => {
    this.setState({
      currentPage: 1,
      startIndex: 0,
      lastIndex: 0,
      totalRows: 0,
      maxPage: 0
    });
    axios
      .get(endpoint.salesOrder, {
        headers: headers
      })
      .then((res) => {
        const result = res.data.data;
        this.setState({ data: result });
        this.load();
        this.setPagination(result);
      })
      .catch((error) => {
        
      });
  };

  sortby = (id) => {
    if (id == "Site") {
      this.setState({ sort: !this.state.sort, sortparameter: "site" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Client") {
      this.setState({ sort: !this.state.sort, sortparameter: "client" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Order No") {
      this.setState({ sort: !this.state.sort, sortparameter: "order_no" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Ship to Name") {
      this.setState({ sort: !this.state.sort, sortparameter: "ship_to_name" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Customer Name") {
      this.setState({ sort: !this.state.sort, sortparameter: "customer_name" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Status") {
      this.setState({ sort: !this.state.sort, sortparameter: "status" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Date Received") {
      this.setState({ sort: !this.state.sort, sortparameter: "date_due" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Date Rece") {
      this.setState({ sort: !this.state.sort, sortparameter: "date_recd" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Date Released") {
      this.setState({ sort: !this.state.sort, sortparameter: "date_released" });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    } else if (id == "Supplier Name") {
      this.setState({
        sort: !this.state.sort,
        sortparameter: "date_completed"
      });
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort);
    }
  };

  sorting = (data, param, sort) => {
    data.sort((a, b) => {
      if (a[param] !== null && b[param] !== null) {
        if (sort == true) {
          if (a[param].toLowerCase() < b[param].toLowerCase()) return -1;
          if (a[param].toLowerCase() > b[param].toLowerCase()) return 1;
          return 0;
        } else if (sort == false) {
          if (a[param].toLowerCase() < b[param].toLowerCase()) return 1;
          if (a[param].toLowerCase() > b[param].toLowerCase()) return -1;
          return 0;
        }
      }
    });
    this.setState({ data: data });
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
    let activearrow = this.state;
    if (this.state.activearrow == mid) {
      this.setState({ activearrow: up });
      this.sortby(id);
    }

    if (this.state.activearrow == up) {
      this.setState({ activearrow: down });
      this.sortby(id);
    }

    if (this.state.activearrow == down) {
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
    let headers = this.state.tableheader;
    return headers;
  };

  ExportData = () => {
    let data = this.state.data.map((elt) => [
      elt.site,
      elt.client,
      elt.order_no,
      elt.order_type,
      elt.customer_name,
      elt.status,
      elt.delivery_date,
      elt.date_received,
      elt.date_released,
      elt.date_completed
    ]);
    return data;
  };

  render() {
    return (
      <div>
        <div className="tablePages tablecontent">
          <table className="Sotable">
            <thead>
              <tr style={{ borderBottom: "3px solid #f0f0f0 !important" }}>
                {this.state.tableheader.map((header) => (
                  <th
                    key={header}
                    onClick={(e) => this.arrowHandler(e)}
                    id={header}
                  >
                    {header}
                    <img
                      key={header}
                      className="arrow"
                      style={{ marginLeft: "0.3em", width: "0.6em" }}
                      src={this.state.activearrow}
                    />
                  </th>
                ))}
                <th>
                  <div
                    onClick={() => this.props.openEditModal()}
                    className="iconU-edit icon-u-edit-blue"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data ? (
                this.state.data
                  .slice(this.state.startIndex, this.state.lastIndex)
                  .map((data, i) => (
                    <tr
                      onClick={() =>
                        window.location.replace(
                          window.location.origin +
                          "/#/sales-orders/" +
                          data.client +
                          "/" +
                          data.order_no
                        )
                      }
                      className="tr"
                    >
                      <td>{data.site}</td>
                      <td>{data.client}</td>
                      <td>{data.order_no}</td>
                      <td>{data.order_type}</td>
                      <td>
                        {data.customer ? data.customer_code + " ( " + data.customer + " )" : '-'}
                      </td>
                      <td style={{ width: "11%" }}>{data.status}</td>
                      <td>
                        {"" +
                          (data.delivery_date
                            ? moment(data.delivery_date).format("DD/MM/YYYY")
                            : "")}
                      </td>
                      <td>
                        {"" +
                          (data.date_received
                            ? moment(data.date_received).format("DD/MM/YYYY")
                            : "")}
                      </td>
                      <td>
                        {"" +
                          (data.date_released
                            ? moment(data.date_released).format("DD/MM/YYYY")
                            : "")}
                      </td>
                      <td>
                        {"" +
                          (data.date_completed
                            ? moment(data.date_completed).format("DD/MM/YYYY")
                            : "")}
                      </td>
                      <td>{console.log(data)}</td>
                    </tr>
                  ))
              ) : (
                  <div> No data available </div>
                )}
            </tbody>
          </table>

          <table className="Sotable d-none" id="excel">
            <thead>
              <tr style={{ borderBottom: "3px solid #f0f0f0 !important" }}>
                {this.state.tableheader.map((header) => (
                  <th
                    key={header}
                    onClick={(e) => this.arrowHandler(e)}
                    id={header}
                  >
                    {header}
                    {/* <img key={header} className='arrow' style={{marginLeft:'0.3em' , width:'0.6em'}} src={this.state.activearrow}/> */}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data ? (
                this.state.data
                  .slice(this.state.startIndex, this.state.lastIndex)
                  .map((data, i) => (
                    <tr
                      onClick={() =>
                        window.location.replace(
                          window.location.origin +
                          "/#/sales-orders/" +
                          data.order_no
                        )
                      }
                      className="tr"
                    >
                      <td>{data.site}</td>
                      <td>{data.client}</td>
                      <td>{data.order_no}</td>
                      <td>{data.order_type}</td>
                      <td>{data.customer + " (" + data.customer_name + ")"}</td>
                      <td style={{ width: "11%" }}>{data.status_desc}</td>
                      <td>
                        {"" +
                          (data.date_due
                            ? moment(data.date_due).format("DD/MM/YYYY")
                            : "")}
                      </td>
                      <td>
                        {"" +
                          (data.date_recd
                            ? moment(data.date_recd).format("DD/MM/YYYY")
                            : "")}
                      </td>
                      <td>
                        {"" +
                          (data.date_released
                            ? moment(data.date_released).format("DD/MM/YYYY")
                            : "")}
                      </td>
                      <td>
                        {"" +
                          (data.date_completed
                            ? moment(data.date_completed).format("DD/MM/YYYY")
                            : "")}
                      </td>
                      <td>{console.log(data)}</td>
                    </tr>
                  ))
              ) : (
                  <div> No data available </div>
                )}
            </tbody>
          </table>
        </div>
        <div className="paginations">
          <Paging
            firstPageClick={this.firstPageClick}
            lastPageClick={this.lastPageClick}
            backPageClick={this.backPageClick}
            nextPageClick={this.nextPageClick}
            totalRows={this.state.totalRows}
            displayPage={this.state.displayPage}
            currentPage={this.state.currentPage}
            maxPage={this.state.maxPage}
            startIndex={this.state.startIndex}
            lastIndex={this.state.lastIndex}
            isActive={this.state.isActive}
            numberEventClick={this.numberEventClick}
          />

          <Export
            ExportName={this.ExportName}
            ExportPDFName={this.ExportPDFName}
            ExportHeader={this.ExportHeader}
            ExportData={this.ExportData}
          />
        </div>
      </div>
    );
  }
}
export default ListOrderComponent;
