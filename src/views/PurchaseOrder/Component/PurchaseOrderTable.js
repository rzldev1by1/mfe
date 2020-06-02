import React, { Component } from 'react'
import axios from 'axios'
import appCompoent from '../../../../src/AppComponent'
import mid from '../../../assets/img/brand/field-idle.png'
import down from '../../../assets/img/brand/field-bot.png'
import up from '../../../assets/img/brand/field-top.png'
import Paging from '../../../AppComponent/Paging';
import { endpoint, headers } from '../../../AppComponent/ConfigEndpoint'
import moment from 'moment'
import Export from '../../../AppComponent/Export'
class PurchaseOrderTable extends Component {
  constructor(props) {
    super(props)

    this.dropdownref = React.createRef()
    this._checkActiveSorting = this._checkActiveSorting.bind(this);

    this.state = {
      data: [],
      tableheader: [
        {
          id: "site",
          checkboxLabelText: "Site",
          tableHeaderText: "Site",
          isVisible: true,
          key: "site",
          type: "string",
          sort: mid
        },
        {
          id: "client",
          checkboxLabelText: "Client",
          tableHeaderText: "Client",
          isVisible: true,
          key: "client",
          type: "string",
          sort: mid
        },
        {
          id: "order_no",
          checkboxLabelText: "Order No",
          tableHeaderText: "Order No",
          isVisible: true,
          key: "order_no",
          type: "string",
          sort: mid
        },
        {
          id: "status",
          checkboxLabelText: "Status",
          tableHeaderText: "Status",
          isVisible: true,
          key: "status",
          type: "string",
          sort: mid
        },
        {
          id: "order_type",
          checkboxLabelText: "Order Type",
          tableHeaderText: "Order Type",
          isVisible: true,
          key: "order_type",
          type: "string",
          sort: mid
        },
        {
          id: "supplier_no",
          checkboxLabelText: "Supplier No",
          tableHeaderText: "Supplier No",
          isVisible: true,
          key: "company",
          type: "string",
          sort: mid
        },
        {
          id: "supplier_name",
          checkboxLabelText: "Supplier Name",
          tableHeaderText: "Supplier Name",
          isVisible: true,
          key: "supplier_name",
          type: "string",
          sort: mid
        },
        {
          id: "delivery_date",
          checkboxLabelText: "Date Due",
          tableHeaderText: "Date Due",
          isVisible: true,
          key: "delivery_date",
          type: "string",
          sort: mid
        },
        {
          id: "date_received",
          checkboxLabelText: "Date Received",
          tableHeaderText: "Date Received",
          isVisible: true,
          key: "date_received",
          type: "string",
          sort: mid
        },
        {
          id: "date_released",
          checkboxLabelText: "Date Released",
          tableHeaderText: "Date Released",
          isVisible: true,
          key: "date_released",
          type: "string",
          sort: mid
        },
        {
          id: "date_completed",
          checkboxLabelText: "Date Completed",
          tableHeaderText: "Date Completed",
          isVisible: true,
          key: "date_completed",
          type: "string",
          sort: mid
        },
        {
          id: "customer_order_ref",
          checkboxLabelText: "Customer Order Ref",
          tableHeaderText: "Customer Order Ref",
          isVisible: false,
          key: "customer_order_ref",
          type: "string",
          sort: mid
        },
        {
          id: "vendor_ord_ref",
          checkboxLabelText: "Vendor Order Ref",
          tableHeaderText: "Vendor Order Ref",
          isVisible: false,
          key: "vendor_ord_ref",
          type: "string",
          sort: mid
        },

      ],
      activearrow: mid,
      activecolumnsort: null,
      sortparameter: null,
      sort: true,

      //pagination
      currentPage: 1,
      startIndex: 0,
      lastIndex: 0,
      displayPage: 50,
      totalRows: 0,
      maxPage: 0,
    }
  }

  _checkActiveSorting(header) {
    if (header == this.state.activecolumnsort) {
      if (this.state.activearrow == mid) {
        return up;
      }

      if (this.state.activearrow == up) {
        return down;
      }

      if (this.state.activearrow == down) {
        return up;
      }
    } else {
      return mid;
    }
  }

  componentDidMount() {
    this.loadPurchaseOrder()
    this.props.getTableHeader(this.state.tableheader)
  }


