import React, { useState, useEffect } from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logo from 'assets/img/Internet-Problem-Red.png'
import "./index.scss";


const PopUpLoss = ({
  modal,
  setModal,
  back
}) => {
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    setTimeout(() => { for (let i = progressPercent; i < 0; i++) { setProgressPercent(i) } }, 100)
    setTimeout(() => { for (let i = progressPercent; i < 25; i++) { setProgressPercent(i) } }, 5000)
    setTimeout(() => { for (let i = progressPercent; i < 50; i++) { setProgressPercent(i) } }, 10000)
    setTimeout(() => { for (let i = progressPercent; i < 75; i++) { setProgressPercent(i) } }, 15000)
    setTimeout(() => { for (let i = progressPercent; i < 150; i++) { setProgressPercent(i) } }, 20000)
  }, []);

  return (
    <Modal
      isOpen={modal}
      centered
      onOpened={() => modal ? setTimeout(() => { setModal(false); back(); }, 20000) : {}}
      contentClassName="modal-content-paging modalCreateLoss d-flex align-items-center"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onClick={() => { setModal(false); back(); }}
        >
          <i className="iconU-close pointer" />
        </div>
        <div className="d-flex d-inline-flex align-items-center pb-4">
          <img src={logo} alt="logo" style={{ width: "20%", height: "20%" }} />
          <div className="pl-3">
            <div className="font font-weight-bold pb-2">
              SORRY
            </div>
            <div style={{ fontSize: "95%" }}>
              Cheack Your Internet Conenction.
              Please Try Again.
            </div>
          </div>
        </div>
      </ModalBody>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: progressPercent + "%" }}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </Modal>
  );
}

export default PopUpLoss;