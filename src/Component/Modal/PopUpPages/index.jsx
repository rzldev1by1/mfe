import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logo_confirm from 'assets/img/LOGO5@2x.png'
import { closeModal } from 'Component/Modal/PopUpPages/service'
import "./index.scss";


class PopUpPages extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render = () => {
        const { page, setPage } = this.props
        const newPage = { ...page }
        return (
          <Modal
            isOpen={newPage.notifPaging}
            centered
            onOpened={() => newPage.notifPaging ? setTimeout(() => { closeModal({ page, setPage }) }, 36000) : {}}
            contentClassName="modal-content-paging box-er-pagination"
            closeOnBackdrop={false}
          >
            <ModalBody>
              <div className="text-right px-0" style={{ fontSize: '14px' }}>
                <i className="iconU-close pointer" onClick={() => closeModal({ page, setPage })} />
              </div>
              <div className="d-flex d-inline-flex">
                <img src={logo_confirm} alt="logo" style={{ width: "20%", height: "20%" }} />
                <label className="pl-3 font">
                  Only 3 pages are available on this screen, please try again. 
                  {' '}
                  <br />
                </label>
              </div>
            </ModalBody>
          </Modal>

        );
    }
}

export default PopUpPages;