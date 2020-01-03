import React, {Component} from 'react'
import CoolTabs from 'react-cool-tabs'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class PurchaseOrderCreate extends Component{
    constructor(props){
        super(props)

        this.state = {
            modalIsOpen: this.props.showmodal
          }
       
          this.openModal = this.openModal.bind(this)
          this.afterOpenModal = this.afterOpenModal.bind(this)
          this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({modalIsOpen: true});
      }
     
      afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
      }
     
      closeModal() {
        this.setState({modalIsOpen: false});
      }

    render(){
        return(
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                >
                <div className='pomodal'>
                    asdsa
                </div>
                </Modal>
            </div>
        )
    }
}

export default PurchaseOrderCreate