import React from 'react'
import {connect} from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import endpoint from 'helpers/endpoints'

class ReviewTab extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      status: ''
    }
  }
  next = async () => {
    this.setState({ status: 'loading' })
    // const url = 'https://apidev.microlistics.tech/salesorder/store'
    let { header, lineDetail, orderDetails } = JSON.parse(JSON.stringify(this.props.data))
    const keys = ['site', 'client', 'clientName', 'company','supplier','supplierName','customerOrderRef',
                  'orderType','orderTypeName','orderId','orderDate','vendorOrderRef'
    ]
    header = Object.assign(header)
    for (const k of keys) {
      header[k] = header[k] || null
    }
    console.log(lineDetail)
    lineDetail = lineDetail.map((l, i) => {
      l.number = i + 1
      l.productDescription = l.product || null
      l.product = l.productVal?.value || null
      l.ref3 = l.ref4 || null
      l.ref4 = l.ref4 || null
      l.rotaDate = l.rotaDate || null
      l.disposition = l.disposition || null
      l.dispositionVal = l.dispositionVal?.value || null
      l.uom = l.uom?.value || null
      l.weight = l.weight || null
      l.batch = l.batch || null
      return l
    })

    let lineDetails = lineDetail

    const { data } = await axios.post(endpoint.purchaseOrderCreate, { orderDetails, lineDetails })
    if (data.message === 'Successfully added') {
      this.setState({ status: 'success' })
      this.props.submit({ header: {}, lineDetail: [], orderDetails:[{}] })
    }
    this.props.submitStatus(data.message)
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

  render() {
    const { header, lineDetail, orderDetails } = this.props.data
    const od = orderDetails
    console.log(od)
    return <Container className="px-5 py-4">
      <h3 className="text-primary font-20">Order Details</h3>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Site</label>
          <input value={od ? this.siteCheck(od[0].site) : ''} className="form-control" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order Type</label>
          <input value={od ? od[0].orderTypeName : ''} className="form-control" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Supplier</label>
          <input value={od ? od[0].supplierName : ''} className="form-control" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Customer Order Ref</label>
          <input value={od ? od[0].customerOrderRef : ''} className="form-control" readOnly />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <label className="text-muted mb-0 required">Client</label>
          <input value={od ? this.clientCheck(od[0].client) : ''} className="form-control" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order No</label>
          <input value={od ? od[0].orderNo : ''} className="form-control text-uppercase" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Order Date</label>
          <input value={od ? od[0].orderDate : ''} className="form-control" placeholder="Order Date" readOnly />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0">Vendor Order Ref</label>
          <input value={od ? od[0].vendorOrderRef : ''} className="form-control" placeholder="Vendor Order Ref" readOnly />
        </Col>
      </Row>

      <h3 className="text-primary font-20">Line Details</h3>
      <div className="orderline scroll-x-y mb-2 pb-2">
        <table>
          <thead>
            <tr className="text-light-gray">
              <td><div className="c-1 text-center">#</div></td>
              <td><div className="c-3 required">Product</div></td>
              <td><div className="c-4">Description</div></td>
              <td><div className="c-3 required">Qty</div></td>
              <td><div className="c-2">Weight</div></td>
              <td><div className="c-3 required">UOM</div></td>
              <td><div className="c-3">Rotadate</div></td>
              <td><div className="c-2">Batch</div></td>
              <td><div className="c-2">Ref3</div></td>
              <td><div className="c-2">Ref4</div></td>
              <td><div className="c-2">Disposition</div></td>
              <td><div className="c-3">Pack ID</div></td>
              <td><div className="c-1"></div></td>
            </tr>
          </thead>
          <tbody>
            {lineDetail.length ? lineDetail.map((ld, i) => {
              return <tr className="py-1 text-center orderline-row">
                <td className="px-1"><input value={i + 1} className="form-control text-center" readOnly /></td>
                <td className="px-1"><input value={ld.productVal?.label} className="form-control w-400" readOnly /></td>
                <td className="px-1"><input value={ld.product} className="form-control w-600" placeholder="Choose a product first" readOnly /></td>
                <td className="px-1"><input value={ld.qty} className="form-control" placeholder="Qty" readOnly /></td>
                <td className="px-1"><input value={ld.weight} className="form-control" placeholder="Weight" readOnly /></td>
                <td className="px-1"><input value={ld.uom?.label} className="form-control" placeholder="UOM" readOnly /></td>
                <td className="px-1"><input value={ld.rotaDate} className="form-control" readOnly /></td>
                <td className="px-1"><input value={ld.batch} className="form-control" placeholder="Batch" readOnly /></td>
                <td className="px-1"><input value={ld.ref3} className="form-control" placeholder="Ref 3" readOnly /></td>
                <td className="px-1"><input value={ld.ref4} className="form-control" placeholder="Ref 4" readOnly /></td>
                <td className="px-1"><input value={ld.dispositionVal?.label} className="form-control" placeholder="Disposition" readOnly /></td>
                <td className="px-1"><input value={ld.packId} className="form-control" placeholder="Pack ID" readOnly /></td>
                <td className="px-1"></td>
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
