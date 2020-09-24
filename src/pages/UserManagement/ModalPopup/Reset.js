import React from 'react'
import { Row, Col, Tabs, Tab, Modal, Container } from 'react-bootstrap'
import popupLock from '../../../assets/img/popup_lock.png'
import popupLockSuccess from '../../../assets/img/popup_success_lock.png'
import '../UserManagement.css'
import loading from "../../../assets/icons/loading/LOADING-MLS-GRAY.gif"


class Reset extends React.PureComponent {


    render() {
        const { show, toggle, isResetSuccess, isLoad } = this.props;
        return <Modal show={show} onHide={() => toggle()} size="md" className="sales-order-create" backdrop="static" >
            <Modal.Body className="bg-primary p-0">
                <Row className="p-4">
                    <Col xs={10}>
                        <i className="fa fa-refresh font-20"></i>
                        <span className="font-20 pl-2">Reset Password</span> <br />
                        <span className="pl-4">Confirm your request to reset password</span>
                    </Col>
                    <Col xs={2} className="text-right">
                        <i className="iconU-close pointer" onClick={() => toggle()}></i>
                    </Col>
                </Row>
                <Row className="px-3">
                    {isLoad ? 
                     <Col className="bg-white">
                        <div className="d-flex justify-content-center mt-2 mb-5" >
                            <img src={loading} className="mt-5 mb-5" style={{ width: "3rem", height: "3rem" }} />
                        </div>
                     </Col>
                    : <Col className="bg-white">
                        <div className="d-flex justify-content ml-4">
                            <i style={{color:"#cccccc"}} className={(isResetSuccess ? "mt-4 icon-Icon_done" : " mb-n3 mt-n3 reset-caution")}></i>
                        </div>

                        <div className="d-flex mb-2 ml-4">
                            
                            {isResetSuccess ? <label style={{ fontSize: "19px" }}><span style={{color: "#637176"}}>Success!</span><br/><span style={{color:"#B4B9BB"}}>Reset password requested! <br/> We will send you an email to reset password</span></label> : <label style={{ fontSize: "19px" }}>
                                <span style={{ color: "#637176" }}>Are you sure</span> <br /> <span style={{ color: "#B4B9BB"}}>to reset this user's password?</span>
                            </label>}
                        </div>

                        <div className="d-flex justify-content-between pb-3">
                            {/* {(isResetSuccess) ? '' : <button className="font-lg font-md font-sm btn mb-4" style={{width:"15%",marginTop:"-20px"}} onClick={(e) => { toggle() }}><i className="reset-cancel" style={{color: "#fba1a2"}}></i></button>} */}
                            {(isResetSuccess) ? '' : <button className="font-lg font-md font-sm btn mr-5 mb-4" style={{width:"15%",marginTop:"-20px"}} onClick={(e) => { this.props.confirmResetPassword() }}><i className="reset-done" style={{color: "#81efdd"}}></i></button>}
                        </div>
                    </Col>}
                </Row>
            </Modal.Body>
        </Modal>
    }
}
export default Reset