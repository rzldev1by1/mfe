import React, { Component, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import axios from 'axios'
import { endpoint, headers, getUserSite } from '../../../AppComponent/ConfigEndpoint'
import oneinactive from '../../../assets/img/brand/tab_1_grey@2x.png'
import oneactive from '../../../assets/img/brand/tab_1_blue@2x.png'
import twoinactive from '../../../assets/img/brand/tab_2_grey@2x.png'
import twoactive from '../../../assets/img/brand/tab_2_blue@2x.png'
import date from '../../../assets/img/brand/field_date@2x.png'
import DayPicker from 'react-day-picker';
import './Style/PurchaseOrderCreate.css'
import '../../SalesOrder/SalesOrder.css'
import 'react-day-picker/lib/style.css';
import moment from 'moment'
import AutoComplete from '../../../AppComponent/AutoComplete'
import Dropdown from '../../../AppComponent/Dropdown'
import DatePicker from '../../../AppComponent/DatePicker'
import swal from 'sweetalert'
import { headerValidation, lineValidation } from '../Validation/validation'
import { orderNoValidation } from '../../SalesOrder/Components/Validation/orderNoValidation'
import Authentication from '../../../Auth/Authentication'

class PurchaseOrderCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab1isactive: true,
      tab2isactive: false,
      order: {
        site: null,
        orderno: null,
        supplier: null,
        orderref: null,
        client: null,
        orderdate: null,
        rotedate: null,
        ordertype: null,
        vendorref: null,
      },
      rowlist: [
        {
          lineNumber: 1,
          product: null,
          productDescription: null,
          qty: null,
          uom: null,
          rotadate: null,
          batch: null,
          ref3: null,
          ref4: null,
          disposition: null,
          weight: null,
          orderDate: null
        }
      ],
      rowlistidx: 1,

      data: [
        {
          "menu": "Client",
          "subMenu": ["asd", "asds"]
        }
      ],

      showdatepicker: false,
      showdaterote: false,

      //dropdown
      sitecrSelected: undefined,
      clientcrSelected: undefined,
      orderTypecrSelected: undefined,
      uomSelected: "UOM",

      clientExpand: false,
      orderTypeExpand: false,
      uomExpand: false,
      clientdatacr: [],
      orderdatacr: [],
      sitedatacr: [],
      supplierdatacr: [],
      dispositioncr: [],
      uomcr: [],
      productcr: [],
      productdesccr: [],

      // Create PO Form 
      site: Authentication.getSite() ? Authentication.getSite() : null,
      client: Authentication.getClient() ? Authentication.getClient() : null,
      supplier: null,
      customerRef: null,
      orderType: null,
      orderNo: null,
      orderDate: null,
      vendorRef: null,
      lineDetails: [],
      isSaveProgressing: false,
      createSuccess: false,

      emptySite: null,
      emptyClient: null,
      emptyOrderType: null,
      emptyOrderNo: null,
      emptyOrderDate: null,
      isOrderNoAvailable: true,

      nextClicked: false,
      reset: false
    }
  }

  componentWillReceiveProps = () => {
    this.setState({
      showModal: this.props.showmodal
    })
  }

  componentDidMount = () => {
    this.getclient();
    //   this.getsite();
    this.getsupplier();
    //   this.getordertype();
    this.getporesource();
    this.getdisposition();
    // this.getproductcode();
    // this.getproductname();
  }

  getporesource = () => {
    let self = this;
    axios.get(endpoint.getPOResources, {
      headers: headers
    })
      .then(res => {
        self.setState({
          sitedatacr: res.data.site,
          supplierdatacr: res.data.supplier,
          orderdatacr: res.data.orderType
        });
      })
  }

  close = () => {
    this.props.closemodal()
    this.setState({
      tab1isactive: true,
      tab2isactive: false,
      nextClicked: false
    });
    this.setState({
      tab1isactive: true,
      tab2isactive: false,
      site: undefined,
      client: undefined,
      supplier: undefined,
      customerRef: undefined,
      orderType: undefined,
      orderNo: [],
      orderDate: null,
      vendorRef: undefined,
      emptySite: "",
      emptyClient: "",
      emptyOrderNo: "",
      emptyOrderDate: "",
      emptyOrderType: "",
      rowlist: [
        {
          lineNumber: 1,
          product: null,
          productDescription: null,
          qty: null,
          uom: null,
          rotadate: null,
          batch: null,
          ref3: null,
          ref4: null,
          disposition: null,
          weight: null,
          orderDate: null

        }
      ],
      rowlistidx: 1
    })
  }

  tabhandler = () => {

    const {
      site,
      client,
      supplier,
      customerRef,
      orderType,
      orderNo,
      orderDate,
      vendorRef,
    } = this.state

    let header = {
      site,
      client,
      supplier,
      customerRef,
      orderType,
      orderNo,
      orderDate,
      vendorRef
    }
    const hv = headerValidation(header)
    if (hv.length > 0) {
      for (let i = 0; i < hv.length; i++) {
        let key = hv[i][0]
        let message = hv[i][1]

        switch (key) {
          case 'site':
            this.setState({ emptySite: message })
            break
          case 'client':
            this.setState({ emptyClient: message })
            break
          case 'orderType':
            this.setState({ emptyOrderType: message })
            break
          case 'orderNo':
            this.setState({ emptyOrderNo: message })
            break
          case 'orderDate':
            this.setState({ emptyOrderDate: message })
            break
        }
      }
      return
    }
    this.setState({ emptyOrderNo: null })
    if (!this.state.isOrderNoAvailable && !this.state.emptyOrderNo) {
      const emptyOrderNoS = 'order no already exist';
      this.setState({ emptyOrderNo: emptyOrderNoS })
      return
    }

    for (let i = 0; i < this.state.rowlist.length; i++) {
      let lv = lineValidation(this.state.rowlist[i], i)
      if (!lv) this.setState({ nextClicked: true })

      if (lv && i + 1 == this.state.rowlist.length) {
        this.setState({
          tab1isactive: !this.state.tab1isactive,
          tab2isactive: !this.state.tab2isactive,
          nextClicked: false
        })
      }

    }
  }

  addLineValidation = () => {
    if (this.state.rowlist.length > 0) {
      for (let i = 0; i < this.state.rowlist.length; i++) {
        var b = lineValidation(this.state.rowlist[i], i);
      }

      if (!b) {
        this.setState({ nextClicked: true })
        return false;
      }
      if (b) {
        this.setState({ nextClicked: false })
        return true
      }
    } else {
      this.setState({ nextClicked: false })
      return true
    }
  }

  datePickerHandler = (day) => {
    this.setState({ showdatepicker: !this.state.showdatepicker })
    this.setState({ orderdate: day })
  }
  datePickerRote = (day) => {
    this.setState({ showdaterote: !this.state.showdaterote })
    this.setState({ rotedate: day })
  }

  getclient = () => {
    axios.get(endpoint.getClient, {
      headers: headers
    })
      .then(res => {
        const result = res.data
        this.setState({ clientdatacr: result })
      })
      .catch(error => {
        // this.props.history.push("/login")
        // console.log(error);
      })
  }

  getordertype = () => {
    axios.get(endpoint.getOrderType, {
      headers: headers
    })
      .then(res => {
        const result = res.data
        this.setState({ orderdatacr: result })
      })
      .catch(error => {
        // this.props.history.push("/login")
        //   console.log(error);
      })
  }

  getsite = () => {
    axios.get(endpoint.getSite, {
      headers: headers
    })
      .then(res => {
        const result = res.data
        this.setState({ sitedatacr: result })
      })
      .catch(error => {
        // this.props.history.push("/login")
      })
  }

  getsupplier = (client) => {
    if (!client) client = this.state.client
    axios.get(endpoint.getSupplier + "?client=" + client, {
      headers: headers
    })
      .then(res => {
        const result = res.data
        this.setState({ supplierdatacr: result, reset: false })
      })

      .catch(error => {
        // this.props.history.push("/login")
      })
  }

  getdisposition = () => {
    axios.get(endpoint.getDisposition, {
      headers: headers
    })
      .then(res => {
        const result = res.data;
        this.setState({ dispositioncr: res.data.code })
      })
      .catch(error => {

      })
  }

  getuom = (i, value) => {
    axios.get(endpoint.getUom + "?client=" + this.state.client + "&product=" + value, {
      headers: headers
    })
      .then(res => {
        const result = res.data;
        this.setState({ uomcr: res.data.uom })
      })
      .catch(error => {
        this.setState({ uomcr: [] })
      })
  }

  getproductcode = (e) => {
    if (!e) e = this.state.client;

    if (e !== '' && e !== null) {
      axios.get(endpoint.getProduct + "?client=" + e, {
        headers: headers
      })
        .then(res => {
          const result = res.data;
          this.setState({ productcr: res.data.code });
        })
        .catch(error => {
          this.setState({ productcr: [] })
        })
    } else {
      this.setState({ productcr: [] });
    }

  }

  getproductname = (e) => {
    if (!e) e = this.state.client

    if (e !== '' && e !== null) {
      axios.get(endpoint.getProduct + "?client=" + e, {
        headers: headers
      })
        .then(res => {
          const result = res.data;
          this.setState({ productdesccr: res.data.name })
        })
        .catch(error => {
          this.setState({ productcr: [] })
        })
    } else {
      this.setState({ productcr: [] });
    }
  }

  getSiteSelected = (value) => {
    this.setState({ sitecrSelected: value });
  }

  getClientSelected = (value) => {
    this.setState({ clientcrSelected: value });
  }

  getOrderTypeSelected = (value) => {
    this.setState({ orderTypecrSelected: value });
  }

  setSuppliers = (e) => {
    let value = e.target.value
    this.setState({ supplier: value })
  }
  setOrderNo = (e) => {
    const orderNumber = e.target.value.toUpperCase()
    if (orderNumber.length > 4) this.setState({ emptyOrderNo: null })
    this.setState({ orderNo: orderNumber })
    const client = this.state

    orderNoValidation(orderNumber, client.client)
      .then((data) => {
        this.setState({ isOrderNoAvailable: data })
        if (data == true) this.setState({ emptyOrderNo: null })
      })
  }

  tab1Content = () => {
    let clientName = [];
    let clientValue = [];
    let siteData = [];
    let siteName = [];
    let supplierNo = [];
    let supplierName = [];
    let orderData = [];
    let orderValue = [];
    if (this.state.clientdatacr) {
      this.state.clientdatacr.map((data) => {
        if (data.code == headers.client) {
          clientName.push(data.code + " (" + data.name + ")");
          clientValue.push(data.code);
        } else if ((headers.client == null) || (headers.client == "")) {
          clientName.push(data.code + " (" + data.name + ")");
          clientValue.push(data.code);
        }
      })
    }
    if (this.state.sitedatacr) {
      this.state.sitedatacr.map((data) => {
        if (data.site == getUserSite) {
          siteData.push(data.site);
          siteName.push(data.site + ":" + data.name)
        } else if ((getUserSite == null) || (getUserSite == "")) {
          siteData.push(data.site);
          siteName.push(data.site + ":" + data.name)
        }
      })
    }
    if (this.state.supplierdatacr) {
      this.state.supplierdatacr.map((data) => {
        supplierNo.push(data.supplier_no);
        supplierName.push(data.name);
      })
    }
    if (this.state.orderdatacr) {
      this.state.orderdatacr.map((data) => {
        orderData.push(data.description);
        orderValue.push(data.code);
      })
    }

    const {
      site,
      client,
      supplier,
      customerRef,
      orderType,
      orderNo,
      orderDate,
      vendorRef
    } = this.state

    let v_orderNo = orderNo

    if (v_orderNo === null) v_orderNo = []
    if (v_orderNo === undefined) v_orderNo = []
    return (
      <div className="tabcontent">
        <h3 className="fonts so-header-title">Order Details</h3>
        <table className={"createpotable "}>
          <tr>
            <th className='required-field' style={{ width: "396px" }}>Site</th>
            <th className='required-field' style={{ width: "396px" }}>Client</th>
            <th style={{ width: "396px" }}>Supplier</th>
            <th style={{ width: "396px" }}>Customer Order Ref</th>
          </tr>
          <tr>
            <td style={{ width: "396px" }}>
              {
                Authentication.getUserLevel() === 'administrator' ?
                  <Dropdown placeHolder="Site"
                    style={{ minWidth: "100%", zIndex: '6' }}
                    optionList={siteName.toString()}
                    optionValue={siteData.toString()}
                    getValue={(e) => this.setState({ site: e })}
                    optionSelected={this.state.site}
                    tabIndex="1"
                  /> : <input
                    readOnly
                    value={this.state.site}
                    id="site"
                    className="form-control put"
                    placeholder="Site"
                    tabIndex='1'
                  />
              }
            </td>
            <td style={{ width: "396px" }}>

              {
                Authentication.getUserLevel() === 'administrator' ?
                  <Dropdown placeHolder="Client"
                    style={{ minWidth: "100%" }}
                    optionList={clientName.toString()}
                    optionValue={clientValue.toString()}
                    getValue={(e) => this.setState({ client: e, supplier: null, supplierName: null, reset: true }, () => {
                      this.getsupplier(this.state.client);
                      this.getproductcode(this.state.client);
                      this.getproductname(this.state.client);
                    })}
                    optionSelected={this.state.client}
                    tabIndex="1" /> :
                  <input
                    readOnly
                    value={this.state.client}
                    id="site"
                    className="form-control put"
                    placeholder="Site"
                    tabIndex='1'
                  />

              }

            </td>
            {/* <td style={{ width: "396px" }}><input className={"form2 put pec" +("1" ? "" : "form2 valid pec") } placeholder="Client"/> </td> */}
            <td style={{ width: "396px" }}>
              <AutoComplete placeHolder="Supplier"
                style={{ minWidth: "100%", zIndex: '6' }}
                optionList={supplierName.toString()}
                optionValue={supplierName.toString()}
                getValue={(e) => this.setState({ supplier: e })}
                optionSelected={this.state.supplier}
                className={this.state.reset ? ' po-hidden' : null}
                tabIndex="1" />
            </td>
            {/* <td style={{ width: "396px" }}><input onChange={(e) => this.setSuppliers(e)} className="form2 put pec" placeholder="Supplier"/> </td> */}
            <td style={{ width: "396px" }}>
              <input tabIndex="1" className="form2 put pec cor" placeholder="Customer Order Ref" value={this.state.customerRef} maxLength="40" onChange={(e) => this.setState({ customerRef: e.target.value })} />
            </td>
          </tr>
          {/* <tr>
            <th style={{ color: "transparent" }}>1</th>
          </tr> */}

          <tr>
            <td style={{ width: "396px" }}><div className={'po-required ' + (this.state.site ? 'nmtrField' : 'mtrField')}>{this.state.emptySite}</div></td>
            <td style={{ width: "396px" }}><div className={'po-required ' + (this.state.client ? 'nmtrField' : 'mtrField')}>{this.state.emptyClient}</div></td>
            <td style={{ width: "396px" }}><div className='po-required' /></td>
            <td style={{ width: "396px" }}><div className='po-required' /></td>
          </tr>

          <tr>
            <th className='required-field'>Order Type</th>
            <th className='required-field'>Order No</th>
            <th className='required-field'>Order Date</th>
            <th>Vendor Order Ref</th>
          </tr>
          <tr>
            <td style={{ width: "396px" }}>
              <AutoComplete placeHolder="Order Type"
                style={{ minWidth: '100%' }}
                optionList={orderData.toString()}
                optionValue={orderValue.toString()}
                getValue={(e) => this.setState({ orderType: e })}
                optionSelected={this.state.orderType} tabIndex="1" />
            </td>
            <td style={{ width: "396px" }}><input id='orderNo' tabIndex="1" className="form2 put pec so-inputs" value={this.state.orderNo} placeholder="Order No" minLength="4" maxLength="12" onChange={(e) => this.setOrderNo(e)} /> </td>
            <td style={{ width: "396px" }}>
              <DatePicker style={{ minWidth: '100%' }}
                getDate={(e) => { this.setState({ orderDate: e }); this.state.rowlist[0].orderDate = e }}
                defaultValue={this.state.orderDate} tabIndex="1" top={true}
              />
            </td>
            <td style={{ width: "396px" }}><input tabIndex="1" className="form2 put pec so-inputs" value={this.state.vendorRef} maxLength='40' placeholder="Vendor Order Ref" onChange={(e) => this.setState({ vendorRef: e.target.value })} maxLength="40" /> </td>
          </tr>
          {/* <tr>
            <th style={{ color: "transparent" }}>1</th>
          </tr> */}
          <tr>
            <td style={{ width: "396px" }}><div className={'po-required ' + (this.state.orderType ? 'nmtrField' : 'mtrField')}>{this.state.emptyOrderType}</div></td>
            <td style={{ width: "396px" }}><div className={'po-required ' + (this.state.emptyOrderNo ? 'mtrField' : 'nmtrField')}>{this.state.emptyOrderNo}</div></td>
            <td style={{ width: "396px" }}><div className={'po-required ' + (this.state.orderDate ? 'nmtrField' : 'mtrField')}>{this.state.emptyOrderDate}</div></td>
            <td className='nmtrField po-required' style={{ width: "396px" }}></td>
          </tr>
        </table>



        <br />
        <tr>
          <td style={{ color: "transparent" }}>1</td>
        </tr>

        <h3 className="fonts so-header-title">Line Details</h3>
        <div className="scroll-x-y-visible">
          <table className="tabledetails">
            <tr>
              <th><div id='orderline-header-number-id'>#</div></th>
              <th><div id='orderline-header-product-id'>Product</div></th>
              <th><div id='orderline-header-description-id'>Description</div></th>
              <th><div id='orderline-header-qty-id'>Qty</div></th>
              <th><div id='orderline-header-weight-id'>Weight</div></th>
              <th><div id='orderline-header-uom-id'>UOM</div></th>
              <th><div id='orderline-header-rotadate-id'>Rota Date</div></th>
              <th><div id='orderline-header-batch-id'>Batch</div></th>
              <th><div id='orderline-header-ref3-id'>Ref3</div></th>
              <th><div id='orderline-header-ref4-id'>Ref4</div></th>
              <th><div id='orderline-header-disposition-id'>Disposition</div></th>
            </tr>
          </table>
          {this.state.rowlist.map((list, i) => {
            return (
              this.linedetailsrow(list, i)
            )
          })}
          <button onClick={() => this.addline()} type="button" className="btn btn-light  addlinePO default-box-height so-add-line" tabIndex="2" >+ Add Line</button>
        </div>


        {this.state.tab2isactive ?
          this.submit() :
          <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ><label className="font ">Next <i className="fa fa-chevron-right " style={{ fontSize: '9pt', paddingLeft: '8px' }}></i> </label></Button>
        }
      </div>
    )
  }


  tab2Content = () => {
    return (
      <div className="tabcontent fades">
        <h3 className="fonts so-header-title">Order Details</h3>

        <table className="createpotable">
          <tr>
            <th style={{ width: "396px" }}>Site</th>
            <th style={{ width: "396px" }}>Client</th>
            <th style={{ width: "396px" }}>Supplier</th>
            <th style={{ width: "396px" }}>Customer Order Ref</th>
          </tr>
          <tr>
            <td><input className="form-control" value={this.state.site} readOnly /></td>
            <td><input value={this.state.supplier} value={this.state.client} className="form-control" readOnly /></td>
            <td><input value={this.state.supplier} value={this.state.supplier} className="form-control" readOnly /></td>
            <td><input className="form-control" value={this.state.customerRef} readOnly /></td>
          </tr>
          <tr>
            <td style={{ color: 'transparent', fontSize: '4px' }}>blank</td>
          </tr>
          <tr>
            <th>Order Type</th>
            <th>Order No</th>
            <th>Order Date</th>
            <th>Vendor Order Ref</th>
          </tr>
          <tr>
            <td><input className="form-control" value={this.state.orderType} readOnly /></td>
            <td><input className="form-control" value={this.state.orderNo} readOnly /></td>
            <td><input className="form-control" value={moment(this.state.orderDate).format("DD MMMM YYYY")} readOnly /></td>
            <td><input className="form-control" value={this.state.vendorRef} readOnly /></td>
          </tr>
        </table>

        <br />
        <h3 className="fonts so-header-title">Line Details</h3>

        <table className="tabledetails">
          <tr >
            <th style={{ width: "2%", textAlign: "center", paddingLeft: "18px" }}>#</th>
            <th style={{ width: "12%", paddingLeft: "20px" }}>Product</th>
            <th style={{ width: "12%", paddingLeft: "24px" }}>Description</th>
            <th style={{ width: "3%", paddingLeft: "29px" }}>Qty</th>
            <th style={{ width: "5%", paddingLeft: "1px" }}>Weight</th>
            <th style={{ width: "6%", paddingLeft: "23px" }}>UOM</th>
            <th style={{ width: "6%", paddingLeft: "24px" }}>Rota Date</th>
            <th style={{ width: "6%", paddingLeft: "37px" }}>Batch</th>
            <th style={{ width: "5%", paddingLeft: "25px", paddingRight: "-20px" }}>Ref3</th>
            <th style={{ width: "5%", paddingRigth: "-30px" }}>Ref4</th>
            <th style={{ width: "6%", paddingRight: "-30px" }}>Disposition</th>
          </tr>
        </table>

        <div className={"tablerow " + (this.state.rowlist.length > 2 ? "scroll" : null)} style={{ width: "98%" }} >
          {this.state.rowlist.map((list, i) => this.linedetailsrowreview(list, i))}
        </div>
        <tr>
          <td style={{ color: "transparent" }}>1</td>
        </tr>
        <div style={{ marginTop: "7%" }}>

          {this.state.tab2isactive ?
            this.submit() :
            <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ></Button>
          }

        </div>
      </div>
    )
  }


  deletelinehandler = (e, i) => {
    let updated = this.state.rowlist.length
    // Jika Jumlah produk Entry Lebih dari satu
    let id = e.currentTarget.id;
    for (let i = 0; i < updated; i++) {
      if (this.state.rowlist[i].lineNumber == id) {
        this.state.rowlist.splice(i, 1);
        this.setState({ rowlist: this.state.rowlist })
        this.state.rowlistidx -= 1;
        let lengthRowlist = this.state.rowlist.length;
        if (i < lengthRowlist) {
          for (let x = i; x < lengthRowlist; x++) {
            this.state.rowlist[x].lineNumber -= 1;
          }
          this.setState({ rowlist: this.state.rowlist })

        }
        this.refs['orderLine' + this.state.rowlist.length].reset()
        this.forceUpdate()
        console.log(this.state.rowlist)
        break;
      }
    }

    updated = this.state.rowlist.length
  }



  selectedValue = (id, value) => {
    if (id == "Saya") {
      this.setState({ client: value })
    }
  }

  getProductValue = (e, i) => {
    let rowlist = [...this.state.rowlist];
    let index = this.state.productcr.indexOf(e);
    rowlist[i].product = e;
    rowlist[i].productDescription = this.state.productdesccr[index];

    this.setState({
      rowlist: rowlist
    });
    this.getuom(i, e)

  }

  checkQty = (e) => {
    const blocked = ['.', ',', 'e', '-']
    if (blocked.includes(e.key)) e.preventDefault()
  };

  setQty = (e, i) => {
    let val = e.target.value
    if (!isNaN(val)) {
      val = val.replace(/,/g, '')
      let aa = [...this.state.rowlist]
      aa[i].qty = val
      this.setState({ rowlist: aa })
    }
  }

  linedetailsrow = (list, i) => {
    let self = this;

    let mProduct = 'nmtrField'
    let mQty = 'nmtrField'
    let mUom = 'nmtrField'

    if (!list.product && this.state.nextClicked) mProduct = 'mtrField'
    if (!list.qty && this.state.nextClicked) mQty = 'mtrField'
    if (!list.uom && this.state.nextClicked) mUom = 'mtrField'
    return (
      <form key={i} ref={"orderLine" + list.lineNumber}>
        <table>
          <tr>
            <td>
              <div id="orderline-header-number-val-id">
                <input className="form-control put "
                  id="rowNumber"
                  readOnly
                  defaultValue={list.lineNumber}
                  readOnly />
              </div>
            </td>
            <td>
              <div id="orderline-header-product-val-id">
                <AutoComplete ref={"product" + list.lineNumber}
                  placeHolder="Product"
                  style={{ width: "100%", zIndex: this.state.rowlist.length - i }}
                  optionList={this.state.productcr.toString()}
                  optionValue={this.state.productcr.toString()}
                  getValue={(e) => this.getProductValue(e, i)}
                  optionSelected={this.state.rowlist[i].product}
                  tabIndex="2" uppercase={true} />
              </div>
            </td>
            <td>
              <div id='orderline-header-description-val-id'>
                <input tabIndex="2"
                  className="form-control inputs pec"
                  placeholder="Choose a Product First"
                  defaultValue={this.state.rowlist[i].productDescription}
                  readOnly />
              </div>
            </td>
            <td>
              <div id='orderline-header-qty-val-id'>
                <input tabIndex="2"
                  type='number'
                  id={'qty_' + i}
                  min="1"
                  maxLength='9'
                  className="form-control inputs pec"
                  placeholder="Qty"
                  value={this.state.rowlist[i].qty}
                  onKeyPress={(e) => this.checkQty(e)}
                  onChange={(e) => this.setQty(e, i)} />
              </div>
            </td>
            <td>
              <div id='orderline-header-weight-val-id'>
                <input tabIndex="2"
                  className="form-control inputs pec"
                  placeholder="Weight"
                  maxLength="30"
                  defaultValue={this.state.rowlist[i].weight}
                  onChange={(e) => { this.state.rowlist[i].weight = e.target.value; this.setState({ rowlist: this.state.rowlist }) }} />
              </div>
            </td>
            <td>
              <div id='orderline-header-uom-val-id'>
                <Dropdown placeHolder="UOM"
                  style={{ width: "100%", zIndex: this.state.rowlist.length - i }}
                  optionList={this.state.uomcr.toString()}
                  optionValue={this.state.uomcr.toString()}
                  getValue={(e) => { this.state.rowlist[i].uom = e; this.setState({ rowlist: this.state.rowlist }) }}
                  optionSelected={this.state.rowlist[i].uom} tabIndex="2" />
              </div>
            </td>
            <td>
              <div id='orderline-header-rotadate-val-id'>
                <DatePicker tabIndex="2"
                  top={true}
                  style={{ minWidth: "100%" }}
                  field="smallField"
                  getDate={(e) => this.state.rowlist[i].rotadate = e}
                  defaultValue={this.state.rowlist[i].rotadate} />
              </div>
            </td>
            <td>
              <div id='orderline-header-batch-val-id'>
                <input tabIndex="2"
                  className="form-control inputs pec"
                  placeholder="Batch"
                  maxLength="30"
                  defaultValue={this.state.rowlist[i].batch}
                  onChange={(e) => { this.state.rowlist[i].batch = e.target.value; this.setState({ rowlist: this.state.rowlist }) }} />
              </div>
            </td>
            <td>
              <div id='orderline-header-ref3-val-id'>
                <input tabIndex="2"
                  className="form-control inputs pec"
                  placeholder="Ref3"
                  maxLength="30"
                  defaultValue={this.state.rowlist[i].ref3}
                  onChange={(e) => { this.state.rowlist[i].ref3 = e.target.value; this.setState({ rowlist: this.state.rowlist }) }} />
              </div>
            </td>
            <td>
              <div id='orderline-header-ref4-val-id'>
                <input tabIndex="2"
                  className="form-control inputs pec"
                  placeholder="Ref4"
                  maxLength="30"
                  defaultValue={this.state.rowlist[i].ref4}
                  onChange={(e) => { this.state.rowlist[i].ref4 = e.target.value; this.setState({ rowlist: this.state.rowlist }) }} />
              </div>
            </td>
            <td>
              <div id='orderline-header-disposition-val-id'>
                <AutoComplete placeHolder="Dis"
                  style={{ width: "100%", zIndex: this.state.rowlist.length - i }}
                  optionList={this.state.dispositioncr.toString()}
                  optionValue={this.state.dispositioncr.toString()}
                  getValue={(e) => { this.state.rowlist[i].disposition = e; this.setState({ rowlist: this.state.rowlist }) }}
                  optionSelected={this.state.rowlist[i].disposition}
                  tabIndex="2" />
              </div>
            </td>
            <td>
              <div id='orderline-header-number-val-id' tabIndex="3">
                <label onClick={(e) => this.deletelinehandler(e, i)} className="iconU-delete"></label>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div id="orderline-header-number-val-id"></div>
            </td>
            <td>
              <div id="orderline-header-product-val-id" className={'po-order-line-required ' + (mProduct)}>Please select product</div>
            </td>
            <td>
              <div id='orderline-header-description-val-id'></div>
            </td>
            <td>
              <div id='orderline-header-qty-val-id' className={'po-order-line-required ' + (mQty)}>Qty cannot be empty</div>
            </td>
            <td>
              <div id='orderline-header-weight-val-id'></div>
            </td>
            <td>
              <div id='orderline-header-uom-val-id' className={'po-order-line-required ' + (mUom)}>Please select uom</div>
            </td>
            <td>
              <div id='orderline-header-rotadate-val-id'></div>
            </td>
            <td>
              <div id='orderline-header-batch-val-id'></div>
            </td>
            <td>
              <div id='orderline-header-ref3-val-id'></div>
            </td>
            <td>
              <div id='orderline-header-ref4-val-id'></div>
            </td>
            <td>
              <div id='orderline-header-disposition-val-id'></div>
            </td>
          </tr>
        </table>
      </form>
    )
  }

  linedetailsrowreview = (list, i) => {
    return (
      <table>
        <tr>
          <td hidden id={list.lineNumber}></td>
          <td style={{ width: "3.5%", textAlign: "center" }}><input className="form-control inputs pec" style={{ textAlign: "center" }} value={list.lineNumber} readOnly /></td>
          <td style={{ width: "12%" }}><input className="form-control inputs pec" value={list.product} readOnly /></td>
          <td style={{ width: "12%" }}><input className="form-control inputs pec" value={list.productDescription} readOnly /></td>
          <td style={{ width: "3.5%" }}><input className="form-control inputs pec" value={list.qty} readOnly /></td>
          <td style={{ width: "5%" }}><input className="form-control inputs pec" value={list.weight} readOnly /></td>
          <td style={{ width: "6%" }}><input className="form-control inputs pec" value={list.uom} readOnly /></td>
          <td style={{ width: "6.5%" }}><input className="form-control inputs pec" value={list.rotadate ? moment(list.rotadate).format("DD MMMM YYYY") : null} readOnly /></td>
          <td style={{ width: "6%" }}><input className="form-control inputs pec" value={list.batch} readOnly /></td>
          <td style={{ width: "5%" }}><input className="form-control inputs pec" value={list.ref3} readOnly /></td>
          <td style={{ width: "5%" }}><input className="form-control inputs pec" value={list.ref4} readOnly /></td>
          <td style={{ width: "6%" }}><input className="form-control inputs pec" value={list.disposition} readOnly /></td>
        </tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{this.state.showdaterote ? <DatePicker getChosenDay={(day) => this.datePickerRote(day)} /> : null}</td>
      </table>
    )
  }

  addline = () => {
    const clear = this.addLineValidation()
    if (clear) {
      this.state.rowlistidx += 1;
      this.setState({
        rowlist: this.state.rowlist.concat(
          {
            lineNumber: this.state.rowlistidx,
            product: null,
            productDescription: null,
            uom: null,
            qty: null,
            rotadate: new Date(),
            batch: null,
            ref3: null,
            ref4: null,
            disposition: null,
            weight: null,
            orderDate: this.state.orderDate
          }
        )
      })
    } else if (this.state.rowlist.length < 1) {
      this.state.rowlistidx += 1;
      this.setState({
        rowlist: this.state.rowlist.concat(
          {
            lineNumber: this.state.rowlistidx,
            product: null,
            productDescription: null,
            uom: null,
            qty: null,
            rotadate: new Date(),
            batch: null,
            ref3: null,
            ref4: null,
            disposition: null,
            weight: null,
            orderDate: this.state.orderDate
          }
        )
      })
    }
  }

  saveclick = () => {
    this.setState({ isSaveProgressing: true }, this.createPO());

  }

  createPO = () => {
    let self = this;

    const {
      site,
      client,
      supplier,
      customerRef,
      orderType,
      orderNo,
      orderDate,
      vendorRef,
    } = self.state
    let param = {
      orderDetails: [{
        site: site,
        client: client,
        supplier: supplier,
        customerOrderRef: customerRef ? customerRef : null,
        orderType: orderType,
        orderNo: orderNo,
        orderDate: orderDate,
        vendorOrderRef: vendorRef ? vendorRef : null,
        web_user: "216"
      }],
      lineDetails: [...self.state.rowlist]
    }
    axios.post(endpoint.purchaseOrderCreate, param, { headers: headers, })
      .then(res => {
        if (res.data.message == "Successfully added") {
          self.setState({
            isSaveProgressing: false
          });
          self.props.closemodal();
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: {
              text: "Ok",
              className: "btn btn-primary"
            },
          });
          self.setState({
            tab1isactive: true,
            tab2isactive: false,
            site: undefined,
            client: undefined,
            supplier: undefined,
            customerRef: undefined,
            orderType: undefined,
            orderNo: undefined,
            orderDate: null,
            vendorRef: undefined,
            rowlist: [
              {
                lineNumber: 1,
                product: null,
                productDescription: null,
                qty: null,
                uom: null,
                rotadate: null,
                batch: null,
                ref3: null,
                ref4: null,
                disposition: null,
                weight: null,
                orderDate: null

              }
            ],
            rowlistidx: 1,
          })
        } else {
          self.setState({
            isSaveProgressing: false
          });
          swal({
            title: "Error!",
            text: res.data.message,
            icon: "error",
            button: {
              text: "Ok",
              className: "btn btn-primary"
            },
          });
        }
      })
      .catch(error => {
        self.setState({
          isSaveProgressing: false
        });
        swal({
          title: "Error!",
          text: error.message,
          icon: "error",
          button: {
            text: "Ok",
            className: "btn btn-primary"
          },
        });
      })
  }

  submit = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch" ><label className="font">
          <i className="fa fa-chevron-left " style={{ fontSize: '9pt', paddingRight: '8px' }}></i> Back  </label></Button>
        <Button onClick={() => this.saveclick()} color="primary" className="btnsearch submit btnleft" style={{ marginTop: "-50px" }} >
          <i className={(this.state.isSaveProgressing) ? "mr-2 fa fa-refresh fa-spin " : "fa fa-refresh fa-spin d-none"}></i>
          <label className="font">Submit</label>
        </Button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal className="POCreate" isOpen={this.props.showmodal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 800 }} toggle={true} >
        <div className="createModal">
          <ModalHeader style={{ marginTop: "1%" }}>
            <div style={{ display: "inline flex", marginLeft: "30px" }}>
              <label className="iconU-createModal" />
              <label className="font">
                <h2>Create Purchase Order</h2>
              </label>
            </div>
            <p color="primary" onClick={() => this.close()}>
              <i
                className="iconU-close"
                style={{ fontSize: "25px", marginLeft: "-3em" }}
                aria-hidden="true"
              />
            </p>
          </ModalHeader>

          <ModalHeader className="Tabs" style={{ marginTop: "-30px" }} >
            <div>
              <div className="createdec" style={{ marginLeft: "67px" }}>
                Enter order and line details to create a new Purchase Order
                          </div>
              <div className="tabs font">
                <div style={{ color: "#919191" }} onClick={() => this.tabhandler()} className={"tab1 " + (this.state.tab1isactive ? "tabisactive" : null)}>
                  <img className="numberimg" style={{ width: "9%" }} src={this.state.tab1isactive ? oneactive : oneinactive} alt='' />  Order & Product Details
                </div>
                <div style={{ color: "#919191" }} onClick={() => this.tabhandler()} className={"tab2 tab-review " + (this.state.tab2isactive ? "tabisactive" : null)}>
                  <img className="numberimg " style={{ width: "22%" }} src={this.state.tab2isactive ? twoactive : twoinactive} alt='' /> Review
                 </div>
              </div>
            </div>
          </ModalHeader>

          <ModalBody className="bodycontent" style={{ width: "100%" }}>
            {this.state.tab1isactive ? this.tab1Content() : this.tab2Content()}
          </ModalBody>
          {/* {this.state.tab2isactive ? 
              this.submit() :  
              <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch next btnleft" ><label className="font btnLabel ">Next</label></Button>
            }       */}
        </div>
      </Modal>
    )
  }
}

export default PurchaseOrderCreate
