import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logo from 'assets/img/Internet-Problem-Red.png'
import { ProgressBar } from '../service';
import "./index.scss";


const PopUpLoss = ({
  modal,
  setModal,
  module,
  submitReturn,
}) => {
  let message = submitReturn?.message;
  const [statusMessage, setStatusMessage] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (message == 'No Internet Connection') {
      setStatusMessage('Check your Internet Connection');
      setTitle('SORRY');
    } else if (module == 'UM' && message === 'User created') {
      setStatusMessage(
        'You have created a new ' +
        submitReturn.role +
        ' User for ' +
        submitReturn.name +
        '. The ' +
        submitReturn.role +
        ' User ' +
        submitReturn.name +
        ' will receive an email shortly with their user ID and password to access the portal',
      );
      setTitle('Thank You');
    } else {
      setStatusMessage(
        'The ' + (module == 'UM' ? 'user' : 'order') + ' that you tried to create could not be saved to the system.',
      );
      setTitle('Sorry');
    }
  }, [submitReturn]);

  setTimeout(() => {
    ProgressBar({ setModal })
  }, 1000);
  return (
    <Modal
      isOpen={modal}
      centered
      contentClassName="modal-content-paging modalCreateLoss d-flex align-items-center"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onClick={() => { setModal(false); }}
        >
          <i className="iconU-close pointer" />
        </div>
        <div className="d-flex d-inline-flex align-items-center pb-4">
          <img src={logo} alt="logo" style={{ width: "20%", height: "20%" }} />
          <div className="pl-3">
            <div className="font font-weight-bold pb-2"> {title} </div>
            <div style={{ fontSize: "95%" }}>{statusMessage} </div>
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

export default PopUpLoss;