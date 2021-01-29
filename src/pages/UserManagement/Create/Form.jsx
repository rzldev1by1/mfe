import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'Component/Dropdown';
import DatePicker from 'shared/DatePicker';
import Input from 'Component/Input';
import RequiredMessage from './RequiredMessage';

import { changeOrderDetails, addOrderLines, createData, changeOrderNo, formatDate } from './services';
import { getSupplier } from 'apiService/dropdown';
import { validate } from 'email-validator';

import './style.scss';

const Form = ({ activeTab, isValidation, createDetails, setCreateDetails }) => {
  const dispatch = useDispatch();
  const clientData = useSelector((state) => state.clientData);
  const siteData = useSelector((state) => state.siteData);
  const [isReadonly, setIsReadOnly] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [clientOption, setClientOption] = useState(null);
  const [siteOption, setSiteOption] = useState(null);
  const { userId, email, userName, module, site, client } = createDetails;
  useEffect(() => {
    // set client dropdown option
    let clientOption = [];
    let tmp = clientData?.map((item, key) => {
      if (item.value !== 'all') {
        clientOption.push(item);
      }
    });
    setClientOption(clientOption);
  }, [clientData]);

  useEffect(() => {
    // set site dropdown option
    let siteOption = [];
    let tmp = siteData?.map((item, key) => {
      if (item.value !== 'all') {
        siteOption.push(item);
      }
    });
    setSiteOption(siteOption);
  }, [siteData]);

  useEffect(() => {
    if (activeTab == 'review') {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, [activeTab]);

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
              <label className="webgroup d-flex justify-content-between">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setIsAdmin(!isAdmin);
                  }}
                />
                <span className={`flex-fill ${isAdmin ? ' webgroup-notactive' : ' webgroup-active'}`}>
                  REGULAR USER
                </span>
                <span className={`flex-fill ${isAdmin ? ' webgroup-active' : ' webgroup-notactive'}`}>ADMIN USER</span>
              </label>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col lg="4">
          <Input
            name="userId"
            title={'User ID'}
            showTitle
            onChange={(e) => {
              let data = { ...createDetails, userId: e };
              setCreateDetails(data);
            }}
            readOnly={true}
            maxLength={30}
          />
          <span className="text-title font-sm">Auto Generated</span>
        </Col>
        <Col lg="4">
          <Input
            name="email"
            title={'Email'}
            showTitle
            onChange={(e) => {
              let data = { ...createDetails, email: e };
              setCreateDetails(data);
            }}
          />
        </Col>
        <Col lg="4">
          <Input
            name="name"
            title={'Name'}
            showTitle
            onChange={(e) => {
              let data = { ...createDetails, name: e };
              setCreateDetails(data);
            }}
          />
        </Col>
      </Row>
      {/* End Order Details */}
    </div>
  );
};

export default Form;
