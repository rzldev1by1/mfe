import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import popupLock from '../../../assets/img/popup_lock.png'
import popupLockSuccess from '../../../assets/img/popup_success_lock.png'
import '../UserManagement.css'


class Reset extends React.PureComponent {


    render() {
        const { show, toggle, isResetSuccess } = this.props;
        return <Modal show={show} onHide={() => toggle()} size="md" className="sales-order-create" >
            <Modal.Body className="bg-primary p-0">
                <Row className="p-4">
                    <Col xs={10}>
                        <i className="fa fa-refresh font-20"></i>
                        <span className="font-20 pl-2">Create User</span> <br />
                        <span className="pl-4">Confirm your request to reset password</span>
                    </Col>
                    <Col xs={2} className="text-right">
                        <i className="iconU-close pointer" onClick={() => toggle()}></i>
                    </Col>
                </Row>
                <Row className="px-3">
                    <Col className="bg-white">
                        <div className="d-flex justify-content-center">
                            <img className={isResetSuccess ? "img-popup-reset-success" : "img-popup-reset"} src={isResetSuccess ? popupLockSuccess : popupLock} />
                        </div>

                        <div className="d-flex justify-content-center">
                            {isResetSuccess ? <label style={{ fontSize: "50px", color: "#3366FF" }}>Success!</label> : ''}
                        </div>

                        <div className="d-flex justify-content-center">
                            {isResetSuccess ? <label style={{color:"#637176"}}>Reset password requested!</label> : <label style={{color:"#637176"}}>Do you want to reset your password?</label>}
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            {isResetSuccess ? <label style={{color:"#637176"}}>We will send you an email to reset password</label> : <label style={{color:"#637176"}}>Your new password will send to your registered email less than 24 hours</label>}
                        </div>

                        <div className="d-flex justify-content-between pb-3">
                            {(isResetSuccess) ? '' : <button className="font-lg font-md font-sm btn btn-grey ml-4" style={{ width: "15%" }} onClick={(e) => { toggle() }}>No</button>}

                            {(isResetSuccess) ? '' : <button className="font-lg font-md font-sm btn btn-primary mr-4" style={{ width: "15%" }} onClick={(e) => { this.confirmResetPassword() }}>Yes</button>}
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    }
}
export default Reset