  tableheader() {
    return this.state.tableheader;
  }

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
  }

  loadPurchaseOrder = () => {
    this.setState({
      currentPage: 1,
      startIndex: 0, lastIndex: 0,
      totalRows: 0, maxPage: 0
    })

    axios.get(endpoint.purchaseOrder, {
      headers: headers
    })
      .then(res => {
        const result = res.data.data
        this.setState({ data: result })
        this.load()
        this.setPagination(result);
      })
      .catch(error => {

      })
  }

  load = () => {
    this.props.loadCompleteHandler(true)
  }

  searchPurchaseOrder = (search, client, site, status, ordertype) => {

    this.setState({
      currentPage: 1,
      startIndex: 0, lastIndex: 0,
      totalRows: 0, maxPage: 0
    })

    let param = search
    let url = '?searchParam=' + param
    if (param) {
      param = param.toUpperCase()
    }


    if (client) {
      url += '&client=' + client
    }

    if (site) {
      url += '&site=' + site
    }

    if (status) {
      url += '&status=' + status
    }

    if (ordertype) {
      url += '&orderType=' + ordertype
    }

    this.props.loadCompleteHandler(false)
    axios.get(endpoint.purchaseOrder + url, {
      headers: headers
    })
      .then(res => {
        const result = res.data.data
        this.setState({ data: result })
        this.load()
        this.setPagination(result)
      })
      .catch(error => {

      })
  }

  arrowHandler = (e) => {
    let id = e.currentTarget.id;
    this.setState({ activecolumnsort: id });
    if (this.state.activearrow == mid) {
      this.setState({ activearrow: up })
      this.sortby(id)
    }

    if (this.state.activearrow == up) {
      this.setState({ activearrow: down })
      this.sortby(id)
    }

    if (this.state.activearrow == down) {
      this.setState({ activearrow: up })
      this.sortby(id)
    }
  }

  sortby = (id) => {
    console.log(id);
    this.setState({ sort: !this.state.sort, sortparameter: id }, () => {
      //async 
      this.sorting(this.state.data, this.state.sortparameter, this.state.sort)
    });
  }

  sorting = (data, param, sort) => {
    console.log(param, sort);
    data.sort((a, b) => {

      if (a[param] !== undefined && b[param] !== undefined) {
        if (a[param] == null) {
          a[param] = '';
        }

        if (b[param] == null) {
          b[param] = '';
        }

        if (sort == true) {
          if (a[param].toLowerCase() < b[param].toLowerCase()) return -1
          if (a[param].toLowerCase() > b[param].toLowerCase()) return 1
          return 0
        } else if (sort == false) {
          if (a[param] !== undefined && b[param] !== undefined) {
            if (a[param].toLowerCase() < b[param].toLowerCase()) return 1
            if (a[param].toLowerCase() > b[param].toLowerCase()) return -1
            return 0
          }
        }
      }
    })
    this.setState({ data: data })
  }

  ExportName = () => {
    let filename = ""
    let arrmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let date1 = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      Seconds = date.getSeconds(),
      Minutes = date.getMinutes(),
      Hours = date.getHours();
    return filename = ("Microlistics_PurchaseOrder." + date1 + "-" + arrmonth[month] + "-" + year + "." + Hours + "-" + Minutes + "-" + Seconds)
  }

  ExportHeader = () => {
    let headers = ["Site", "Client", "Order No", "Order Type", "Customer", " Status", "Delivery Date", "Date Received", "Date Released", "Date Completed"]
    return headers
  }
  ExportFont = () => {
    let Font = "10";
    return Font;
  };

  ExportData = () => {
    let data = this.state.data.map(elt => [elt.site, elt.client,
    elt.order_no, elt.status,
    elt.supplier_no, elt.supplier_name,
    elt.date_due, elt.date_received,
    elt.date_released, elt.date_completed]);
    return data
  }

  ExportPDFName = () => {
    let name = ""
    return name = ("Purchase Order")
  }

  changeStartIndex = (currentPage) => {
    this.setState({ startIndex: (parseInt(currentPage) * this.state.displayPage) - this.state.displayPage });
  }

  changeLastIndex = (currentPage) => {
    this.setState({ lastIndex: parseInt(currentPage) * this.state.displayPage });
  }

  numberEventClick = (currentPage) => {
    let page = parseInt(currentPage);
    this.setState({ currentPage: page });
    this.changeStartIndex(page);
    this.changeLastIndex(page);
  }

  nextPageClick = () => {
    if (this.state.currentPage < this.state.maxPage) {
      this.setState((prev) => {
        prev.currentPage++;
        this.changeStartIndex(prev.currentPage);
        this.changeLastIndex(prev.currentPage);
      });
    }
    return;
  }

  backPageClick = () => {
    if (this.state.currentPage > 1) {
      this.setState((prev) => {
        prev.currentPage--;
        this.changeStartIndex(prev.currentPage);
        this.changeLastIndex(prev.currentPage);
      });
    }
    return;
  }

  lastPageClick = () => {
    if (this.state.currentPage < this.state.maxPage) {
      let currentPage = parseInt(this.state.maxPage + 1);

      this.setState({ currentPage: currentPage });
      this.changeStartIndex(currentPage);
      this.changeLastIndex(currentPage);
    }
    return;
  }
  firstPageClick = () => {
    if (this.state.currentPage > 1) {
      let currentPage = 1;

      this.setState({ currentPage: currentPage });
      this.changeStartIndex(currentPage);
      this.changeLastIndex(currentPage);
    }
    return;
  }

  render() {
    return (
      <div>
        <div className='tablePage tablecontent'>
          <table className="defaultTable">
            <thead>
              <tr>
                {this.state.tableheader.map((header, idx) => {
                  if (header.isVisible) {
                    return (
                      <th key={idx} onClick={(e) => this.arrowHandler(e)} id={header.id}>{header.tableHeaderText}
                        <img key={idx} className='arrow' src={this._checkActiveSorting(header.id)} />
                      </th>
                    )
                  }

                }

                )}

                <th className='iconU-edit' onClick={this.props.showEditColumn}></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data ? this.state.data.slice(this.state.startIndex, this.state.lastIndex).map((data, i) =>
                <tr key={i} onClick={() => window.location.replace(window.location.origin + '/#/purchaseorder/'+data.client +'/'+data.order_no)} className='tr'>
                  {this.state.tableheader.map((column, columnIdx) => {
                    if (column.isVisible) {
                      if (column.key === "site") {
                        return (
                          <td style={{ textAlign: 'center', paddingLeft: '0px' }} key={columnIdx}>{data[column.key]}</td>
                        )
                      }
                      if (column.key.includes("date")) {
                        if (data[column.key]) {
                          return (
                            <td key={columnIdx}>{moment(data[column.key]).format("DD/MM/YYYY")}</td>
                          )
                        } else {
                          return (
                            <td key={columnIdx}>-</td>
                          )
                        }
                      }
                      if (column.key == "company") {
                        if (data[column.key]) {
                          return (
                            <td key={columnIdx}>{data[column.key]}</td>
                          )
                        } else {
                          return (
                            <td key={columnIdx}>{data["supplier_no"]}</td>
                          )
                        }
                      }

                      return (
                        <td key={columnIdx}>{data[column.key]}</td>
                      )
                    }

                  })}
                  <td></td>
                </tr>
              ) :
                <div> No data available </div>
              }
            </tbody>
          </table>

          <table className="defaultTable d-none" id="excel">
            <thead>
              <tr>
                {this.state.tableheader.map((header, idx) => {
                  if (header.isVisible) {
                    return (
                      <th key={idx} onClick={(e) => this.arrowHandler(e)} id={idx}>{header.id}
                        {/* <img key={header} className='arrow' src={this.state.activearrow}/> */}
                      </th>
                    )
                  }
                }
                )}

                <th className='iconU-edit'></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data ? this.state.data.map((data, i) =>
                <tr key={i} onClick={() => window.location.replace(window.location.origin + '/#/purchaseorder/' + data.order_no)} className='tr'>
                  {this.state.tableheader.map((column, columnIdx) => {
                    if (column.isVisible) {
                      if (column.key === "site") {
                        return (
                          <td style={{ textAlign: 'center', paddingLeft: '0px' }} key={columnIdx}>{data[column.key]}</td>
                        )
                      }
                      if (column.key.includes("date")) {
                        if (data[column.key]) {
                          return (
                            <td key={columnIdx}>{moment(data[column.key]).format("DD/MM/YYYY")}</td>
                          )
                        } else {
                          return (
                            <td key={columnIdx}>-</td>
                          )
                        }
                      }
                      if (column.key == "company") {
                        if (data[column.key]) {
                          return (
                            <td key={columnIdx}>{data[column.key]}</td>
                          )
                        } else {
                          return (
                            <td key={columnIdx}>{data["supplier_no"]}</td>
                          )
                        }
                      }
                      return (
                        <td key={columnIdx}>{data[column.key]}</td>
                      )
                    }

                  })}
                  <td></td>
                </tr>
              ) :
                <div> No data available </div>
              }
            </tbody>
          </table>
        </div>
        <div className='paginations fixed-bottom'>
          <Paging firstPageClick={this.firstPageClick} lastPageClick={this.lastPageClick}
            backPageClick={this.backPageClick} nextPageClick={this.nextPageClick}
            totalRows={this.state.totalRows} displayPage={this.state.displayPage}
            currentPage={this.state.currentPage} maxPage={this.state.maxPage}
            startIndex={this.state.startIndex} lastIndex={this.state.lastIndex}
            isActive={this.state.isActive}
            numberEventClick={this.numberEventClick} />
          <Export ExportName={this.ExportName} ExportPDFName={this.ExportPDFName}
            ExportHeader={this.ExportHeader} ExportData={this.ExportData} ExportFont={this.ExportFont} />
        </div>

      </div>
    );
  }
}

export default PurchaseOrderTable