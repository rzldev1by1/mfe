import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Container } from 'react-bootstrap';
import { TabContent, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { getSOResources, getDisposition } from '../../../apiService/dropdown';
import loading from '../../../assets/icons/loading/LOADING-MLS.gif';
import PopUpCreateSucces from '../../../Component/Modal/PopUpCreateSucces'
import PopUpLoss from '../../../Component/Modal/PopUpLoss'
import { resetCreate, validation, submit, cleanOrderDetails, cleanCustomerDetails } from './services';
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



  const ButtonDetail = () => {
    return (
      <Row className="mt-3 pt-3">
        <Col lg={2} />
        <Col lg={8} />
        <Col lg={2} className="text-right">
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              validation({ orderDetails, orderLines, setOrderLines, customerDetails, setActiveTab });
              setIsValidation(true);
            }}
          >
            NEXT
          </button>
        </Col>
      </Row>
    )
  }

  const ButtonReview = () => {
    return (
      <Row className="mt-3 pt-3">
        <Col lg={2}>
          <button type='button' className="btn btn-primary" onClick={() => setActiveTab('details')}>
            BACK
          </button>
        </Col>
        <Col lg={8}>
          {isSubmitStatus === 'success' ? (
            <div className="text-center text-secondary mt-2">
              {' '}
              <span className="text-success">Success,</span>
              order has been successfully submitted for
              processing
            </div>
          ) : null}
        </Col>
        <Col lg={2} className="text-right">
          <button
            type='button'
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
                <img src={loading} width="45" height="45" alt="" />
              </div>
            ) : (
              'SUBMIT'
            )}
          </button>
        </Col>
      </Row>
    )
  }

  return (
    <div>
      <Modal show={show} size="xl" className={`sales-order-create  ${activeTab === 'message' ? ' d-none' : ' '}`}>
        <Modal.Body className={`${darkMode ? 'customDarkModes' : 'bg-primary'} p-0 rounded-top rounded-bottom`}>
          <Row className="px-9 mx-0">
            <Col xs={10} className="px-0 ">
              <i className="iconU-createModal font-20" />
              <span className="font-20 pl-2">Create Sales Order</span>
              <br />
              <span className="ml-7">Enter Order and line details to create a new sales order</span>
            </Col>
            <Col className="text-right px-0">
              <i
                aria-hidden="true"
                className="iconU-close pointer"
                onKeyDown={() => { setShow(false); setTimeout(() => setIsReset(0), 500); }}
                onClick={() => { setShow(false); setTimeout(() => setIsReset(0), 500); }}
              />
            </Col>
          </Row>
          <Nav tabs className="px-8 m-0">
            <NavItem className="mr-1">
              <NavLink
                style={{ paddingBottom: '7px', maxWidth: '297px', paddingRight: '21x' }}
                className={`d-flex height-nav align-items-center pl-3 ${activeTab === 'details' ? 'active' : null}`}
                onClick={() => setActiveTab('details')}
              >
                <span className="newIcon-create_edit" />
                <div className="pl-2">Order & Product Details</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ paddingBottom: '7px', maxWidth: '146px', paddingRight: '20px' }}
                className={`d-flex height-nav align-items-center pl-3 ${activeTab === 'review' ? 'active' : null}`}
                onClick={() => {
                  validation({ orderDetails, orderLines, setOrderLines, customerDetails, setActiveTab });
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
              {activeTab === 'message' ? '' : (
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
              {activeTab === 'details' ? ButtonDetail() : null}
              {activeTab === 'review' ? ButtonReview() : null}
            </Container>
          </TabContent>
        </Modal.Body>
      </Modal>
      {activeTab === 'message' && (
        isSubmitReturn?.message === 'Successfully added' || 
        isSubmitReturn?.message === 'create successfully' ||
        isSubmitReturn?.status === 'ok' ? (
          <PopUpCreateSucces
            modal={modal}
            setModal={setModal}
            module='Sales Order'
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
            back={() => setActiveTab('detail')}
          />
          ))}
    </div>
  );
};

export default Create;
