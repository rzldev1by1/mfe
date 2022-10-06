import React from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logo from '../../../assets/img/Internet-Problem-Red.png'
import { ProgressBar } from '../service';
import "./index.scss";

const PopUpLoss = ({
  modal,
  setModal,
  back
}) => {
  setTimeout(() => {
    ProgressBar({ setModal, back, })
  }, 1000);
  return (
    <Modal
      isOpen={modal}
      centered
      onOpened={() => modal ? setTimeout(() => { setModal(false); back(); }, 36000) : {}}
      contentClassName="modal-content-paging modalCreateLoss"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onClick={() => { setModal(false); back(); }}
          aria-hidden="true"
        >
          <i className="iconU-close pointer" />
        </div>
        <div className="d-flex d-inline-flex align-items-center">
          <img src={logo} alt="logo" style={{ width: "25%", height: "25%" }} />
          <div className="pl-3">
            <div className="font">
              Sory
            </div>
            <div className="text-muted-soft">
              Cheack Your Internet Conenction.
              Please Try Again.
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { setModal(false); back(); }}
          className="btn btn-search mobile-search btn-primary float-right"
        >
          DONE
        </button>
      </ModalBody>
    </Modal>
  );
}

export default PopUpLoss;