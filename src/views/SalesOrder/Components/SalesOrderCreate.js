import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./SalesOrderCreate.css";
import oneinactive from "../../../assets/img/brand/tab_1_grey@2x.png";
import oneactive from "../../../assets/img/brand/tab_1_blue@2x.png";
import twoinactive from "../../../assets/img/brand/tab_2_grey@2x.png";
import twoactive from "../../../assets/img/brand/tab_2_blue@2x.png";
import Tab1CreateSO from "./Tab/Tab1CreateSO";
import Tab2CreateSO from "./Tab/Tab2CreateSO";
import axios from "axios";
import { endpoint, headers } from "../../../AppComponent/ConfigEndpoint";
import Authentication from "../../../Auth/Authentication";
import {
  headerValidation,
  lineDetailValidation
} from "../Components/Validation/Validation";
import swal from "sweetalert";
import moment from "moment";
import { reset, errMsg } from "./resetState";
import {orderNoValidation} from '../Components/Validation/orderNoValidation'

class SalesOrderCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1isactive: true,
      tab2isactive: false,
      parameters: {
        header: {
          company: Authentication.getCompanyCode(),
          site: null,
          siteVal: null,
          client: Authentication.getClient(),
          clientName: null,
          orderId: null,
          customerOrderRef: null,
          vendorOrderRef: null,
          orderType: null,
          orderTypeVal: null,
          deliveryDate: moment().format("YYYY-MM-DD"),
          customer: this.props.resources.identity
            ? this.props.resources.identity[0].name
            : null,
          customerVal: this.props.resources.identity
            ? this.props.resources.identity[0].customer_no
            : null,
          shipToAddress1: this.props.resources.identity
            ? this.props.resources.identity[0].address_1
            : null,
          shipToAddress2: this.props.resources.identity
            ? this.props.resources.identity[0].address_2
            : null,
          shipToAddress3: this.props.resources.identity
            ? this.props.resources.identity[0].address_3
            : null,
          shipToAddress4: this.props.resources.identity
            ? this.props.resources.identity[0].address_4
            : null,
          shipToAddress5: this.props.resources.identity
            ? this.props.resources.identity[0].address_5
            : null,
          city: this.props.resources.identity
            ? this.props.resources.identity[0].city
            : null,
          postCode: this.props.resources.identity
            ? this.props.resources.identity[0].postcode
            : null,
          state: this.props.resources.identity
            ? this.props.resources.identity[0].state
            : null,
          country: this.props.resources.identity
            ? this.props.resources.identity[0].country
            : null,
          deliveryInstruction: null
        },
        lineDetail: [
          {
            number: 1,
            productVal: null,
            product: null,
            qty: null,
            weight: null,
            uom: null,
            rotaDate: null,
            batch: null,
            ref3: null,
            ref4: null,
            dispositionVal: null,
            disposition: null,
            packId: null
          }
        ]
      },

      validation: {
        header: {
          emptySite: null,
          emptyClient: null,
          emptyOrderType: null,
          emptyOrderNo: null,
          emptyDeliveryDate: null,
          orderNoIsAvailable:true,

          emptyCustomer: null,
          emptyShipToAddress1: null,
          emptyPostCode: null,
          emptyState: null
        }
      },
      identity: [],
      uomdata: [],
      deleteProcessed:false
    };
  }

  resetState = () => {
    this.setState({
      tab1isactive: true,
      tab2isactive: false,
      parameters: reset(this.props.resources),
      validation:errMsg
    });
  };

  close = () => {
    this.props.closemodal();
    this.resetState();
  };

  tabhandler = () => {
    let a = headerValidation(this.state.parameters.header);
    let param = { ...this.state.parameters };
    let validation = { ...this.state.validation };

    if (a.length > 0) {
      for (let i = 0; i < a.length; i++) {
        let id = a[i][0];
        let message = a[i][1];
        switch (id) {
          case "site":
            validation.header.emptySite = message;
            break;
          case "client":
            validation.header.emptyClient = message;
            break;
          case "order type":
            validation.header.emptyOrderType = message;
            break;
          case "order no":
            validation.header.emptyOrderNo = message;
            break;
          case "order no length":
            validation.header.emptyOrderNo = message;
            break;
          case "delivery date":
            validation.header.emptyDeliveryDate = message;
            break;
          case "customer":
            validation.header.emptyCustomer = message;
            break;
          case "ship to address1":
            validation.header.emptyShipToAddress1 = message;
            break;
          case "post code":
            validation.header.emptyPostCode = message;
            break;
          case "post code length":
            validation.header.emptyPostCode = message;
            break;
          case "state":
            validation.header.emptyState = message;
            break;
          default:
            return;
        }
      }
    }
    if(!validation.header.orderNoIsAvailable && !validation.header.emptyOrderNo) validation.header.emptyOrderNo = 'order no already exist';
    if(!validation.header.orderNoIsAvailable && a == true) a = false
    if(validation.header.orderNoIsAvailable && a == true) a = true
    this.setState({ validation: validation });

    if (a == true) {
      for (let i = 0; i < param.lineDetail.length; i++) {
        let idx = i + 1;
        let b = lineDetailValidation(param.lineDetail[i], idx);
        if (!b) return;
        if (b && i == param.lineDetail.length - 1) {
          this.setState({
            tab1isactive: !this.state.tab1isactive,
            tab2isactive: !this.state.tab2isactive
          });
        }
      }
    }
  };

  // Set Site
  setSite = (siteVal, site) => {
    let validation = { ...this.state.validation };
    if (siteVal && siteVal.length > 0) {
      validation.header.emptySite = null;
      this.setState({ validation: validation });
    }
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          siteVal: siteVal,
          site: site
        }
      }
    }));
  };

  // Set Client
  setClient = (clientVal, clientName) => {
    let validation = { ...this.state.validation };
    if (clientVal && clientVal.length > 0) {
      validation.header.emptyClient = null;
      this.setState({ validation: validation });
    }
    let name = this.props.clientdata.map((data) => {
      if (data.code === clientVal) return data.name;
    });

    name = clientVal + " ( " + name + " )";
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          client: clientVal,
          clientName: name
        }
      }
    }));
    this.props.getClientProduct(clientVal);
    this.props.getResources(clientVal);
  };

  // Set Order Type
  setOrderType = (orderTypeVal, orderType) => {
    let validation = { ...this.state.validation };
    if (orderTypeVal && orderTypeVal.length > 0) {
      validation.header.emptyOrderType = null;
      this.setState({ validation: validation });
    }
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          orderType: orderType,
          orderTypeVal: orderTypeVal
        }
      }
    }));
  };

  // Set Order No
  setOrderId = (data) => {
    let validation = { ...this.state.validation };
    orderNoValidation(data, this.state.parameters.header.client)
    .then((data) => {
      validation.header.orderNoIsAvailable = data
      this.setState({validation:validation})
    })
    if (data && data.length > 0 && data.length > 4) {
      validation.header.emptyOrderNo = null;
      this.setState({ validation: validation });
    }
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          orderId: data
        }
      }
    }));
  };

  // Set Delivery Date
  setDeliveryDate = (data) => {
    let validation = { ...this.state.validation };
    if (data && data.length > 0) {
      validation.header.emptyDeliveryDate = null;
      this.setState({ validation: validation });
    }
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          deliveryDate: data
        }
      }
    }));
  };

  // Set Customer Order Ref
  setCustomerOrderRef = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          customerOrderRef: data
        }
      }
    }));
  };

  // Set Vendor Order Ref
  setVendorOrderRef = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          vendorOrderRef: data
        }
      }
    }));
  };

  // Set Delivery Instruction
  setDeliveryInstruction = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          deliveryInstruction: data
        }
      }
    }));
  };

  // Set Customer
  setCustomer = (customerVal, customer) => {
    let validation = { ...this.state.validation };
    if (customerVal && customerVal.length > 0) {
      validation.header.emptyCustomer = null;
      this.setState({ validation: validation });
    }

    let index = this.props.resources.supplier.code.indexOf(customerVal);
    customer = this.props.resources.supplier.name[index];
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          customer: customer,
          customerVal: customerVal
        }
      }
    }));
  };

  // Set Address 1
  setAddress1 = (data) => {
    let validation = { ...this.state.validation };
    if (data && data.length > 0) {
      validation.header.emptyShipToAddress1 = null;
      this.setState({ validation: validation });
    }
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          shipToAddress1: data
        }
      }
    }));
  };

  // Set Address 2
  setAddress2 = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          shipToAddress2: data
        }
      }
    }));
  };

  // Set Address 3
  setAddress3 = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          shipToAddress3: data
        }
      }
    }));
  };

  // Set Address 4
  setAddress4 = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          shipToAddress4: data
        }
      }
    }));
  };

  // Set Address 5
  setAddress5 = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          shipToAddress5: data
        }
      }
    }));
  };

  // Set City
  setCity = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          city: data
        }
      }
    }));
  };

  // Set Post Code
  setPostCode = (data) => {
    let validation = { ...this.state.validation };
    if (data && data.length > 0) {
      validation.header.emptyPostCode = null;
      this.setState({ validation: validation });
    }
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          postCode: data
        }
      }
    }));
  };

  //  Set State
  setStates = (data) => {
    let validation = { ...this.state.validation };
    if (data && data.length > 0) {
      validation.header.emptyState = null;
      this.setState({ validation: validation });
    }
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          state: data
        }
      }
    }));
  };

  setCountry = (data) => {
    this.setState((prevState) => ({
      parameters: {
        ...prevState.parameters,
        header: {
          ...prevState.parameters.header,
          country: data
        }
      }
    }));
  };

  getIdentity = (customerVal, customerName) => {
    this.setCustomer(customerVal);
    let param =
      "?client=" + Authentication.getClient() + "&&customerNo=" + customerVal;
    let self = this;
    axios
      .get(endpoint.getSoIdentity + param, {
        headers: headers
      })
      .then((res) => {
        const result = res.data.identity[0];
        let nm = result.name;
        if (!nm) self.setCustomer(result.customer_no, nm);
        self.setState((prevState) => ({
          parameters: {
            ...prevState.parameters,
            header: {
              ...prevState.parameters.header,
              shipToAddress1: result.address_1,
              shipToAddress2: result.address_2,
              shipToAddress3: result.address_3,
              shipToAddress4: result.address_4,
              shipToAddress5: result.address_5,
              city: result.city,
              postCode: result.postcode,
              state: result.state,
              country: result.country
            }
          }
        }));
        self.setCustomer(result.customer_no, nm);
        self.setAddress1(result.address_1);
        self.setPostCode(result.postcode);
        self.setStates(result.state);
      })
      .catch((error) => {
      
        console.log(error);
      });
  };

  getUom = (productVal) => {
    if (productVal == "" || !productVal) return;
    let param =
      "?client=" +
      this.state.parameters.header.client +
      "&&product=" +
      productVal;
    axios
      .get(endpoint.getUom + param, {
        headers: headers
      })
      .then((res) => {
        let result = res.data.uom;
        this.setState({ uomdata: result });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setProduct = (productVal, product, idx) => {
    let newParam = { ...this.state.parameters };

    let index = this.props.productdata.code.indexOf(productVal);
    let name = this.props.productdata.name[index];
    newParam.lineDetail[idx].product = name;
    newParam.lineDetail[idx].productVal = productVal;

    this.setState({ parameters: newParam });
    this.getUom(productVal);
  };

  setQty = (qty, idx) => {
    let newParam = { ...this.state.parameters };
    let aa = isNaN(qty)
    if(aa == false)
    {     
      qty = qty.replace(/,/g, '')
      newParam.lineDetail[idx].qty = qty;
      this.setState({ parameters: newParam });
    }
    
    
  };

  setWeight = (weight, idx) => {
    let newParam = { ...this.state.parameters };
    newParam.lineDetail[idx].weight = weight;

    this.setState({ parameters: newParam });
  };

  setUom = (uom, idx) => {
    let newParam = { ...this.state.parameters };
    newParam.lineDetail[idx].uom = uom;

    this.setState({ parameters: newParam });
  };

  setRotaDate = (rotaDate, idx) => {
    let newParam = { ...this.state.parameters };
    newParam.lineDetail[idx].rotaDate = rotaDate;

    this.setState({ parameters: newParam });
  };

  setBatch = (batch, idx) => {
    let newParam = { ...this.state.parameters };
    newParam.lineDetail[idx].batch = batch;

    this.setState({ parameters: newParam });
  };

  setRef3 = (ref3, idx) => {
    let newParam = { ...this.state.parameters };
    newParam.lineDetail[idx].ref3 = ref3;

    this.setState({ parameters: newParam });
  };

  setRef4 = (ref4, idx) => {
    let newParam = { ...this.state.parameters };
    newParam.lineDetail[idx].ref4 = ref4;

    this.setState({ parameters: newParam });
  };

  setDispoisition = (dispositionVal, disposition, idx) => {
    let newParam = { ...this.state.parameters };
    newParam.lineDetail[idx].disposition = disposition;
    newParam.lineDetail[idx].dispositionVal = dispositionVal;

    this.setState({ parameters: newParam });
  };

  setPackid = (packId, idx) => {
    let newParam = { ...this.state.parameters };
    newParam.lineDetail[idx].packId = packId;

    this.setState({ parameters: newParam });
  };

  addLineHandler = () => {
    let newParam = { ...this.state.parameters };
    let number = parseInt(newParam.lineDetail.length) + 1;
    let newLine = {
      number: number,
      productVal: null,
      product: null,
      qty: null,
      weight: null,
      uom: null,
      rotaDate: null,
      batch: null,
      ref3: null,
      ref4: null,
      dispositionVal: null,
      disposition: null,
      packId: null
    };
    newParam.lineDetail = [...newParam.lineDetail, newLine];
    this.setState({ parameters: newParam });
  };

  removeLineHandler = (idx) => {
    let param = { ...this.state.parameters };

    if (param.lineDetail.length == 1) {
      alert("line detail must have at least 1 product");
      return;
    }
    this.setState({deleteProcessed:true})
    let idxx = idx - 1;
    param.lineDetail.splice(idxx, 1);

    param.lineDetail.map((data, idx) => {
      data.number = idx + 1;
    });
    this.setState({ parameters: param, deleteProcessed:false });
  };

  createSalesOrder = () => {
    let parameters = this.state.parameters;
    axios
      .post(endpoint.salesOrderCreate, parameters, {
        headers: headers
      })
      .then((res) => {
        this.props.closemodal();
        swal({
          title: "Sales order created successfully!",
          text: res.data.message,
          icon: "success",
          button: {
            text: "Ok",
            className: "btn btn-primary"
          }
        });

        this.setState(
          {
            parameters: reset(this.props.resources),
            tab1isactive: !this.state.tab1isactive,
            tab2isactive: !this.state.tab2isactive
          },
          () => this.props.loadSalesOrder()
        );
      })

      .catch((error) => {
        swal({
          title: "Failed to create sales order",
          text: error.message,
          icon: "error",
          button: {
            text: "Ok",
            className: "btn btn-primary"
          }
        });
        this.tabhandler();
      });
  };

  render() {
    let clientName = [];
    let clientValue = [];

    if (this.props.clientdata) {
      this.props.clientdata.map((data) => {
        let name = data.code + " ( " + data.name + " )";
        clientName.push(name);
        clientValue.push(data.code);
      });
    }
    return (
      <Modal
        className="SOCreate "
        isOpen={this.props.showmodal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 800 }}
        toggle={true}
      >
        <div className="createModals">
          <ModalHeader style={{ marginTop: "1%" }}>
            <div style={{ display: "inline flex", marginLeft: "30px" }}>
              <label className="iconU-createModal" />
              <label className="font">
                <h2>Create Sales Order</h2>
              </label>
            </div>
            <p color="primary" onClick={() => this.close()}>
              <i
                className="iconU-close"
                style={{ fontSize: "1.6em", marginLeft: "-3em" }}
                aria-hidden="true"
              />
            </p>
          </ModalHeader>

          <ModalHeader className="clickTabs" style={{ marginTop: "-40px" }}>
            <div>
              <div className="createdecs">
                Enter delivery and product details to create a new Sales Order
              </div>
              <div className="tabs font">
                <div
                  style={{ color: "#919191" }}
                  onClick={() => this.tabhandler()}
                  className={
                    "tab1 " + (this.state.tab1isactive ? "isactivefont" : null)
                  }
                >
                  <img
                    className="numberimg"
                    style={{ width: "9%" }}
                    src={this.state.tab1isactive ? oneactive : oneinactive}
                  />{" "}
                  Order & Product Details
                </div>
                <div
                  style={{ color: "#919191" }}
                  onClick={() => this.tabhandler()}
                  className={
                    "tab2 tab-review " +
                    (this.state.tab2isactive ? "isactivefont" : null)
                  }
                >
                  <img
                    className="numberimg "
                    style={{ width: "22%" }}
                    src={this.state.tab1isactive ? twoinactive : twoactive}
                  />{" "}
                  Review
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalBody style={{ width: "100%" }}>
            {this.state.tab1isactive ? (
              <Tab1CreateSO
                userLevel={Authentication.getUserLevel()}
                clientVal={clientValue}
                clientName={clientName}
                productdata={this.props.productdata}
                dispositiondata={this.props.dispositiondata}
                resources={this.props.resources}
                parameters={this.state.parameters}
                tabhandler={() => this.tabhandler()}
                tab1IsActive={this.state.tab1isactive}
                getIdentity={(customerVal, customerName) =>
                  this.getIdentity(customerVal, customerName)
                }
                getUom={(productVal) => this.getUom(productVal)}
                uomdata={this.state.uomdata}
                setSite={(siteVal, site) => this.setSite(siteVal, site)}
                setClient={(clientVal) => this.setClient(clientVal, clientName)}
                setOrderType={(orderTypeVal, orderType) =>
                  this.setOrderType(orderTypeVal, orderType)
                }
                setOrderId={(data) => this.setOrderId(data)}
                setDeliveryDate={(data) => this.setDeliveryDate(data)}
                setCustomerOrderRef={(data) => this.setCustomerOrderRef(data)}
                setVendorOrderRef={(data) => this.setVendorOrderRef(data)}
                setDeliveryInstruction={(data) =>
                  this.setDeliveryInstruction(data)
                }
                setCustomer={(customerVal, customer) =>
                  this.setCustomer(customerVal, customer)
                }
                setAddress1={(data) => this.setAddress1(data)}
                setAddress2={(data) => this.setAddress2(data)}
                setAddress3={(data) => this.setAddress3(data)}
                setAddress4={(data) => this.setAddress4(data)}
                setAddress5={(data) => this.setAddress5(data)}
                setCity={(data) => this.setCity(data)}
                setPostCode={(data) => this.setPostCode(data)}
                setStates={(data) => this.setStates(data)}
                setCountry={(data) => this.setCountry(data)}
                setProduct={(productVal, product, idx) =>
                  this.setProduct(productVal, product, idx)
                }
                setQty={(qty, idx) => this.setQty(qty, idx)}
                setWeight={(weight, idx) => this.setWeight(weight, idx)}
                setUom={(uom, idx) => this.setUom(uom, idx)}
                setRotaDate={(rotaDate, idx) => this.setRotaDate(rotaDate, idx)}
                setBatch={(batch, idx) => this.setBatch(batch, idx)}
                setRef3={(ref3, idx) => this.setRef3(ref3, idx)}
                setRef4={(ref4, idx) => this.setRef4(ref4, idx)}
                setDispoisition={(dispositionVal, disposition, idx) =>
                  this.setDispoisition(dispositionVal, disposition, idx)
                }
                setPackid={(packid, idx) => this.setPackid(packid, idx)}
                addLineHandler={() => this.addLineHandler()}
                removeLineHandler={(idx) => this.removeLineHandler(idx)}
                validation={() => this.validation()}
                validationCheck={this.state.validation}
                deleteProcessed = {this.state.deleteProcessed}
              />
            ) : (
              <Tab2CreateSO
                parameters={this.state.parameters}
                close={() => this.close()}
                tabhandler={() => this.tabhandler()}
                createSalesOrder={() => this.createSalesOrder()}
              />
            )}
          </ModalBody>
        </div>
      </Modal>
    );
  }
}
export default SalesOrderCreate;
