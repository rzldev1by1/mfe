import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import ModuleAccess from '../ModuleAccessReview'
import Site from '../SiteReview'
import Client from '../ClientReview'
import axios from 'axios'
import * as utility from '../UmUtility'


class Review extends React.PureComponent {

    render() {
        const { isAdmin, user, moduleAccess, sites, clients } = this.props;
        
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
                                    <input type="checkbox" />
                                    <span className={`flex-fill ${isAdmin ? "webgroup-review-notactive" : " webgroup-review-active"}`}>Regular User</span>
                                    <span className={`flex-fill ${isAdmin ? "webgroup-review-active" : " webgroup-review-notactive"}`}>Admin User</span>
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
                        <label name="userid" style={{backgroundColor:'#F6F7F9'}} readOnly className="form-control">
                        {user.userId}
                        </label>
                    </Col>
                    <Col lg="4">
                        <label name="userName" style={{color:'#959DA0'}} maxLength="60" className={`form-control`}>{user.name || ''}</label>
                        {/* <FormFeedback className="invalid-error-padding">
                      name value must be entered
                                   </FormFeedback> */}
                    </Col>

                    <Col lg="4">
                        <label name="email" style={{color:'#959DA0'}} className={`form-control`} >{user.email || ''} </label>
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
                        <ModuleAccess moduleAccess={moduleAccess} />
                    </Col>
                    <Col lg="4">
                        <Site sites={sites} />
                    </Col>
                    <Col lg="4">
                        <Client clients={clients}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Review;