import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'Component/Breadcrumb';
import { FormFeedback } from 'reactstrap';
import { CCard, CCardBody } from '@coreui/react';
import ModuleAccess from '../ModuleAccess';
import Site from '../Site';
import Client from '../Client';
import { getAccountInfo, onBlurEmail, onChangeEmail, onChangeName, saveClick } from '../../../apiService';
import { disabledCharacterName, onClieckSuspendUser, gotoUM, onClickResetPassword } from './service';
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
    isLoadReset: false,
    isResetSuccess: false,

    adminClass: 'd-none',
    validation: {
      name: { isValid: true, invalidClass: ' ', message: 'username must be entered' },
      email: { isValid: true, invalidClass: ' ', message: 'invalid email' },
      modules: { isValid: true, invalidClass: 'is-invalid', message: 'Please enable at least one on module access' },
      sites: { isValid: true, invalidClass: 'is-invalid', message: 'Please enable at least one on site' },
      clients: { isValid: true, invalidClass: 'is-invalid', message: 'Please enable at least one on client' },
    },
  });

  const user = useSelector((state) => state.user);
  const usersData = useSelector((state) => state.usersData);
  const accountInfo = useSelector((state) => state.accountInfo);
  const userid = props.match.params.id;
  const loadSite = useSelector((state) => state.loadSite);
  const loadClient = useSelector((state) => state.loadClient);
  const moduleAccess = useSelector((state) => state.moduleAccess);
  const newState = { ...state };

  useEffect(() => {
    getAccountInfo({ userid, state, setState, dispatch, loadSite, loadClient, moduleAccess });
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
  return (
    <div>
      <Breadcrumb breadcrumb={[{ to: '/users-management', label: 'User Management' }]} />
      <CCard>
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
                  <h3 className="mb-0">
                    <i class="fa fa-user pr-3" aria-hidden="true"></i>
                    <label className="text-primary mb-0">{newState.accountInfo.user}</label>
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
                {newState?.accountInfo?.request_forgot_password ? (
                  <div className="col-md-3 pr-0">
                    <label className="text-title-detail">Reset Password</label>
                  </div>
                ) : (
                  ''
                )}

                <div className={`col-md-3 pr-0 ${newState.adminClass}`}>
                  <label className="text-title-detail">Suspend Users</label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-1 pr-0">
                  <input readOnly type="text" className="form-control" value={newState.accountInfo.userId} />
                </div>
                <div className="col-md-3 pr-0">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      newState.validation.email['isValid'] ? '' : newState.validation.email['invalidClass']
                    }`}
                    onChange={(e) => {
                      onChangeEmail({ e, state, setState });
                    }}
                    onBlur={(e) => {
                      onChangeEmail({ e, state, setState });
                    }}
                    value={newState.accountInfo.email}
                  />
                  <FormFeedback className="invalid-error-padding">
                    {`${newState.validation.email['message']}`}
                  </FormFeedback>
                </div>
                <div className="col-md-2 pr-0">
                  <input
                    type="text"
                    className={`form-control ${
                      newState.validation.name['isValid'] ? '' : newState.validation.name['invalidClass']
                    }`}
                    maxLength="60"
                    onChange={(e) => {
                      onChangeName({ e, state, setState });
                    }}
                    onKeyDown={disabledCharacterName}
                    value={newState.accountInfo.user}
                  />
                  <FormFeedback className="invalid-error-padding">
                    {`${newState.validation.name['message']}`}
                  </FormFeedback>
                </div>

                {newState?.accountInfo?.request_forgot_password ? (
                  <div className="col-md-3 pr-0">
                    <div className="row pr-0">
                      <div className="col-6 text-title-detail pr-0">Are you sure you want to create new password?</div>
                      <div className="col-5">
                        <button
                          type="button"
                          className={
                            'btn ' +
                            (newState.accountInfo.passwordChange === ''
                              ? 'btn-outline-active'
                              : 'btn-outline-notActive')
                          }
                          onClick={(e) => {
                            onClickResetPassword({ state, setState });
                          }}
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
                        className={
                          'btn ' +
                          (!newState.accountInfo.disabled ? 'btn-outline-active' : 'btn-outline-notActive px-0')
                        }
                        onClick={(e) => {
                          onClieckSuspendUser({ state, setState });
                        }}
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
                    <label className="text-primary mb-0">System</label>
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <ModuleAccess
                    state={state}
                    setState={setState}
                    moduleAccess={newState.moduleAccess}
                    isEnableAllModule={newState.isEnableAllModule}
                  />
                  <input
                    type="checkbox"
                    name="moduleAccess"
                    className={`d-none ${
                      newState.validation.modules['isValid'] ? '' : newState.validation.modules['invalidClass']
                    }`}
                  />
                  <FormFeedback>{`${newState.validation.modules['message']}`}</FormFeedback>
                </div>
                <div className="col-4 pl-0">
                  <Site
                    state={state}
                    setState={setState}
                    sites={newState.sites}
                    isEnableAllSite={newState.isEnableAllSite}
                  />
                  <input
                    type="checkbox"
                    name="sites"
                    className={`d-none ${
                      newState.validation.sites['isValid'] ? '' : newState.validation.sites['invalidClass']
                    }`}
                  />
                  <FormFeedback>{`${newState.validation.sites['message']}`}</FormFeedback>
                </div>
                <div className="col-4 um-client-scrollbar">
                  <Client
                    state={state}
                    setState={setState}
                    clients={newState.clients}
                    isEnableAllClient={newState.isEnableAllClient}
                  />
                  <input
                    type="checkbox"
                    name="clients"
                    className={`d-none ${
                      newState.validation.clients['isValid'] ? '' : newState.validation.clients['invalidClass']
                    }`}
                  />
                  <FormFeedback>{`${newState.validation.clients['message']}`}</FormFeedback>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between pt-3">
              <button
                type="button"
                className=" font-lg btn btn-primary btn-submit default-box-height"
                onClick={(e) => {
                  gotoUM(props);
                }}
              >
                <label className="create-user-label mb-0">{`BACK`}</label>
              </button>
              <p>
                {/* <label className={newState.isValidForm ? 'errorText ' : ' d-none'}>
                  Please make sure user name, email is valid and module has one enabled
                </label> */}
              </p>
              <button
                type="button"
                className={`font-lg btn btn-submit default-box-height ${newState.changed ? 'btn-primary' : 'btn-grey'}`}
                disabled={!newState.changed}
                onClick={() => {
                  saveClick({ props, state, setState, dispatch });
                }}
              >
                {newState.isSaveProgressing ? (
                  <img src={loading} className="mt-min-5" width="45" height="45" />
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
