import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import ModuleAccess from '../ModuleAccess';
import Site from '../Site';
import Client from '../Client';
import { FormFeedback } from 'reactstrap';
import { validateButton, changeDetails, generateUserID, disabledCharacterName } from './services.js';

import './style.scss';

const Form = ({ activeTab, state, setState, isValidation, isAdmin, setIsAdmin }) => {
  const [isReadOnly, setIsReadOnly] = useState(null);
  const [isButtonState, setIsButtonState] = useState(false);
  const [webGroupClass, setIsWebGroupClass] = useState({
    newUser: 'webgroup-active',
    admin: 'webgroup-notactive',
  });
  console.log(state);
  useEffect(() => {
    if (activeTab == 'review') {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, [activeTab]);

  useEffect(() => {
    //set class for webGroup
    let WebGroupClass = {};
    if (activeTab !== 'review') {
      WebGroupClass.newUser = isAdmin ? ' webgroup-notactive' : ' webgroup-active';
      WebGroupClass.admin = isAdmin ? ' webgroup-active' : ' webgroup-notactive';
    } else {
      WebGroupClass.newUser = isAdmin ? ' webgroup-review-notactive' : ' webgroup-review-active';
      WebGroupClass.admin = isAdmin ? ' webgroup-review-active' : ' webgroup-review-notactive';
    }
    setIsWebGroupClass(WebGroupClass);
  }, [activeTab, isAdmin]);

  if (!state) {
    return;
  }

  return (
    <div>
      {/* Start Order Details */}
      <Row>
        <Col lg="2" className="pr-0" style={{ flex: '0 0 11%', maxWidth: '11%' }}>
          <h3 className="text-primary font-20 um-text-webgroup">New User</h3>
        </Col>
        <Col lg="10" className="pl-0">
          <Row className="mx-0">
            <Col lg="4" md="4" sm="12" className="pl-0 toggle-um"> 
              <label className="webgroup">
                <span onClick={(e) => { setIsAdmin(false)}} className={`flex-fill pointer toggleWidth ${webGroupClass.newUser}`}>REGULAR USER</span>
                <span onClick={(e) => { setIsAdmin(true)}}  className={`flex-fill pointer toggleWidth px-3 ${webGroupClass.admin}`}>ADMIN USER</span>
              </label>
            </Col>
          </Row>
        </Col>
      </Row>

      <div>
        <div className="row">
          <div className="col-sm-4">
            <label className="text-title-detail">User ID</label>
          </div>
          <div className="col-sm-4">
            <label className="text-title-detail required">Email</label>
          </div>
          <div className="col-sm-4">
            <label className="text-title-detail required">Name</label>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4  ">
            <input placeholder="User ID" readOnly type="text" className="form-control readonly" value={state.userId} />
            <span className="text-title font-sm">Auto Generated</span>
          </div>
          <div className="col-sm-4  ">
            <input
              type="email"
              name="email"
              autocomplete='off'
              placeholder="Email"
              readOnly={isReadOnly}
              className={`form-control ${(isValidation && !state.email) || state.validation.email['isValid'] === false
                ? state.validation.email['invalidClass'] + ' input-danger '
                : ''
                } ${isReadOnly ? 'readonly' : null}`}
              onChange={async (e) => {
                await changeDetails({ isAdmin, setState, state, column: 'email', e });
              }}
              onBlur={async (e) => {
                await changeDetails({ isAdmin, setState, state, column: 'email', e });
              }}
            />
            <FormFeedback className="invalid-error-padding">{`${state.validation.email['message']}`}</FormFeedback>
          </div>
          <div className="col-sm-4  ">
            <input
              name="name"
              type="text"
              autocomplete='off'
              placeholder="Name"
              readOnly={isReadOnly}
              className={`form-control ${isValidation && !state.name ? state.validation.name['invalidClass'] + ' input-danger ' : ''
                } ${isReadOnly ? 'readonly' : null} `}
              maxLength="60"
              onChange={(e) => {
                changeDetails({ isAdmin, setState, state, column: 'name', e });
              }}
              onKeyDown={(e) => disabledCharacterName(e)}
            />
            <FormFeedback className="invalid-error-padding">{`${state.validation.name['message']}`}</FormFeedback>
          </div>
        </div>
      </div>

      <div className={`system mb-0 ${isAdmin ? 'd-none' : ''}`}>
        <div className="row">
          <div className="col-12">
            <h3 className="mb-0">
              <label className="text-primary font-20 ">System</label>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <ModuleAccess
              state={state}
              setState={setState}
              moduleAccess={state.moduleAccess}
              isEnableAllModule={state.isEnableAllModule}
              isReadOnly={isReadOnly}
            />
          </div>
          <div className="col-4 pl-0">
            <Site
              state={state}
              setState={setState}
              sites={state.sites}
              isEnableAllSite={state.isEnableAllSite}
              isReadOnly={isReadOnly}
            />
          </div>
          <div className="col-4 um-client-scrollbar">
            <Client
              state={state}
              setState={setState}
              clients={state.clients}
              isEnableAllClient={state.isEnableAllClient}
              isReadOnly={isReadOnly}
            />
          </div>
        </div>
        {/* Validasi */}
        <div className="row">
          <div className="col-4 d-flex">
          <div style={{color:'transparent'}}>transparent</div>
            <input
              type="checkbox"
              name="moduleAccess"
              className={`d-none ${isValidation && !state.validation.modules['isValid'] ? state.validation.modules['invalidClass'] : ''
                }`}
            />
            <FormFeedback>{`${state.validation.modules['message']}`}</FormFeedback>
          </div>
          <div className="col-4 pl-0">
            <input
              type="checkbox"
              name="sites"
              className={`d-none ${isValidation && !state.validation.sites['isValid'] ? state.validation.sites['invalidClass'] : ''
                }`}
            />
            <FormFeedback>{`${state.validation.sites['message']}`}</FormFeedback>
          </div>
          <div className="col-4 um-client-scrollbar">
            <input
              type="checkbox"
              name="clients"
              className={`d-none ${isValidation && !state.validation.clients['isValid'] ? state.validation.clients['invalidClass'] : ''
                }`}
            />
            <FormFeedback>{`${state.validation.clients['message']}`}</FormFeedback>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
