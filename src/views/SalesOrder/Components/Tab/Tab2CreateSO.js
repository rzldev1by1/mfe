import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import OrderLineReview from './OrderLineReview'
import OrderLineReview2 from './OrderLineReview2'
import moment from 'moment'

class Tab2CreateSO extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab1isactive: true,
      tab2isactive: false,
    }
  }

  close = () => {
    this.props.close()
  }
  tabhandler = () => {
    this.props.tabhandler()
  }


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
      orderType,
      orderTypeVal,
      deliveryDate,
      customer,
      customerVal,
      shipToAddress1,
      shipToAddress2,
      shipToAddress3,
      shipToAddress4,
      shipToAddress5,
      city,
      postCode,
      state,
      country,
      deliveryInstruction,

    } = this.props.parameters.header

    let deliveryDates = moment(deliveryDate)
    deliveryDates = deliveryDates.format('DD/MM/YYYY')
    return (
      <div className="tabcontents">
        <h3 className="fonts">Order Details</h3>

        <table className="createpotable">
          <tr>
            <th>Site</th>
            <th>Order Type</th>
            <th>Customer Order Ref</th>
            <th>Delivery Date</th>
          </tr>
          <tr>
            <td><input value={site} className="form-control" readOnly /></td>
            <td><input value={orderType} className="form-control" readOnly /></td>
            <td><input value={customerOrderRef} className="form-control" readOnly /></td>
            <td><input value={deliveryDates} className="form-control" readOnly /></td>
          </tr>

          <tr>
            <th>Client</th>
            <th>Order Number</th>
            <th>Vendor Order Ref</th>
            <th>Delivery Instruction</th>
          </tr>
          <tr>
            <td className='verticalAlignTop'><input value={clientName} className="form-control" readOnly /></td>
            <td className='verticalAlignTop'><input value={orderId} className="form-control" readOnly /></td>
            <td className='verticalAlignTop'><input value={vendorOrderRef} className="form-control" readOnly /></td>
            <td><textarea value={deliveryInstruction} className="form-control put dlv" style={{ height: "8em" }} readOnly /></td>
          </tr>
        </table>

        <tr style={{ color: "transparent" }}>1</tr>
        <h3 className="fonts">Customer Details</h3>
        <table className="createpotable">
          <tr>
            <th>Customer</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>Address 3</th>
          </tr>
          <tr>
            <td><input value={customerVal ? customerVal + ' ( ' + customer + ' )' : null} className="form-control put " readOnly /></td>
            <td><input value={shipToAddress1} className="form-control put " readOnly /> </td>
            <td><input value={shipToAddress2} className="form-control put " readOnly /> </td>
            <td><input value={shipToAddress3} className="form-control put " readOnly /> </td>
          </tr>
          <tr>
            <th>Address 4</th>
            <th>Address 5</th>
          </tr>
          <tr>
            <td><input value={shipToAddress4} className="form-control put " readOnly /></td>
            <td><input value={shipToAddress5} className="form-control put " readOnly /> </td>
          </tr>
          <tr>
            <th>Suburb</th>
            <th>Postcode</th>
            <th>State</th>
            <th>Country</th>
          </tr>
          <tr>
            <td><input value={city} className="form-control put " readOnly /> </td>
            <td><input value={postCode} className="form-control put " readOnly /> </td>
            <td><input value={state} className="form-control put " readOnly /></td>
            <td><input value={country} className="form-control put " readOnly /> </td>
          </tr>
        </table>

        <br />
        <h3 className="fonts">Line Details</h3>

        <div className='scrollx'>
          <div className="line">
            <table className=''>
              <tr>
                <th>
                  <div id='orderline-header-number-id'>#</div>
                </th>

                <th>
                  <div id='orderline-header-product-id'>Product</div>
                </th>

                <th>
                  <div id='orderline-header-description-id'>Description</div>
                </th>

                <th>
                  <div id='orderline-header-qty-id'>Qty</div>
                </th>

                <th>
                  <div id='orderline-header-weight-id'>Weight</div>
                </th>

                <th>
                  <div id='orderline-header-uom-id'>UOM</div>
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
          </div>
          {
            this.props.parameters.lineDetail.map((data, idx) => {
              return (
                <div>
                  <OrderLineReview parameters={data}
                    idx={idx} />
                  {/* <OrderLineReview2 parameters={data}
                  idx={idx} /> */}
                </div>
              )
            })
          }
        </div>

        <tr>
          <td style={{ color: "transparent" }}>1</td>
        </tr>
        <Button onClick={() => this.tabhandler()} color="primary" className="btnsearch back" ><label className="font">Back</label></Button>
        <Button onClick={() => this.props.createSalesOrder()} color="primary" className="btnsearch submit btnleft" style={{ marginTop: "-50px" }} ><label className="font">Submit</label></Button>
      </div >)
  }

  linedetailsrowreview = (line, i) => {
    return (
      <table>
        <tr>
          <td hidden id={i + 1}></td>
          <td style={{ width: "2%", textAlign: "center" }}><input value={i + 1} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "12%" }}><input value={line.product} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "12%" }}><input value={line.product} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "3%" }}><input value={line.qty} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "6%" }}><input value={line.uom} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "6%" }}><input value={line.rotaDate} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "6%" }}><input value={line.batch} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "5%" }}><input value={line.ref3} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "5%" }}><input value={line.ref4} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "6%" }}><input value={line.disposition} className="form-control inputs pec" readOnly /></td>
          <td style={{ width: "6%" }}><input value={line.packId} className="form-control inputs pec" readOnly /></td>
        </tr>
      </table>
    )
  }


} export default Tab2CreateSO