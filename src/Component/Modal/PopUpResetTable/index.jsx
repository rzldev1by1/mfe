import React from 'react';
import { Modal, ModalBody } from 'reactstrap'
import { useSelector } from 'react-redux';
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
  const darkMode = useSelector((state) => state.darkModeMLS);
  const dataMode = darkMode?.map(d => { return d.dark_mode })
  return (
    <Modal
      isOpen={modal}
      centered
      onOpened={() => modal ? setTimeout(() => { resetConfirmation() }, 36000) : {}}
      contentClassName="modal-content-paging modalCreateSuccess"
      closeOnBackdrop={false}
    >
      <ModalBody className={`${dataMode == "1" ? 'customDarkPopUp' : ''}`}>
        <div
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onClick={() =>
            resetConfirmation()
          }
        >
          <span className="icon-group_4696 pointer" />
        </div>
        <div className="d-flex justify-content-between">
          <img src={logoConfirm} alt="logo" style={{ width: "25%", height: "25%" }} />
          <div className="pl-3">
            <p className="mb-0" style={{ color: "#D6D8DA" }}>Are you sure?</p>
            <p>To reset all the Rename Column that has been modified, this action can not be undo.</p>
          </div>
        </div>
        <Col className="px-0 pb-0 pt-3 d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={() => {
              // resetColumnTable({ module, user, editColumnTemp, fields, state, setState });
              resetColumnName({ user, splitModule });
            }
            }
          // disabled={state.disableBtn}
          // className={state.disableBtn ? "btn-disabled" : ""}
          >
            DONE
          </Button>
        </Col>
      </ModalBody>
    </Modal>
  );
}

export default PopUpResetTable;