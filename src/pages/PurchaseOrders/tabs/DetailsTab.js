import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import {connect} from 'react-redux'
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

  constructor(props){
    super(props)

    this.state = {
      status: '',
      webUser:props.webUser,
      overflow: [],
      orderDetails:[{}],
      orderLine: [{}],
      error: {},
      siteData: this.props.siteData, clientData: this.props.clientData, orderTypeData: this.props.orderTypeData, supplierData:this.props.supplierData,
      // orderId: 'AB29123', shipToAddress1: 'Ark Street 12', postCode: '291923', state: 'Victoria',
    }
  }

  componentDidMount(){
    console.log(this.state.user)
  }

  componentDidMount() {
    this.getDisposition()
  }
  // remove first option (all)
  componentDidUpdate(nextProps) {
    let { siteData, clientData, orderTypeData,supplierData } = this.props
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
    if(supplierData && nextProps.supplierData !== supplierData){
      supplierData.splice(0,1)
      this.setState({supplierData})
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
  getSupplier = async () => {
    const {data} = await axios.get(`${endpoints.getSupplier}?client=${this.state.client.value}`)
    const supplierData = data.map(d => ({value: d.supplier_no, label: `${d.supplier_no}: ${d.name}`}))
    const supplier = { value: 'all', label: 'All Supplier' }
    supplierData.splice(0,0, supplier)
    this.setState({supplierData})
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
    let { error} = this.state
    // let newOrder = Object.assign({}, orderDetails[0])
    let orderDetails = [...this.state.orderDetails]
    if(name === 'site'){
      orderDetails[0].site = val.value
      orderDetails[0].siteName = val.label
    }
    if(name === 'client'){
      orderDetails[0].client = val.value
      orderDetails[0].clientName = val.label
    }
    if(name === 'supplier'){
      orderDetails[0].supplier = val.value
      orderDetails[0].supplierName = val.label
    }
    if(name === 'orderType'){
      orderDetails[0].orderType = val.value
      orderDetails[0].orderTypeName = val.label
    }
    orderDetails[0].web_user = this.props.webUser

    delete error[name]
    this.setState({ [name]: val, orderDetails}, () => {
      if (name === 'client') {
        this.getProduct()
        this.getSupplier()
      }
    })
  }
  onChange = (e) => {
    const { name, value } = e.target
    let { error } = this.state

    let orderDetails = [...this.state.orderDetails]
    if(name === 'customerOrderRef') orderDetails[0].customerOrderRef = value
    if(name === 'vendorOrderRef') orderDetails[0].vendorOrderRef = value
    delete error[name]
    this.setState({ [name]: value, error,orderDetails })
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
    let orderDetails = [...this.state.orderDetails]
    orderDetails[0].orderNo = orderId.toUpperCase()
    this.setState({ orderId: orderId.toUpperCase(), orderDetails })
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

      let orderDetails = [...this.state.orderDetails]
      const payload = {header, orderDetails, lineDetail }
      this.props.submit(payload)
    }
  }

  render() {
    const { error, overflow, site, client, orderType, orderLine,
      orderId, siteData, clientData, orderTypeData, productData, uomData, dispositionData,supplierData,supplier
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
          <label className="text-muted mb-0 required">Client</label>
          <Select value={client || ''} options={clientData} onChange={val => this.onSelectChange('client', val)} placeholder="Client" required />
          <Required id="client" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Supplier</label>
          <Select value={supplier || ''} options={supplierData} onChange={val => this.onSelectChange('supplier', val)} placeholder="Supplier"/>
          <Required id="supplier" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Customer Order Ref</label>
          <input name="customerOrderRef" onChange={this.onChange} className="form-control" placeholder="Customer Order Ref" />
        </Col>
      </Row>
      <Row>
      <Col lg="3">
          <label className="text-muted mb-0 required">Order Type</label>
          <Select value={orderType || ''} options={orderTypeData} onChange={val => this.onSelectChange('orderType', val)} placeholder="Order Type" required />
          <Required id="orderType" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order No</label>
          <input name="orderId" type="text" value={orderId || ''} onChange={this.checkOrderId} className="form-control" placeholder="Order No" required />
          <Required id="orderId" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order Date</label>
          <DatePicker
            className="form-control"
            placeholder="Order Date"
            getDate={(date) => {
              delete error['orderDate']
              let orderDetails = [...this.state.orderDetails]
              orderDetails[0].orderDate = date
              this.setState({ orderDate: date, error,orderDetails })
            }}
          />
          <Required id="orderDate" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Vendor Order Ref</label>
          <input name="vendorOrderRef" onChange={this.onChange} className="form-control" placeholder="Vendor Order Ref" />
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

const mapStateToProps = store => {
  return{
    webUser:store.user.webUser
  }
}

export default connect(mapStateToProps)(CreateTab)
