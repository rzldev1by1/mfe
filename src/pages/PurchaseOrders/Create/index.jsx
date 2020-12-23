import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Container } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import InsertForm from './insertForm';
import { getResources } from './services.js';
import './style.scss';

const Create = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.po_resources);
  const user = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState('details');

  if (!resources) {
    getResources({ user, dispatch });
  }

  useEffect(() => {
    console.log(resources);
  }, [resources]);

  return (
    <div>
      <Modal show={show} size="xl" className="purchase-order-create">
        <Modal.Body className="bg-primary p-0">
          <Row className="pl-5 pr-3 pb-3 pt-3 mx-0">
            <Col xs={10} className="px-0">
              <i className="iconU-createModal font-20"></i>
              <span className="font-20 pl-2">Create Purchase Order</span> <br />
              <span className="ml-7">Enter Order and line details to create a new purchase order</span>
            </Col>
            <Col xs={2} className="text-right px-0">
              <i className="iconU-close pointer" onClick={() => setShow(false)}></i>
            </Col>
          </Row>
          <Nav tabs className="px-7 m-0">
            <NavItem className="mr-2">
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
                onClick={() => setActiveTab('review')}
              >
                <span className="number-number-2" /> Review
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent>
            <Container className="px-5 pt-4 pb-5">
              <InsertForm activeTab />
            </Container>
          </TabContent>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Create;
