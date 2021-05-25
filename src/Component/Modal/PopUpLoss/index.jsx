import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap'
import logo from 'assets/img/Internet-Problem-Red.png'
import "./index.scss";


class PopUpLoss extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render = () => {
        const { modal, setModal, back} = this.props
        return (
          <Modal
            isOpen={modal}
            centered            
            onOpened={() => modal ? setTimeout(() =>{ setModal(false); back(); }, 36000) : {}}
            contentClassName="modal-content-paging modalCreateLoss"
            closeOnBackdrop={false}
          >
            <ModalBody>
              <div 
                className="text-right px-0" 
                style={{ fontSize: '14px' }} 
                onClick={() => {setModal(false);  back();}}
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
                onClick={() => {setModal(false);  back();}}
                className="btn btn-search mobile-search btn-primary float-right">
                DONE
              </button>
            </ModalBody>
          </Modal>
        );
    }
}

export default PopUpLoss;