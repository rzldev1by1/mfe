import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Container } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Form from './Form';
import { resetCreate, validation, submit, cleanOrderDetails, cleanCustomerDetails } from './services.js';
import { getSOResources, getDisposition } from 'apiService/dropdown';
import loading from 'assets/icons/loading/LOADING-MLS.gif';
import MessageTab from 'Component/MessageTab';
import './style.scss';
// icon
import iconCreate from '../../../assets/img/Icon-create.png';
import iconCreateHover from '../../../assets/img/Icon-create-hover.png';
import iconReview from '../../../assets/img/Icon-review.png';
import iconReviewHover from '../../../assets/img/Icon-review-hover.png';

const Create = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.so_resources);
  const disposition = useSelector((state) => state.so_disposition);
  const user = useSelector((state) => state.user);
  const orderDetailsTmp = useSelector((state) => state.orderDetails);
  const customerDetailsTmp = useSelector((state) => state.customerDetails);
  const orderLinesTmp = useSelector((state) => state.orderLines);
  const orderLinesDataTmp = useSelector((state) => state.orderLinesData);

  const [activeTab, setActiveTab] = useState('details');
  const [isReset, setIsReset] = useState(0);
  const [isValidation, setIsValidation] = useState(false);
  const [isSubmitStatus, setIsSubmitStatus] = useState(null);
  const [isSubmitReturn, setIsSubmitReturn] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  const [orderLines, setOrderLines] = useState([]);

  useEffect(() => {
    setOrderDetails(cleanOrderDetails);
    setCustomerDetails(cleanCustomerDetails);
  }, []);

  useEffect(() => {
    if (isReset === 0) {
      resetCreate(dispatch);
      setIsReset(1);
      setIsValidation(false);
      setActiveTab('details');
      setOrderDetails(cleanOrderDetails);
      setCustomerDetails(cleanCustomerDetails);
      setOrderLines([]);
    }
  }, [isReset]);

  useEffect(() => {
    getSOResources({ user, dispatch });
    getDisposition({ dispatch });
  }, []);

  return (
    <div>
      <Modal show={show} size="xl" className="sales-order-create">
        <Modal.Body className="bg-primary p-0 rounded-top">
          <Row className="pl-5 pr-3 py-5 mx-0">
            <Col xs={10} className="px-0 ">
              <i className="iconU-createModal font-20"></i>
              <span className="font-20 pl-2">Create Sales Order</span> <br />
              <span className="ml-7">Enter Order and line details to create a new sales order</span>
            </Col>
            <Col className="text-right px-0 pr-4 mr-2 pt-3">
              <i
                className="iconU-close pointer"
                onClick={() => {
                  setShow(false);
                  setTimeout(() => {
                    setIsReset(0);
                  }, 500);
                }}
              ></i>
            </Col>
          </Row>
          <Nav tabs className="px-8 m-0">
            <NavItem className="mr-1">
              <NavLink
                style={{ paddingBottom: '7px', maxWidth:'297px' }}
                className={`d-flex height-nav align-items-center px-3 ${activeTab === 'details' ? 'active' : null}`}
                onClick={() => setActiveTab('details')}
              >
                {/* <span className="number-number-1 mr-2" /> */}
                {activeTab === 'details' ? (
                  <img src={iconCreateHover} alt="logo" style={{ width: '10.7%'}} />
                ):(
                  <img src={iconCreate} alt="logo" style={{ width: '10.7%'}} />
                )}
                <div className="pl-2">Order & Product Details</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ paddingBottom: '7px', maxWidth:'146px'  }}
                className={`d-flex height-nav align-items-center px-3 ${activeTab === 'review' ? 'active' : null}`}
                onClick={() => {
                  validation({ orderDetails, orderLines, setOrderLines, customerDetails, setActiveTab });
                  setIsValidation(true);
                }}
              >
                {/* <span className="number-number-2 mr-2" /> */}
                {activeTab === 'review' ? (
                  <img src={iconReviewHover} alt="logo" style={{ width: '24.7%'}} />
                ):(
                  <img src={iconReview} alt="logo" style={{ width: '24.7%'}} />
                )}
                <div className="pl-2">Review</div>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent>
            <Container className="px-5 pt-4 pb-5">
              {/* Tabs */}
              {activeTab == 'message' ? (
                <MessageTab
                  module={'Sales Order'}
                  submitReturn={isSubmitReturn}
                  back={() => setActiveTab('detail')}
                  exit={() => {
                    setShow(false);
                    setIsReset(0);
                  }}
                />
              ) : (
                <Form
                  activeTab={activeTab}
                  isValidation={isValidation}
                  orderDetails={orderDetails}
                  setOrderDetails={setOrderDetails}
                  customerDetails={customerDetails}
                  setCustomerDetails={setCustomerDetails}
                  orderLines={orderLines}
                  setOrderLines={setOrderLines}
                  setIsValidation={setIsValidation}
                />
              )}

              {/* Button */}
              {activeTab == 'details' ? (
                <Row className="mt-3 pt-3">
                  <Col lg={2}></Col>
                  <Col lg={8}></Col>
                  <Col lg={2} className="text-right">
                    <button
                      className={'btn btn-primary '}
                      onClick={() => {
                        validation({ orderDetails, orderLines, setOrderLines, customerDetails, setActiveTab });
                        setIsValidation(true);
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
                        submit({
                          setIsSubmitStatus,
                          setIsSubmitReturn,
                          setActiveTab,
                          user,
                          orderDetails,
                          customerDetails,
                          orderLines,
                        });
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
