import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import _ from 'lodash'

import endpoints from 'helpers/endpoints'
import DatePicker from 'shared/DatePicker'
import validations from './validations'

const Required = ({ error, id }) => {
  return <span className="text-error text-danger font-12">{error && error[id]}</span>
}
// const debounceEventHandler = (...args) => {
//   const debounced = _.debounce(...args)
//   return (e) => {
//     e.persist()
//     return debounced(e)
//   }
// }

class CreateTab extends React.Component {
  state = {
    overflow: [],
    orderLine: [{}], error: {},
    siteData: this.props.siteData, clientData: this.props.clientData, orderTypeData: this.props.orderTypeData,
    // orderId: 'AB29123', shipToAddress1: 'Ark Street 12', postCode: '291923', state: 'Victoria',
  }
  componentDidMount() {
    this.getDisposition()
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
  getProduct = async () => {
    const url = `${endpoints.getProduct}?client=${this.state.client.value}`
    const { data } = await axios.get(url)
    const productData = data.code.map((c, i) => ({ value: c, label: c, i }))
    this.setState({ productData, productDataName: data.name })
  }
  getDisposition = async () => {
    const url = `${endpoints.getDisposition}`
    const { data } = await axios.get(url)
    const dispositionData = data.code.map((c, i) => ({ value: c, label: c, i }))
    this.setState({ dispositionData })
  }
  getUom = async (product) => {
    // https://apidev.microlistics.tech/dropdown/getuom?client=AESOP&&product=1002
    const client = this.state.client.value
    const url = `${endpoints.getUom}?client=${client}&product=${product}`
    const { data } = await axios.get(url)
    const uomData = data.uom.map((c, i) => ({ value: c, label: c }))
    this.setState({ uomData })
  }


  addLine = () => {
    const error = validations(this.state)
    this.setState({ error })
    // if (Object.keys(error).length> 1) {
    this.setState({ orderLine: [...this.state.orderLine, {}] })
    // }
  }
  removeLine = (i) => {
    let orderLine = Object.assign([], this.state.orderLine)
    // if (i !== 0) {
    orderLine.splice(i, 1)
    // }
    this.setState({ orderLine })
  }
  onSelectChange = (name, val) => {
    let { error } = this.state
    delete error[name]
    this.setState({ [name]: val }, () => {
      if (name === 'client') {
        this.getProduct()
      }
    })
  }
  onChange = (e) => {
    const { name, value } = e.target
    let { error } = this.state
    delete error[name]
    this.setState({ [name]: value, error })
  }
  lineChange = (i, e) => {
    const { name, value } = e.target
    const { orderLine } = this.state
    orderLine[i][name] = value
    this.setState({ orderLine })
  }
  lineSelectChange = (i, key, val) => {
    const { orderLine, error } = this.state
    if (error.orderLine && error.orderLine.length) {
      delete error.orderLine[i][key]
    }
    if (key === 'productVal') {
      orderLine[i].product = this.state.productDataName[val.i]
      orderLine[i].productVal = val
    }
    if (key === 'dispositionVal') {
      orderLine[i].disposition = val.value
      orderLine[i].dispositionVal = val
    }
    if (key === 'uom') {
      orderLine[i].uom = val
    }
    this.setState({ orderLine, error }, () => {
      if (key === 'productVal') {
        this.getUom(val.value)
      }
    })
  }
  checkOrderId = async (e) => {
    let { error, client } = this.state
    let orderId = e.target.value
    this.setState({ orderId: orderId.toUpperCase() })
    // console.log('find order no:', client, orderId)
    if (!client) {
      error.orderId = 'Please select client first'
      return this.setState({ error })
    }
    if (!orderId) {
      error.orderId = 'Order no. cannot be empty'
      return this.setState({ error })
    }
    if (orderId.length < 5) {
      error.orderId = 'Order no. must have min 5 characters'
      return this.setState({ error })
    }
    delete error.orderId
    const { data } = await axios.post('/orderCheck', {
      "client": client.value,
      "order_no": orderId
    })
    if (data.message !== 'available') {
      error.orderId = 'Order number exist'
      return this.setState({ error })
    }
  }
  findCustomer = (val) => {
    if (val) {
      console.log('find customer: ', val)
    }
  }

  toggleOverflow = (i, key, val) => {
    let { overflow } = this.state
    overflow[i] = {}
    overflow[i][key] = val
    this.setState({ overflow })
  }
  next = (e) => {
    const error = validations(this.state)
    if (Object.keys(error).length) {
      return this.setState({ error })
    } else {
      let header = Object.assign({}, this.state)
      let lineDetail = header.orderLine
      delete header.error
      delete header.orderLine
      delete header.siteData
      delete header.orderTypeData
      delete header.clientData
      delete header.productData
      delete header.productDataName
      delete header.dispositionData
      delete header.uomData
      const payload = { header, lineDetail }
      this.props.submit(payload)
    }
  }

  render() {
    const { error, overflow, site, client, orderType, orderLine, customer,
      orderId, shipToAddress1, postCode, state,
      siteData, clientData, orderTypeData, productData, uomData, dispositionData,
    } = this.state

    return <Container className="px-5 py-4">
      <h3 className="text-primary font-20">Order Details</h3>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Site</label>
          <Select value={site || ''} options={siteData} onChange={val => this.onSelectChange('site', val)} placeholder="Site" required />
          <Required id="site" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order Type</label>
          <Select value={orderType || ''} options={orderTypeData} onChange={val => this.onSelectChange('orderType', val)} placeholder="Order Type" required />
          <Required id="orderType" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Customer Order Ref</label>
          <input name="customerOrderRef" onChange={this.onChange} className="form-control" placeholder="Customer Order Ref" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Delivery Date</label>
          <DatePicker
            className="form-control"
            placeholder="Delivery Date"
            getDate={(date) => {
              delete error['deliveryDate']
              this.setState({ deliveryDate: date, error })
            }}
          />
          <Required id="deliveryDate" error={error} />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Client</label>
          <Select value={client || ''} options={clientData} onChange={val => this.onSelectChange('client', val)} placeholder="Client" required />
          <Required id="client" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order No</label>
          <input name="orderId" type="text" value={orderId || ''} onChange={this.checkOrderId} className="form-control" placeholder="Order No" required />
          <Required id="orderId" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Vendor Order Ref</label>
          <input name="vendorOrderRef" onChange={this.onChange} className="form-control" placeholder="Vendor Order Ref" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Delivery Instructions</label>
          <textarea name="deliveryInstruction" onChange={this.onChange} className="form-control" placeholder="Delivery Instructions" required />
        </Col>
      </Row>

      <h3 className="text-primary font-20">Customer Details</h3>
      <Row>
        <Col lg="3" className="mb-3">
          <label className="text-muted mb-0">Customer</label>
          <Select value={customer || ''} options={[]} placeholder="Customer Name or ID"
            onInputChange={_.debounce(this.findCustomer, 300)} onChange={val => this.onSelectChange('customer', val)}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Address 1</label>
          <input name="shipToAddress1" type="text" value={shipToAddress1 || ''} onChange={this.onChange} className="form-control" placeholder="Address 1" required />
          <Required id="shipToAddress1" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 2</label>
          <input name="shipToAddress2" onChange={this.onChange} className="form-control" placeholder="Address 2" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 3</label>
          <input name="shipToAddress3" onChange={this.onChange} className="form-control" placeholder="Address 3" />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mb-3">
          <label className="text-muted mb-0">Address 4</label>
          <input name="shipToAddress4" onChange={this.onChange} className="form-control" placeholder="Address 4" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 5</label>
          <input name="shipToAddress5" onChange={this.onChange} className="form-control" placeholder="Address 5" />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0">Suburb</label>
          <input name="city" onChange={this.onChange} className="form-control" placeholder="Suburb" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Postcode</label>
          <input name="postCode" type="number" value={postCode || ''} onChange={this.onChange} className="form-control" placeholder="Postcode" required />
          <Required id="postCode" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">State</label>
          <input name="state" type="text" value={state || ''} onChange={this.onChange} className="form-control" placeholder="State" required />
          <Required id="state" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Country</label>
          <input name="country" onChange={this.onChange} className="form-control" placeholder="Country" />
        </Col>
      </Row>

      <h3 className="text-primary font-20">Line Details</h3>
      <div className={`orderline mb-2 pb-2 scroll-x-y`}>
        {/* ${this.state.overflow ? 'scroll-x-y' : null} */}
        <table>
          <thead>
            <tr className="text-light-gray">
              <td><div className="c-50 text-center">#</div></td>
              <td><div className="c-400 required">Product</div></td>
              <td><div className="c-600">Description</div></td>
              <td><div className="c-100 required">Qty</div></td>
              <td><div className="c-100">Weight</div></td>
              <td><div className="c-150 required">UOM</div></td>
              <td><div className="c-150">Rotadate</div></td>
              <td><div className="c-100">Batch</div></td>
              <td><div className="c-100">Ref3</div></td>
              <td><div className="c-100">Ref4</div></td>
              <td><div className="c-150">Disposition</div></td>
              <td><div className="c-150">Pack ID</div></td>
              <td><div className="c-50"></div></td>
            </tr>
          </thead>
          <tbody>
            {orderLine.length && orderLine.map((o, i) => {
              return <tr className="py-1 text-center orderline-row">
                <td className="px-1">
                  <input value={i || '' + 1} className="form-control text-center" readOnly />
                </td>
                <td className="px-1">
                  <Select value={o.productVal || ''}
                    options={productData}
                    onMenuOpen={() => this.toggleOverflow(i, 'productVal', true)}
                    onMenuClose={() => this.toggleOverflow(i, 'productVal', false)}
                    onChange={(val) => this.lineSelectChange(i, 'productVal', val)}
                    className={`c-400 ${overflow[i] && overflow[i].productVal ? 'absolute' : null}`} placeholder="Product" required />
                  <Required id="productVal" error={error.orderLine && error.orderLine[i]} />
                </td>
                <td className="px-1">
                  <input value={o.product || ''} className="form-control" placeholder="Choose a product first" readOnly />
                </td>
                <td className="px-1">
                  <input name="qty" onChange={(e) => this.lineChange(i, e)} type="number" min="0" className="form-control" placeholder="Qty" />
                  <Required id="qty" error={error.orderLine && error.orderLine[i]} />
                </td>
                <td className="px-1">
                  <input name="weight" onChange={(e) => this.lineChange(i, e)} type="number" min="0" className="form-control" placeholder="Weight" />
                </td>
                <td className="px-1">
                  <Select value={o.uom || ''}
                    options={uomData}
                    onMenuOpen={() => this.toggleOverflow(i, 'uom', true)}
                    onMenuClose={() => this.toggleOverflow(i, 'uom', false)}
                    onChange={(val) => this.lineSelectChange(i, 'uom', val)}
                    className={`c-150 ${overflow[i] && overflow[i].uom ? 'absolute right' : null}`} placeholder="UOM" />
                  <Required id="uom" error={error.orderLine && error.orderLine[i]} />
                </td>
                <td className="p-0 m-0">
                  <DatePicker getDate={(date) => {
                    let { orderLine } = this.state
                    orderLine[i].rotaDate = date
                    this.setState({ orderLine })
                  }}
                    onDateOpen={() => this.toggleOverflow(i, 'rotaDate', true)}
                    onDateClose={() => this.toggleOverflow(i, 'rotaDate', false)}
                    className={`form-control ${overflow[i] && overflow[i].date ? 'absolute right' : null}`} placeholder="Select Date" />
                </td>
                <td className="px-1">
                  <input name="batch" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Batch" />
                </td>
                <td className="px-1">
                  <input name="ref3" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Ref 3" />
                </td>
                <td className="px-1">
                  <input name="ref4" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Ref 4" />
                </td>
                <td className="px-1">
                  <Select value={o.dispositionVal || ''}
                    options={dispositionData}
                    onMenuOpen={() => this.toggleOverflow(i, 'dispositionVal', true)}
                    onMenuClose={() => this.toggleOverflow(i, 'dispositionVal', false)}
                    onChange={(val) => this.lineSelectChange(i, 'dispositionVal', val)}
                    className={`c-150 ${overflow[i] && overflow[i].dispositionVal ? 'absolute right' : null}`} placeholder="Disposition" />
                </td>
                <td className="px-1">
                  <input name="packId" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Pack ID" />
                </td>
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
        <Col lg={2}></Col>
        <Col lg={8}></Col>
        <Col lg={2} className="text-right">
          <button className="btn btn-primary" onClick={this.next}>{'Next >'}</button>
        </Col>
      </Row>
    </Container>
  }
}

export default CreateTab