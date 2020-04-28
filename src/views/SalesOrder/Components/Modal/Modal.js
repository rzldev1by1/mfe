import React from "react";
import "./Modal.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const EditColumn = (props) => {
  const { showEditColumn } = props;
  return (
    <Modal isOpen={showEditColumn}>
      <ModalHeader>
        <div>
          <div>Edit Column</div>
          <div className="" />
        </div>
      </ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="primary">Do Something</Button>{" "}
        <Button color="secondary" onClick={() => props.closeModal()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditColumn;
