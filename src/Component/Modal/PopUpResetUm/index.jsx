import React from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import loadBtn from '../../../assets/icons/loading/LOADING-MLS.gif';
import reset_done from '../../../assets/img/reset_done.png';
import { closeModalPopupReset, confirmResetPassword } from './service';
import { CButton } from '@coreui/react';
import './style.scss';

class Reset extends React.PureComponent {
  render() {
    const { show, isResetSuccess, isLoad, state, setState, props } = this.props;
    return (
      <Modal
        show={show}
        onHide={() => closeModalPopupReset({ state, setState })}
        size="md"
        className="sales-order-create"
        backdrop="static"
      >
        <Modal.Body>
          <Row>
            <Col className="bg-white">
              <div className="pt-2 close-reset">
                <i className="iconU-close pointer" onClick={() => closeModalPopupReset({ state, setState })}></i>
              </div>
            </Col>
          </Row>
          <Row className="px-3">
            <Col className="bg-white">
              <div className="content-reset">
                    <img src={reset_done}  width="130" height="130" />

                  {isResetSuccess ? (
                    <div className="ver-center-item pl-2">
                      <label style={{ fontSize: '19px' }}>
                        <span style={{ color: '#637176' }}>Success!</span>
                        <br />
                        <span style={{ color: '#B4B9BB' }}>
                          Reset password requested! 
                          <br/>
                          We will send to the registered email address on a new password
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="ver-center-item pl-2">
                      <label style={{ fontSize: '19px' }}>
                        <span style={{ color: '#637176' }}>Are you sure</span>
                        <br/>
                        <span style={{ color: '#B4B9BB' }}>to reset this user's password?</span> 
                      </label>
                    </div>
                  )}
              </div>

              <div className="content-buttom pb-3 pt-2">
                {isLoad ? (
                  <CButton  type="submit" className=" btn btn-primary float-right">
                    <img src={loadBtn} className="mt-n4" width="35" height="35" />
                  </CButton >
                ) : isResetSuccess ? (
                  <CButton onClick={() => closeModalPopupReset({ state, setState })} className="btn btn-primary float-right">
                    DONE
                  </CButton>
                ) : (
                  <CButton onClick={(e) => { confirmResetPassword({ state, setState, props });}} className="btn btn-primary float-right">
                    RESET
                  </CButton>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}
export default Reset;
