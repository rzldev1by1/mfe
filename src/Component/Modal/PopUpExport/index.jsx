import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import logoConfirm from 'assets/img/LOGO5@2x.png';
import './index.scss';

const PopUpExport = ({ modalShow, setModalShow }) => {
  return (
    <Modal
      isOpen={modalShow}
      centered
      onOpened={() =>
        modalShow
          ? setTimeout(() => {
              setModalShow(false);
            }, 3000)
          : {}
      }
      contentClassName="modal-content-paging box-er-pagination"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div className="text-right px-0" style={{ fontSize: '14px' }} onClick={() => setModalShow(false)}>
          <i className="iconU-close pointer" />
        </div>
        <div className="d-flex d-inline-flex">
          <img src={logoConfirm} alt="logo" style={{ width: '20%', height: '20%' }} />
          <div className="pl-3 font">
            <div>
              <b>Export Unsuccessful</b>
              <br />
              Please try to export the report again.
            </div>
            <div style={{ paddingTop: '12px' }}>
              Note the maximum you <br /> can download are: <br />
            </div>
            <div style={{ color: '#b4b9bb' }}>Maximum 75,000 records</div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default PopUpExport;
