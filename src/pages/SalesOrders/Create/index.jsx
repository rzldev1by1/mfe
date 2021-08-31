import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Container } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Form from './Form';
import { resetCreate, validation, submit, cleanOrderDetails, cleanCustomerDetails } from './services.js';
import { getSOResources, getDisposition } from 'apiService/dropdown';
import loading from 'assets/icons/loading/LOADING-MLS.gif';
import PopUpCreateSucces from 'Component/Modal/PopUpCreateSucces'
import PopUpLoss from 'Component/Modal/PopUpLoss'
import './style.scss';

const Create = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.so_resources);
  const disposition = useSelector((state) => state.so_disposition);
  const user = useSelector((state) => state.user);
  const orderDetailsTmp = useSelector((state) => state.orderDetails);
  const customerDetailsTmp = useSelector((state) => state.customerDetails);
  const orderLinesTmp = useSelector((state) => state.orderLines);
  const orderLinesDataTmp = useSelector((state) => state.orderLinesData);
  const darkMode = useSelector((state) => state.darkModeMLS);


  const [activeTab, setActiveTab] = useState('details');
  const [isReset, setIsReset] = useState(0);
  const [isValidation, setIsValidation] = useState(false);
  const [isSubmitStatus, setIsSubmitStatus] = useState(null);
  const [isSubmitReturn, setIsSubmitReturn] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  const [orderLines, setOrderLines] = useState([]);
  const [modal, setModal] = useState(true);

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
      <Modal show={show} size="xl" className={`purchase-order-create ${activeTab == 'message' ? ' d-none' : ' '} 
        ${darkMode ? 'customDarkMode' : ''}`}>
        <Modal.Body className={`${darkMode ? 'customDarkModes' : 'bg-primary'} p-0 rounded-top rounded-bottom`}>
          <Row className="mx-0 px-9">
            <Col xs={10} className="px-0">
              <i className="icon-icon_awesome_edit font-20"></i>
              <span className="font-20 pl-2">Create Purchase Order</span> <br />
              <span className="ml-7">Enter Order and line details to create a new purchase order</span>
            </Col>
            <Col className="text-right px-0">
              <span
                className="icon-group_4696 pointer"
                onClick={() => {
                  setShow(false);
                  setIsReset(0);
                }}
              />
            </Col>
          </Row>
          <Nav tabs className="px-8 m-0">
            <NavItem className="mr-1">
              <div
                style={{ paddingBottom: '7px', maxWidth: '297px', paddingRight: '18px' }}
                className={`d-flex pl-3 height-nav align-items-center ${activeTab === 'details' ? ' bg-tabActive ' : ' bg-nonTabActive'}`}
                onClick={() => setActiveTab('details')}
              >
                <span className="newIcon-create_edit" />
                <div className="pl-2">Order & Product Details</div>
              </div>
            </NavItem>
            <NavItem>
              <div
                className={`d-flex height-nav align-items-center pl-3 ${activeTab === 'review' ? ' bg-tabActive ' : ' bg-nonTabActive'}`}
                style={{ paddingBottom: '7px', maxWidth: '146px', paddingRight: '20px' }}
                onClick={() => {
                  validation({ orderDetails, orderLines, setOrderLines, setActiveTab });
                  setIsValidation(true);
                }}
              >
                <span className="newIcon-review" />
                <div className="pl-2">Review</div>
              </div>
            </NavItem>
          </Nav>
          <TabContent>
            <Container className="px-9 pt-4 pb-9">
              {/* Tabs */}
              {activeTab == 'message' ? '' : (
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
      {activeTab == 'message' ?
        isSubmitReturn?.message === 'Successfully added' ||
          isSubmitReturn?.message === 'create successfully' ||
          isSubmitReturn?.status == 'ok' ? (
          <PopUpCreateSucces
            modal={modal}
            setModal={setModal}
            module={'Sales Order'}
            submitReturn={isSubmitReturn}
            exit={() => {
              setShow(false);
              setIsReset(0);
            }}
          />
        ) : (
          <PopUpLoss
            modal={modal}
            setModal={setModal}
            back={() => setActiveTab('detail')
            }
          />
        )
        : ''}
    </div>
  );
};

export default Create;
