import React from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logo from '../../../assets/img/success.png'
import { ProgressBar } from '../service'
import "./index.scss";

const PopUpCreateSuccesUM = ({
  modal,
  setModal,
  submitReturn,
}) => {
  setTimeout(() => {
    ProgressBar({ setModal })
  }, 1000);
  return (
    <Modal
      isOpen={modal}
      centered
      onOpened={() => modal ? setTimeout(() => { setModal(false); }, 36000) : {}}
      contentClassName="modal-content-paging modalCreateSuccess d-flex align-items-center"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onClick={() => { setModal(false); }}
          aria-hidden="true"
        >
          <i className="iconU-close pointer" />
        </div>
        <div className="d-flex d-inline-flexc align-items-center">
          <img src={logo} alt="logo" style={{ width: "30%", height: "30%" }} />
          <div className="pl-3">
            <div className="font">
              Thank you
            </div>
            <div className="text-muted-soft">
              {`You have created a new ${submitReturn?.role} User for ${submitReturn?.name}. The ${submitReturn?.role} User ${submitReturn?.name} will receive an email shortly with their user ID and password to access the portal.`}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { setModal(false); }}
          className="btn btn-search mobile-search btn-primary float-right"
        >
          DONE
        </button>
      </ModalBody>
    </Modal>
  );
}

export default PopUpCreateSuccesUM;