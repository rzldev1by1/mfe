import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap'
import { connect } from 'react-redux';
import { closeModal } from './service'
import logoConfirm from '../../../assets/img/LOGO5@2x.png'
import LogoWhite from '../../../assets/img/LOGO1_WHITE.png';
import "./index.scss";

class PopUpPages extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render = () => {
    const { page, setPage, xLastPage, darkMode } = this.props
    const newPage = { ...page }
    return (
      <Modal
        isOpen={newPage.noticePaging}
        centered
        onOpened={() => newPage.noticePaging ? setTimeout(() => { closeModal({ page, setPage }) }, 36000) : {}}
        contentClassName={`modal-content-paging ${darkMode ? ' customDarkModes' : ''}`}
        closeOnBackdrop={false}
      >
        <ModalBody>
          <div
            className="text-right px-0"
            style={{ fontSize: '14px' }}
            onClick={() => closeModal({ page, setPage })}
            aria-hidden="true"
          >
            <i className="iconU-close pointer" />
          </div>
          <div className="d-flex d-inline-flex pl-3 pb-3">
            <img src={darkMode ? LogoWhite : logoConfirm} alt="logo" style={{ width: "20%", height: "20%" }} />
            <div className="pl-3 fontDes">
              Only
              {' '}
              {xLastPage}
              {xLastPage === 1 ? " page is " : " pages are "}
              {' '}
              available on this screen, please try again.
              <br />
            </div>
          </div>
        </ModalBody>
      </Modal>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
  };
};

export default connect(mapStateToProps)(PopUpPages);