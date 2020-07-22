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
            moduleAccess, sites, clients, isEnableAllSite, isEnableAllClient, isEnableAllModule,
            onModuleEnableAllClick, onClientEnableAllClick, onSiteEnableAllClick } = this.props;
        // const { moduleAccess, sites, clients } = this.state;
        return (
            <Container className="px-5 py-4">
                <Row>
                    <Col lg="2" className="pr-0">
                        <h3 className="text-primary font-20 um-text-webgroup">New User</h3>
                    </Col>
                    <Col lg="10" className="pl-0">
                        <Row>
                            <Col lg="4" md="4" sm="12" className="pl-0">
                                <label className="webgroup d-flex justify-content-between">
                                    <input type="checkbox" onChange={(e) => { this.props.onWebGroupSelect(e); }} />
                                    <span className={`flex-fill ${isAdmin ? " webgroup-notactive" : " webgroup-active"}`}>REGULAR USER</span>
                                    <span className={`flex-fill ${isAdmin ? " webgroup-active" : " webgroup-notactive"}`}>ADMIN USER</span>
                                </label>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col sm="4">
                        <label className="mb-0 text-muted">User ID</label>                        
                    </Col>
                    <Col sm="4">
                        <label className="mb-0 text-muted">Email</label>
                    </Col>
                    <Col sm="4">
                        <label className="mb-0 text-muted">Name</label>
                    </Col>

                </Row>

                <Row>
                    <Col sm="4">
                        <input type="text" name="userid" readOnly className="form-control" value={user.userId} />
                        <div>
                            <span className="text-title font-sm">Auto Generated</span>
                        </div>
                    </Col>
                    <Col sm="4">
                        <input type="email" name="email" placeholder="Enter an email address" className={`form-control`} onChange={(e) => { this.props.onChangeEmail(e); }} value={user.email || ''} />
                        {/* <FormFeedback className="invalid-error-padding">
                      wrong format email
                                   </FormFeedback> */}
                    </Col>
                    <Col sm="4">
                        <input type="text" name="userName" placeholder="Enter a username" maxLength="60" className={`form-control`} onChange={(e) => { this.props.onChangeName(e); }} value={user.name || ''} />
                        {/* <FormFeedback className="invalid-error-padding">
                      name value must be entered
                                   </FormFeedback> */}
                    </Col>
                </Row>
                <Row className={`mt-3 ${isAdmin ? 'd-none' : ''}`}>

                    <Col className="col-12">
                        <h3 className="text-primary font-20">System</h3>
                    </Col>

                </Row>
                <Row className={`${isAdmin ? 'd-none' : ''}`}>
                    <Col lg="4">
                        <ModuleAccess moduleAccess={moduleAccess} onEnableClick={onModuleEnableClick} onModuleEnableAll={onModuleEnableAllClick} isEnableAllModule={isEnableAllModule} />
                    </Col>
                    <Col lg="4">
                        <Site sites={sites} onEnableClick={onSiteEnableClick} onSiteEnableAll={onSiteEnableAllClick} isEnableAllSite={isEnableAllSite} />
                    </Col>
                    <Col lg="4">
                        <Client clients={clients} onEnableClick={onClientEnableClick} onClientEnableAll={onClientEnableAllClick} isEnableAllClient={isEnableAllClient} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col lg={2}></Col>
                    <Col lg={8}></Col>
                    <Col lg={2} className="text-right">
                        <button className="btn btn-primary font-lg" onClick={(e) => {this.props.next('review')}}>{'NEXT'}</button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewUser;