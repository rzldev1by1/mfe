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
      name: { isValid: false, invalidClass: 'is-invalid', message: '' },
      email: { isValid: false, invalidClass: 'is-invalid', message: '' },
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
      setActiveTab('details');
      resetState({ setState });
      renewState({ setState, state, siteData, clientData, moduleAccess });
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
        <Modal.Body className="bg-primary p-0">
          <Row className="pl-5 pr-3 pb-3 pt-3 mx-0">
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
                style={{ paddingBottom: '12px' }}
                className={`d-flex height-nav align-items-center ${activeTab === 'details' ? 'active' : null}`}
                onClick={() => setActiveTab('details')}
              >
                <span className="number-number-1" />
                Order & Product Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`d-flex height-nav align-items-center ${activeTab === 'review' ? 'active' : null}`}
                onClick={() => {
                  if (state.validate) {
                    setActiveTab('review');
                  }
                }}
              >
                <span className="number-number-2" /> Review
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent>
            <Container className="px-5 pt-4 pb-5">
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
                      className={'btn ' + (state.validate ? 'btn-primary' : 'btn-grey')}
                      onClick={() => {
                        setActiveTab('review');
                      }}
                      disabled={state.validate ? false : true}
                    >
                      {'NEXT'}
                    </button>
                  </Col>
                </Row>
              ) : activeTab == 'review' ? (
                <Row className="mt-3 pt-3">
                  <Col lg={2}>
                    <button className="btn btn-primary" onClick={() => setActiveTab('details')}>
                      {'< BACK'}
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Create;
