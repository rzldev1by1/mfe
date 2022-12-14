import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Container } from 'react-bootstrap';
import { TabContent, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import loading from '../../../assets/icons/loading/LOADING-MLS.gif';
import { getPOResources, getDisposition } from '../../../apiService/dropdown';
import { validation, submit, cleanOrderDetails } from './services';
import PopUpCreateSucces from '../../../Component/Modal/PopUpCreateSucces';
import PopUpLoss from '../../../Component/Modal/PopUpLoss';
import Form from './Form';
import './style.scss';

const Create = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const darkMode = useSelector((state) => state.darkModeMLS);

  const [activeTab, setActiveTab] = useState('details');
  const [isReset, setIsReset] = useState(0);
  const [isValidation, setIsValidation] = useState(false);
  const [isSubmitStatus, setIsSubmitStatus] = useState(null);
  const [isSubmitReturn, setIsSubmitReturn] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [orderLines, setOrderLines] = useState([]);
  const [modal, setModal] = useState(true);

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
    getPOResources({ user, dispatch });
    getDisposition({ dispatch });
  }, []);

  const submitButton =
    isSubmitStatus === 'loading' ? (
      <div className="m-iconLoad">
        <img src={loading} width="45" height="45" alt="" />
      </div>
    ) : (
      'SUBMIT'
    );

  return (
    <div>
      <Modal
        show={show}
        size="xl"
        className={`purchase-order-create ${activeTab === 'message' ? ' d-none' : ' '} 
        ${darkMode ? 'customDarkMode' : ''}`}
      >
        <Modal.Body className={`${darkMode ? 'customDarkModes' : 'bg-primary'} p-0 rounded-top rounded-bottom`}>
          <Row className="mx-0 px-9">
            <Col xs={10} className="px-0">
              <i className="iconU-createModal font-20" />
              <span className="font-20 pl-2">Create Purchase Order</span>
              <br />
              <span className="ml-7">Enter Order and line details to create a new purchase order</span>
            </Col>
            <Col className="text-right px-0">
              <i
                className="iconU-close pointer"
                onClick={() => {
                  setShow(false);
                  setIsReset(0);
                }}
                aria-hidden="true"
              />
            </Col>
          </Row>
          <Nav tabs className="px-8 m-0">
            <NavItem className="mr-1">
              <NavLink
                style={{ paddingBottom: '7px', maxWidth: '297px', paddingRight: '18px' }}
                className={`d-flex pl-3 height-nav align-items-center ${activeTab === 'details' ? 'active' : null}`}
                onClick={() => setActiveTab('details')}
              >
                <span className="newIcon-create_edit" />
                <div className="pl-2">Order & Product Details</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`d-flex height-nav align-items-center pl-3 ${activeTab === 'review' ? 'active' : null}`}
                style={{ paddingBottom: '7px', maxWidth: '146px', paddingRight: '20px' }}
                onClick={() => {
                  validation({ orderDetails, orderLines, setOrderLines, setActiveTab });
                  setIsValidation(true);
                }}
              >
                <span className="newIcon-review" />
                <div className="pl-2">Review</div>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent>
            <Container className="px-9 pt-4 pb-9">
              {/* Tabs */}
              {activeTab === 'message' ? (
                ''
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
              {activeTab === 'details' && (
                <Row className="mt-3 pt-3">
                  <Col lg={2} />
                  <Col lg={8} />
                  <Col lg={2} className="text-right">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        validation({ orderDetails, orderLines, setOrderLines, setActiveTab });
                        setIsValidation(true);
                      }}
                      type="button"
                    >
                      NEXT
                    </button>
                  </Col>
                </Row>
              )}
              {activeTab === 'review' ? (
                <Row className="mt-3 pt-3">
                  <Col lg={2}>
                    <button className="btn btn-primary" onClick={() => setActiveTab('details')} type="button">
                      BACK
                    </button>
                  </Col>
                  <Col lg={8}>
                    {isSubmitStatus === 'success' && (
                      <div className="text-center text-secondary mt-2">
                        {' '}
                        <span className="text-success">Success, </span>
                        order has been successfully submitted for processing
                        {' '}
                      </div>
                    )}
                  </Col>
                  <Col lg={2} className="text-right">
                    <button
                      className="btn btn-primary"
                      type="button"
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
                      {submitButton}
                    </button>
                  </Col>
                </Row>
              ) : null}
            </Container>
          </TabContent>
        </Modal.Body>
      </Modal>
      {activeTab === 'message' &&
        (isSubmitReturn?.message === 'Successfully added' ||
        isSubmitReturn?.message === 'create successfully' ||
        isSubmitReturn?.status === 'ok' ? (
          <PopUpCreateSucces
            modal={modal}
            setModal={setModal}
            module="Purchase Order"
            submitReturn={isSubmitReturn}
            exit={() => {
              setShow(false);
              setIsReset(0);
            }}
          />
        ) : (
          <PopUpLoss modal={modal} setModal={setModal} back={() => setActiveTab('detail')} />
        ))}
    </div>
  );
};

export default Create;
