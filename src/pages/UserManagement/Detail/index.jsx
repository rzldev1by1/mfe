import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormFeedback } from 'reactstrap';
import { CCard, CCardBody } from '@coreui/react';
import Breadcrumb from '../../../Component/Breadcrumb';
import ModuleAccess from '../moduleAccess';
import Site from '../Site';
import Client from '../Client';
import { getAccountInfo, onChangeEmail, onChangeName, saveClick } from '../../../apiService';
import { disabledCharacterName, onClickSuspendUser, gotoUM, onClickResetPassword, buttonValidation } from './service';
import loading from '../../../assets/icons/loading/LOADING-MLS.gif';
import ResetModal from '../../../Component/Modal/PopUpResetUm';
import './index.scss';

const UserManagementDetail = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    accountInfo: {},
    oldAccountInfo: {},

    moduleAccess: [],
    isEnableAllModule: false,
    sites: [],
    isEnableAllSite: false,
    clients: [],
    isEnableAllClient: false,

    changed: false,
    isValidForm: false,
    isLoadComplete: false,
    isSaveProgressing: false,

    popUpReset: false,
    statusReset: true,
    isLoadReset: false,
    isResetSuccess: false,

    adminClass: 'd-none',
    validation: {
      name: { isValid: true, invalidClass: 'is-invalid', message: 'username must be entered' },
      email: { isValid: true, invalidClass: ' ', message: 'invalid email' },
      modules: { isValid: true, invalidClass: 'is-invalid', message: 'Please enable at least one on module access' },
      sites: { isValid: true, invalidClass: 'is-invalid', message: 'Please enable at least one on site' },
      clients: { isValid: true, invalidClass: 'is-invalid', message: 'Please enable at least one on client' },
    },
  });

  const { match } = props
  const userId = match.params.id;
  const loadSite = useSelector((data) => data.loadSite);
  const loadClient = useSelector((data) => data.loadClient);
  const moduleAccess = useSelector((data) => data.moduleAccess);
  const [isButton, setIsButton] = useState(false);
  const newState = { ...state };

  useEffect(() => {
    getAccountInfo({ userId, state, setState, dispatch, loadSite, loadClient, moduleAccess, });
  }, []);

  useEffect(() => {
    const newInitialData = {
      isEnableAllClient: newState.isEnableAllClient,
      isEnableAllSite: newState.isEnableAllSite,
      isEnableAllModule: newState.isEnableAllModule,
      moduleAccess: newState.moduleAccess,
      accountInfo: newState.accountInfo,
    };
    newState.initialData = newInitialData;
    setState(newState);
  }, []);

  useEffect(() => {
    buttonValidation({ setIsButton, validation: newState?.validation });
  }, [state]);
  return (
    <div>
      <Breadcrumb breadcrumb={[{ to: '/users-management', label: 'User Management' }]} />
      <CCard style={{ borderRadius: "0.25rem" }}>
        <CCardBody className="p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveClick({ props, state, setState, dispatch });
            }}
            className="d-flex flex-column justify-content-between"
          >
            <div className="account-detail">
              <div className="row mb-3">
                <div className="col-12">
                  <h3 className="mb-0 d-flex">
                    <i className="fa newIcon-profile pr-3" aria-hidden="true" />
                    <span className="text-primary">{newState.accountInfo.user}</span>
                  </h3>
                </div>
              </div>

              <div className="row">
                <div className="col-md-1">
                  <span className="text-title-detail">User ID</span>
                </div>
                <div className="col-md-3">
                  <span className="text-title-detail">Email</span>
                </div>
                <div className="col-md-2">
                  <span className="text-title-detail">Name</span>
                </div>
                {newState?.accountInfo?.request_forgot_password && newState.statusReset ? (
                  <div className="col-md-3 pr-0">
                    <span className="text-title-detail">Reset Password</span>
                  </div>
                ) : (
                  ''
                )}

                <div className={`col-md-3 pr-0 ${newState.adminClass}`}>
                  <span className="text-title-detail">Suspend Users</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-1 pr-0">
                  <input readOnly type="text" className="form-control" value={newState.accountInfo.userId} />
                </div>
                <div className="col-md-3 pr-0">
                  <input
                    readOnly
                    type="email"
                    name="email"
                    className={`form-control ${newState.validation.email.isValid ? '' : newState.validation.email.invalidClass
                      }`}
                    onChange={(e) => {
                      onChangeEmail({ e, state, setState });
                    }}
                    onBlur={(e) => {
                      onChangeEmail({ e, state, setState });
                    }}
                    value={newState.accountInfo.email}
                  />
                  {/* <FormFeedback className="invalid-error-padding">
                    {`${newState.validation.email['message']}`}
                  </FormFeedback> */}
                </div>
                <div className="col-md-2 pr-0">
                  <input
                    readOnly
                    type="text"
                    className={`form-control ${newState.validation.name.isValid ? '' : newState.validation.name.invalidClass}`}
                    maxLength="60"
                    onChange={(e) => {
                      onChangeName({ e, state, setState });
                    }}
                    onKeyDown={disabledCharacterName}
                    value={newState.accountInfo.user}
                  />
                  {/* <FormFeedback className="invalid-error-padding">
                    {`${newState.validation.name['message']}`}
                  </FormFeedback> */}
                </div>

                {newState?.accountInfo?.request_forgot_password && newState.statusReset ? (
                  <div className="col-md-3 pr-0">
                    <div className="row pr-0">
                      <div className="col-6 text-title-detail pr-0">Are you sure you want to create new password?</div>
                      <div className="col-5">
                        <button
                          type="button"
                          className={`btn ${newState.accountInfo.passwordChange === '' ? 'btn-outline-active' : 'btn-outline-notActive'}`}
                          onClick={() => onClickResetPassword({ state, setState })}
                        >
                          RESET
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div className={`col-md-3 pr-0 ${newState.adminClass}`}>
                  <div className="row">
                    <div className="col-6 text-title-detail">
                      Are you sure you want
                      <br />
                      to suspend this user?
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className={`btn ${!newState.accountInfo.disabled ? 'btn-outline-active' : 'btn-outline-notActive px-0'}`}
                        onClick={() => onClickSuspendUser({ state, setState })}
                      >
                        {!newState.accountInfo.disabled ? 'SUSPEND' : 'ENABLE'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="system" className={`system mb-0 ${newState.adminClass}`}>
              <div className="row">
                <div className="col-12">
                  <h3 className="mb-0">
                    <span className="text-primary mb-0">System</span>
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <ModuleAccess
                    module='detail'
                    state={state}
                    setState={setState}
                    moduleAccess={newState.moduleAccess}
                    isEnableAllModule={newState.isEnableAllModule}
                  />
                </div>
                <div className="col-4 pl-0">
                  <Site
                    state={state}
                    module='detail'
                    setState={setState}
                    sites={newState.sites}
                    isEnableAllSite={newState.isEnableAllSite}
                  />
                </div>
                <div className="col-4 um-client-scrollbar">
                  <Client
                    state={state}
                    module='detail'
                    setState={setState}
                    clients={newState.clients}
                    isEnableAllClient={newState.isEnableAllClient}
                  />
                </div>
              </div>
              {/* Validasi */}
              <div className="row">
                <div className="col-4">
                  <div style={{ color: 'transparent' }}>transparent</div>
                  <input
                    type="checkbox"
                    name="moduleAccess"
                    className={`d-none ${newState.validation.modules.isValid ? '' : newState.validation.modules.invalidClass
                      }`}
                  />
                  <FormFeedback>{`${newState.validation.modules.message}`}</FormFeedback>
                </div>
                <div className="col-4 pl-0">
                  <input
                    type="checkbox"
                    name="sites"
                    className={`d-none ${newState.validation.sites.isValid ? '' : newState.validation.sites.invalidClass
                      }`}
                  />
                  <FormFeedback>{`${newState.validation.sites.message}`}</FormFeedback>
                </div>
                <div className="col-4 um-client-scrollbar">
                  <input
                    type="checkbox"
                    name="clients"
                    className={`d-none ${newState.validation.clients.isValid ? '' : newState.validation.clients.invalidClass
                      }`}
                  />
                  <FormFeedback>{`${newState.validation.clients.message}`}</FormFeedback>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between pt-3">
              <button
                type="button"
                className=" font-lg btn btn-primary btn-submit default-box-height"
                onClick={() => gotoUM(props)}
              >
                <span className="create-user-label mb-0">BACK</span>
              </button>
              <p>
                {/* <label className={newState.isValidForm ? 'errorText ' : ' d-none'}>
                  Please make sure user name, email is valid and module has one enabled
                </label> */}
              </p>
              <button
                type="button"
                className={`font-lg btn btn-submit default-box-height ${newState.changed && isButton ? 'btn-primary' : 'btn-grey'
                  }`}
                disabled={!newState.changed || !isButton}
                onClick={() => saveClick({ props, state, setState, dispatch })}
              >
                {newState.isSaveProgressing ? (
                  <img src={loading} alt="" className="mt-min-5" width="45" height="45" />
                ) : (
                  'SAVE'
                )}
              </button>
            </div>
            {/* <button type="submit" style={{ opacity: '0' }}></button> */}
          </form>
        </CCardBody>
      </CCard>
      <ResetModal
        show={newState.popUpReset}
        isLoad={newState.isLoadReset}
        isResetSuccess={newState.isResetSuccess}
        state={state}
        setState={setState}
        props={props}
      />
    </div>
  );
};

export default UserManagementDetail;
