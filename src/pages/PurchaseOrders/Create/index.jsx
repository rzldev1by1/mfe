import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Container } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Form from './Form';
import { resetCreate, validation, submit, cleanOrderDetails, cleanOrderLines } from './services.js';
import { getPOResources, getDisposition } from 'apiService/dropdown';
import loading from 'assets/icons/loading/LOADING-MLS.gif';
import PopUpCreateSucces from 'Component/Modal/PopUpCreateSucces'
import PopUpLoss from 'Component/Modal/PopUpLoss'
import './style.scss';

const Create = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.po_resources);
  const disposition = useSelector((state) => state.po_disposition);
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
  const dataMode = darkMode?.map(d => { return d.dark_mode })
  return (
    <div>
      <Modal show={show} size="xl" className={`purchase-order-create ${activeTab == 'message' ? ' d-none' : ' '} ${dataMode == "1" ? 'customDarkMode' : ''}`}>
        <Modal.Header className={`${dataMode == "1" ? 'customDarkModes' : 'bg-primary'}  modal-radiusH p-0`}>
          <Container className="px-0">
            <Row className="mx-0 px-0" style={{ height: "140px" }}>
              <Col xs={6} sm={6} md={6} lg={6} xl={6} className="pl-4 align-items-center d-flex">
                <div className="flex-column d-flex">
                  <div className="d-flex" style={{ marginTop: "4%", marginBottom: "3%" }}>
                    <div xs={7} sm={7} md={7} lg={7} xl={7} className="pr-2 align-items-center d-flex">
                      <i className="ri-draft-line ri-2x pr-1" />
                      <span className="font-20" style={{ fontWeight: "600", color: "#FFF" }}>Purchase Order</span>&nbsp;
                    </div>
                    <div class="v-rename"></div>
                    <div xs={5} sm={5} md={5} lg={5} xl={5} className="pl-2 pt-1">
                      <span className="font-20 text-white">Create Order</span>
                      <span className="text-white d-flex"> Enter Order and line details to create a new purchase order.</span>
                    </div>
                  </div>
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
                </div>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6} className={`justify-content-end d-flex ${dataMode == "1" ? 'rename-img-drak' : 'rename-img'}`}>
                <Row>
                  <Col onClick={() => { setShow(false); setIsReset(0); }} className={`justify-content-end d-flex`} style={{ cursor: "pointer" }}>
                    <i className="ri-close-line ri-3x" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body className={`${dataMode == "1" ? 'customDarkModes' : 'bg-primary'} p-0 rounded-top modal-radiusB`}>
          <TabContent>
            <Container className="px-9 pt-4 pb-9">
              {/* Tabs */}
              {activeTab == 'message' ? '' : (
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
      {activeTab == 'message' ?
        isSubmitReturn?.message === 'Successfully added' ||
          isSubmitReturn?.message === 'create successfully' ||
          isSubmitReturn?.status == 'ok' ? (
          <PopUpCreateSucces
            modal={modal}
            setModal={setModal}
            module={'Purchase Order'}
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
