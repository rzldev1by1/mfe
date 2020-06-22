import React from 'react'
import { Row, Col, Tabs, Tab, Modal } from 'react-bootstrap'
// import { FaRegEdit, FaPencilAlt } from 'react-icons/fa'
import DetailsTab from './tabs/DetailsTab.js'
import ReviewTab from './tabs/ReviewTab'

class SalesOrderCreate extends React.PureComponent {
  state = {
    key: 'detail',
    data: []
  }
  onActiveTabChange = (e) => {
    console.log(e)
  }
  render() {
    const { show, toggle } = this.props
    return <Modal show={show} onHide={toggle} size="xl" className="sales-order-create">
      <Modal.Body className="bg-primary p-0">
        <Row className="p-4">
          <Col xs={10}>
            <i className="iconU-createModal font-20"></i><span className="font-20 pl-2">Create Sales Order</span> <br />
            <span className="pl-4">Enter Order and line details to create a new purchase order</span>
          </Col>
          <Col xs={2} className="text-right">
            <i className="iconU-close"></i>
          </Col>
        </Row>
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={(key) => this.setState({ key })}
        >
          <Tab eventKey="detail" title="Order & Product Details">
            <DetailsTab {...this.props} />
          </Tab>
          <Tab eventKey="review" title="Review">
            <ReviewTab />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  }
}
export default SalesOrderCreate