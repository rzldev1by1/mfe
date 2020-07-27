import React from 'react'
import Numeral from "numeral";
import { Modal } from 'react-bootstrap'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
// import _ from 'lodash'
import DetailsTab from './tabs/DetailsTab.js'
import ReviewTab from './tabs/ReviewTab'
import MessageTab from '../../shared/MessageTab'

class SalesOrderCreate extends React.PureComponent {
  state = {
    key: 'detail',
    submit: false,
    status:'Failed to create order',
    data: { header: {}, lineDetail: [] },
    // data: { "header": { "site": { "value": "A", "label": "A : Australis A" }, "client": { "value": "AESOP", "label": "AESOP : Aesop" }, "orderType": { "value": "MVKT", "label": "MVKT: Move Orders" }, "orderId": "AB29123", "shipToAddress1": "Ark Street 12", "postCode": "291923", "state": "Victoria", "deliveryDate": "2020-07-02" }, "lineDetail": [{ "product": "product 1001", "productVal": { "value": "1001", "label": "1001", "i": 0 }, "qty": "2", "uom": { "value": "CARTON", "label": "CARTON" }, "disposition": "G", "dispositionVal": { "value": "G", "label": "G", "i": 9 } }] }
  }
  onSelectTab = (key) => {
    let { header, lineDetail } = this.state.data
    if (key === 'review' && !Object.keys(header).length && !lineDetail.length) {
      return null
    }
    this.setState({ key,submit:false })
  }
  setData = (data) => {
    if (data.header && data.lineDetail) {
      this.setState({ data, key: 'review', submit:false })
    }
  }

  submitStatus = (status) => {
    this.setState({submit:true})
    if(status === 'Successfully added' ) 
    {
      this.setState({submit:true, status})
      setTimeout(() => this.onHide(), 2000)
    }
    else{
      this.setState({status})
    }
  }
  onHide = () => {
    this.props.toggle()
    this.setState({ key: 'detail', data: { header: {}, lineDetail: [], orderDetails: [{}] } })
  }
  render() {
    const { data, key } = this.state
    return <Modal show={this.props.show} onHide={this.onHide} size="xl" className="purchase-order-create" >
      <Modal.Body className="bg-primary p-0">
        <Row className="px-5 pb-3 pt-md mx-0">
          <Col xs={10} className="px-0">
            <i className="iconU-createModal font-20"></i><span className="font-20 pl-2">Create Purchase Order</span> <br />
            <span>Enter Order and line details to create a new purchase order</span>
          </Col>
          <Col xs={2} className="text-right px-0">
            <i className="iconU-close pointer" onClick={this.onHide}></i>
          </Col>
        </Row>
        <Nav tabs className="px-5 m-0">
          <NavItem className="mr-3"><NavLink className={`d-flex align-items-center ${key === 'detail' ? 'active' : null}`} onClick={() => this.onSelectTab('detail')}>
            <div className={`badge badge-pill text-align-center mr-2 badge-${key === 'detail' ? 'primary' : 'secondary'}`}>1</div> Order & Product Details
          </NavLink></NavItem>
          <NavItem><NavLink className={`d-flex align-items-center ${key === 'review' ? 'active' : null}`} onClick={() => this.onSelectTab('review')}>
            <div className={`badge badge-pill text-align-center mr-2 badge-${key === 'review' ? 'primary' : 'secondary'}`}>2</div> Review
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
            {
              this.state.submit ? 
              < MessageTab 
                module={'Purchase Order'} 
                orderNo={data?.orderNo}
                status={this.state.status} 
                back={() => this.onSelectTab('detail')} 
                exit={() => this.onHide()}/>
              :
              < ReviewTab
                data={data}
                back={() => this.onSelectTab('detail')}
                submit={this.setData}
                submitStatus={this.submitStatus}
                hide={this.onHide} />
            }
          </TabPane>
        </TabContent>
      </Modal.Body>
    </Modal>
  }
}
export default SalesOrderCreate

