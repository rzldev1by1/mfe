import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import ModuleAccess from './ModuleAccess'
import Site from './Site'
import Client from './Client'
import ModuleAccessReview from './ModuleAccessReview'
import SiteReview from './SiteReview'
import ClientReview from './ClientReview'
import oneinactive from '../../../assets/img/brand/tab_1_grey@2x.png'
import oneactive from '../../../assets/img/brand/tab_1_blue@2x.png'
import twoinactive from '../../../assets/img/brand/tab_2_grey@2x.png'
import twoactive from '../../../assets/img/brand/tab_2_blue@2x.png'
import '../UserManagement.css';


const modalNewUser = (props) => {
  const { className, isOpen, toggle, closeModal, onChangeName,onChangeEmail, onChangeCompany, model,
    moduleAccess,isModuleLoaded,moduleAccessEnableClick,sites, isSiteLoaded, sitesEnableClick,
    clients, isClientLoaded, clientEnableClick, onSaveClick, isSaveProgressing, onModuleEnableAll, onSiteEnableAll, onClientEnableAll,
    isValidForm, onNextClickHandler, firtsTabActive, secondTabActive, onClickTabActive, message, changeWebGroup, isWebGroup} = props;

    const submitHandler = (event) =>{
      event.preventDefault();
      onSaveClick();
    }



    const onChangeFavorite = (event) => {
      changeWebGroup(event.target.checked);
    };

  return (
    <div>

        <Modal isOpen={isOpen} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        toggle={toggle} className={className} >
          <div className="create-modal">
            <ModalHeader toggle={toggle} className="mt-2 pl-5 pb-0 mb-0">
              <div className='create'>
                <label className="iconU-createModal mt-2" style={{fontSize:"1.5em"}}/>
                <label className='modal-title-text mb-0 mt-2 ml-3'>Create User</label>
              </div>

              <p color="primary" onClick={(e)=>{closeModal();}}>
                <i className="iconU-close mr-3" aria-hidden="true" />
              </p>
            </ModalHeader>
            <ModalHeader className='Tab pt-0 d-flex flex-column' style={{border:"none !important"}}>
              <div className="modal-desc-text" style={{marginLeft:"75px"}}>
                Enter user details to create new user
              </div>
            </ModalHeader>
            <ModalHeader className="pb-0">
              <div className="d-flex d-inline-flex">
                  <div className={(firtsTabActive)?"tab ml-3 mr-3 p-3 tab-active ":" tab ml-3 mr-3 p-3 "} onClick={onClickTabActive}>
                      <span className="p-3">
                          <img className="numberimg" style={{width:"11%", paddingBottom:"8px"}} alt={""} src={(firtsTabActive)?oneactive:oneinactive}/>
                      </span>
                      User Details
                  </div>
                  <div className={(secondTabActive)?"tab p-3 tab-active ":" tab p-3"} onClick={onNextClickHandler}>
                    <span className="p-3">
                        <img className="numberimg" style={{width:"11%", paddingBottom:"8px"}} alt={""} src={(secondTabActive)?twoactive:twoinactive}/>
                    </span>
                      Review
                  </div>
              </div>
            </ModalHeader>
            <ModalBody className='pt-0 w-100 pl-1 pr-1 pb-1'>
              <div className={(firtsTabActive)?" ":"d-none"}>
                  <div className="tab-content pl-5 pr-5 pt-3 pb-3">
                      <form onSubmit={submitHandler}>

                      <div className="account-detail mt-2">
                          <div className="row">
                              <div className="col-2">                                  
                                  <label className="section-header-text">New User</label>                                  
                              </div>
                              <div className="col-10">
                                 <div className="row">
                                    <div className="col-3">
                                        <label className="webgroup d-flex justify-content-between">
                                            <input type="checkbox" onChange={(e) => {onChangeFavorite(e)}}/>
                                           <span className={(isWebGroup)?"flex-fill webgroup-notactive ":"flex-fill webgroup-active"}>Regular User</span>
                                           <span className={(isWebGroup)?"flex-fill webgroup-active ":"flex-fill webgroup-notactive"}>Admin User</span>
                                        </label>
                                    </div>
                                 </div>                                  
                              </div>
                          </div>
                         
                          <div className="row">
                              <div className="col-3">
                                  <label className="title-label">User ID</label>
                              </div>
                              <div className="col-3">
                                  <label className="title-label">Name</label>
                              </div>
                              <div className="col-3">
                                  <label className="title-label">Email</label>
                              </div>
                              <div className="col-3">
                                  <label className="title-label">Company</label>
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
                          <div className={(isWebGroup)?"d-none ":""}>
                              <div className="row mt-4">
                                  <div className="col-12">
                                          <label className="section-header-text">System</label>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col-4">
                                      <ModuleAccess moduleAccess={moduleAccess} isLoaded={isModuleLoaded} onEnableClick={moduleAccessEnableClick} onModuleEnableAll={onModuleEnableAll}/>
                                  </div>
                                  <div className="col-4 pl-0">
                                      <Site sites={sites} isLoaded={isSiteLoaded} onEnableClick={sitesEnableClick} onSubmitHandler = {submitHandler} onSiteEnableAll = {onSiteEnableAll} />
                                  </div>
                                  <div className="col-4">
                                      <Client clients={clients} isLoaded={isClientLoaded} onEnableClick={clientEnableClick} onSubmitHandler = {submitHandler} onClientEnableAll = {onClientEnableAll}/>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className={`row ${isWebGroup?' user-admin-empty-space':''}`}>
                          <div className="col-2">
                              <button type="button" style={{width:"151px"}} className="btn btn-primary btn-submit" onClick={(e)=>{window.location.reload()}}>
                                  <span className="fa fa-angle-left mr-2" style={{fontSize:'1.4rem'}}></span>
                                  <label className="create-user-label mb-0">Back</label>
                              </button>
                          </div>
                          <div className="col-8">
                              <div className="d-flex justify-content-center">
                                  <label className={(isValidForm)?"errorText ":" d-none"}>
                                      {message}
                                  </label>
                              </div>
                          </div>
                          <div className="col-2 pl-5">
                              <button type="button" style={{width:"151px"}} className="font-lg font-md font-sm btn btn-primary" onClick={onNextClickHandler}>
                                  <label className="create-user-label mb-0">Next</label>
                              </button>
                          </div>
                      </div>

                      </form>
                  </div>
              </div>
              <div className={(secondTabActive)?" ":"d-none"}>
                  <div className="tab-content pl-5 pr-5 pt-3 pb-3">
                      <div className="account-detail mt-2">
                            <div className="row">
                                <div className="col-2">                                  
                                    <label className="section-header-text">New User</label>                                  
                                </div>
                                <div className="col-10">
                                  <div className="row">
                                      <div className="col-3">
                                          <label className="webgroup d-flex justify-content-between">
                                            <span className={(isWebGroup)?"flex-fill webgroup-review-notactive ":"flex-fill webgroup-review-active"}>Regular User</span>
                                            <span className={(isWebGroup)?"flex-fill webgroup-review-active ":"flex-fill webgroup-review-notactive"}>Admin User</span>
                                          </label>
                                      </div>
                                  </div>                                  
                                </div>
                            </div>

                          <div className="row">
                              <div className="col-3">
                                <label className="review-title-label" style={{color:"#D5D8DA"}}>User ID</label>
                              </div>

                              <div className="col-3">
                                <label className="review-title-label" style={{color:"#D5D8DA"}}>Name</label>
                              </div>

                              <div className="col-3">
                                <label className="review-title-label" style={{color:"#D5D8DA"}}>Email</label>
                              </div>

                              <div className="col-3">
                                <label className="review-title-label" style={{color:"#D5D8DA"}}>Company</label>
                              </div>
                          </div>

                          <div className="row">
                              <div className="col-3">
                                <label name="userid" className="form-control border-0 review-text-value">{model.userId}</label>
                              </div>

                              <div className="col-3">
                                <label name="userName" className="form-control border-0 review-text-value"> {model.name}</label>
                              </div>

                              <div className="col-3">
                                <label name="email" className="form-control border-0 review-text-value">{model.email}</label>
                              </div>

                              <div className="col-3">
                                <label name="company" className="form-control border-0 review-text-value">{model.company}</label>
                              </div>
                          </div>

                          <div className={(isWebGroup)?"d-none ":""}>
                              <div className="row mt-4">
                                  <div className="col-12">
                                    <h3>
                                      <label className="section-header-text">System</label>
                                    </h3>
                                  </div>
                              </div>

                              <div className="d-flex flex-row">
                                  <div className="flex-fill mr-4">
                                      <ModuleAccessReview moduleAccess={moduleAccess}/>
                                  </div>
                                  <div className="flex-fill ml-2 mr-4">
                                      <SiteReview sites={sites}/>
                                  </div>
                                  <div className="flex-fill ml-2 mr-4">
                                      <ClientReview clients={clients}/>
                                  </div>
                              </div>
                          </div>
                      
                      </div>

                      <div className={`row ${isWebGroup?' user-admin-empty-space':''}`}>
                          <div className="col-2">
                              <button type="button" style={{width:"151px"}} className="btn btn-primary btn-submit" onClick={onClickTabActive}>
                              <span className="fa fa-angle-left mr-2" style={{fontSize:'1.4rem'}}></span>
                                  <label className="create-user-label mb-0">Back</label>
                              </button>
                          </div>
                          <div className="col-8">

                              <div className="d-flex justify-content-center">

                              </div>

                          </div>
                          <div className="col-2 pl-5">
                                <button type="button" style={{width:"151px"}} className="font-lg font-md font-sm btn btn-primary" onClick={onSaveClick}>
                                    <i className= {(isSaveProgressing)?"mr-2 fa fa-refresh fa-spin ":"fa fa-refresh fa-spin d-none"}></i>
                                    <label className="create-user-label mb-0">Submit</label>
                                </button>
                          </div>
                      </div>

                   </div>
              </div>
            </ModalBody>
          </div>

       </Modal>



  </div>
  );
}

export default modalNewUser;
