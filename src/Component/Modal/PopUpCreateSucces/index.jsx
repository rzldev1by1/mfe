import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logo from 'assets/img/Complete-Create-Green.png'
import "./index.scss";


class PopUpCreateSucces extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render = () => {
        const { modal, setModal, module, submitReturn, exit} = this.props
        return (
          <Modal
            isOpen={modal}
            centered            
            onOpened={() => modal ? setTimeout(() =>{ setModal(false) ; exit(); }, 900000) : {}}
            contentClassName="modal-content-paging modalCreateSuccess"
            closeOnBackdrop={false}
          >
            <ModalBody>
              <div 
                className="text-right px-0" 
                style={{ fontSize: '14px' }} 
                onClick={() => { setModal(false); exit(); }}
              >
                <i className="iconU-close pointer" />
              </div>
              <div className="d-flex d-inline-flexc align-items-center">
                <img src={logo} alt="logo" style={{ width: "30%", height: "30%" }} />
                <div className="pl-3">
                    <div className="font">
                      Success
                    </div>
                    <div className="text-muted-soft">
                      The { module } { submitReturn.orderNo } {` `}
                      has successfully submitted for processing.
                    </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setModal(false); exit(); }}
                className="btn btn-search mobile-search btn-primary float-right">
                DONE
              </button>
            </ModalBody>
          </Modal>
        );
    }
}

export default PopUpCreateSucces;