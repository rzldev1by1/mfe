import React from "react";
import "./Modal.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import iconedit from '../../../../assets/img/brand/modal_create.png'
import eyeactive from '../../../../assets/img/brand/eyeactive.png'
import eyeinactive from '../../../../assets/img/brand/eyeinactive.png'

const EditColumn = (props) => {
  const { showEditColumn, column, editColumnHandler, closeModal } = props;

  const editColumnHandlers = (idx) => {
    let newColumn = column
    let active = newColumn[idx].active
    active = !active
    editColumnHandler(idx, active)
  }
  return (
    <Modal isOpen={showEditColumn}>
      <ModalHeader>
        <div className='main-modal'>
        <div className='edit-column-so-header'>
          <div className='edit-column-so'>
            <img src={iconedit}/>
            <div className='edit-column-so-title'>Edit Column</div>
          </div>
          <span className='btnclose-modal-so iconU-close' onClick={() => closeModal()}/>
        </div>
        <div>Show and hide the column according to your needs, Please select 5 to 10 columns to show</div>
        </div>
      </ModalHeader>
      <ModalBody>
        <label className='edit-column-so-font'>Sales Order</label>

        <div className="grid-container">
          {column.map((data, idx) =>{
            return(
            <div  onClick={()=> editColumnHandlers(idx)}
                  className={"grid-item " + (data.active ? 'edit-column-so-active' : 'edit-column-so-inactive')}>
                  <img src={data.active ? eyeactive : eyeinactive}/>
                  {data.name}
            </div>)
          })}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditColumn;
