import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,CardBody } from 'reactstrap'
import ModuleAccess from './ModuleAccess'
import Site from './Site'
import Client from './Client'


const modalNewUser = (props) => {
  const { className, isOpen, toggle, closeModal, onChangeName,onChangeEmail, onChangeCompany, model,
    moduleAccess,isModuleLoaded,moduleAccessEnableClick,sites, isSiteLoaded, sitesEnableClick,
    clients, isClientLoaded, clientEnableClick, onSaveClick, isSaveProgressing, onModuleEnableAll, isValidForm} = props;

    const submitHandler = (event) =>{
      event.preventDefault();
      onSaveClick();
    }

  return (
    <div>

        <Modal isOpen={isOpen} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className={className} >

            <ModalHeader toggle={toggle} className="pb-0 pl-5">
              <div className='create'>
                <label className='iconU-edit mt-1'/>
                <label className='font-modal-title mt-1'>Create User</label>
              </div>

              <p color="primary" onClick={(e)=>{closeModal();}}>
                <i className="iconU-close mr-3" aria-hidden="true" />
              </p>
            </ModalHeader>
            <ModalHeader className='Tab pt-0 pl-5'>
              <div>
                Enter user details to create new user
              </div>
            </ModalHeader>
            <ModalBody className='bodycontent pl-5' style={{width:'100%'}}>
            <form onSubmit={submitHandler}>

                <div className="account-detail mt-2">
                <div className="row">
                  <div className="col-12">
                      <h3>
                      <label className="section-header-text">User Details</label>
                      </h3>
                  </div>
                </div>
                <div className="row">
                    <div className="col-3">
                    <label className="header-text-form">User ID</label>
                    </div>

                    <div className="col-3">
                      <label className="header-text-form">Name</label>
                    </div>

                    <div className="col-3">
                      <label className="header-text-form">Email</label>
                    </div>


                    <div className="col-3">
                      <label className="header-text-form">Company</label>
                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <input type="text" name="userid" readOnly className="form-control" value={model.userId}/>
                    </div>

                    <div className="col-3">
                        <input type="text" name="userName" maxLength="60" className="form-control" onChange={(e)=>{onChangeName(e);}} defaultValue={model.user}/>

                    </div>
                    <div className="col-3">
                        <input type="email" name="email" className="form-control" onChange={(e)=>{onChangeEmail(e);}} defaultValue={model.email}/>

                    </div>

                    <div className="col-3">
                      <input type="text" name="company" maxLength="10" className="form-control" onChange={(e)=>{onChangeCompany(e);}} defaultValue={model.company}/>
                    </div>

                </div>
                <div className="row mt-4">
                <div className="col-12">
                <h3>
                <label className="section-header-text">System</label>
                </h3>
                </div>
                </div>
                <div className="d-flex flex-row">
                <div className="flex-fill mr-4">
                <ModuleAccess moduleAccess={moduleAccess} isLoaded={isModuleLoaded} onEnableClick={moduleAccessEnableClick} onModuleEnableAll={onModuleEnableAll}/>
                </div>
                <div className="flex-fill ml-2 mr-4">
                <Site sites={sites} isLoaded={isSiteLoaded} onEnableClick={sitesEnableClick} onSubmitHandler = {submitHandler}/>
                </div>
                <div className="flex-fill ml-2 mr-4">
                <Client clients={clients} isLoaded={isClientLoaded} onEnableClick={clientEnableClick} onSubmitHandler = {submitHandler}/>
                </div>

                </div>
                </div>

                <div className="row">
                  <div className="col-2">
                    <button type="button" style={{width:"151px"}} className="btn btn-primary btn-submit" onClick={(e)=>{window.location.reload()}}>
                        <label className="create-user-label mb-0">Back</label>
                    </button>
                  </div>
                  <div className="col-8">
                        <div className="d-flex justify-content-center">
                          <label className={(isValidForm)?"errorText ":" d-none"}>
                              Please make sure user name, email is valid and module has one enabled
                          </label>
                        </div>

                  </div>
                  <div className="col-2 pl-5">
                    <button type="button" style={{width:"151px"}} className="font-lg font-md font-sm btn btn-primary" onClick={onSaveClick}>
                    <i className= {(isSaveProgressing)?"mr-2 fa fa-refresh fa-spin ":"fa fa-refresh fa-spin d-none"}></i>
                    <label className="create-user-label mb-0">Submit</label>
                    </button>
                    <button type="submit" style={{opacity:"0"}}></button>
                  </div>
                </div>

            </form>
            </ModalBody>

       </Modal>



  </div>
  );
}

export default modalNewUser;
import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card,CardBody } from 'reactstrap'
import ModuleAccess from './ModuleAccess'
import Site from './Site'
import Client from './Client'


