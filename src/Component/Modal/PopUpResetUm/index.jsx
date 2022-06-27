import React from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import { CButton } from '@coreui/react';
import loadBtn from '../../../assets/icons/loading/LOADING-MLS.gif';
import resetDone from '../../../assets/img/reset_done.png';
import { closeModalPopupReset, closeModalResetUM, confirmResetPassword } from './service';
// import { ProgressBar } from '../service'
import './style.scss';

const Reset = ({
  show,
  isResetSuccess,
  isLoad,
  state,
  setState,
  props
}) => {
  setTimeout(() => {
    closeModalPopupReset({ state, setState })
  }, 1000);
  return (
    <Modal
      show={show}
      onHide={() => closeModalPopupReset({ state, setState })}
      size="md"
      className="sales-order-create content-modal"
      backdrop="static"
    >
      <Modal.Body>
        <Row>
          <Col className="bg-white">
            <div className="pt-2 close-reset pr-3" onClick={() => closeModalResetUM({ state, setState })} aria-hidden="true">
              <i className="iconU-close pointer" />
            </div>
          </Col>
        </Row>
        <Row className="px-3">
          <Col className="bg-white px-0">
            <div className="content-reset">
              <img src={resetDone} width="130" height="130" alt="" />

              {isResetSuccess ? (
                <div className="ver-center-item pl-2">
                  <label style={{ fontSize: '19px' }}>
                    <span style={{ color: '#637176' }}>Success!</span>
                    <br />
                    <span style={{ color: '#B4B9BB' }}>
                      Reset password requested!
                      <br />
                      We will send to the registered email address on a new password
                    </span>
                  </label>
                </div>
              ) : (
                <div className="ver-center-item pl-2">
                  <label style={{ fontSize: '19px' }}>
                    <span style={{ color: '#637176' }}>Are you sure</span>
                    <br />
                    <span style={{ color: '#B4B9BB' }}>to reset this user&apos;s password?</span>
                  </label>
                </div>
              )}
            </div>

            <div className="content-buttom pt-1">
              {isLoad && (
                <CButton type="submit" className=" btn btn-primary float-right">
                  <img src={loadBtn} className="mt-n4" width="35" height="35" alt="" />
                </CButton>
              )} 
              {!isLoad && isResetSuccess ? (
                <CButton onClick={() => { closeModalResetUM({ state, setState }) }} className="btn btn-primary float-right">
                  DONE
                </CButton>
              ) : (
                <CButton onClick={() => { confirmResetPassword({ state, setState, props }); }} className="btn btn-primary float-right">
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
export default Reset;
