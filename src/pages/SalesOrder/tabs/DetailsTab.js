import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import _ from 'lodash'
import DatePicker from 'shared/DatePicker'

const Required = ({ error, id }) => {
  return <span className="pl-2 text-danger font-12">{error[id]}</span>
}
const validation = (val) => {
  let error = {}
  let { site, client, orderType, deliveryDate, orderId, shipToAddress1, postCode, state, orderLine } = val
  if (!site) {
    error.site = 'Please select site'
  }
  if (!orderType) {
    error.orderType = 'Please select order type'
  }
  if (!client) {
    error.client = 'Please select client'
  }
  if (!deliveryDate) {
    error.deliveryDate = 'Delivery date must have a value'
  }
  if (!orderId) {
    error.orderId = 'Order no. cannot be empty'
  }
  if (!!orderId && orderId.length < 4) {
    error.orderId = 'Order no. must have min 5 characters'
  }
  if (!shipToAddress1) {
    error.shipToAddress1 = 'Address 1 cannot be empty'
  }
  if (!postCode) {
    error.postCode = 'Postcode cannot be empty'
  }
  if (!!postCode && postCode.length < 4) {
    error.postCode = 'Postcode must have min 4 characters'
  }
  if (!state) {
    error.state = 'State cannot be empty'
  }
  for (const [i, v] of orderLine.entries()) {
    console.log(i, v)
  }

  return error
}

// fix synthetic event warning
const debounceEventHandler = (...args) => {
  const debounced = _.debounce(...args)
  return (e) => {
    e.persist()
    return debounced(e)
  }
}

