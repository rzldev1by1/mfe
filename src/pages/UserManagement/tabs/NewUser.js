import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import ModuleAccess from '../ModuleAccess'
import Site from '../Site'
import Client from '../Client'
import axios from 'axios'
import endpoint from '../../../helpers/endpoints'
import * as utility from '../UmUtility'



class NewUser extends React.PureComponent {

    state = {
        sites: [],
        client: [],
        moduleAccess: []
    }

    componentDidMount() {

    }







    render() {
        const { isAdmin, user, onModuleEnableClick, onSiteEnableClick, onClientEnableClick,
            moduleAccess, sites, clients } = this.props;
        // const { moduleAccess, sites, clients } = this.state;
        return (
            <Container className="px-5 py-4">
                <Row>
                    <Col lg="2">
                        <h3 className="text-primary font-20">New User</h3>
                    </Col>
                    <Col lg="10">
                        <Row>
                            <Col lg="6" md="9" sm="12" >
                                <label className="webgroup d-flex justify-content-between">
                                    <input type="checkbox" onChange={(e) => { this.props.onWebGroupSelect(e); }} />
                                    <span className={`${isAdmin ? "flex-fill webgroup-notactive" : "flex-fill webgroup-active"}`}>Regular User</span>
                                    <span className={`${isAdmin ? "flex-fill webgroup-active" : "flex-fill webgroup-notactive"}`}>Admin User</span>
                                </label>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col lg="4">
                        <label className="text-muted">User ID</label>
                    </Col>
                    <Col lg="4">
                        <label className="text-muted">Name</label>
                    </Col>
                    <Col lg="4">
                        <label className="text-muted">Email</label>
                    </Col>

                </Row>

                <Row>
                    <Col lg="4">
                        <input type="text" name="userid" readOnly className="form-control" value={user.userId} />
                    </Col>
                    <Col lg="4">
                        <input type="text" name="userName" placeholder="Enter a surename" maxLength="60" className={`form-control`} onChange={(e) => { this.props.onChangeName(e); }} value={user.name || ''} />
                        {/* <FormFeedback className="invalid-error-padding">
                      name value must be entered
                                   </FormFeedback> */}
                    </Col>

                    <Col lg="4">
                        <input type="email" name="email" placeholder="Enter an email address" className={`form-control`} onChange={(e) => { this.props.onChangeEmail(e); }} value={user.email || ''} />
                        {/* <FormFeedback className="invalid-error-padding">
                      wrong format email
                                   </FormFeedback> */}
                    </Col>
                </Row>
                <Row className={`${isAdmin ? 'd-none' : ''}`}>

                    <Col className="col-12">
                        <h3 className="text-primary font-20">System</h3>
                    </Col>

                </Row>
                <Row className={`${isAdmin ? 'd-none' : ''}`}>
                    <Col lg="4">
                        <ModuleAccess moduleAccess={moduleAccess} onEnableClick={onModuleEnableClick} onModuleEnableAll={this.onModuleEnableAllClick} />
                    </Col>
                    <Col lg="4">
                        <Site sites={sites} onEnableClick={onSiteEnableClick} onSiteEnableAll={this.onSiteEnableAllClick} isEnableAllSite={false} />
                    </Col>
                    <Col lg="4">
                        <Client clients={clients} onEnableClick={onClientEnableClick} onClientEnableAll={this.onClientEnableAllClick} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col lg={2}></Col>
                    <Col lg={8}></Col>
                    <Col lg={2} className="text-right">
                        <button className="btn btn-primary" onClick={(e) => {this.props.next('review')}}>{'Next >'}</button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewUser;