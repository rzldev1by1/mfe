import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import ModuleAccess from './ModuleAccess'
import Site from './Site'
import Client from './Client'
import * as utility from './UmUtility'
import axios from 'axios'
import endpoint from '../../helpers/endpoints'

import _ from 'lodash'


class UserManagementCreate extends React.PureComponent {
  state = {
    key: 'new',
    data: { header: {}, lineDetail: [] },
    isAdmin: false,
    sites: [],
    client: [],
    moduleAccess: []    // data: { "header": { "site": { "value": "A", "label": "A : Australis A" }, "client": { "value": "AESOP", "label": "AESOP : Aesop" }, "orderType": { "value": "MVKT", "label": "MVKT: Move Orders" }, "orderId": "AB29123", "shipToAddress1": "Ark Street 12", "postCode": "291923", "state": "Victoria", "deliveryDate": "2020-07-02" }, "lineDetail": [{ "product": "product 1001", "productVal": { "value": "1001", "label": "1001", "i": 0 }, "qty": "2", "uom": { "value": "CARTON", "label": "CARTON" }, "disposition": "G", "dispositionVal": { "value": "G", "label": "G", "i": 9 } }] }
  }

  componentDidMount() {
    this.loadModuleAccess();
    this.loadSites();
    this.loadClients();
  }

  onActiveTabChange = (e) => {
    console.log(e)
  }
  onSelectTab = (key) => {
    let { header, lineDetail } = this.state.data
    //   if (key === 'review' && !Object.keys(header).length && !lineDetail.length) {
    //     console.log('review disabled until form filled')
    //     return null
    //   }
    this.setState({ key })
  }

  setData = (data) => {
    console.log(JSON.stringify(data))
    if (data.header && data.lineDetail) {
      this.setState({ data, key: 'review' })
    }
  }

  loadModuleAccess = async () => {
    const { data } = await axios.get(endpoint.userManagementModuleAccess)
    this.setState({ moduleAccess: data });

  }

  loadSites = async () => {
    const { data } = await axios.get(endpoint.getSite);
    this.setState({ sites: data });
  }

  loadClients = async () => {
    const { data } = await axios.get(endpoint.getClient);
    this.setState({ clients: data });
  }

  getSite = () => {
    let sites = JSON.parse(utility.readFromLocalStorage("sites"));
    this.setState({ ...this.state, sites });
  }

  onSiteEnableClick = () => {

  }

  onSiteEnableAllClick = () => {

  }

  onModuleEnableClick = () => {

  }

  onModuleEnableAllClick = () => {

  }

  onClientEnableClick = () => {

  }

  onClientEnableAllClick = () => {

  }


  onebGroupSelect = (event) => {
    this.setState({ isAdmin: event.target.checked });
  }

  render() {
    const { show, toggle } = this.props
    const { data, isAdmin, sites, clients, moduleAccess } = this.state
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
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={this.onSelectTab}
        >
          <Tab eventKey="new" title={`1. User Details`}>
            <Container className="px-5 py-4">
              <Row>
                <Col lg="3">
                  <h3 className="text-primary font-20">New User</h3>
                </Col>
                <Col lg="9">
                  <Row>
                    <Col lg="6" md="9" sm="12" >
                      <label className="webgroup d-flex justify-content-between">
                        <input type="checkbox" onChange={(e) => { this.onebGroupSelect(e); }} />
                        <span className={`${isAdmin ? "flex-fill webgroup-notactive" : "flex-fill webgroup-active"}`}>Regular User</span>
                        <span className={`${isAdmin ? "flex-fill webgroup-active" : "flex-fill webgroup-notactive"}`}>Admin User</span>
                      </label>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col lg="4">
                  <label className="title-label">User ID</label>
                </Col>
                <Col lg="4">
                  <label className="title-label">Name</label>
                </Col>
                <Col lg="4">
                  <label className="title-label">Email</label>
                </Col>

              </Row>

              <Row>
                <Col lg="4">
                  <input type="text" name="userid" readOnly className="form-control" />
                </Col>
                <Col lg="4">
                  <input type="text" name="userName" placeholder="Enter a surename" maxLength="60" className={`form-control`} onChange={(e) => { }} />
                  {/* <FormFeedback className="invalid-error-padding">
                      name value must be entered
                                   </FormFeedback> */}
                </Col>

                <Col lg="4">
                  <input type="email" name="email" placeholder="Enter an email address" className={`form-control`} onChange={(e) => { }} />
                  {/* <FormFeedback className="invalid-error-padding">
                      wrong format email
                                   </FormFeedback> */}
                </Col>
              </Row>
              <Row className={""}>

                <Col className="col-12">
                  <h3 className="text-primary font-20">System</h3>
                </Col>

              </Row>
              <Row>
                <Col lg="4">
                  <ModuleAccess moduleAccess={moduleAccess} onEnableClick={this.onModuleEnableClick} onModuleEnableAll={this.onModuleEnableAllClick} />
                </Col>
                <Col lg="4">
                  <Site sites={sites} onEnableClick={this.onSiteEnableClick} onSiteEnableAll={this.onSiteEnableAllClick} isEnableAllSite={false} />
                </Col>
                <Col lg="4">
                  <Client clients={clients} onEnableClick={this.onClientEnableClick} onClientEnableAll={this.onClientEnableAllClick} />
                </Col>
              </Row>
            </Container>


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