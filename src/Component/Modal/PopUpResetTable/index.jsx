import React from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logoConfirm from 'assets/img/warning.png'
import { Button, Col, Row } from 'react-bootstrap';
import { ProgressBarReset } from '../service';
import "./index.scss";



const PopUpResetTable = ({
  modal,
  setModal,
  resetConfirmation,
  resetColumnName,
  user,
  splitModule,
}) => {
  setTimeout(() => {
    ProgressBarReset({ resetConfirmation })
  }, 1000);
  return (
    <Modal
      isOpen={modal}
      centered
      contentClassName="modal-content-paging modalCreateSuccess d-flex align-items-center"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onClick={() =>
            resetConfirmation()
          }
        >
          <i className="iconU-close pointer" />
        </div>
        <div className="d-flex justify-content-between">
          <img src={logoConfirm} alt="logo" style={{ width: "18%", height: "18%" }} />
          <div className="pl-3">
            <p className="mb-0 font-weight-bold pb-2">ARE YOU SURE?</p>
            <p>Clicking Yes will reset column name back to the default name. This action cannot be undone</p>
          </div>
        </div>
        <Col className="px-0 pb-0 pt-3 d-flex justify-content-end">
          <div className="btnResetCencel" onClick={() => resetConfirmation()} >
            CANCEL
          </div>
          <Button
            variant="primary"
            onClick={() =>
              // resetColumnTable({ module, user, editColumnTemp, fields, state, setState })
              resetColumnName({ user, splitModule })
            }
          // disabled={state.disableBtn}
          // className={state.disableBtn ? "btn-disabled" : ""}
          >
            RESET
          </Button>
        </Col>
      </ModalBody>
      <div className="progress">
        <div
          id="progressBar"
          className="progress-bar"
          role="progressbar"
          style={{ width: null }}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </Modal>
  );
}

export default PopUpResetTable;