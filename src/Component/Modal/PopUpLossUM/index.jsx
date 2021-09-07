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
      onOpened={() => modal ? setTimeout(() => { setModal(false); }, 36000) : {}}
      contentClassName="modal-content-paging modalCreateLoss"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onClick={() => { setModal(false); }}
        >
          <span className="icon-group_4696 pointer" />
        </div>
        <div className="d-flex d-inline-flex align-items-center">
          <img src={logo} alt="logo" style={{ width: "25%", height: "25%" }} />
          <div className="pl-3">
            <div className="font">{title}</div>
            <div className="text-muted-soft">{statusMessage}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { setModal(false); }}
          className="btn btn-search mobile-search btn-primary float-right">
          DONE
        </button>
      </ModalBody>
    </Modal>
  );
}

export default PopUpLoss;