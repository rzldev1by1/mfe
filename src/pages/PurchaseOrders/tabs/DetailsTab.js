import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import { connect } from 'react-redux'
import _ from 'lodash'
import numeral from 'numeral'

import endpoints from 'helpers/endpoints'
import DatePicker from 'shared/DatePicker'
import validations from './validations'

import { isEmptyObject } from 'jquery'
import { object } from 'prop-types'
import NumberFormat from 'react-number-format';

const Required = ({ error, id }) => {
  return <span className="text-error pl-0 text-danger font-12">{error && error[id]}</span>
}
// const debounceEventHandler = (...args) => {
//   const debounced = _.debounce(...args)
//   return (e) => {
//     e.persist()
//     return debounced(e)
//   }
// }

class CreateTab extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      status: '',
      orderStatus:true,
      webUser: props.webUser,
      overflow: [],
      orderDetails: [{
        site: this.props.user.site ? this.props.user.site : null,
        client: this.props.user.client ? this.props.user.client : null
      }],
      site: {
        value: this.props.user.site ? this.props.user.site : null
      },
      client: {
        value: this.props.user.client ? this.props.user.client : null
      },
      orderLine: [{}],
      error: {},
      siteData: this.props.siteData, clientData: this.props.clientData, orderTypeData: this.props.orderTypeData, supplierData: this.props.supplierData,
      datepickerStatus: [],
      UOMStatus: [],
      dispositionStatus: [],
      productStatus: []
      // orderId: 'AB29123', shipToAddress1: 'Ark Street 12', postCode: '291923', state: 'Victoria',
    }
  }

  componentDidMount() {
    this.getDisposition()
    const { user } = this.props
    let error= this.state.error

    if (user.client && user.site) {
      this.getSupplier()
    }
  }
  // remove first option (all)
  componentDidUpdate(nextProps) {
    let { siteData, clientData, orderTypeData, supplierData } = this.props
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
    if (supplierData && nextProps.supplierData !== supplierData) {
      supplierData.splice(0, 1)
      this.setState({ supplierData })
    }
  }
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
    const url = `${endpoints.getProduct}?client=${this.state.client.value}&param=${val.toUpperCase()}`
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
    val = val.toUpperCase()
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

    // Get Product from APi if length more than 2
    if (!val || val.length < 3) return
    else Promise.resolve(this.getProduct(val, i));
  }
  getDisposition = async () => {
    const url = `${endpoints.getDisposition}`
    const { data } = await axios.get(url)
    const dispositionData = [];
    data.code.map((c, i) => {if((c.length > 0) && (c != " ")) dispositionData.push({ value: c, label: c, i })})
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
    const { data } = await axios.get(`${endpoints.getSupplier}?client=${this.state.client.value}&site=${this.state.site.value}`)
    const supplierData = data.map(d => ({ value: d.supplier_no, label: `${d.supplier_no}: ${d.name}` }))
    // const supplier = { value: 'all', label: 'All Supplier' }
    // supplierData.splice(0, 0, supplier)
    supplierData.splice(0, 0)
    this.setState({ supplierData })
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
    let { error, client, site } = this.state
    // let newOrder = Object.assign({}, orderDetails[0])
    let orderDetails = [...this.state.orderDetails]

    if (name === 'site') {
      orderDetails[0].site = val ? val.value : null
      orderDetails[0].siteName = val ? val.label : null
      site.value = val ? val.value : null
    }
    if (name === 'client') {
      orderDetails[0].client = val ? val.value : null
      orderDetails[0].clientName = val ? val.label : null
      client.value = val ? val.value : null
    }
    if (name === 'supplier') {
      orderDetails[0].supplier = val ? val.value : null
      orderDetails[0].supplierName = val ? val.label : null
    }
    if (name === 'orderType') {
      orderDetails[0].orderType = val ? val.value : null
      orderDetails[0].orderTypeName = val ? val.label : null
    }
    orderDetails[0].web_user = this.props.webUser

    delete error[name]
    this.setState({ [name]: val, orderDetails, site, client }, () => {
      if (name === 'client') {
        this.getSupplier()
      }
    })
  }
  onChange = (e) => {
    const { name, value } = e.target
    let { error } = this.state

    let orderDetails = [...this.state.orderDetails]
    if (name === 'customerOrderRef') orderDetails[0].customerOrderRef = value
    if (name === 'vendorOrderRef') orderDetails[0].vendorOrderRef = value
    delete error[name]
    this.setState({ [name]: value, error, orderDetails })
  }

  decimalFormatter = (name, value) => {
    let newVal = value;

    if (name === 'weight') {
      if (newVal.length > 11) newVal = newVal.split('').filter(d => d !== ',' ? d : null).map((d, i) => { if (i > 10 && !newVal.includes('.')) { return null } else return d }).join('')
      // console.log(newVal.length)
      const dot = newVal.indexOf('.')
      console.log(dot + ' dot')

      if(dot === -1 && newVal.length === 11) {
        newVal = newVal.slice(0, dot).split('').filter(d => d !== ',').join('')
      }
      if (dot !== -1 && newVal.length) {
        let number;
        let decimal = newVal.slice(dot + 1, dot + 4).split('').filter(d => d !== '.' && d !== ',').join('')
        let integer = newVal.slice(0, dot).split('').filter(d => d !== ',').join('')
        console.log(decimal + ' decimal')
        console.log(integer + ' int')
        console.log(integer.length + ' int l')
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
          console.log(integer.length + ' asd')
          let idxSepr1 = integer.slice(0, integer.length - 6)
          let idxSepr2 = integer.slice(idxSepr1.length, integer.length - 3)
          let idxSepr3 = integer.slice(integer.length - 3)
          console.log(`${idxSepr1},${idxSepr2},${idxSepr3}.${decimal}`)
          number = `${idxSepr1},${idxSepr2},${idxSepr3}.${decimal}`
        }
        if (integer.length > 9 && integer.length <= 8) {
          alert('22222')
          let idxSepr1 = integer.slice(0, integer.length - 9)
          let idxSepr2 = integer.slice(idxSepr1.length, integer.length - 6)
          let idxSepr3 = integer.slice(idxSepr1.length + idxSepr2.length, idxSepr1.length + idxSepr2.length + 3)
          let idxSepr4 = integer.slice(integer.length - 3)
          console.log(`${idxSepr1},${idxSepr2},${idxSepr3},${idxSepr4}.${decimal}`)
          number = `${idxSepr1},${idxSepr2},${idxSepr3},${idxSepr4}.${decimal}`
        }

        number = number?.split('')
        console.log(number + ' number');
        if (number && number[0] === ',') delete number[0]
        number = number?.join('')
        return number
      }
      else return numeral(newVal).format('0,0')
    }
    else if (name == 'qty') return newVal ? numeral(newVal).format('0,0') : newVal
    return value
  }
  lineChange = (i, e, numeral) => {
    const { error } = this.state
    const { name, value } = e.target
    let formatted = value
    formatted = this.decimalFormatter(name, value)
    let orderLine = [...this.state.orderLine]
    orderLine[i][name] = formatted

    if (error.orderLine && error.orderLine.length > 0 && error.orderLine[i][name]) {
      delete error.orderLine[i][name]
    }

    this.setState({ orderLine, error })
  }
  lineSelectChange = (i, key, val) => {
    if (!val) {
      return null
    }
    const { orderLine, error } = this.state
    if (error.orderLine && error.orderLine.length === i) {
      delete error.orderLine[i][key]
    }
    if (key === 'productVal') {
      orderLine[i].product = val.label
      orderLine[i].productVal = val
      orderLine[i].productValue = val.value
      orderLine[i].productKeyword = null
      if(isEmptyObject(val)){
        orderLine[i].uom = null
      }
    }
    if (key === 'dispositionVal') {
      orderLine[i].disposition = val.value
      orderLine[i].dispositionVal = val
    }
    if (key === 'uom') {
      orderLine[i].uom = val
    }

    if (error.orderLine && error.orderLine.length > 0 && error.orderLine[i][key]) {
      delete error.orderLine[i][key]
    }

    this.setState({ orderLine, error }, () => {
      if (key === 'productVal') {
        this.getUom(val.value)
        this.setState({ orderLine, error })
      }
    })
  }
  checkOrderId = async (e) => {
    this.setState({orderStatus:true})
    let { error, client } = this.state
    let orderId = e.target.value
    let orderDetails = [...this.state.orderDetails]
    orderDetails[0].orderNo = orderId.toUpperCase()
    this.setState({ orderId: orderId.toUpperCase()  , orderDetails })
    console.log(orderId.trim().length)
    // if (!client) {
    //   error.orderId = 'Please select client first'
    //   return this.setState({ error }) && false
    // }
   
    // if (orderId.length < 4) {
    //   error.orderId = 'Order no. must have min 4 characters'
    //   return this.setState({ error })
    // }
    delete error.orderId
    const { data } = await axios.post('/orderCheck', {
      "client": client.value,
      "order_no": orderId
    })
    console.log(data);
    
    if (data.message === 'not available') {
      error.orderId = 'Order number exist'
      this.setState({orderStatus:'Order number exist'})
      return this.setState({ error })
    }
    if (data.message === 'The client field is required.') {
      this.setState({orderStatus:'Please select client'})
      error.orderId = 'Please select client'
      return this.setState({ error })
    }
    if (data.message === 'The order no field is required.') {
      error.orderId = null
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
    } 
    if (!Object.keys(error).length) {
      
    // else {
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
      delete header.deleteMs

      let orderDetails = [...this.state.orderDetails]
      const payload = { header, orderDetails, lineDetail }
      this.props.submit(payload)
      this.setState({ error:{}});
    }
  }

  numberCheck = (e) => {
    if (!/^[0-9]+$/.test(e.key)) e.preventDefault()
  }
  
  regExp = (e) => {
    if (!/^[a-zA-Z0-9-_]+$/.test(e.key)) e.preventDefault()
  }

  decimalCheck = (e) => {
    if (!/^[0-9|,8]+$/.test(e.key)) e.preventDefault()
  }

  siteCheck = (siteVal) => {
    let l = null
    this.props.site.map(data => {
      if (data.value === siteVal) l = data.label
    })
    return l
  }

  clientCheck = (clientVal) => {
    let c = null
    this.props.client.map(data => {
      if (data.value === clientVal) c = data.label
    })
    return c
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

  customFormat = (e) => {
    let value = e.target.value.split(".");
    if(e.target.value.length){
        for(var i = 0; i < e.target.value.length; i++){
            if(e.target.value[i] == "."){
                let totalLength = value[0].length + value[1].length;
                if(value[1].length > 0){
                    if((totalLength == 11) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((totalLength == 12) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((e.target.selectionStart <= 10) && value[0].length >= 10){
                        if((e.key != ".") && (e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight")){
                            e.preventDefault();
                        }
                    }
                }
                if(value[1].length > 1){
                    if((totalLength == 11) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((totalLength == 12) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((totalLength == 13) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((e.target.selectionStart <= 10) && value[0].length >= 10){
                        if((e.key != ".") && (e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight")){
                            e.preventDefault();
                        }
                    }

                }
                if(value[1].length > 2){
                    if((totalLength == 10) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((totalLength == 11) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((totalLength == 12) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((totalLength == 13) && ((e.target.selectionStart == (i+1)) && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                    if((e.target.selectionStart <= 10) && value[0].length >= 10){
                        if((e.key != ".") && (e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight")){
                            e.preventDefault();
                        }
                    }
                    
                }
                
            }else{
                if((e.target.selectionStart == 10) && ((e.key != ".") && ((e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight")))){
                        if(e.target.value.length == 10){
                            e.preventDefault();
                        }
                }else if((e.target.selectionStart < 10) && !value[1]){
                    if((e.target.value.length > 9) && ((e.key != ".") && (e.key !== "Backspace") && (e.key !== "ArrowLeft" && e.key !== "ArrowRight"))){
                        e.preventDefault();
                    }
                }
            }
        }
        
    }
  }


  render() {
    const { error, overflow, site, client, orderType, orderLine,
      orderId, siteData, clientData, orderTypeData, productData, uomData, dispositionData, supplierData, supplier, orderDetails, errorCheck
    } = this.state
    
    const { user } = this.props
    let datepickerStatus = this.state.datepickerStatus;
    let UOMStatus = []
    let dispositionStatus = []
    let productStatus = []
    let expandDropdownCheck = (this.state.UOMStatus.includes(true) || this.state.dispositionStatus.includes(true)) || this.state.productStatus.includes(true);
    let datepickerExpandStyle = this.state.datepickerStatus.includes(true) ? " lineDetailsTopExpand" : "";
    let dropdownExpandStyle = expandDropdownCheck ? " lineDetailsBottomExpand" : "";
    return <Container className="px-5 pt-4 pb-5" >
      <h3 className="text-primary font-20">Order Details</h3>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Site</label>
          {
            user.site ?
              <input value={this.siteCheck(user.site)} className="form-control mb-3" readOnly />
              :
              <Select isClearable={true} options={this.hideAllOptionSite()} onChange={val => this.onSelectChange('site', val)} placeholder="Site"

                filterOption={
                    (option, inputVal) => {
                        return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                    }
                }
                styles={{
                    dropdownIndicator: (base, state) => ({
                      ...base,
                      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                      display: isEmptyObject(site.value) ? "flex" : "none"
                    })
                  }}
              />
          }

          <Required id="site" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order Type</label>
          <Select isClearable={true} value={orderType || ''} options={orderTypeData} onChange={val => this.onSelectChange('orderType', val)} placeholder="Order Type" required
            filterOption={
                (option, inputVal) => {
                    return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                }
            }
            styles={{
                dropdownIndicator: (base, state) => ({
                  ...base,
                  transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                  display: isEmptyObject(orderDetails[0].orderType) ? "flex" : "none"
                })
              }}
          />
          <Required id="orderType" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Supplier</label>
          <Select isClearable={true} value={supplier || ''} options={supplierData} onChange={val => this.onSelectChange('supplier', val)} placeholder="Supplier"
            filterOption={
                (option, inputVal) => {
                    return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                }
            }
            styles={{
                dropdownIndicator: (base, state) => ({
                  ...base,
                  transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                  display: isEmptyObject(orderDetails[0].supplier) ? "flex" : "none"
                })
              }}
          />
          <Required id="supplier" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Customer Order Ref</label>
          <input name="customerOrderRef" autoComplete='off' onChange={this.onChange} className="form-control" placeholder="Customer Order Ref" maxLength='30' />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <label className="text-muted mb-0 required">Client</label>
          {
            user.client ?
              <input value={this.clientCheck(user.client)} className="form-control" readOnly />
              :
              <Select isClearable={true} options={this.hideAllOptionClient()} onChange={val => this.onSelectChange('client', val)} placeholder="Client" required
              filterOption={
                  (option, inputVal) => {
                      return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                  }
              }
                
              styles={{
                dropdownIndicator: (base, state) => ({
                  ...base,
                  transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                  display: isEmptyObject(client.value) ? "flex" : "none"
                })
              }}
              />
          }
          <Required id="client" error={error} />
        </Col>
        <Col lg="3" className="mt-45">
          <label className="text-muted mb-0 required">Order No</label>
          <input name="orderId" autoComplete='off' type="text" value={orderId || ''} onKeyPress={(e) => this.regExp(e)} onKeyDown={(e) => e.keyCode === 32 ? e.preventDefault() : null } onChange={this.checkOrderId} className="form-control" maxLength='12' placeholder="Order No" required />
          <Required id="orderId" error={error} />
        </Col>
        <Col lg="3" className="mt-45">
          <label className="text-muted mb-0 required">Order Date</label>
          <DatePicker
            className="form-control"
            placeholder="Order Date"
            getDate={(date) => {
              delete error['orderDate']
              let orderDetails = [...this.state.orderDetails]
              orderDetails[0].orderDate = date
              this.setState({ orderDate: date, error, orderDetails })
            }}
          />
          <Required id="orderDate" error={error} />
        </Col>
        <Col lg="3" className="mt-45">
          <label className="text-muted mb-0">Vendor Order Ref</label>
          <input name="vendorOrderRef" autoComplete='off' onChange={this.onChange} className="form-control" placeholder="Vendor Order Ref" maxLength='40' />
        </Col>
      </Row>

      <h3 className="text-primary font-20 mt-4">Line Details</h3>
      <div className={"orderline mb-2 pb-2 scroll-x-y" + datepickerExpandStyle + dropdownExpandStyle}>
        {/* ${this.state.overflow ? 'scroll-x-y' : null} */}
        <table>
          <thead>
            <tr className="text-muted">
              <td><div className="c-50 text-center">#</div></td>
              <td><div className="c-400 required px-1">Product</div></td>
              <td><div className="c-600 px-1">Description</div></td>
              <td><div className="c-100 required px-1">Qty</div></td>
              <td><div className="c-170 px-1">Weight</div></td>
              <td><div className="c-150 required px-1">UOM</div></td>
              <td><div className="c-250 px-1">Batch</div></td>
              <td><div className="c-100 px-1">Ref3</div></td>
              <td><div className="c-100 px-1">Ref4</div></td>
              <td><div className="c-150 px-1">Disposition</div></td>
              <td><div className="c-150">Rotadate</div></td>
              <td><div className="c-50"></div></td>
            </tr>
          </thead>
          <tbody>
            {orderLine.length && orderLine.map((o, i) => {
              return <tr className="py-1 text-center orderline-row" style={{ height: "70px" }}>
                <td className="px-1">
                  <input value={i + 1} className="form-control text-center" readOnly style={{ backgroundColor: "#f6f7f9" }} />
                </td>
                <td className={`px-1 ${error.orderLine && error.orderLine[i] ? error.orderLine[i].productVal ? "react-select-alert" : null : null}`}>
                  <Select
                    // value={o.productVal || ''}
                    isClearable={true}
                    options={o.productKeyword ? o.productKeyword.length > 2 ? o.productData : [] : []}
                    getOptionLabel={option => option.value + " : " + option.label}
                    isLoading={o.productIsLoad}
                    onInputChange={(val) => { this.getProductHandler(val, i) }}
                    menuIsOpen={o.productKeyword && o.productKeyword.length >= 3 ? true : false}
                    onMenuOpen={() => { 
                        if(!o.productKeyword){
                            productStatus[i] = false;
                            this.setState({ productStatus: productStatus });
                        }else{
                            productStatus[i] = true;
                            this.setState({ productStatus: productStatus });
                        }

                     }}
                    onMenuClose={() => { productStatus[i] = false; this.setState({ productStatus: productStatus }) }}
                    onChange={(val, { action }) => this.lineSelectChange(i, 'productVal', action == "clear" ? {} : val)}
                    className={`c-400 ${overflow[i] && overflow[i].productVal ? 'absolute' : null}`} placeholder="Product" required
                    getOptionLabel={option => this.state.productStatus[i] ? option.value + " : " + option.label : option.value}
                    filterOption={
                        (option, inputVal) => {
                            return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                        }
                    }
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        textAlign: 'left'
                      }),
                      dropdownIndicator: (base, state) => ({
                        ...base,
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                        display: state.selectProps.menuIsOpen ? "flex" : "none"
                      })
                    }}
                  />
                  <div className='w-100 d-flex align-items-start'><Required id="productVal" error={error.orderLine && error.orderLine[i]} /></div>
                </td>
                <td className="px-1">
                  <input value={o.productVal ? o.product || '' : ''} className="form-control" placeholder="Choose a product first" readOnly style={{ backgroundColor: "#f6f7f9" }} />
                </td>
                <td className="px-1">
                  <input name="qty" autoComplete='off' onKeyPress={(e) => this.numberCheck(e)} onChange={(e) => this.lineChange(i, e)} value={this.state.orderLine[i]['qty']} type="text" className="form-control" placeholder="Qty" maxlength="10" />
                  <div className='w-100 d-flex align-items-start text-nowrap'>
                    <Required id="qty" error={error.orderLine && error.orderLine[i]} />
                  </div>

                </td>
                <td className="px-1">
                  <NumberFormat onKeyDown={this.customFormat} thousandSeparator={true} onChange={(e) => this.lineChange(i, e, numeral)} decimalScale={3} name="weight" autoComplete='off' ref="weight" value={this.state.orderLine[i]['weight']} className="form-control" placeholder="Weight" inputmode="numeric" />
                  <div className='w-100 d-flex align-items-start text-nowrap'>
                    <Required id="weight" error={error.orderLine && error.orderLine[i]} />
                  </div>
                </td>
                <td className="px-1">
                  <Select 
                    value={o.uom || ''}
                    isClearable={true}
                    options={uomData}
                    onMenuOpen={() => {
                      UOMStatus[i] = true;
                      this.setState({ UOMStatus: UOMStatus })
                    }}
                    onMenuClose={() => {
                      UOMStatus[i] = false;
                      this.setState({ UOMStatus: UOMStatus })
                    }}
                    onChange={(val, { action }) => this.lineSelectChange(i, 'uom', action == "clear" ? {} : val)}
                    className={`c-150 ${overflow[i] && overflow[i].uom ? 'absolute right' : null}`} placeholder="UOM"
                    filterOption={
                        (option, inputVal) => {
                            return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                        }
                    }
                    styles={{
                        dropdownIndicator: (base, state) => ({
                          ...base,
                          transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                          display: isEmptyObject(o.uom) ? "flex" : "none"
                        })
                      }}
                  />
                  <div className='w-100 d-flex align-items-start'>
                    <Required id="uom" error={error.orderLine && error.orderLine[i]} />
                  </div>

                </td>
                <td className="px-1">
                  <input name="batch" autoComplete='off' onChange={(e) => this.lineChange(i, e)} value={this.state.orderLine[i]['batch']} className="form-control" placeholder="Batch" maxLength='30' />
                </td>
                <td className="px-1">
                  <input name="ref3" autoComplete='off' onChange={(e) => this.lineChange(i, e)} value={this.state.orderLine[i]['ref3']} className="form-control" placeholder="Ref3" maxLength='30' />
                </td>
                <td className="px-1">
                  <input name="ref4" autoComplete='off' onChange={(e) => this.lineChange(i, e)} value={this.state.orderLine[i]['ref4']} className="form-control" placeholder="Ref4" maxLength='30' />
                </td>
                <td className="px-1">
                  <Select 
                //   value={o.dispositionVal || ''}
                    isClearable={true}
                    options={dispositionData}
                    filterOption={
                        (option, inputVal) => {
                            return option.label.substr(0, inputVal.length).toUpperCase() == inputVal.toUpperCase()
                        }
                    }
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base,
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                        display: isEmptyObject(o.dispositionVal) ? "flex" : "none"
                      })
                    }}
                    onMenuOpen={() => { dispositionStatus[i] = true; this.setState({ dispositionStatus: dispositionStatus }) }}
                    onMenuClose={() => { dispositionStatus[i] = false; this.setState({ dispositionStatus: dispositionStatus }) }}
                    onChange={(val, { action }) => this.lineSelectChange(i, 'dispositionVal', action == "clear" ? {} : val)}
                    className={`c-150 ${overflow[i] && overflow[i].dispositionVal ? 'absolute right' : null}`} placeholder="Disposition" />
                </td>
                <td className="p-0 m-0">
                  <DatePicker
                    top={true}
                    showDatePicker={(e) => { datepickerStatus[i] = e; this.setState({ datepickerStatus: datepickerStatus }) }}
                    getDate={(date) => {
                      let { orderLine } = this.state
                      orderLine[i].rotaDate = date
                      this.setState({ orderLine })
                    }}
                    onDateOpen={() => this.toggleOverflow(i, 'rotaDate', true)}
                    onDateClose={() => this.toggleOverflow(i, 'rotaDate', false)}
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
      <div>
          <button className="btn btn-light-blue m-0" onClick={this.addLine}>ADD LINE</button>
      </div>
      <div>
          <Required  id="deleteMs" error={error} />
      </div>
      <Row className="mt-3">
        <Col lg={2}></Col>
        <Col lg={8}></Col>
        <Col lg={2} className="text-right">
          <button className='btn btn-primary' onClick={this.next}>{'NEXT'}</button>
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
