import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import ModuleAccess from '../ModuleAccessReview'
import Site from '../SiteReview'
import Client from '../ClientReview'
import axios from 'axios'
import * as utility from '../UmUtility'
import loading from "../../../assets/icons/loading/LOADING-MLS.gif"

class Review extends React.PureComponent {

    render() {
        const { isAdmin, user, moduleAccess, sites, clients, submitProgress } = this.props;

        return (
            <Container className="px-5 py-4">
                <Row>
                    <Col lg="2" className="pr-0" style={{flex:"0 0 11%",maxWidth:"11%"}}>
                        <h3 className="text-primary font-20 um-text-webgroup">New User</h3>
                    </Col>
                    <Col lg="10" className="pl-0">
                        <Row>
                            <Col lg="4" md="4" sm="12" className="pl-0">
                                <label className="webgroup d-flex justify-content-between">
                                    <input type="checkbox" />
                                    <span className={`flex-fill ${isAdmin ? "webgroup-review-notactive" : " webgroup-review-active"}`}>REGULAR USER</span>
                                    <span className={`flex-fill ${isAdmin ? "webgroup-review-active" : " webgroup-review-notactive"}`}>ADMIN USER</span>
                                </label>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col lg="4">
                        <label className="mb-0 text-muted">User ID</label>
                    </Col>
                    <Col lg="4">
                        <label className="mb-0 text-muted">Email</label>
                    </Col>
                    <Col lg="4">
                        <label className="mb-0 text-muted">Name</label>
                    </Col>

                </Row>

                <Row className="um-review">
                    <Col lg="4">
                        <label name="userid" readOnly className="form-control mb-0 review-readonly">
                            {user.userId}
                        </label>
                        <div>
                            <span className="text-title font-sm">Auto Generated</span>
                        </div>
                    </Col>
                    <Col lg="4">
                        <label name="email" className={`form-control mb-0 review-text`} >{user.email || ''} </label>                        
                    </Col>
                    <Col lg="4">
                        <label name="userName" maxLength="60" className={`form-control mb-0 review-text`}>{user.name || ''}</label>                      
                    </Col>

                </Row>
                <Row className={`mt-3 ${isAdmin ? 'd-none' : ''}`}>

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
                        <Client clients={clients} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col lg={2} className="text-left">
                        <button className="btn btn-primary font-lg" onClick={(e) => { this.props.next('new') }}>{'BACK'}</button>
                    </Col>
                    <Col lg={8}></Col>
                    <Col lg={2} className="text-right">
                        <button className="btn btn-primary font-lg" onClick={(e) => { this.props.submit() }}>
                            {submitProgress ? <img src={loading} className='mt-min-5' width='45' height='45'/> : 'SUBMIT'}
                            {/* <i className={`mx-1 fa fa-refresh ${submitProgress ? "fa-spin" : "d-none"}`}></i>
                            {'SUBMIT'} */}
                        </button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Review;