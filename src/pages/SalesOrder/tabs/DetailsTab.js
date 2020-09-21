import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import numeral from 'numeral'
import _ from 'lodash'

import endpoints from 'helpers/endpoints'
import DatePicker from 'shared/DatePicker'
import validations from './validations'
import { connect } from 'react-redux'
import { MdBorderColor } from 'react-icons/md'

const Required = ({ error, id }) => {
  return <span className="text-error text-danger font-12">{error && error[id]}</span>
}
var tmpChar = "";
class CreateTab extends React.Component {
  state = {
    overflow: [],
    orderLine: [{}], error: {},
    siteData: this.props.siteData,
    clientData: this.props.clientData,
    orderTypeData: this.props.orderTypeData,
    supplierData: [],
    isDatepickerShow: false,
    datepickerStatus: [],
    UOMStatus: [],
    dispositionStatus: [],
    productStatus: [],
    deliveryDate: null,
    orderId: null,
    orderTypeValue: null,
    site: this.props.user.site ? { value: this.props.user.site } : '',
    client: this.props.user.client ? { value: this.props.user.client } : ''
  }
  componentDidMount() {
    this.getDisposition()
    const { user } = this.props

    if (user.client && user.site) {
      this.getSupplier({ value: user.client })
    }
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
  // getProduct = async () => {
  //   const client = this.props.user.client?this.state.client:this.state.client.value
  //   const url = `${endpoints.getProduct}?client=${client}`
  //   const { data } = await axios.get(url)
  //   const productData = data.code.map((c, i) => ({ value: c, label: c, i }))
  //   this.setState({ productData, productDataName: data.name })
  // }
  hideAllOptionSite = () => {
    let siteData = [...this.state.siteData]
    delete siteData[0]
    return siteData
  }

  hideAllOptionClient = () => {
    let clientData = [...this.state.clientData]
    delete clientData[0]
    return clientData
  }

  getProduct = async (val, i) => {
    const client = this.state.client.value
    const url = `${endpoints.getProduct}?client=${client}&param=${val.toUpperCase()}`
    const orderLine = this.state.orderLine
    orderLine[i].productIsLoad = true;
    const { data } = await axios.get(url).then(res => {
        orderLine[i].productIsLoad = false;
        return res;
    })
    const productData = data.map((data, i) => ({ value: data.code, label: `${data.name}`, i }))
    orderLine[i].productData = productData;
    this.setState({ orderLine })
  }

  getProductHandler = (val, i) => {
    // Detect input length
    let orderLine = this.state.orderLine
    let error = this.state.error
    orderLine[i].productKeyword = val

    // Error message if input length less than 3 character
        error.orderLine = []
        error.orderLine[i] = {}
          if ((val.length !== 0) && (val.length < 3)) {
            error.orderLine[i].productVal = 'Type minimum of 3 characters to find products'
          }
        
        if (error.orderLine.length < 1 || (error.orderLine.length === 1 && !error.orderLine[0])) {
          delete error.orderLine
        }

    this.setState({ orderLine, error });
    // Get Product from APi if length equal or more than 3
    if (!val || val.length < 3) return
    else Promise.resolve(this.getProduct(val, i));


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

  getSupplier = async (client) => {
    const url = endpoints.getSupplier
    if (!client) return
    const param = `?client=${client.value}`
    const { data } = await axios.get(url + param)
    const supplierData = data.map((v, i) => ({ value: v.supplier_no, label: v.name }))
    this.setState({ supplierData })
  }

  getSupplierIdentity = async (customer) => {
    const { client } = this.state
    const url = `${endpoints.getSoIdentity}`
    if (!customer) return
    const param = `?client=${client.value}&&customerNo=${customer}`
    const { data } = await axios.get(url + param)
    if (data?.identity.length === 0) {
      this.setState({
        city: null,
        country: null,
        postCode: null,
        shipToAddress1: null,
        shipToAddress2: null,
        shipToAddress3: null,
        shipToAddress4: null,
        shipToAddress5: null,
        state: null
      })
    }
    else {
      const {
        address_1,
        address_2,
        address_3,
        address_4,
        address_5,
        city,
        country,
        customer_no,
        name,
        postcode,
        state,
      } = data.identity[0]
      this.setState({
        city: city,
        country: country,
        postCode: postcode,
        shipToAddress1: address_1,
        shipToAddress2: address_2,
        shipToAddress3: address_3,
        shipToAddress4: address_4,
        shipToAddress5: address_5,
        state: state
      })
    }

  }


  addLine = () => {
    const error = validations(this.state)
    this.setState({ error })
    console.log(error?.orderLine)
    if (error?.orderLine?.length > 0) return
    if (this.state.orderLine.length < 10) {
      this.setState({ orderLine: [...this.state.orderLine, {}] })
    }

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
        this.getSupplier(val)
      } else if (name === 'orderType') {
        this.orderTypeValue(val)
      } else if (name === 'customer') {
        this.getSupplierIdentity(val.value)
      }
    })
  }
  onChange = (e) => {
    const { name, value } = e.target
    let { error } = this.state
    delete error[name]
    this.setState({ [name]: value, error })
    if(name == "deliveryInstruction"){
      // Error message if input length more than 240 character
            if ((value.length !== 0) && (value.length > 240)) {
              error.deliveryInstruction = 'Value must not exceed 240 characters'
            }
          
          if(error.deliveryInstruction && (error.deliveryInstruction.length < 1 || (error.deliveryInstruction.length === 1 && !error.deliveryInstruction))) {
            delete error.deliveryInstruction
          }
      }

  }
  lineChange = (i, e) => {
    const { name, value } = e.target
    const { orderLine } = this.state
    if (name == 'qty') {
      const tmp_val = this.decimalFormatter(name, value)
      orderLine[i][name] = tmp_val
    } else {
      orderLine[i][name] = value

    }
    this.setState({ orderLine })
  }
  lineSelectChange = (i, key, val) => {
    if (!val) {
      return null
    }
    const { orderLine, error } = this.state
    if (error.orderLine && error.orderLine.length) {
      delete error.orderLine[i][key]
    }
    if (key === 'productVal') {
      orderLine[i].product = val.label
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
    client = this.props.user.client ? this.state.client : this.state.client.value
    let orderId = e.target.value
    this.setState({ orderId: orderId.toUpperCase() })
    if (!client) {
      error.orderId = 'Please select client first'
      return this.setState({ error })
    }
    // if (!orderId) {
    //   error.orderId = 'Order no. cannot be empty'
    //   return this.setState({ error })
    // }
    if (orderId.length < 4) {
      error.orderId = 'Order no. must have min 4 characters'
      return this.setState({ error })
    }
    delete error.orderId
    const { data } = await axios.post('/orderCheck', {
      "client": client,
      "order_no": orderId
    })
    if (data.message !== 'available') {
      error.orderId = 'Order number exist'
      return this.setState({ error })
    }
  }
  findCustomer = (val) => {
    if (val) {
      // console.log('find customer: ', val)
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


  numberCheck = (e, comma = false) => {
    tmpChar = e.key;
    if (!comma && !/^[0-9]+$/.test(e.key)) {
      e.preventDefault()
    } else if (comma && !/^[0-9.]|[\b]+$/.test(e.key)) {
      e.preventDefault()
    }
  }

  numberCommaCheck = (index, refs, numberLength, commaLength, e) => {
    var value = e.target.value
    var name = e.target.name
    // var arr = value.split(".")  
    // var x = ''
    // if(arr[0].length > numberLength){
    //   x = arr[0].substr(0,numberLength) 
    // }else{
    //   x = arr[0]
    // }
    // var y = ''
    // if(arr[1] && arr[1].length > commaLength){
    //   y = '.'+arr[1].substr(0,commaLength)
    // }else if(arr[1]){
    //   y = '.'+arr[1]
    // }
    // var text =x+((tmpChar=='.')?'.':'')+y 
    var arr2 = {
      target: {
        name: refs,
        value: this.decimalFormatter(name, value)
      }
    }
    // this.refs[refs].value = value
    this.lineChange(index, arr2)
  }


  siteCheck = (siteVal) => {
    let l = null
    this.props.site.map(data => {
      if (data.value === siteVal) {
        l = data.label
      }
    })
    return l
  }

  clientCheck = (clientVal) => {
    let c = null
    this.props.client.map(data => {
      if (data.value === clientVal) {
        c = data.label
      }
    })
    return c
  }

  orderTypeValue = (orderType) => {
    this.setState({
      orderTypeValue: orderType.value
    })
  }

  decimalFormatter = (name, value) => {
    let newVal = value;

    if (name === 'weight') {
      if (newVal.length > 14) newVal = newVal.split('').filter(d => d !== ',' ? d : null).map((d, i) => { if (i > 10 && !newVal.includes('.')) { return null } else return d }).join('')
      console.log(newVal)
      const dot = newVal.indexOf('.')
      console.log(dot + ' dot')
      if (dot !== -1) {
        let number;
        let decimal = newVal.slice(dot + 1, dot + 4).split('').filter(d => d !== '.' && d !== ',').join('')
        let integer = newVal.slice(0, dot).split('').filter(d => d !== ',').join('')
        console.log(decimal + ' dot')
        console.log(integer + ' int')
        if (integer.length <= 6) {
          if (integer.length >= 4) {
            let idxSepr1 = integer.slice(0, integer.length - 3)
            let idxSepr2 = integer.slice(integer.length - 3)
            console.log(`${idxSepr1},${idxSepr2}.${decimal}`)
            number = `${idxSepr1},${idxSepr2}.${decimal}`
          }
          else number = `${integer}.${decimal}`
        }
        if (integer.length > 6 && integer.length <= 9) {
          let idxSepr1 = integer.slice(0, integer.length - 6)
          let idxSepr2 = integer.slice(idxSepr1.length, integer.length - 3)
          let idxSepr3 = integer.slice(integer.length - 3)
          console.log(`${idxSepr1},${idxSepr2},${idxSepr3}.${decimal}`)
          number = `${idxSepr1},${idxSepr2},${idxSepr3}.${decimal}`
        }
        if (integer.length > 9 && integer.length <= 11) {
          let idxSepr1 = integer.slice(0, integer.length - 9)
          let idxSepr2 = integer.slice(idxSepr1.length, integer.length - 6)
          let idxSepr3 = integer.slice(idxSepr1.length + idxSepr2.length, idxSepr1.length + idxSepr2.length + 3)
          let idxSepr4 = integer.slice(integer.length - 3)
          console.log(`${idxSepr1},${idxSepr2},${idxSepr3},${idxSepr4}.${decimal}`)
          number = `${idxSepr1},${idxSepr2},${idxSepr3},${idxSepr4}.${decimal}`
        }
        number = number?.split('')
        if (number && number[0] === ',') delete number[0]
        number = number?.join('')
        return number
      }
      else return numeral(newVal).format('0,0')
    }
    else if (name == 'qty') return numeral(newVal).format('0,0')
    return value
  }

  decimalValueForQty(e) {

    if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
      let number = e.target.value + e.key;

      let arraytext = number.split('');
      if (arraytext.length) {
        let dotLength = arraytext.filter((item) => item === '.');
        if (dotLength.length > 1) {

          e.preventDefault();
          e.stopPropagation();
        }
      }

      let regex = /^(\d{1,11}|\.)?(\.\d{0,3})?$/;

      if (!regex.test(number) && number !== "") {
        e.preventDefault();
        e.stopPropagation();
      }

    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  }


  render() {
    const { error, overflow, site, client, orderType, orderLine, customer,
      orderId, shipToAddress1, postCode, state,
      siteData, clientData, orderTypeData, productData, uomData, dispositionData, supplierData
    } = this.state
    const { user } = this.props
    let datepickerStatus = this.state.datepickerStatus;
    let UOMStatus = []
    let dispositionStatus = []
    let productStatus = []
    let expandDropdownCheck = (this.state.UOMStatus.includes(true) || this.state.dispositionStatus.includes(true)) || this.state.productStatus.includes(true);
    let datepickerExpandStyle = this.state.datepickerStatus.includes(true) ? " lineDetailsTopExpand" : "";
    let dropdownExpandStyle = expandDropdownCheck ? " lineDetailsBottomExpand" : "";

    return <Container className="px-5 py-4">
      <h3 className="text-primary font-20">Order Details</h3>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Site</label>
          {
            user.site ?
              <input value={this.siteCheck(user.site)} className="form-control" readOnly />
              :
              <Select options={this.hideAllOptionSite()} onChange={val => this.onSelectChange('site', val)} placeholder="Site" required
              filterOption={
                  (option, inputVal) => {
                      return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                  }
              }
                styles={{
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                  })
                }}
              />
          }
          <Required id="site" error={error} />

        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order Type</label>
          <Select name="orderType" value={orderType || ''} options={orderTypeData} onChange={val => this.onSelectChange('orderType', val)} placeholder="Order Type" required
            styles={{
              dropdownIndicator: (base, state) => ({
                ...base,
                transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
              })
            }}
          />
          <Required id="orderType" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Customer Order Ref</label>
          <input name="customerOrderRef" onChange={this.onChange} className="form-control" placeholder="Customer Order Ref" maxLength="30" />
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
          {
            user.client ?
              <input value={this.clientCheck(user.client)} className="form-control" readOnly />
              :
              <Select options={this.hideAllOptionClient()} onChange={val => this.onSelectChange('client', val)} placeholder="Client" required
                styles={{
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                  })
                }}
              />
          }
          <Required id="client" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order No</label>
          <input name="orderId" type="text" value={orderId || ''} onChange={this.checkOrderId} className="form-control" placeholder="Order No" maxLength="12" required />
          <Required id="orderId" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Vendor Order Ref</label>
          <input name="vendorOrderRef" onChange={this.onChange} className="form-control" placeholder="Vendor Order Ref" maxLength="40" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Delivery Instructions</label>
          <textarea name="deliveryInstruction"  onChange={this.onChange} className="form-control" placeholder="Delivery Instructions" required />
          <Required id="deliveryInstruction" error={error} />
        </Col>
      </Row>

      <h3 className="text-primary font-20">Customer Details</h3>
      <Row>
        <Col lg="3" className="mb-3">
          <label className="text-muted mb-0">Customer</label>
          < Select
            options={supplierData}
            placeholder="Customer Name or ID"
            onInputChange={_.debounce(this.findCustomer, 300)}
            onChange={val => this.onSelectChange('customer', val)}
            styles={{
              dropdownIndicator: (base, state) => ({
                ...base,
                transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
              })
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Address 1</label>
          <input value={this.state.shipToAddress1} name="shipToAddress1" type="text" value={shipToAddress1 || ''} onChange={this.onChange} className="form-control" placeholder="Address 1" required />
          <Required id="shipToAddress1" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 2</label>
          <input value={this.state.shipToAddress2} name="shipToAddress2" onChange={this.onChange} className="form-control" placeholder="Address 2" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 3</label>
          <input value={this.state.shipToAddress3} name="shipToAddress3" onChange={this.onChange} className="form-control" placeholder="Address 3" />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mb-3">
          <label className="text-muted mb-0">Address 4</label>
          <input value={this.state.shipToAddress4} name="shipToAddress4" onChange={this.onChange} className="form-control" placeholder="Address 4" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 5</label>
          <input value={this.state.shipToAddress5} name="shipToAddress5" onChange={this.onChange} className="form-control" placeholder="Address 5" />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0">Suburb</label>
          <input value={this.state.city} name="city" onChange={this.onChange} className="form-control" placeholder="Suburb" />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Postcode</label>
          <input value={this.state.postCode} name="postCode" type="number" value={postCode || ''} onChange={this.onChange} className="form-control" placeholder="Postcode" required />
          <Required id="postCode" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">State</label>
          <input value={this.state.state} name="state" type="text" value={state || ''} onChange={this.onChange} className="form-control" placeholder="State" required />
          <Required id="state" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Country</label>
          <input value={this.state.country} name="country" onChange={this.onChange} className="form-control" placeholder="Country" />
        </Col>
      </Row>

      <h3 className="text-primary font-20">Line Details</h3>
      <div className={"orderline mb-2 pb-2 scroll-x-y" + datepickerExpandStyle + dropdownExpandStyle}>
        {/* ${this.state.overflow ? 'scroll-x-y' : null} */}
        <table>
          <thead>
            <tr className="text-muted">
              <td><div className="c-50 text-center">#</div></td>
              <td><div className="c-400 required">Product</div></td>
              <td><div className="c-600">Description</div></td>
              <td><div className="c-150 required">Qty</div></td>
              <td><div className="c-170">Weight</div></td>
              <td><div className="c-150 required">UOM</div></td>
              <td><div className="c-250">Batch</div></td>
              <td><div className="c-100">Ref3</div></td>
              <td><div className="c-100">Ref4</div></td>
              <td><div className="c-150">Disposition</div></td>
              <td><div className="c-200">Pack ID</div></td>
              <td><div className="c-150">Rotadate</div></td>
              <td><div className="c-50"></div></td>
            </tr>
          </thead>
          <tbody>
            {orderLine.length && orderLine.map((o, i) => {
              return <tr className="py-1 text-center orderline-row">
                <td className="pl-0 pr-1">
                  <input value={i + 1} className="form-control text-center" readOnly style={{ backgroundColor: "#f6f7f9" }} />
                </td>
                <td className={`px-1 text-left ${error.orderLine && error.orderLine[i] ? error.orderLine[i].productVal ? "react-select-alert" : null : null}`}>
                  <Select 
                    // value={o.productVal || ''}
                    isClearable={true}
                    options={o.productKeyword ? o.productKeyword.length > 2 ? o.productData : [] : []}
                    isLoading={o.productIsLoad}
                    getOptionLabel={option => option.value}
                    menuIsOpen={o.productKeyword && o.productKeyword.length >= 3 ? true : false}
                    onInputChange={(val) => this.getProductHandler(val, i)}
                    onMenuOpen={() => { productStatus[i] = true; this.setState({ productStatus: productStatus }) }}
                    onMenuClose={() => { productStatus[i] = false; this.setState({ productStatus: productStatus }) }}
                    onChange={(val) => this.lineSelectChange(i, 'productVal', val)}
                    className={`c-400 ${overflow[i] && overflow[i].productVal ? 'absolute' : null}`} placeholder="Product" required
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base,
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                        display: state.selectProps.menuIsOpen ? "flex" : "none"
                      })
                    }}
                  />
                  <Required id="productVal" error={error.orderLine && error.orderLine[i]} />
                </td>
                <td className="px-1">
                  <input value={o.product || ''} className="form-control" placeholder="Choose a product first" readOnly style={{ backgroundColor: "#f6f7f9" }} />
                </td>
                <td className="px-1">
                  <input name="qty" onKeyPress={(e) => this.numberCheck(e)} onChange={(e) => this.lineChange(i, e)} type="text" min="0" className="form-control" value={this.state.orderLine[i]['qty']} placeholder="Qty" maxLength="10" />
                  <Required id="qty" error={error.orderLine && error.orderLine[i]} />
                </td>
                <td className="px-1">
                  <input name="weight" ref="weight" value={this.state.orderLine[i]['weight']} onChange={(e) => this.numberCommaCheck(i, "weight", 16, 3, e)} type="text" maxLength='18' className="form-control" placeholder="Weight" />
                </td>
                <td className="px-1">
                  <Select value={o.uom || ''}
                    options={uomData}
                    onMenuOpen={() => {
                      UOMStatus[i] = true;
                      this.setState({ UOMStatus: UOMStatus })
                    }}
                    onMenuClose={() => {
                      UOMStatus[i] = false;
                      this.setState({ UOMStatus: UOMStatus })
                    }}
                    onChange={(val) => this.lineSelectChange(i, 'uom', val)}
                    className={`c-150 ${overflow[i] && overflow[i].uom ? 'absolute right' : null}`} placeholder="UOM"
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base,
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                  />
                  <Required id="uom" error={error.orderLine && error.orderLine[i]} />
                </td>
                <td className="px-1">
                  <input name="batch" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Batch" maxLength="30" />
                </td>
                <td className="px-1">
                  <input name="ref3" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Ref 3" maxLength="30" />
                </td>
                <td className="px-1">
                  <input name="ref4" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Ref 4" maxLength="30" />
                </td>
                <td className="px-1">
                  <Select value={o.dispositionVal || ''}
                    options={dispositionData}
                    onMenuOpen={() => { dispositionStatus[i] = true; this.setState({ dispositionStatus: dispositionStatus }) }}
                    onMenuClose={() => { dispositionStatus[i] = false; this.setState({ dispositionStatus: dispositionStatus }) }}
                    onChange={(val) => this.lineSelectChange(i, 'dispositionVal', val)}
                    className={`c-150 ${overflow[i] && overflow[i].dispositionVal ? 'absolute right' : null}`} placeholder="Disposition"
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base,
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                  />
                </td>
                <td className="px-1">
                  <input name="packId" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Pack ID" maxLength="20" />
                </td>
                <td className="p-0 m-0">
                  <DatePicker top={true} getDate={(date) => {
                    let { orderLine } = this.state
                    orderLine[i].rotaDate = date
                    this.setState({ orderLine })
                  }}
                    isShow={this.state.isDatepickerShow}
                    showDatePicker={(e) => { datepickerStatus[i] = e; this.setState({ datepickerStatus: datepickerStatus }) }}
                    className={`form-control ${overflow[i] && overflow[i].date ? 'absolute right' : null}`} placeholder="Select Date" />
                </td>
                <td className="px-1">
                  <button className="btn btn-light-gray btn-block" onClick={() => this.removeLine(i)}><i className="iconU-delete"></i></button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <button className="btn btn-light-blue m-0" onClick={this.addLine}>ADD LINE</button>

      <Row className="mt-3">
        <Col lg={2}></Col>
        <Col lg={8}></Col>
        <Col lg={2} className="text-right">
          <button className="btn btn-primary" onClick={this.next}>{'NEXT'}</button>
        </Col>
      </Row>
    </Container>
  }
}

const mapStateToProps = store => {
  return {
    webUser: store.user.webUser,
    user: store.user,
    site: store.site,
    client: store.client
  }
}

export default connect(mapStateToProps)(CreateTab)