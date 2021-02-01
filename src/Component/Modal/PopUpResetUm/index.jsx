import React from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import loadBtn from '../../../assets/icons/loading/LOADING-MLS-GREEN.gif';
import { closeModalPopupReset, confirmResetPassword } from './service';

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
        <Modal.Body className="bg-primary p-0">
          <Row className="p-4">
            <Col xs={10}>
              <i className="fa fa-refresh font-20"></i>
              <span className="font-20 pl-2">Reset Password</span> <br />
              <span className="pl-4">Confirm your request to reset password</span>
            </Col>
            <Col xs={2} className="text-right">
              <i className="iconU-close pointer" onClick={() => closeModalPopupReset({ state, setState })}></i>
            </Col>
          </Row>
          <Row className="px-3">
            <Col className="bg-white">
              <div className="d-flex justify-content ml-4">
                <i
                  style={{ color: '#cccccc' }}
                  className={isResetSuccess ? 'mt-4 icon-Icon_done' : ' mb-n3 mt-n3 reset-caution'}
                ></i>
              </div>

              <div className="d-flex mb-2 ml-4">
                {isResetSuccess ? (
                  <label style={{ fontSize: '19px' }}>
                    <span style={{ color: '#637176' }}>Success!</span>
                    <br />
                    <span style={{ color: '#B4B9BB' }}>
                      Reset password requested! <br /> We will send you an email to reset password
                    </span>
                  </label>
                ) : (
                  <label style={{ fontSize: '19px' }}>
                    <span style={{ color: '#637176' }}>Are you sure</span> <br />{' '}
                    <span style={{ color: '#B4B9BB' }}>to reset this user's password?</span>
                  </label>
                )}
              </div>

              <div className="d-flex justify-content-between pb-3">
                {isLoad ? (
                  <button type="submit" className=" btn btn-outline-success font-lg font-md font-sm mb-2 ml-4 loadBtn">
                    <img src={loadBtn} className="mt-n4" width="35" height="35" />
                  </button>
                ) : isResetSuccess ? (
                  ''
                ) : (
                  <button
                    className="font-lg font-md font-sm btn mr-5 mb-4"
                    style={{ width: '15%', marginTop: '-20px' }}
                    onClick={(e) => {
                      confirmResetPassword({ state, setState, props });
                    }}
                  >
                    <i className="reset-done" style={{ color: '#81efdd' }}></i>
                  </button>
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
