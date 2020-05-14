import React, { Component } from "react";
import Dropdown from "../../../../AppComponent/Dropdown";
import DatePicker from "../../../../AppComponent/DatePicker";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  headerValidation,
  lineDetailValidation
} from "../../Components/Validation/Validation";
import AutoComplete from "../../../../AppComponent/AutoComplete";
import OrderLine from "./OrderLine";
import OrderLine2 from "./OrderLine2";

class Tab1CreateSO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1isactive: true,
      tab2isactive: false
    };
  }

  setData = () => {
    this.props.tabhandler();
  };

  render = () => {
    const {
      company,
      site,
      siteVal,
      client,
      clientName,
      orderId,
      customerOrderRef,
      vendorOrderRef,
      customerVal,
      orderType,
      orderTypeVal,
      deliveryDate,
      customer,
      shipToAddress1,
      shipToAddress2,
      shipToAddress3,
      shipToAddress4,
      shipToAddress5,
      city,
      postCode,
      state,
      country,
      deliveryInstruction
    } = this.props.parameters.header;

    const {
      emptySite,
      emptyClient,
      emptyOrderType,
      emptyOrderNo,
      emptyDeliveryDate,

      emptyCustomer,
      emptyShipToAddress1,
      emptyPostCode,
      emptyState
    } = this.props.validationCheck.header;

    let emptyClassSite = "nmtrField";
    let emptyClassClient = "nmtrField";
    let emptyClassOrderType = "nmtrField";
    let emptyClassOrderNo = "nmtrField";
    let emptyClassDeliveryate = "nmtrField";

    let emptyClassCustomer = "nmtrField";
    let emptyClassShipToAddress1 = "nmtrField";
    let emptyClassPostCode = "nmtrField";
    let emptyClassState = "nmtrField";

    if (emptySite) emptyClassSite = "mtrFieldSelect";
    if (emptyClient) emptyClassClient = "mtrField";
    if (emptyOrderType) emptyClassOrderType = "mtrFieldSelect";
    if (emptyOrderNo) emptyClassOrderNo = "mtrField";
    if (emptyDeliveryDate) emptyClassDeliveryate = "mtrField";

    if (emptyCustomer) emptyClassCustomer = "mtrFieldSelect";
    if (emptyShipToAddress1) emptyClassShipToAddress1 = "mtrField";
    if (emptyPostCode) emptyClassPostCode = "mtrField";
    if (emptyState) emptyClassState = "mtrField";

    let supplierName = [];
    this.props.resources.supplier.name.map((data, idx) => {
      let code = this.props.resources.supplier.code[idx];
      supplierName.push(code + " ( " + data + " )");
    });
    return (
      <div className="tabcontents">
        <h3 className="fonts">Order Details</h3>
        <table className="createpotables">
          <tr>
            <th className="required-field">Site</th>
            <th className="required-field">Order Type</th>
            <th>Customer Order Ref</th>
            <th className="required-field">Delivery Date</th>
          </tr>
          <tr>
            <td style={{ width: "396px" }}>
              <Dropdown
                optionSelected={siteVal}
                getValue={(siteVal, site) => this.props.setSite(siteVal, site)}
                placeHolder="Site"
                style={{ minWidth: "100%", zIndex: 20 }}
                optionList={this.props.resources.site.name.toString()}
                optionValue={this.props.resources.site.code.toString()}
              />
            </td>

            <td style={{ width: "396px" }}>
              <Dropdown
                optionSelected={orderTypeVal}
                getValue={(orderTypeVal, orderType) =>
                  this.props.setOrderType(orderTypeVal, orderTypeVal)
                }
                placeHolder="Order Type"
                style={{ minWidth: "100%" }}
                optionList={this.props.resources.orderType.name.toString()}
                optionValue={this.props.resources.orderType.code.toString()}
              />
            </td>

            <td style={{ width: "396px" }}>
              <input
                value={customerOrderRef}
                onChange={(e) => this.props.setCustomerOrderRef(e.target.value)}
                maxLength="40"
                minLength="4"
                id="customerOrderRef"
                className="form-control put "
                placeholder="Customer Order Ref"
              />
            </td>

            <td style={{ width: "396px" }}>
              <DatePicker
                getDate={(date) => this.props.setDeliveryDate(date)}
                style={{ minWidth: "100%" }}
              />
            </td>
          </tr>

          <tr>
            <td style={{ width: "396px" }} className={emptyClassSite}>{emptySite}</td>
            <td style={{ width: "396px" }} className={emptyClassOrderType}>{emptyOrderType}</td>
            <td style={{ width: "396px" }} className="nmtrField"></td>
            <td style={{ width: "396px" }} className={emptyClassDeliveryate}>{emptyDeliveryDate}</td>
          </tr>

          <tr>
            <th className="required-field">Client</th>
            <th className="required-field">Order No</th>
            <th>Vendor Order Ref</th>
            <th>Delivery Instructions</th>
          </tr>
          <tr>
            <td style={{ width: "396px" }} className="verticalAlignTop">
              {this.props.userLevel == "administrator" ? (
                <Dropdown
                  optionSelected={client}
                  getValue={(clientVal, clientName) =>
                    this.props.setClient(clientVal, clientName)
                  }
                  placeHolder="Client"
                  style={{ minWidth: "100%", zIndex:10 }}
                  optionList={this.props.clientName.toString()}
                  optionValue={this.props.clientVal.toString()}
                />
              ) : (
                  <input
                    readOnly
                    value={client}
                    id="client"
                    className="form-control put "
                    placeholder="Client"
                  />
                )}
              <div className={emptyClassClient + " verticalAlignTop"}>
                {emptyClient}
              </div>
            </td>
            <td style={{ width: "396px" }} className="verticalAlignTop">
              <input
                value={orderId}
                onChange={(e) => this.props.setOrderId(e.target.value.toUpperCase())}
                id="orderId"
                className="form-control put "
                placeholder="Order No"
              />
              <span className={emptyClassOrderNo}>{emptyOrderNo}</span>
            </td>

            <td style={{ width: "396px" }} className="verticalAlignTop">
              <input
                value={vendorOrderRef}
                onChange={(e) => this.props.setVendorOrderRef(e.target.value)}
                maxLength="40"
                id="vendorOrderRef"
                className="form-control put "
                placeholder="Vendor Order Ref"
              />
            </td>

            <td style={{ width: "396px" }} className="verticalAlignTop">
              <textarea
                value={deliveryInstruction}
                onChange={(e) =>
                  this.props.setDeliveryInstruction(e.target.value)
                }
                id="deliveryInstruction"
                className="form-control put dlv"
                style={{ height: "8em" }}
                placeholder="Delivery Instructions"
              />
            </td>
          </tr>

          <tr>
            <td style={{ width: "396px" }} className="nmtrField"></td>
            <td style={{ width: "396px" }} className="nmtrField"></td>
          </tr>
        </table>
        <h3 className="fonts">Customer Details</h3>
        <table className="createpotables">
          <tr>
            <th>Customer </th>            
          </tr>
          <tr>
            <td style={{ width: "396px" }} className="verticalAlignTop">
              {this.props.resources.identity ? (
                <input
                  value={customer}
                  onChange={(e) => this.props.setCustomer(e.target.value)}
                  id="customerName"
                  className="form-control put "
                  placeholder="Costumer"
                />
              ) : (
                  
                  <div className='so-supp'>
                    <AutoComplete
                    optionSelected  ={supplierName}
                    getValue        ={( customerVal, product) =>
                      this.props.getIdentity(customerVal, 1)
                                      }
                    placeHolder     ="Supplier"
                    optionList      ={supplierName.toString()}
                    optionValue     ={this.props.resources.supplier.code.toString()}
                    style={{ minWidth: "100%"}}
                  />
                  </div>
                )}

              <input value={customerVal} type="text" id="customerCode" hidden />
            </td>
          </tr>

          <tr>
            <th className="required-field">Address 1</th>
            <th>Address 2</th>
            <th>Address 3</th>
          </tr>

          <tr>
          <td style={{ width: "396px" }}>
              <input
                value={shipToAddress1}
                onChange={(e) => this.props.setAddress1(e.target.value)}
                id="shipToAddress1"
                maxLength="200"
                className="form-control put "
                placeholder="Address 1"
              />
            </td>
            <td style={{ width: "396px" }}>
              <input
                value={shipToAddress2}
                onChange={(e) => this.props.setAddress2(e.target.value)}
                id="shipToAddress2"
                maxLength="201"
                className="form-control put "
                placeholder="Address 2"
              />
            </td>
            <td style={{ width: "396px" }}>
              <input
                value={shipToAddress3}
                onChange={(e) => this.props.setAddress3(e.target.value)}
                id="shipToAddress3"
                maxLength="203"
                className="form-control put "
                placeholder="Address 3"
              />
            </td>
          </tr>

          <tr>
            <td style={{ width: "396px" }} className={emptyClassShipToAddress1}>{emptyShipToAddress1}</td>
            <td style={{ width: "396px" }} className="nmtrField"></td>
            <td style={{ width: "396px" }} className="nmtrField"></td>
          </tr>

          <tr>
            <th>Address 4</th>
            <th>Address 5</th>
          </tr>
          <tr>
            <td style={{ width: "396px" }}>
              <input
                value={shipToAddress4}
                onChange={(e) => this.props.setAddress4(e.target.value)}
                id="shipToAddress4"
                maxLength="204"
                className="form-control put "
                placeholder="Address 4"
              />
            </td>

            <td style={{ width: "396px" }}>
              <input
                value={shipToAddress5}
                onChange={(e) => this.props.setAddress5(e.target.value)}
                id="shipToAddress5"
                maxLength="205"
                className="form-control put "
                placeholder="Address 5"
              />
            </td>
          </tr>

          <tr>
            <td style={{ width: "396px" }} className="nmtrField"></td>
            <td style={{ width: "396px" }} className="nmtrField"></td>
          </tr>

          <tr>
            <th>Suburb</th>
            <th className="required-field">Postcode</th>
            <th className="required-field">State</th>
            <th>Country</th>
          </tr>
          <tr>
            <td style={{ width: "396px" }}>
              <input
                value={city}
                onChange={(e) => this.props.setCity(e.target.value)}
                id="city"
                maxLength="150"
                className="form-control put "
                placeholder="Suburb"
              />
            </td>

            <td style={{ width: "396px" }}>
              <input
                value={postCode}
                onChange={(e) => this.props.setPostCode(e.target.value)}
                id="postCode"
                maxLength="5"
                className="form-control put "
                placeholder="Postcode"
              />
            </td>

            <td style={{ width: "396px" }}>
              <input
                value={state}
                onChange={(e) => this.props.setStates(e.target.value)}
                id="state"
                maxLength="150"
                className="form-control put "
                placeholder="State"
              />
            </td>

            <td style={{ width: "396px" }}>
              <input
                value={country}
                onChange={(e) => this.props.setCountry(e.target.value)}
                id="country"
                maxLength="30"
                className="form-control put "
                placeholder="Country"
              />
            </td>
          </tr>

          <tr>
            <td style={{ width: "396px" }} className="nmtrField"></td>
            <td style={{ width: "396px" }} className={emptyClassPostCode}>{emptyPostCode}</td>
            <td style={{ width: "396px" }} className={emptyClassState}>{emptyState}</td>
            <td style={{ width: "396px" }} className="nmtrField"></td>
          </tr>
        </table>

        <br />
        <tr>
          <td style={{ color: "transparent" }}>1</td>
        </tr>

        <h3 className="fonts">Line Details</h3>
        
        <div className='scroll-x-y-visible'> 
        <table className=''>
              <tr>
                <th>
                  <div id='orderline-header-number-id'>#</div>
                </th>

                <th>
                  <div id='orderline-header-product-id' className='required-field'>Product</div>
                </th>

                <th>
                  <div id='orderline-header-description-id'>Description</div>
                </th>

                <th>
                  <div id='orderline-header-qty-id' className='required-field'>Qty</div>
                </th>

                <th>
                  <div id='orderline-header-weight-id'>Weight</div>
                </th>

                <th>
                  <div id='orderline-header-uom-id' className='required-field'>UOM</div>
                </th>

                <th>
                  <div id='orderline-header-rotadate-id'>Rota Date</div>
                </th>

                <th>
                  <div id='orderline-header-batch-id'>Batch</div>
                </th>

                <th>
                  <div id='orderline-header-ref3-id'>Ref3</div>
                </th>

                <th>
                  <div id='orderline-header-ref4-id'>Ref4</div>
                </th>

                <th>
                  <div id='orderline-header-disposition-id'>Disposition</div>
                </th>

                <th>
                  <div id='orderline-header-packid-id'>Pack Id</div>
                </th>
              </tr>
            </table>
          {this.props.parameters.lineDetail.map((data, idx) => {
            return (
              <div className={this.props.deleteProcessed ? 'hidden' : null}>
                <OrderLine
                  parameters={data}
                  parametersLength={this.props.parameters.lineDetail.length}
                  idx={idx}
                  getUom={(productVal) => this.props.getUom(productVal)}
                  uomdata={this.props.uomdata}
                  productdata={this.props.productdata}
                  dispositiondata={this.props.dispositiondata}
                  setProduct={(productVal, product, idx) =>
                    this.props.setProduct(productVal, product, idx)
                  }
                  setQty={(qty, idx) => this.props.setQty(qty, idx)}
                  setWeight={(weight, idx) => this.props.setWeight(weight, idx)}
                  setUom={(uom, idx) => this.props.setUom(uom, idx)}
                  setRotaDate={(rotaDate, idx) =>
                    this.props.setRotaDate(rotaDate, idx)
                  }
                  setBatch={(batch, idx) => this.props.setBatch(batch, idx)}
                  setRef3={(ref3, idx) => this.props.setRef3(ref3, idx)}
                  setRef4={(ref4, idx) => this.props.setRef4(ref4, idx)}
                  setDispoisition={(disposition, dispositionVal, idx) =>
                    this.props.setDispoisition(disposition, dispositionVal, idx)
                  }
                  setPackid={(packid, idx) => this.props.setPackid(packid, idx)}
                  removeLineHandler={(idx) => this.props.removeLineHandler(idx)}
                  nextClicked = {this.props.nextClicked}
                />
              </div>
            );
          })}
          <button
            onClick={() => this.props.addLineHandler()}
            type="button"
            className="btn btn-light addlineSO default-box-height"
          >
            + Add Line
        </button>
        </div>

        {this.state.tab2isactive ? (
          this.submit()
        ) : (
            <Button
              onClick={() => this.setData()}
              color="primary"
              className="btnsearch next btnleft btn-next default-box-height"
            >
              <label className="font btnLabel ">Next<i className="fa fa-chevron-right " style={{fontSize: '10pt', paddingLeft: '5px'}}></i></label>
            </Button>
          )}
      </div>
    );
  };
}

Tab1CreateSO.defaultProps = {
  resources: []
};

export default Tab1CreateSO;
