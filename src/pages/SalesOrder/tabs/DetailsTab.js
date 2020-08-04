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

const Required = ({ error, id }) => {
  return <span className="text-error text-danger font-12">{error && error[id]}</span>
} 
var tmpChar = "";
class CreateTab extends React.Component {
  state = {
    overflow: [],
    orderLine: [{}], error: {},
    siteData: this.props.siteData, clientData: this.props.clientData, orderTypeData: this.props.orderTypeData,
    supplierData:[],
    isDatepickerShow: false,
    datepickerStatus: [],
    UOMStatus: [],
    dispositionStatus: [],
    productStatus: [],
    deliveryDate: null,
    orderId: null, 
    orderTypeValue: null, 
    site: this.props.user.site ? {value:this.props.user.site} : '',
    client: this.props.user.client ? {value:this.props.user.client} : '',
  }
  componentDidMount() {
    this.getDisposition()
    const {user} = this.props

  if(user.client && user.site){
    this.getProduct()
    this.getSupplier({value:user.client})
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
  getProduct = async () => {
    const client = this.props.user.client?this.state.client:this.state.client.value
    const url = `${endpoints.getProduct}?client=${client}`
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
    const client = this.props.user.client?this.state.client:this.state.client.value
    const url = `${endpoints.getUom}?client=${client}&product=${product}`
    const { data } = await axios.get(url)
    const uomData = data.uom.map((c, i) => ({ value: c, label: c }))
    this.setState({ uomData })
  }

  getSupplier = async (client) => {
    const url = endpoints.getSupplier
    if(!client) return
    const param = `?client=${client.value}`
    const {data} = await axios.get(url+param)
    const supplierData = data.map((v, i) => ({value:v.supplier_no, label:v.name}))
    this.setState({supplierData})
  }

  getSupplierIdentity = async (customer) => {
    const {client} = this.state
    const url = `${endpoints.getSoIdentity}`
    if(!customer) return
    const param = `?client=${client.value}&&customerNo=${customer}` 
    const {data} = await axios.get(url+param)
    if(data?.identity.length === 0) 
    {
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
    else
    {
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
    if(error?.orderLine?.length > 0) return
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
        this.getProduct()
        this.getSupplier(val)
      }else if(name=== 'orderType'){
        this.orderTypeValue(val)
      }else if(name === 'customer'){
        this.getSupplierIdentity(val.value)
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
    if(!val){
        return null
    }
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
    client = this.props.user.client?this.state.client:this.state.client.value
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

  
  numberCheck = (e, comma=false) => {  
    tmpChar = e.key; 
    if (!comma && !/^[0-9]+$/.test(e.key)) {
      e.preventDefault()
    }else if(comma && !/^[0-9.]|[\b]+$/.test(e.key)){
      e.preventDefault()
    }
  }

  numberCommaCheck = (index, refs, numberLength, commaLength,e) => {   
      var value = e.target.value 
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
          value: value
        }
      }
      // this.refs[refs].value = value
      this.lineChange(index, arr2)
  }

  
  siteCheck = (siteVal) => {
      let l = null
      this.props.site.map(data => {
        if (data.value === siteVal){ 
          l = data.label 
        }
      })
      return l
    }

    clientCheck = (clientVal) => {
      let c = null
      this.props.client.map(data => {
        if (data.value === clientVal){
           c = data.label 
        }
      }) 
      return c
    }

    orderTypeValue = (orderType) => {
      this.setState({
        orderTypeValue:orderType.value
      })
    }

    decimalValueForQty(e) {

      if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
          let number = e.target.value + e.key;
  
          let arraytext = number.split('');
          if(arraytext.length ){
              let dotLength = arraytext.filter((item) => item === '.');
              if(dotLength.length > 1){
                
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
      siteData, clientData, orderTypeData, productData, uomData, dispositionData,supplierData
    } = this.state
    const {user} = this.props
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
            <Select options={siteData} onChange={val => this.onSelectChange('site', val)} placeholder="Site" required 
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
          <input name="customerOrderRef" onChange={this.onChange} className="form-control" placeholder="Customer Order Ref" maxLength="40" />
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
            <Select  options={clientData} onChange={val => this.onSelectChange('client', val)} placeholder="Client" required
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
          <textarea name="deliveryInstruction" onChange={this.onChange} className="form-control" placeholder="Delivery Instructions" required />
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
              <td><div className="c-100 required">Qty</div></td>
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
                  <input value={i + 1} className="form-control text-center" readOnly />
                </td>
                <td className="px-1 text-left">
                  <Select value={o.productVal || ''}
                    options={o.productVal && o.productVal.length >= 3 ? productData : []}
                    menuIsOpen={o.productVal && o.productVal.length >= 3 ? true : false}
                    onInputChange={(val) => this.lineSelectChange(i, 'productVal', val)}
                    onMenuOpen={() => {productStatus[i] = true; this.setState({ productStatus: productStatus })}}
                    onMenuClose={() => {productStatus[i] = false; this.setState({ productStatus: productStatus })}}
                    onChange={(val) => this.lineSelectChange(i, 'productVal', val)}
                    className={`c-400 ${overflow[i] && overflow[i].productVal ? 'absolute' : null}`} placeholder="Product" required 
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                    />
                  <Required id="productVal" error={error.orderLine && error.orderLine[i]} />
                </td>
                <td className="px-1">
                  <input value={o.product || ''} className="form-control" placeholder="Choose a product first" readOnly />
                </td>
                <td className="px-1">
                  <input name="qty" style={{width: "130px"}} onChange={(e) => this.lineChange(i, e)} type="text" min="0" className="form-control" value={numeral(this.state.orderLine[i]['qty']).format('0,0')}  onKeyPress={(e) => this.numberCheck(e)}  placeholder="Qty" maxLength="10"  />
                  <Required id="qty" error={error.orderLine && error.orderLine[i]} />
                </td>
                <td className="px-1">
                  <input name="weight" ref="weight" onChange={(e) => this.numberCommaCheck(i, "weight", 16,3, e)} type="text" min="0" className="form-control" placeholder="Weight" onKeyPress={(e) => this.decimalValueForQty(e,true)}  />
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
                  <input name="batch" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Batch"  maxLength="30"  />
                </td>
                <td className="px-1">
                  <input name="ref3" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Ref 3"  maxLength="30" />
                </td>
                <td className="px-1">
                  <input name="ref4" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Ref 4"  maxLength="30" />
                </td>
                <td className="px-1">
                  <Select value={o.dispositionVal || ''}
                    options={dispositionData}
                    onMenuOpen={() => {dispositionStatus[i] = true; this.setState({ dispositionStatus: dispositionStatus })}}
                    onMenuClose={() => {dispositionStatus[i] = false; this.setState({ dispositionStatus: dispositionStatus })}}
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
                    showDatePicker={(e) => {datepickerStatus[i] = e; this.setState({ datepickerStatus: datepickerStatus })}}
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
      <button className="btn btn-light-gray m-0" onClick={this.addLine}>Add Line</button>

      <Row className="mt-3">
        <Col lg={2}></Col>
        <Col lg={8}></Col>
        <Col lg={2} className="text-right">
          <button className="btn btn-primary" onClick={this.next}>{'Next'}</button>
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
    client:store.client
  }
}

export default connect(mapStateToProps)(CreateTab)