const modalNewUser = (props) => {
  const { className, isOpen, toggle, closeModal, onChangeName,onChangeEmail, onChangeCompany, model,
    moduleAccess,isModuleLoaded,moduleAccessEnableClick,sites, isSiteLoaded, sitesEnableClick,
    clients, isClientLoaded, clientEnableClick, onSaveClick, isSaveProgressing, onModuleEnableAll, isValidForm} = props;

    const submitHandler = (event) =>{
      event.preventDefault();
      onSaveClick();
    }

  return (
    <div>

        <Modal isOpen={isOpen} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className={className} >

            <ModalHeader toggle={toggle} className="pb-0 pl-5">
              <div className='create'>
                <label className='iconU-edit mt-1'/>
                <label className='font-modal-title mt-1'>Create User</label>
              </div>

              <p color="primary" onClick={(e)=>{closeModal();}}>
                <i className="iconU-close mr-3" aria-hidden="true" />
              </p>
            </ModalHeader>
            <ModalHeader className='pt-0 pl-5'>
              <div>
                Enter user details to create new user
              </div>
            </ModalHeader>
            <ModalHeader className="p-0">
                <div className="d-inline-flex ml-3 w-100">
                    <div className="xyz-tab-active h-100 p-4 mr-3">
                      1 User Details
                    </div>
                    <div className="xyz-tab-not-active h-100 p-4">
                      2 Review
                    </div>
                </div>
            </ModalHeader>
            <ModalBody className='bodycontent pl-5' style={{width:'100%'}}>

            <form onSubmit={submitHandler}>

                <div className="account-detail mt-2">
                <div className="row">
                  <div className="col-12">
                      <h3>
                      <label className="section-header-text">User Details</label>
                      </h3>
                  </div>
                </div>
                <div className="row">
                    <div className="col-3">
                    <label className="header-text-form">User ID</label>
                    </div>

                    <div className="col-3">
                      <label className="header-text-form">Name</label>
                    </div>

                    <div className="col-3">
                      <label className="header-text-form">Email</label>
                    </div>


                    <div className="col-3">
                      <label className="header-text-form">Company</label>
                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <input type="text" name="userid" readOnly className="form-control" value={model.userId}/>
                    </div>

                    <div className="col-3">
                        <input type="text" name="userName" maxLength="60" className="form-control" onChange={(e)=>{onChangeName(e);}} defaultValue={model.user}/>

                    </div>
                    <div className="col-3">
                        <input type="email" name="email" className="form-control" onChange={(e)=>{onChangeEmail(e);}} defaultValue={model.email}/>

                    </div>

                    <div className="col-3">
                      <input type="text" name="company" maxLength="10" className="form-control" onChange={(e)=>{onChangeCompany(e);}} defaultValue={model.company}/>
                    </div>

                </div>
                <div className="row mt-4">
                <div className="col-12">
                <h3>
                <label className="section-header-text">System</label>
                </h3>
                </div>
                </div>
                <div className="d-flex flex-row">
                <div className="flex-fill mr-4">
                <ModuleAccess moduleAccess={moduleAccess} isLoaded={isModuleLoaded} onEnableClick={moduleAccessEnableClick} onModuleEnableAll={onModuleEnableAll}/>
                </div>
                <div className="flex-fill ml-2 mr-4">
                <Site sites={sites} isLoaded={isSiteLoaded} onEnableClick={sitesEnableClick} onSubmitHandler = {submitHandler}/>
                </div>
                <div className="flex-fill ml-2 mr-4">
                <Client clients={clients} isLoaded={isClientLoaded} onEnableClick={clientEnableClick} onSubmitHandler = {submitHandler}/>
                </div>

                </div>
                </div>

                <div className="row">
                  <div className="col-2">
                    <button type="button" style={{width:"151px"}} className="btn btn-primary btn-submit" onClick={(e)=>{window.location.reload()}}>
                        <label className="create-user-label mb-0">Back</label>
                    </button>
                  </div>
                  <div className="col-8">
                        <div className="d-flex justify-content-center">
                          <label className={(isValidForm)?"errorText ":" d-none"}>
                              Please make sure user name, email is valid and module has one enabled
                          </label>
                        </div>

                  </div>
                  <div className="col-2 pl-5">
                    <button type="button" style={{width:"151px"}} className="font-lg font-md font-sm btn btn-primary" onClick={onSaveClick}>
                    <i className= {(isSaveProgressing)?"mr-2 fa fa-refresh fa-spin ":"fa fa-refresh fa-spin d-none"}></i>
                    <label className="create-user-label mb-0">Submit</label>
                    </button>
                    <button type="submit" style={{opacity:"0"}}></button>
                  </div>
                </div>

            </form>
            </ModalBody>

       </Modal>



  </div>
  );
}

export default modalNewUser;
