import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'Component/Breadcrumb';
import { FormFeedback } from 'reactstrap'
import { CCard, CCardBody } from '@coreui/react'
import DetailHeader from 'Component/DetailHeader';
import TableMaster from 'Component/TableMaster';
import { getDetailData, getDetailHeader } from '../../../apiService';
import { disabledCharacterName } from './service';
import '../index.scss';

const UserManagementDetail = (props) => {
//   const dispatch = useDispatch();
const [state, setState] = useState({
    accountInfo: {},
    adminClass: '',
    validation: {
        name : { isValid: true, invalidClass: /*"is-invalid"*/" ", message:'invalid email' },
        email : { isValid: true, invalidClass: /*"is-invalid"*/" ", message:'username must be entered' },
        modules : { isValid: true, invalidClass: "is-invalid", message:'Please enable at least one on module access' },
        sites : { isValid: true, invalidClass: "is-invalid", message:'Please enable at least one on site' },
        clients : { isValid: true, invalidClass: "is-invalid", message:'Please enable at least one on client' }
    },
  });
const user = useSelector((state) => state.user);

//   const poDetail = useSelector((state) => state.poDetail);
//   const poDetailTable = useSelector((state) => state.poDetailTable);
//   const pagination = useSelector((state) => state.pagination);
//   const siteData = useSelector((state) => state.siteData);
//   const clientData = useSelector((state) => state.clientData);
//   const module = "UserManagementDetail"

//   const height = window.innerHeight - 355;
//   const widht = window.innerWidth;
const newState = {...state}
console.log(newState.validation)
  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          { to: '/user-management', label: 'User Management'},
        ]}
      />
       <CCard>
        <CCardBody className="p-3">
            <div className="account-detail">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h3 className="mb-0">
                            <i class="fa fa-user pr-3" aria-hidden="true"></i><label className="text-primary mb-0">{newState.accountInfo.user}</label>
                            </h3>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <label className="text-title-detail">User ID</label>
                        </div>
                        <div className="col-md-3">
                            <label className="text-title-detail">Email</label>
                        </div>
                        <div className="col-md-2">
                            <label className="text-title-detail">Name</label>
                        </div>
                        <div className="col-md-3 pr-0">
                            <label className="text-title-detail">Reset Password</label>
                        </div>
                        <div className={`col-md-3 pl-0 ${newState.adminClass}`}>
                                <label className="text-title-detail">Suspend Users</label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-1 pr-0">
                            <input 
                                readOnly 
                                type="text" 
                                className="form-control" 
                                value={newState.accountInfo.userId} 
                            />
                        </div>
                        <div className="col-md-3 pr-0">
                            <input 
                                type="email" 
                                name="email" 
                                className={ `form-control ${newState.validation.email["isValid"] ? '' : newState.validation.email["invalidClass"]}`} 
                                onChange={(e) => {  this.onChangeEmail(e , newState.accountInfo.email); this.setState({ changed: true }) }} 
                                onBlur={(e)=> {this.onBlurEmail(e);}} 
                                value={newState.accountInfo.email} 
                            />
                            <FormFeedback className="invalid-error-padding">
                                {`${newState.validation.email["message"]}`}
                            </FormFeedback>
                        </div>
                        <div className="col-md-2 pr-0">
                            <input 
                                type="text" 
                                className={`form-control ${newState.validation.name["isValid"]?'': newState.validation.name["invalidClass"]}`} 
                                maxLength="60" 
                                onChange={(e) => { this.onChangeName(e);this.setState({ changed: true }) }} 
                                onKeyDown={disabledCharacterName} 
                                value={newState.accountInfo.user}
                            />
                            <FormFeedback className="invalid-error-padding">
                                {`${newState.validation.name["message"]}`}
                            </FormFeedback>
                        </div>
                        <div className="col-md-3 pr-0">
                            <div className="row pl-0">
                                <div className="col-6 text-title-detail pr-0">
                                    Are you sure you want to create new password?
                                </div>
                                <div className="col-5">
                                    <button 
                                        type="button" 
                                        className={"btn " + ((newState.accountInfo.passwordChange === '') ? "btn-outline-active" : "btn-outline-notActive")} 
                                        onClick={(e) => { this.onClickResetPassword(); }}>
                                        RESET
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`col-md-3 pl-0 ${newState.adminClass}`}>
                            <div className="row">
                                <div className="col-6 text-title-detail" >
                                    Are you sure you want<br />
                                            to suspend this user?
                                        </div>
                                <div className="col-6">
                                    <button 
                                        type="button" 
                                        className={"btn " + ((!newState.accountInfo.disabled) ? "btn-outline-active" : "btn-outline-notActive px-0")} 
                                        onClick={(e) => { this.onClieckSuspendUser(); }}>
                                        {(!newState.accountInfo.disabled) ? 'SUSPEND' : 'ENABLE'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </CCardBody>
       </CCard>
    </div>
  );
};

export default UserManagementDetail;
