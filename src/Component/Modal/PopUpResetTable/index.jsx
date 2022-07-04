import React from "react";
import { Modal, ModalBody } from 'reactstrap';
import { CCol, CButton } from '@coreui/react';
import { ProgressBarReset } from '../service';
import "./index.scss";
import logoConfirm from '../../../assets/img/warning.png';

const PopUpResetTable = ({
  modal,
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
      onOpened={() => modal ? setTimeout(() => { resetConfirmation() }, 36000) : {}}
      contentClassName="modal-content-paging modalCreateSuccess"
      closeOnBackdrop={false}
    >
      <ModalBody>
        <div
          role="button"
          tabIndex={0}
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onKeyDown={() => resetConfirmation()}
          onClick={() => resetConfirmation()}
        >
          <i className="iconU-close pointer" />
        </div>
        <div className="d-flex justify-content-between">
          <img src={logoConfirm} alt="logo" style={{ width: "25%", height: "25%" }} />
          <div className="pl-3">
            <p className="mb-0" style={{ color: "#D6D8DA" }}>Are you sure?</p>
            <p>To reset all the Rename Column that has been modified, this action can not be undo.</p>
          </div>
        </div>
        <CCol className="px-0 pb-0 pt-3 d-flex justify-content-end">
          <CButton
            className="btn btn-primary"
            style={{ padding: '0rem 1.08rem', marginRight: '1rem' }}
            onClick={() => resetConfirmation()}
          >
            CANCEL
          </CButton>
          <CButton
            className="btn btn-primary"
            style={{ padding: '0rem 1.08rem' }}
            onClick={() => resetColumnName({ user, splitModule })}
          >
            DONE
          </CButton>
        </CCol>
      </ModalBody>
    </Modal>
  );
}

export default PopUpResetTable;