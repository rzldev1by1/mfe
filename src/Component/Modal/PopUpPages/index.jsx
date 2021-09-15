import React from 'react';
import { Modal, ModalBody } from 'reactstrap'
import { useSelector } from 'react-redux';
import logoConfirm from 'assets/img/LOGO5@2x.png'
import LogoWhite from 'assets/img/LOGO1_WHITE.png';
import { closeModal } from 'Component/Modal/PopUpPages/service'
import "./index.scss";


const PopUpCreateSucces = ({
  page, setPage, xLastPage
}) => {
  const newPage = { ...page }
  const darkMode = useSelector((state) => state.darkModeMLS);
  const dataMode = darkMode?.map(d => { return d.dark_mode })
  return (
    <Modal
      isOpen={newPage.notifPaging}
      centered
      onOpened={() => newPage.notifPaging ? setTimeout(() => { closeModal({ page, setPage }) }, 36000) : {}}
      contentClassName={`modal-content-paging ${dataMode == "1" ? ' customDarkModes' : ''}`}
      closeOnBackdrop={false}
    >
      <ModalBody className={`${dataMode == "1" ? 'customDarkPopUp' : ''}`}>
        <div
          className="text-right px-0"
          style={{ fontSize: '14px' }}
          onClick={() => closeModal({ page, setPage })}
        >
          <span className="icon-group_4696 pointer" />
        </div>
        <div className="d-flex d-inline-flex pl-3 pb-3">
          <img src={dataMode == "1" ? LogoWhite : logoConfirm} alt="logo" style={{ width: "20%", height: "20%" }} />
          <div className="pl-3 fontDes">
            Only{' '} {xLastPage} {xLastPage === 1 ? " page is " : " pages are "}{' '}
            available on this screen, please try again.
            <br />
          </div>
        </div>
      </ModalBody>
    </Modal>

  );
}

export default PopUpCreateSucces;