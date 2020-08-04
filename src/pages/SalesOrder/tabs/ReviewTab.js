import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import endpoint from 'helpers/endpoints'
import {connect} from 'react-redux'

class ReviewTab extends React.Component {
  state = {
    status: ''
  }
  next = async () => {
    this.setState({ status: 'loading' })
    // const url = 'https://apidev.microlistics.tech/salesorder/store'
    let { header, lineDetail } = JSON.parse(JSON.stringify(this.props.data))
    const keys = ['city', 'client', 'clientName', 'company', 'country',
      'customer', 'customerOrderRef', 'customerVal', 'deliveryDate', 'deliveryInstruction', 'orderId',
      'orderType', 'orderTypeVal', 'postCode', 'site', 'siteVal', 'state', 'vendorOrderRef',
      'shipToAddress1', 'shipToAddress2', 'shipToAddress3', 'shipToAddress4', 'shipToAddress5',
    ]
    const modifiedHeader = {
      siteVal: header.site.value,
      site: header.site.label,
      orderType: header.orderType.value,
      // orderTypeVal: header.orderType.value,
      clientName: header.client.label,
      client: header.client.value || header.client,
      site: header.site.value || header.site,
      deliveryDate: header.deliveryDate,
    }
    header = Object.assign(header, modifiedHeader)
    for (const k of keys) {
      header[k] = header[k] || null
    }
    lineDetail = lineDetail.map((l, i) => {
      l.number = i + 1
      l.product = l.product || null
      l.productVal = l.productVal?.value || null
      l.ref3 = l.ref3 || null
      l.ref4 = l.ref4 || null
      l.rotaDate = l.rotaDate || null
      l.disposition = l.disposition || null
      l.dispositionVal = l.dispositionVal?.value || null
      l.uom = l.uom?.value || null
      l.weight = l.weight || null
      l.batch = l.batch || null
      l.packId = l.packId || null
      return l
    })
    const { data } = await axios.post(endpoint.salesOrderCreate, { header, lineDetail })
    if (data === 'create successfully') {
      this.setState({ status: 'success' })
      this.props.submit({ header: {}, lineDetail: [] })
      setTimeout(() => this.props.hide(), 1500)
    }
  }

  GetFormattedDate = (datex) => {
      if(!datex){
        return null;
      }
      var todayTime = new Date(datex); 
      var month = todayTime .getMonth()+1
      var day = todayTime.getDate()
      var year = todayTime .getFullYear()
      var day_ = (day<10)? "0"+day: day
      var month_ = (month<10)? "0"+month: month
      return day_ + "/" + month_ + "/" + year
  }

  
  siteCheck = (siteVal) => {
    let l = null
    let site = this.props.client || []
    site.map(data => {
      if (data.value === siteVal) l = data.label
    })
    return l
  }

  clientCheck = (clientVal) => {
    let c = null
    let client = this.props.client || []
    client.map(data => {
      if (data.value === clientVal) c = data.label
    })
    return c
  }

  render() {
    const { header, lineDetail } = this.props.data 
    return <Container className="px-5 py-4">
      <h3 className="text-primary font-20">Order Details</h3>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Site</label>
          <input value={((header.site && header.site.label)?header.site.label:false) || this.siteCheck(header.site)} className="form-control" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order Type</label>
          <input value={header.orderType?.label || ''} className="form-control" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Customer Order Ref</label>
          <input value={header.customerOrderRef || ''} className="form-control" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Delivery Date</label>
          <input value={ this.GetFormattedDate(header.deliveryDate) || ''} className="form-control" readOnly />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Client</label>
          <input value={((header.client && header.client.label)?header.client.label:false) || this.clientCheck(header.client)} className="form-control" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order No</label>
          <input value={header.orderId || ''} className="form-control text-uppercase" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Vendor Order Ref</label>
          <input value={header.vendorOrderRef || ''} className="form-control" placeholder="Vendor Order Ref" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Delivery Instructions</label>
          <textarea name="deliveryInstruction" className="form-control" placeholder="Delivery Instructions" readOnly />
        </Col>
      </Row>

      <h3 className="text-primary font-20">Customer Details</h3>
      <Row>
        <Col lg="3" className="mb-3">
          <label className="text-muted mb-0">Customer</label>
          <input value={header.customer?.label || ''} className="form-control" readOnly />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Address 1</label>
          <input value={header.shipToAddress1 || ''} className="form-control" placeholder="Address 1" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 2</label>
          <input value={header.shipToAddress2 || ''} className="form-control" placeholder="Address 2" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 3</label>
          <input value={header.shipToAddress3 || ''} className="form-control" placeholder="Address 3" readOnly />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mb-3">
          <label className="text-muted mb-0">Address 4</label>
          <input value={header.shipToAddress4 || ''} className="form-control" placeholder="Address 4" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Address 5</label>
          <input value={header.shipToAddress5 || ''} className="form-control" placeholder="Address 5" readOnly />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0">Suburb</label>
          <input value={header.city || ''} className="form-control" placeholder="Suburb" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Postcode</label>
          <input value={header.postCode || ''} className="form-control" placeholder="Postcode" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">State</label>
          <input value={header.state || ''} className="form-control" placeholder="State" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Country</label>
          <input value={header.country || ''} className="form-control" placeholder="Country" readOnly />
        </Col>
      </Row>

      <h3 className="text-primary font-20">Line Details</h3>
      <div className="orderline scroll-x-y mb-2 pb-2">
        <table>
          <thead>
            <tr className="text-light-gray">
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
            {lineDetail.length ? lineDetail.map((ld, i) => {
              return <tr className="py-1 text-center orderline-row">
                <td className="px-1 py-2"><input value={i + 1} className="form-control text-center" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.productVal?.label} className="form-control w-400" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.product} className="form-control w-600" placeholder="Choose a product first" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.qty} className="form-control" placeholder="Qty" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.weight} className="form-control" placeholder="Weight" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.uom?.label} className="form-control" placeholder="UOM" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.batch} className="form-control" placeholder="Batch" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.ref3} className="form-control" placeholder="Ref 3" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.ref4} className="form-control" placeholder="Ref 4" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.dispositionVal?.label} className="form-control" placeholder="Disposition" readOnly /></td>
                <td className="px-1 py-2"><input value={ld.packId} className="form-control" placeholder="Pack ID" readOnly /></td>
                <td className="px-1 py-2"><input value={this.GetFormattedDate(ld.rotaDate)} className="form-control" readOnly /></td>
                <td className="px-1 py-2"></td>
              </tr>
            }) : null}
          </tbody>
        </table>
      </div>
      <Row className="mt-3">
        <Col lg={2}>
          <button className="btn btn-primary" onClick={() => this.props.back()}>{'< Back'}</button>
        </Col>
        <Col lg={8}>
          {this.state.status === 'success' ?
            <div className="text-center text-secondary mt-2"> <span className="text-success">Success,</span> order has been successfully submitted for processing </div>
            : null}
          {this.state.status === 'loading' ?
            <div className="text-center text-secondary mt-2"> Loading... </div>
            : null}
        </Col>
        <Col lg={2} className="text-right">
          <button className="btn btn-primary" onClick={this.next}>{'Submit'}</button>
        </Col>
      </Row>
    </Container>
  }
}

const mapStateToProps = store => {
  return{
    client: store.client,
    site: store.site
  }
}

export default connect(mapStateToProps)(ReviewTab)