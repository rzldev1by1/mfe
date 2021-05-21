import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Container } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Form from './Form';
import { renewState, resetState, resetCreate, validation, submit, validateButton } from './services.js';
import { getPOResources, getDisposition } from 'apiService/dropdown';
import loading from 'assets/icons/loading/LOADING-MLS.gif';
import MessageTab from 'Component/MessageTab';
import './style.scss';

const Create = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const orderLinesData = useSelector((state) => state.orderLinesData);
  const clientData = useSelector((state) => state.clientData);
  const siteData = useSelector((state) => state.siteData);
  const moduleAccess = useSelector((state) => state.moduleAccess);
  const darkMode = useSelector((state) => state.customDarkMode);

  const [activeTab, setActiveTab] = useState('details');
  const [isReset, setIsReset] = useState(0);
  const [isValidation, setIsValidation] = useState(false);
  const [isSubmitStatus, setIsSubmitStatus] = useState(null);
  const [isSubmitReturn, setIsSubmitReturn] = useState(null);
  const [createDetails, setCreateDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [state, setState] = useState({
    userId: null,
    email: null,
    name: null,
    moduleAccess: [],
    isEnableAllModule: false,
    sites: [],
    isEnableAllSite: false,
    clients: [],
    isEnableAllClient: false,
    validate: false,
    isAdmin: false,

    changed: false,
    isLoadComplete: false,
    adminClass: '',
    validation: {
      name: { isValid: null, invalidClass: 'is-invalid', message: 'Username must be entered' },
      email: { isValid: null, invalidClass: 'is-invalid', message: 'Email must be entered' },
      modules: {
        isValid: false,
        invalidClass: 'is-invalid',
        message: 'Please enable at least one on module access',
      },
      sites: { isValid: false, invalidClass: 'is-invalid', message: 'Please enable at least one on site' },
      clients: { isValid: false, invalidClass: 'is-invalid', message: 'Please enable at least one on client' },
    },
  });

  useEffect(() => {
    if (isReset === 0) {
      setIsReset(1);
      setIsValidation(false);
      setActiveTab('details');
      renewState({ setState, state, siteData, clientData, moduleAccess, reset: true });
    }
  }, [isReset]);

  useEffect(() => {
    validateButton({ isAdmin, setState, state });
  }, [state?.validation]);

  useEffect(() => {
    renewState({ setState, state, siteData, clientData, moduleAccess });
  }, []);

  return (
    <div>
      <Modal show={show} size="xl" className="purchase-order-create">
        <Modal.Body className={`${darkMode ? 'customDarkModes' : 'bg-primary'}  p-0 rounded-top rounded-bottom`}>
          <Row className="px-9 mx-0">
            <Col xs={10} className="px-0">
              <i className="iconU-createModal font-20"></i>
              <span className="font-20 pl-2">Create Users</span> <br />
              <span className="ml-7">Enter user details to create a New User</span>
            </Col>
            <Col xs={2} className="text-right px-0">
              <i
                className="iconU-close pointer"
                onClick={() => {
                  setShow(false);
                  setIsReset(0);
                }}
              ></i>
            </Col>
          </Row>
          <Nav tabs className="px-7 m-0">
            <NavItem className="mr-1">
              <NavLink
                style={{ paddingBottom: '7px', maxWidth:'297px', paddingRight:'20px' }}
                className={`d-flex height-nav align-items-center ${activeTab === 'details' ? 'active' : null}`}
                onClick={() => setActiveTab('details')}
              >
                <span className="newIcon-create_edit" />
                <div className="pl-2">User Details</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`d-flex height-nav align-items-center ${activeTab === 'review' ? 'active' : null}`}
                style={{ paddingBottom: '7px', maxWidth:'146px', paddingRight:'22px' }}
                onClick={() => {
                  if (state.validate) {
                    setActiveTab('review');
                  }
                }}
              >
                <span className="newIcon-review" /> 
                <div className="pl-2">Review</div>
              </NavLink>
            </NavItem>
          </Nav>
          <div>
            <TabContent >
              <Container className="px-9 pt-4 pb-9">
                {/* Tabs */}
                {activeTab == 'message' ? (
                  <MessageTab
                    module="UM"
                    submitReturn={isSubmitReturn}
                    back={() => setActiveTab('detail')}
                    exit={() => {
                      setShow(false);
                      setIsReset(0);
                    }}
                  />
                ) : (
                  <Form
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                    activeTab={activeTab}
                    state={state}
                    setState={setState}
                    isValidation={isValidation}
                  />
                )}

                {/* Button */}
                {activeTab == 'details' ? (
                  <Row className="mt-3 pt-3">
                    <Col lg={2}></Col>
                    <Col lg={8}></Col>
                    <Col lg={2} className="text-right">
                      <button
                        className={'btn btn-primary'}
                        onClick={() => {
                          setIsValidation(true);
                          if (state.validate) {
                            setActiveTab('review');
                          }
                        }}
                      >
                        {'NEXT'}
                      </button>
                    </Col>
                  </Row>
                ) : activeTab == 'review' ? (
                  <Row className="mt-3 pt-3">
                    <Col lg={2}>
                      <button className="btn btn-primary" onClick={() => setActiveTab('details')}>
                        {'BACK'}
                      </button>
                    </Col>
                    <Col lg={8}>
                      {isSubmitStatus === 'success' ? (
                        <div className="text-center text-secondary mt-2">
                          {' '}
                          <span className="text-success">Success,</span> order has been successfully submitted for
                          processing{' '}
                        </div>
                      ) : null}
                    </Col>
                    <Col lg={2} className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setIsSubmitStatus('loading');
                          submit({ setIsSubmitStatus, setIsSubmitReturn, setActiveTab, isAdmin, user, data: state });
                        }}
                      >
                        {isSubmitStatus === 'loading' ? (
                          <div className="m-iconLoad">
                            <img src={loading} width="45" height="45" />
                          </div>
                        ) : (
                          'SUBMIT'
                        )}
                      </button>
                    </Col>
                  </Row>
                ) : null}
              </Container>
            </TabContent>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Create;
