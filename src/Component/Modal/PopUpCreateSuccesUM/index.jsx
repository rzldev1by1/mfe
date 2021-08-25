import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logo from 'assets/img/success.png'
import { ProgressBar } from '../service'
import "./index.scss";

const PopUpCreateSuccesUM = ({
  modal,
  setModal,
  module,
  submitReturn,
}) => {
  setTimeout(() => {
    ProgressBar({ setModal })
  }, 1000);
  return (
    <Modal
      isOpen={modal}
      centered
      contentClassName="modal-content-paging modalCreateSuccess d-flex align-items-center"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div className="text-right px-0" style={{ fontSize: '14px' }} onClick={() => { setModal(false); }}>
          <i className="iconU-close pointer" />
        </div>
        <div className="d-flex d-inline-flexc align-items-center pb-4">
          <img src={logo} alt="logo" style={{ width: "19%", height: "19%" }} />
          <div className="pl-3">
            <div className="font font-weight-bold pb-2">
              THANK YOU
            </div>
            <div style={{ fontSize: "95%" }}>
              {'You have created a new ' + submitReturn?.role + ' User for ' + submitReturn?.name + ' The ' + submitReturn?.role +
                ' User ' + submitReturn?.name + ' will receive an email shortly with their user ID and password to access the portal'}
            </div>
          </div>
        </div>
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

export default PopUpCreateSuccesUM;