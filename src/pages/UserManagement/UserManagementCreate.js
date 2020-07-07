import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import * as utility from './UmUtility'
import axios from 'axios'
import endpoint from '../../helpers/endpoints'
import NewUser from './tabs/NewUser'
import _ from 'lodash'


class UserManagementCreate extends React.PureComponent {
  state = {
    key: 'new',
    // data: { header: {}, lineDetail: [] },
    isAdmin: false,
    user:{  name:'',
            userId:'',
            password:'',
            email:'',
            disabled:'N',
            webGroup:false
          },
        // data: { "header": { "site": { "value": "A", "label": "A : Australis A" }, "client": { "value": "AESOP", "label": "AESOP : Aesop" }, "orderType": { "value": "MVKT", "label": "MVKT: Move Orders" }, "orderId": "AB29123", "shipToAddress1": "Ark Street 12", "postCode": "291923", "state": "Victoria", "deliveryDate": "2020-07-02" }, "lineDetail": [{ "product": "product 1001", "productVal": { "value": "1001", "label": "1001", "i": 0 }, "qty": "2", "uom": { "value": "CARTON", "label": "CARTON" }, "disposition": "G", "dispositionVal": { "value": "G", "label": "G", "i": 9 } }] }
  }

  componentDidMount() {
    
  }

  onActiveTabChange = (e) => {
    console.log(e)
  }
  onSelectTab = (key) => {
    // let { header, lineDetail } = this.state.data
    //   if (key === 'review' && !Object.keys(header).length && !lineDetail.length) {
    //     console.log('review disabled until form filled')
    //     return null
    //   }
    this.setState({ key })
  }

  setData = (data) => {
    
    if (data.header && data.lineDetail) {
      this.setState({ data, key: 'review' })
    }
  }

  onChangeName = (e) => {
    const { value } = e.target;
    let newText = value.substring(0, 2);
    let user = { ...this.state.user };
    
    let result = utility.generateUserID(value);
    user.name = value;
    user.userId = newText.toLowerCase() + result;
    user.password = result + newText.toLowerCase();
    this.setState({ user: user });
    
  }

  onChangeEmail = (e) => {
    const { value } = e.target;
    let user = { ...this.state.user };
    user.email = value;
    this.setState({ user: user },() => (console.log(this.state.user)) );
  }

  

  getSite = () => {
    let sites = JSON.parse(utility.readFromLocalStorage("sites"));
    this.setState({ ...this.state, sites });
  }


  onWebGroupSelect = (event) => {
    let user = { ...this.state.user };
    user.disabled = "N";
    user.webGroup = event.target.checked;
    this.setState({ isAdmin: event.target.checked,user:user});
  }


  render() {
    const { show, toggle } = this.props
    const { user, isAdmin } = this.state
    return <Modal show={show} onHide={() => toggle()} size="xl" className="sales-order-create" >
      <Modal.Body className="bg-primary p-0">
        <Row className="p-4">
          <Col xs={10}>
            <i className="iconU-createModal font-20"></i><span className="font-20 pl-2">Create User</span> <br />
            <span className="pl-4">Enter user details to create a New User</span>
          </Col>
          <Col xs={2} className="text-right">
            <i className="iconU-close pointer" onClick={() => toggle()}></i>
          </Col>
        </Row>
        <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={this.onSelectTab}>
          <Tab eventKey="new" title={`1. User Details`}>
            <NewUser user={user} isAdmin={isAdmin} onWebGroupSelect={this.onWebGroupSelect} 
            onChangeName={this.onChangeName} onChangeEmail={this.onChangeEmail} />
          </Tab>
          <Tab eventKey="review" title={`2. Review`}>
            b
            </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  }
}
export default UserManagementCreate