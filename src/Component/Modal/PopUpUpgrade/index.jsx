import React from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import loadBtn from '../../../assets/icons/loading/LOADING-MLS.gif';
import { closeModal, saveModal } from './service';
import './style.scss';

const PopUpUpgrade = ({
  show,
  state,
  setState,
}) => {
  const [isLoad, setIsLoad] = React.useState(false);
  return (
    <Modal
      show={show}
      onHide={() => closeModal({ state, setState })}
      size="md"
      className="sales-order-create content-modal"
      backdrop="static"
    >
      <Modal.Body>
        <Row className="px-3">
          <Col>
            <div className='content-modal-upgrade'>
              <i className="ri-user-settings-fill" />
              <label>
                <h4>UPGRADE ROLE</h4>
                <span>{`Do you want to change  ${state.accountInfo.user}  role as Admin?`}</span>
              </label>
            </div>

            <div className="content-buttom pt-1">
              <button
                type="button"
                className='btn mx-3 btn-outline-upgrade'
                onClick={() => closeModal({ state, setState })}
              >
                CANCEL
              </button>
              <button
                type="button"
                className='btn btn-primary float-right'
                onClick={() => saveModal({ state, setState, setIsLoad })}
              >
                {isLoad ? (
                  <img src={loadBtn} className="mt-n4" width="35" height="35" alt="" />
                ) : " UPGRADE"}
              </button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
export default PopUpUpgrade;
