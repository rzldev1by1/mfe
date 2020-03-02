import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,CardBody } from 'reactstrap'
import ModuleAccess from './ModuleAccess'
import Site from './Site'
import Client from './Client'


const modalNewUser = (props) => {
  const { className, isOpen, toggle, closeModal, onChangeName,onChangeEmail, model,
    moduleAccess,isModuleLoaded,moduleAccessEnableClick,sites, isSiteLoaded, sitesEnableClick,
    clients, isClientLoaded, clientEnableClick, onSaveClick, isSaveProgressing} = props;

  return (
    <div>
        <Modal isOpen={isOpen} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className={className} >
        <ModalHeader toggle={toggle} className="pb-0 pl-5">
          <div className='create'>
            <label className='iconU-edit mt-1'/>
            <label className='font-modal-title mt-1'>Create User</label>
          </div>
          <Button color="primary" className='btnsearch crt mr-4 font-lg font-md font-sm' onClick={(e)=>{closeModal();}}>
            <label className='font-lg font-md font-sm'>Close</label>
            <label className='iconU-close ml-3 mt-2'/>
          </Button>
        </ModalHeader>
        <ModalHeader className='Tab pt-0 pl-5'>
          <div>
            Enter user details to create new user
          </div>
        </ModalHeader>

        <ModalBody className='bodycontent pl-5' style={{width:'100%'}}>
        <div className="account-detail mt-2">
            <div className="row">
              <div className="col-12">
                <h3>
                  <label className="name-account font-bolder">User Details</label>
                </h3>
              </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <label className="text-bolder title-label">Name</label>
                </div>

                <div className="col-3">
                    <label className="text-bolder title-label">Email</label>
                </div>

                <div className="col-3">
                    <label className="text-bolder title-label">User ID</label>
                </div>

            </div>
            <div className="row">
                <div className="col-3">
                    <input type="text" name="userName" className="form-control" onChange={(e)=>{onChangeName(e);}} defaultValue={model.user}/>
                </div>
                <div className="col-3">
                    <input type="text" name="email" className="form-control" onChange={(e)=>{onChangeEmail(e);}} defaultValue={model.email}/>
                </div>

                <div className="col-3">
                    <input type="text" name="userid" readOnly className="form-control" defaultValue={model.userId}/>
                </div>

            </div>
            <div className="row mt-4">
                <div className="col-12">
                  <h3>
                      <label className="name-account font-bolder">System</label>
                  </h3>
                </div>
            </div>
            <div className="d-flex flex-row">
                <div className="flex-fill mr-4">
                    <ModuleAccess moduleAccess={moduleAccess} isLoaded={isModuleLoaded} onEnableClick={moduleAccessEnableClick}/>
                </div>
                <div className="flex-fill ml-2 mr-4">
                    <Site sites={sites} isLoaded={isSiteLoaded} onEnableClick={sitesEnableClick}/>
                </div>
                <div className="flex-fill ml-2 mr-4">
                    <Client clients={clients} isLoaded={isClientLoaded} onEnableClick={clientEnableClick}/>
                </div>

            </div>
        </div>
        </ModalBody>
        <ModalFooter className='footers'>
          <div className="row">
              <div className="col-12">
                  <button className="font-lg font-md font-sm btn btn-primary float-right" onClick={(e)=>{onSaveClick();}}>
                      <i className= {(isSaveProgressing)?"mr-2 fa fa-refresh fa-spin ":"fa fa-refresh fa-spin d-none"}></i>
                        <label className="create-user-label mb-0">Save</label>  
                  </button>
              </div>
          </div>
        </ModalFooter>
      </Modal>
  </div>
  );
}

export default modalNewUser;