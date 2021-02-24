import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'Component/Dropdown';
import DatePicker from 'shared/DatePicker';
import Input from 'Component/Input';
import Textarea from 'Component/Textarea';
import FormLine from './FormLine';
import RequiredMessage from 'Component/RequiredMessage';

import {
  changeOrderDetails,
  addOrderLines,
  changeOrderNo,
  formatDate,
  changeCustomerDetails,
  getCustomerDetail,
  changeClient,
  validationOrderLines,
} from './services';
import { getCustomer } from 'apiService/dropdown';

import './style.scss';

const Form = ({
  activeTab,
  isValidation,
  setIsValidation,
  orderDetails,
  setOrderDetails,
  customerDetails,
  setCustomerDetails,
  orderLines,
  setOrderLines,
}) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.so_resources);
  const createSO = useSelector((state) => state.createSO);
  const clientData = useSelector((state) => state.clientData);
  const siteData = useSelector((state) => state.siteData);
  const user = useSelector((state) => state.user);

  const [orderDate, setOrderDate] = useState({});
  const [line, setLine] = useState([]);
  const [clientOption, setClientOption] = useState(null);
  const [siteOption, setSiteOption] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [isReadonly, setIsReadOnly] = useState(false);
  const [orderLineSelectOpen, setOrderLineSelectOpen] = useState(false);
  const [dropdownExpandStyle, setDropdownExpandStyle] = useState(null);
  const [checkingOrderNo, setCheckingOrderNo] = useState(null);
  const { client, site } = user;

  useEffect(() => {
    addOrderLines({ orderLines, setOrderLines });
  }, []);

  useEffect(() => {
    // set client dropdown option
    let clientOption = [];
    let tmp = clientData?.map((item, key) => {
      if (item.value !== 'all') {
        clientOption.push(item);
      }

      if (client === item.value) {
        let val = {
          value: item.value,
          label: `${item.label}`,
        };
        changeOrderDetails({ column: 'client', value: val, dispatch });
        return 0;
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
      if (site === item.value) {
        let val = {
          value: item.value,
          label: `${item.label}`,
        };
        changeOrderDetails({ column: 'site', value: val, dispatch });
        return 0;
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

  useEffect(() => {
    getCustomer({ client, setCustomerData });
  }, []);

  useEffect(() => {
    if (orderLineSelectOpen == 'datePicker') {
      setDropdownExpandStyle('lineDetailsTopExpand');
    } else if (orderLineSelectOpen == 'dropdown') {
      setDropdownExpandStyle('lineDetailsBottomExpand');
    } else {
      setDropdownExpandStyle(null);
    }
  }, [orderLineSelectOpen]);

  return (
    <div>
      <h3 className="text-primary font-20">Order Details</h3>

      {/* Start Order Details */}
      <Row>
        <Col lg="3">
          <Dropdown
            name="site"
            options={siteOption}
            title={'Site'}
            selectedValue={orderDetails?.site}
            onChangeDropdown={(selected) => {
              changeOrderDetails({ column: 'site', value: selected, orderDetails, setOrderDetails });
            }}
            required
            readOnly={isReadonly || site}
            messageRequired
            messageParam={{ messageShow: isValidation, value: orderDetails?.site }}
            parentDivClassName={isValidation && !orderDetails?.site ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3">
          <Dropdown
            name="orderType"
            title="Order Type"
            options={resources?.orderType}
            selectedValue={orderDetails?.orderType}
            onChangeDropdown={(selected) =>
              changeOrderDetails({ column: 'orderType', value: selected, orderDetails, setOrderDetails })
            }
            required
            readOnly={isReadonly}
            messageRequired={true}
            messageParam={{
              messageShow: isValidation,
              value: orderDetails?.orderType,
            }}
            parentDivClassName={isValidation && !orderDetails?.orderType?.value ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3">
          <Input
            name="customerOrderRef"
            title={'Customer Order Ref'}
            onChange={(e) =>
              changeOrderDetails({ column: 'customerOrderRef', value: e.target.value, orderDetails, setOrderDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Delivery Date</label>
          <DatePicker
            getDate={(date) => {
              changeOrderDetails({ column: 'deliveryDate', value: date, orderDetails, setOrderDetails });
            }}
            readOnly={isReadonly}
            style={isReadonly ? { display: 'none' } : null}
            className={'form-control ' + (isValidation && !orderDetails?.deliveryDate ? 'input-danger' : '')}
            selectedDates={orderDetails?.deliveryDate || ''}
          />
          <Input
            name="deliveryDate"
            placeholder={'Order Date'}
            value={formatDate(orderDetails?.deliveryDate)}
            readOnly
            style={!isReadonly ? { display: 'none' } : null}
            messageRequired={true}
            messageParam={{
              messageShow: isValidation,
              value: orderDetails?.deliveryDate,
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Dropdown
            name="client"
            title="Client"
            options={clientOption}
            required
            selectedValue={orderDetails?.client}
            onChangeDropdown={(selected) => {
              changeClient({
                value: selected,
                orderDetails,
                setOrderDetails,
                setCustomerData,
                customerDetails,
                setCustomerDetails,
              });
              setCustomerData([]);
              if (selected) {
                getCustomer({ client: selected.value, setCustomerData });
              }
            }}
            readOnly={isReadonly || client}
            messageRequired={true}
            messageParam={{
              messageShow: isValidation,
              value: orderDetails?.client,
            }}
            parentDivClassName={isValidation && !orderDetails?.client ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            id="orderNo"
            name="orderNo"
            title="Order No"
            maxLength={12}
            onChange={(e) => {
              let val = e.target.value.toUpperCase();
              if (val !== orderDetails?.client) {
                changeOrderNo({
                  orderNo: e.target.value.toUpperCase(),
                  client: orderDetails?.client,
                  setCheckingOrderNo,
                  setOrderDetails,
                  orderDetails,
                });
              }
            }}
            className={
              (isValidation && !orderDetails?.orderNo) || checkingOrderNo?.status === false ? 'input-danger' : ''
            }
            onKeyUp={(e) => {
              let orderNo = e.target.value;
              e.target.value = orderNo.toUpperCase();
            }}
            alphaNumeric
            required
            readOnly={isReadonly}
            messageRequired={true}
            messageParam={{
              messageShow: isValidation || checkingOrderNo?.status === false,
              value: orderDetails?.orderNo,
              customMessage: checkingOrderNo,
            }}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="vendorOrderRef"
            title={'Vendor Order Ref'}
            showTitle
            onChange={(e) =>
              changeOrderDetails({ column: 'vendorOrderRef', value: e.target.value, orderDetails, setOrderDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Textarea
            name="deliveryInstructions"
            onChange={(e) =>
              changeOrderDetails({
                column: 'deliveryInstructions',
                value: e.target.value,
                orderDetails,
                setOrderDetails,
              })
            }
            className="form-control"
            title={'Delivery Instructions'}
            readOnly={isReadonly}
            maxLength={240}
          />
        </Col>
      </Row>
      {/* End Order Details */}

      {/* Start Customer Details */}
      <h3 className="text-primary font-20 mt-45">Customer Details</h3>
      <Row>
        <Col lg="3">
          <Dropdown
            name="customer"
            options={customerData}
            title={'Customer'}
            selectedValue={customerDetails?.customer}
            onChangeDropdown={(selected) => {
              changeCustomerDetails({ column: 'customer', value: selected, customerDetails, setCustomerDetails });
              getCustomerDetail({ client: orderDetails?.client, customer: selected, setCustomerDetails });
            }}
            showTitle
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Input
            name="address1"
            title={'Address 1'}
            value={customerDetails?.address1}
            showTitle
            onChange={(e) =>
              changeCustomerDetails({ column: 'address1', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
            required
            messageRequired={true}
            messageParam={{
              messageShow: isValidation,
              value: customerDetails?.address1,
            }}
            className={isValidation && !customerDetails?.address1 ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="address2"
            value={customerDetails?.address2}
            title="Address 2"
            onChange={(e) =>
              changeCustomerDetails({ column: 'address2', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="address3"
            value={customerDetails?.address3}
            title="Address 2"
            showTitle
            onChange={(e) =>
              changeCustomerDetails({ column: 'address3', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Input
            name="address4"
            value={customerDetails?.address4}
            title="Address 4"
            onChange={(e) =>
              changeCustomerDetails({ column: 'address4', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="address5"
            value={customerDetails?.address5}
            title="Address 5"
            onChange={(e) =>
              changeCustomerDetails({ column: 'address5', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Input
            name="suburb"
            value={customerDetails?.suburb}
            title="Suburb"
            onChange={(e) =>
              changeCustomerDetails({ column: 'suburb', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="postcode"
            value={customerDetails?.postcode}
            title="Postcode"
            onChange={(e) =>
              changeCustomerDetails({ column: 'postcode', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
            required
            messageRequired={true}
            messageRequired={true}
            messageParam={{
              messageShow: isValidation,
              value: customerDetails?.postcode,
            }}
            className={isValidation && !customerDetails?.postcode ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="state"
            title="State"
            value={customerDetails?.state}
            onChange={(e) =>
              changeCustomerDetails({ column: 'state', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
            required
            messageRequired={true}
            messageRequired={true}
            messageParam={{
              messageShow: isValidation,
              value: customerDetails?.state,
            }}
            className={isValidation && !customerDetails?.state ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="country"
            value={customerDetails?.country}
            title="Country"
            onChange={(e) =>
              changeCustomerDetails({ column: 'country', value: e.target.value, customerDetails, setCustomerDetails })
            }
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>

      {/* End Customer Details */}

      {/* Start Line Details */}
      <h3 className="text-primary font-20 mt-45">Line Details</h3>
      <div className={`orderline mb-2 pb-2 scroll-x-y  ${dropdownExpandStyle}`}>
        {/* End Line Details */}
        <table>
          <thead>
            <tr className="text-muted">
              <td>
                <div className="c-50 text-center">#</div>
              </td>
              <td>
                {' '}
                <div className="c-400 required px-1">Product</div>{' '}
              </td>
              <td>
                {' '}
                <div className="c-600 px-1">Description</div>{' '}
              </td>
              <td>
                <div className="c-100 required px-1">Qty</div>
              </td>
              <td>
                <div className="c-170 px-1">Weight</div>
              </td>
              <td>
                <div className="c-150 required px-1">UOM</div>
              </td>
              <td>
                <div className="c-250 px-1">Batch</div>
              </td>
              <td>
                <div className="c-100 px-1">Ref3</div>
              </td>
              <td>
                <div className="c-100 px-1">Ref4</div>
              </td>
              <td>
                <div className="c-150 px-1">Disposition</div>
              </td>
              <td>
                <div className="c-150">Pack ID</div>
              </td>
              <td>
                <div className="c-150">RotaDate</div>
              </td>
              <td>
                <div className="c-50" />
              </td>
            </tr>
          </thead>
          <tbody>
            {orderLines?.map((item, i) => {
              return (
                <FormLine
                  isValidation={isValidation}
                  index={i}
                  data={item}
                  orderDetails={orderDetails}
                  isReadonly={isReadonly}
                  setOrderLineSelectOpen={setOrderLineSelectOpen}
                  orderLines={orderLines}
                  setOrderLines={setOrderLines}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <button
          style={isReadonly ? { display: 'none' } : null}
          type="button"
          className="btn btn-light-blue m-0"
          onClick={async () => {
            //validate first
            setIsValidation(true);
            let validate = await validationOrderLines({ orderLines });
            if (validate) {
              addOrderLines({ orderLines, setOrderLines });
            }
          }}
        >
          ADD LINE
        </button>
        <RequiredMessage
          column="OrderLines"
          columnText="Order Lines"
          isValidation={isValidation}
          data={orderLines.length}
        />
      </div>
    </div>
  );
};

export default Form;