class CreateTab extends React.Component {
  state = {
    site: null, client: null, status: null, orderType: null,
    orderLine: [{}], error: {},
    siteData: [], clientData: [], orderTypeData: []
  }
  // remove first option (all)
  componentDidUpdate(nextProps) {
    let { siteData, clientData, orderTypeData } = this.props
    if (siteData && nextProps.siteData !== siteData) {
      siteData.splice(0, 1)
      this.setState({ siteData })
    }
    if (clientData && nextProps.clientData !== clientData) {
      clientData.splice(0, 1)
      this.setState({ clientData })
    }
    if (orderTypeData && nextProps.orderTypeData !== orderTypeData) {
      orderTypeData.splice(0, 1)
      this.setState({ orderTypeData })
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  checkOrderId = async (e) => {
    let { error, client } = this.state
    let orderId = e.target.value
    if (!client) {
      error.orderId = 'Please select client first'
      return this.setState({ error })
    }
    delete error.orderId
    console.log('find order no:', client.value, orderId)
    if (orderId) {
      const { data } = await axios.post('/orderCheck', {
        "client": client.value,
        "order_no": orderId
      })
      if (data.message !== 'available') {
        error.orderId = 'Order number exist'
      }
    }
    this.setState({ error, orderId })
  }
  findCustomer = (val) => {
    if (val) {
      console.log('find customer: ', val)
    }
  }

  addLine = (id) => {
    this.setState({ orderLine: [...this.state.orderLine, {}] })
  }
  removeLine = (i) => {
    let orderLine = Object.assign([], this.state.orderLine)
    if (i !== 0) {
      orderLine.splice(i, 1)
    }
    this.setState({ orderLine })
  }
  next = (e) => {
    let { site, client, orderType, deliveryDate, orderId, shipToAddress1, postCode, state } = this.state
    const error = validation(this.state)
    if (error) {
      return this.setState({ error })
    } else {
      console.log(orderType)
    }
  }
  render() {
    const { error, site, client, orderType, orderLine, customer,
      siteData, clientData, orderTypeData
    } = this.state
    return <Container className="p-4">
      <h3 className="text-primary font-20">Order Details</h3>
      <Row className="pt-1">
        <Col lg="3">
          <label className="required">Site</label>
          <Select value={site} options={siteData} onChange={val => this.setState({ site: val })} placeholder="Site" required />
          <Required id="site" error={error} />
        </Col>
        <Col lg="3">
          <label className="required">Order Type</label>
          <Select value={orderType} options={orderTypeData} onChange={val => this.setState({ orderType: val })} placeholder="Order Type" required />
          <Required id="orderType" error={error} />
        </Col>
        <Col lg="3">
          <label>Customer Order Ref</label>
          <input name="customerOrderRef" type="text" onChange={this.handleChange} className="form-control" placeholder="Customer Order Ref" />
        </Col>
        <Col lg="3">
          <label className="required">Delivery Date</label>
          <DatePicker
            className="form-control"
            placeholder="Delivery Date"
            getDate={(date) => this.setState({ deliveryDate: date })}
          />
          <Required id="deliveryDate" error={error} />
        </Col>
      </Row>
      <Row className="pt-1">
        <Col lg="3">
          <label className="required">Client</label>
          <Select value={client} options={clientData} onChange={val => this.setState({ client: val })} placeholder="Client" required />
          <Required id="client" error={error} />
        </Col>
        <Col lg="3">
          <label className="required">Order No</label>
          <input name="orderId" type="text" onChange={debounceEventHandler(this.checkOrderId, 300)} className="form-control text-uppercase" placeholder="Order No" required />
          <Required id="orderId" error={error} />
        </Col>
        <Col lg="3">
          <label>Vendor Order Ref</label>
          <input name="vendorOrderRef" type="text" onChange={this.handleChange} className="form-control" placeholder="Vendor Order Ref" />
        </Col>
        <Col lg="3">
          <label>Delivery Instructions</label>
          <textarea name="deliveryInstruction" type="text" onChange={this.handleChange} className="form-control" placeholder="Delivery Instructions" required />
        </Col>
      </Row>

      <h3 className="text-primary font-20 mt-4">Customer Details</h3>
      <Row className="pt-1">
        <Col lg="3">
          <label>Customer</label>
          <Select value={customer} options={[]} placeholder="Customer Name or ID"
            onInputChange={_.debounce(this.findCustomer, 300)} onChange={val => this.setState({ customer: val })}
          />
        </Col>
      </Row>
      <Row className="pt-1">
        <Col lg="3">
          <label className="required">Address 1</label>
          <input name="shipToAddress1" type="text" onChange={this.handleChange} className="form-control" placeholder="Address 1" required />
          <Required id="shipToAddress1" error={error} />
        </Col>
        <Col lg="3">
          <label>Address 2</label>
          <input name="shipToAddress2" type="text" onChange={this.handleChange} className="form-control" placeholder="Address 2" />
        </Col>
        <Col lg="3">
          <label>Address 3</label>
          <input name="shipToAddress3" type="text" onChange={this.handleChange} className="form-control" placeholder="Address 3" />
        </Col>
      </Row>
      <Row className="pt-1">
        <Col lg="3">
          <label>Address 4</label>
          <input name="shipToAddress4" type="text" onChange={this.handleChange} className="form-control" placeholder="Address 4" />
        </Col>
        <Col lg="3">
          <label>Address 5</label>
          <input name="shipToAddress5" type="text" onChange={this.handleChange} className="form-control" placeholder="Address 5" />
        </Col>
      </Row>
      <Row className="pt-1">
        <Col lg="3">
          <label>Suburb</label>
          <input name="city" type="text" onChange={this.handleChange} className="form-control" placeholder="Suburb" />
        </Col>
        <Col lg="3">
          <label className="required">Postcode</label>
          <input name="postCode" type="text" onChange={this.handleChange} className="form-control" placeholder="Postcode" required />
          <Required id="postCode" error={error} />
        </Col>
        <Col lg="3">
          <label className="required">State</label>
          <input name="state" type="text" onChange={this.handleChange} className="form-control" placeholder="State" required />
          <Required id="state" error={error} />
        </Col>
        <Col lg="3">
          <label>Country</label>
          <input name="country" type="text" onChange={this.handleChange} className="form-control" placeholder="Country" />
        </Col>
      </Row>

      <h3 className="text-primary font-20 mt-4">Line Details</h3>
      <div className="orderline scroll-x-y mb-2 pb-2">
        <table>
          <thead>
            <tr className="text-light-gray">
              <td><div className="c-1 text-center">#</div></td>
              <td><div className="c-3">Rotadate</div></td>
              <td><div className="c-3 required">Product</div></td>
              <td><div className="c-4">Description</div></td>
              <td><div className="c-3 required">Qty</div></td>
              <td><div className="c-2">Weight</div></td>
              <td><div className="c-3 required">UOM</div></td>
              <td><div className="c-2">Batch</div></td>
              <td><div className="c-2">Ref3</div></td>
              <td><div className="c-2">Ref4</div></td>
              <td><div className="c-2">Dispotition</div></td>
              <td><div className="c-3">Pack ID</div></td>
              <td><div className="c-1">Action</div></td>
            </tr>
          </thead>
          <tbody>
            {orderLine.length && orderLine.map((ld, i) => {
              return <tr className="py-1 text-center orderline-row">
                <td className="px-1"><input value={i + 1} className="form-control text-center" readOnly /></td>
                <td className="px-1"><DatePicker className="form-control" getDate={(date) => { console.log(date) }} placeholder="Select Date"/></td>
                <td className="px-1"><Select value={site} options={siteData} onChange={val => this.setState({ site: val })} placeholder="Product" required /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="Choose a product first" readOnly /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="Qty" /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="Weight" /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="UOM" /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="Batch" /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="Ref 3" /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="Ref 4" /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="Disposition" /></td>
                <td className="px-1"><input name="" type="text" onChange={this.handleChange} className="form-control" placeholder="Pack ID" /></td>
                <td className="px-1">
                  <button className="btn btn-light-gray btn-block" onClick={() => this.removeLine(i)}><i className="iconU-delete"></i></button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <button className="btn btn-light-gray m-0" onClick={this.addLine}>+ Add Line</button>

      <Row className="mt-3">
        <Col lg={2}>
          <button className="btn btn-primary">{'< Back'}</button>
        </Col>
        <Col lg={8}>
          <div className="text-center text-secondary mt-2">
            <span className="text-success">Success,</span> order <b>PO182913822</b> has been successfully submitted for processing
          </div>
        </Col>
        <Col lg={2} className="text-right">
          <button className="btn btn-primary" onClick={this.next}>{'Next >'}</button>
        </Col>
      </Row>
    </Container>
  }
}

export default CreateTab