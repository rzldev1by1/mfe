import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Container } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Form from './Form';
import { resetCreate, validation, submit, cleanOrderDetails, cleanOrderLines } from './services.js';
import { getPOResources, getDisposition } from 'apiService/dropdown';
import loading from 'assets/icons/loading/LOADING-MLS.gif';
import MessageTab from 'Component/MessageTab';
import './style.scss';

const Create = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.po_resources);
  const disposition = useSelector((state) => state.po_disposition);
  const user = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState('details');
  const [isReset, setIsReset] = useState(0);
  const [isValidation, setIsValidation] = useState(false);
  const [isSubmitStatus, setIsSubmitStatus] = useState(null);
  const [isSubmitReturn, setIsSubmitReturn] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [orderLines, setOrderLines] = useState([]);

  useEffect(() => {
    setOrderDetails(cleanOrderDetails);
  }, []);

  useEffect(() => {
    if (isReset === 0) {
      setIsReset(1);
      setIsValidation(false);
      setActiveTab('details');
      setOrderDetails(cleanOrderDetails);
      setOrderLines([]);
    }
  }, [isReset]);

  useEffect(() => {
    if (!resources || !disposition) {
      getPOResources({ user, dispatch });
      getDisposition({ dispatch });
    }
  }, [resources]);

  return (
    <div>
      <Modal show={show} size="xl" className="purchase-order-create">
        <Modal.Body className="bg-primary p-0 rounded-top">
          <Row className="pl-5 pr-3 py-4 mx-0">
            <Col xs={10} className="px-0">
              <i className="iconU-createModal font-20"></i>
              <span className="font-20 pl-2">Create Purchase Order</span> <br />
              <span className="ml-7">Enter Order and line details to create a new purchase order</span>
            </Col>
            <Col className="text-right px-0 pr-4 mr-2">
              <i
                className="iconU-close pointer"
                onClick={() => {
                  setShow(false);
                  setIsReset(0);
                }}
              ></i>
            </Col>
          </Row>
          <Nav tabs className="px-8 m-0">
            <NavItem className="mr-1">
              <NavLink
                style={{ paddingBottom: '12px' }}
                className={`d-flex height-nav align-items-center px-3 ${activeTab === 'details' ? 'active' : null}`}
                onClick={() => setActiveTab('details')}
              >
                <span className="number-number-1 mr-2" />
                Order & Product Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`d-flex height-nav align-items-center px-3 ${activeTab === 'review' ? 'active' : null}`}
                onClick={() => {
                  validation({ orderDetails, orderLines, setOrderLines, setActiveTab });
                  setIsValidation(true);
                }}
              >
                <span className="number-number-2 mr-2" /> Review
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent>
            <Container className="px-5 pt-4 pb-5">
              {/* Tabs */}
              {activeTab == 'message' ? (
                <MessageTab
                  module={'Purchase Order'}
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
                  orderDetails={orderDetails}
                  orderLines={orderLines}
                  setOrderLines={setOrderLines}
                  setOrderDetails={setOrderDetails}
                  isValidation={isValidation}
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
                        validation({ orderDetails, orderLines, setOrderLines, setActiveTab });
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
                          orderLinesData: orderLines,
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
