import React from 'react'
import { Modal } from 'react-bootstrap'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import DetailsTab from './tabs/DetailsTab.js'
import ReviewTab from './tabs/ReviewTab'

class SalesOrderCreate extends React.PureComponent {
  state = {
    key: 'detail',
    data: { header: {}, lineDetail: [] },
    // data: { "header": { "site": { "value": "A", "label": "A : Australis A" }, "client": { "value": "AESOP", "label": "AESOP : Aesop" }, "orderType": { "value": "MVKT", "label": "MVKT: Move Orders" }, "orderId": "AB29123", "shipToAddress1": "Ark Street 12", "postCode": "291923", "state": "Victoria", "deliveryDate": "2020-07-02" }, "lineDetail": [{ "product": "product 1001", "productVal": { "value": "1001", "label": "1001", "i": 0 }, "qty": "2", "uom": { "value": "CARTON", "label": "CARTON" }, "disposition": "G", "dispositionVal": { "value": "G", "label": "G", "i": 9 } }] }
  }
  onSelectTab = (key) => {
    let { header, lineDetail } = this.state.data
    if (key === 'review' && !Object.keys(header).length && !lineDetail.length) {
      return null
    }
    this.setState({ key })
  }
  setData = (data) => {
    if (data.header && data.lineDetail) {
      this.setState({ data, key: 'review' }, () => { 
      })
    }
  }
  onHide = () => {
    this.props.toggle()
    this.setState({ key: 'detail', data: { header: {}, lineDetail: [] } })
  }
  render() {
    const { data, key } = this.state
    return <Modal show={this.props.show} onHide={this.onHide} size="xl" className="sales-order-create" >
      <Modal.Body className="bg-primary p-0">
        <Row className="pl-5 pr-3 pb-3 pt-3 mx-0">
          <Col xs={10} className="px-0">
            <span className="font-20"><i className="iconU-createModal font-20"></i> Sales Order</span> <br />
            <span className="ml-7">Enter Order and line details to create a new sales order</span>
          </Col>
          <Col xs={2} className="text-right px-0">
            <i className="iconU-close pointer" onClick={this.onHide}></i>
          </Col>
        </Row>
        <Nav tabs className="px-7 mx-0">
          <NavItem className="mr-2"><NavLink className={`d-flex align-items-center ${key === 'detail' ? 'active' : null}`} onClick={() => this.onSelectTab('detail')}>
            <div className={`badge badge-pill d-flex text-align-center mr-1 badge-${key === 'detail' ? 'primary' : 'secondary'}`}>1</div> Order & Product Details
          </NavLink></NavItem>
          <NavItem><NavLink className={`d-flex align-items-center ${key === 'review' ? 'active' : null}`} onClick={() => this.onSelectTab('review')}>
            <div className={`badge badge-pill d-flex text-align-center mr-1 badge-${key === 'review' ? 'primary' : 'secondary'}`}>2</div> Review
          </NavLink></NavItem>
        </Nav>
        <TabContent activeTab={this.state.key}>
          <TabPane tabId="detail">
            <DetailsTab
              data={data}
              submit={this.setData}
              {...this.props} />
          </TabPane>
          <TabPane tabId="review">
            <ReviewTab
              data={data}
              back={() => this.onSelectTab('detail')}
              submit={this.setData}
              hide={this.onHide} />
          </TabPane>
        </TabContent>
      </Modal.Body>
    </Modal>
  }
}
export default SalesOrderCreate