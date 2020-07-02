import React from 'react'
import { Row, Col, Tabs, Tab, Modal } from 'react-bootstrap'
// import { FaRegEdit, FaPencilAlt } from 'react-icons/fa'
import _ from 'lodash'
import DetailsTab from './tabs/DetailsTab.js'
import ReviewTab from './tabs/ReviewTab'

class SalesOrderCreate extends React.PureComponent {
  state = {
    key: 'detail',
    data: { header: {}, lineDetail: [] },
    // data: { "header": { "site": { "value": "A", "label": "A : Australis A" }, "client": { "value": "AESOP", "label": "AESOP : Aesop" }, "orderType": { "value": "MVKT", "label": "MVKT: Move Orders" }, "orderId": "AB29123", "shipToAddress1": "Ark Street 12", "postCode": "291923", "state": "Victoria", "deliveryDate": "2020-07-02" }, "lineDetail": [{ "product": "product 1001", "productVal": { "value": "1001", "label": "1001", "i": 0 }, "qty": "2", "uom": { "value": "CARTON", "label": "CARTON" }, "disposition": "G", "dispositionVal": { "value": "G", "label": "G", "i": 9 } }] }
  }
  onActiveTabChange = (e) => {
    console.log(e)
  }
  onSelectTab = (key) => {
    let { header, lineDetail } = this.state.data
    if (key === 'review' && !Object.keys(header).length && !lineDetail.length) {
      console.log('review disabled until form filled')
      return null
    }
    this.setState({ key })
  }
  setData = (data) => {
    console.log(JSON.stringify(data))
    if (data.header && data.lineDetail) {
      this.setState({ data, key: 'review' })
    }
  }
  render() {
    const { show, toggle } = this.props
    const { data } = this.state
    return <Modal show={show} onHide={() => toggle()} size="xl" className="sales-order-create" >
      <Modal.Body className="bg-primary p-0">
        <Row className="p-4">
          <Col xs={10}>
            <i className="iconU-createModal font-20"></i><span className="font-20 pl-2">Create Sales Order</span> <br />
            <span className="pl-4">Enter Order and line details to create a new purchase order</span>
          </Col>
          <Col xs={2} className="text-right">
            <i className="iconU-close pointer" onClick={() => toggle()}></i>
          </Col>
        </Row>
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={this.onSelectTab}
        >
          <Tab eventKey="detail" title={`1. Order & Product Details`}>
            <DetailsTab
              data={data}
              submit={this.setData}
              {...this.props} />
          </Tab>
          <Tab eventKey="review" title={`2. Review`}>
            <ReviewTab
              data={data}
              back={() => this.onSelectTab('detail')}
              submit={this.setData}
              hide={toggle} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  }
}
export default SalesOrderCreate