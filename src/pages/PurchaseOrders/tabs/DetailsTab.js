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

  constructor(props) {
    super(props)

    this.state = {
      status: '',
      webUser: props.webUser,
      overflow: [],
      orderDetails: [{
        site: this.props.user.site ? this.props.user.site : null,
        client: this.props.user.client ? this.props.user.client : null
      }],
      site: {
        value:this.props.user.site ? this.props.user.site : null
      },
      client: {
        value:this.props.user.client ? this.props.user.client : null
      },
      orderLine: [{}],
      error: {},
      siteData: this.props.siteData, clientData: this.props.clientData, orderTypeData: this.props.orderTypeData, supplierData:this.props.supplierData,
      datepickerStatus: [],
      UOMStatus: [],
      dispositionStatus: [],
      productStatus: []
      // orderId: 'AB29123', shipToAddress1: 'Ark Street 12', postCode: '291923', state: 'Victoria',
    }
  }

  componentDidMount() {
    this.getDisposition()
        const {user} = this.props

    if(user.client && user.site){
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
  getProduct = async (val) => {
    const url = `${endpoints.getProduct}?client=${this.state.client.value}&param=${val}`
    const { data } = await axios.get(url)
    const productData = data.map((data, i) => ({ value: data.code, label: `${data.code}: ${data.name}`, i }))
    this.setState({ productData })
  }

  getProductHandler = (val) => {
    if(!val || val.length < 3) return
    else  Promise.resolve( this.getProduct(val));
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
    const { data } = await axios.get(`${endpoints.getSupplier}?client=${this.state.client.value}`)
    const supplierData = data.map(d => ({ value: d.supplier_no, label: `${d.supplier_no}: ${d.name}` }))
    const supplier = { value: 'all', label: 'All Supplier' }
    supplierData.splice(0, 0, supplier)
    this.setState({ supplierData })
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
    let { error,client,site } = this.state
    // let newOrder = Object.assign({}, orderDetails[0])
    let orderDetails = [...this.state.orderDetails]

    if (name === 'site') {
      orderDetails[0].site = val.value
      orderDetails[0].siteName = val.label
      site.value = val.value
    }
    if (name === 'client') {
      orderDetails[0].client = val.value
      orderDetails[0].clientName = val.label
      client.value = val.value
    }
    if (name === 'supplier') {
      orderDetails[0].supplier = val.value
      orderDetails[0].supplierName = val.label
    }
    if (name === 'orderType') {
      orderDetails[0].orderType = val.value
      orderDetails[0].orderTypeName = val.label
    }
    orderDetails[0].web_user = this.props.webUser

    delete error[name]
    this.setState({ [name]: val, orderDetails,site,client }, () => {
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

  decimalFormatter = (name,value) => {
    let values;
    if(name === 'weight' && value.length > 3)
    {
      // let lg = value.length - 3
      // if(value.length >4) lg = value.length -4
      // values = value.replace(/,/g, '')
      // values = [values.slice(0,lg), ',', values.slice(lg)].join('')
      // if(values.length < 4) values = values.replace(/,/g, '')
      return numeral(value).format(	'0,0.000')
      
      
    }
    return value
  }
  lineChange = (i, e, numeral) => {
    const {error} = this.state
    const { name, value } = e.target
    let formatted = value
    formatted = this.decimalFormatter(name,value)
    let orderLine = [...this.state.orderLine]
    orderLine[i][name] = value

    if (error.orderLine && error.orderLine.length > 0 && error.orderLine[i][name]) {
      delete error.orderLine[i][name]
    }

    this.setState({ orderLine, error })
  }
  lineSelectChange = (i, key, val) => {
    if(!val){
        return null
    }
    const { orderLine, error } = this.state
    if (error.orderLine && error.orderLine.length === i) {
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

    if (error.orderLine && error.orderLine.length > 0 && error.orderLine[i][key]) {
      delete error.orderLine[i][key]
    }

    this.setState({ orderLine, error }, () => {
      if (key === 'productVal') {
        this.getUom(val.value)
        orderLine[i].uom = null
        this.setState({ orderLine, error })
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
    if (orderId.length < 4) {
      error.orderId = 'Order no. must have min 4 characters'
      return this.setState({ error })
    }
    delete error.orderId
    const { data } = await axios.post('/orderCheck', {
      "client": client.value,
      "order_no": orderId
    })
    if (data.message !== 'available' && data.message !== 'The client field is required.') {
      error.orderId = 'Order number exist'
      return this.setState({ error })
    }
    if(data.message === 'The client field is required.'){
      error.orderId = 'Please select client'
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
      const payload = { header, orderDetails, lineDetail }
      this.props.submit(payload)
    }
  }

  numberCheck = (e) => {
    if (!/^[0-9]+$/.test(e.key)) e.preventDefault()
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
    const { error, overflow, site, client, orderType, orderLine,
      orderId, siteData, clientData, orderTypeData, productData, uomData, dispositionData, supplierData, supplier
    } = this.state

    const {user} = this.props
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
          <Select value={orderType || ''} options={orderTypeData} onChange={val => this.onSelectChange('orderType', val)} placeholder="Order Type" required 
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
          <label className="text-muted mb-0">Supplier</label>
          <Select value={supplier || ''} options={supplierData} onChange={val => this.onSelectChange('supplier', val)} placeholder="Supplier" 
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                    />
          <Required id="supplier" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Customer Order Ref</label>
          <input name="customerOrderRef" onChange={this.onChange} className="form-control" placeholder="Customer Order Ref" maxLength='40' />
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
          <input name="orderId" type="text" value={orderId || ''} onChange={this.checkOrderId} className="form-control" maxLength='12' placeholder="Order No" required />
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
              this.setState({ orderDate: date, error, orderDetails })
            }}
          />
          <Required id="orderDate" error={error} />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Vendor Order Ref</label>
          <input name="vendorOrderRef" onChange={this.onChange} className="form-control" placeholder="Vendor Order Ref" maxLength='40' />
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
              <td><div className="c-100">Batch</div></td>
              <td><div className="c-100">Ref3</div></td>
              <td><div className="c-100">Ref4</div></td>
              <td><div className="c-150">Disposition</div></td>
              <td><div className="c-150">Rotadate</div></td>
              <td><div className="c-50"></div></td>
            </tr>
          </thead>
          <tbody>
            {orderLine.length && orderLine.map((o, i) => {
              return <tr className="py-1 text-center orderline-row">
                <td className="px-1">
                  <input value={i + 1} className="form-control text-center" readOnly />
                </td>
                <td className="px-1">
                  <Select value={o.productVal || ''}
                    options={productData}
                    getOptionLabel={option => option.value}
                    onInputChange={(val) => this.getProductHandler(val)}
                    onMenuOpen={() => {productStatus[i] = true; this.setState({ productStatus: productStatus })}}
                    onMenuClose={() => {productStatus[i] = false; this.setState({ productStatus: productStatus })}}
                    onChange={(val) => this.lineSelectChange(i, 'productVal', val)}
                    className={`c-400 ${overflow[i] && overflow[i].productVal ? 'absolute' : null}`} placeholder="Product" required 
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        textAlign:'left'
                      }),
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                    />
                  <div className='w-100 d-flex align-items-start'><Required id="productVal" error={error.orderLine && error.orderLine[i]} /></div>
                </td>
                <td className="px-1">
                  <input value={o.product || ''} className="form-control" placeholder="Choose a product first" readOnly />
                </td>
                <td className="px-1">
                  <input name="qty" onKeyPress={(e) => this.numberCheck(e)} onChange={(e) => this.lineChange(i, e)} value={numeral(this.state.orderLine[i]['qty']).format('0,0')} type="text" className="form-control" placeholder="Qty" maxlength="10" />
                  <div className='w-100 d-flex align-items-start text-nowrap'>
                  <Required id="qty" error={error.orderLine && error.orderLine[i]} />
                  </div>
                  
                </td>
                <td className="px-1">
                  <input name="weight" onKeyPress={(e) => this.decimalValueForQty(e)} onChange={(e) => this.lineChange(i, e, numeral)} type="text" maxLength="15" className="form-control" placeholder="Weight" />
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
                    <div className='w-100 d-flex align-items-start'>
                    <Required id="uom" error={error.orderLine && error.orderLine[i]} />
                    </div>
                  
                </td>
                <td className="px-1">
                  <input name="batch" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Batch" maxLength='30' />
                </td>
                <td className="px-1">
                  <input name="ref3" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Ref 3" maxLength='30' />
                </td>
                <td className="px-1">
                  <input name="ref4" onChange={(e) => this.lineChange(i, e)} className="form-control" placeholder="Ref 4" maxLength='30' />
                </td>
                <td className="px-1">
                  <Select value={o.dispositionVal || ''}
                    options={dispositionData}
                    styles={{
                      dropdownIndicator: (base, state) => ({
                        ...base, 
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
                      })
                    }}
                    onMenuOpen={() => {dispositionStatus[i] = true; this.setState({ dispositionStatus: dispositionStatus })}}
                    onMenuClose={() => {dispositionStatus[i] = false; this.setState({ dispositionStatus: dispositionStatus })}}
                    onChange={(val) => this.lineSelectChange(i, 'dispositionVal', val)}
                    className={`c-150 ${overflow[i] && overflow[i].dispositionVal ? 'absolute right' : null}`} placeholder="Disposition" />
                </td>
                <td className="p-0 m-0">
                  <DatePicker
                    top={true}
                    showDatePicker={(e) => {datepickerStatus[i] = e; this.setState({ datepickerStatus: datepickerStatus })}}
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
