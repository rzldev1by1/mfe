import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'Component/Dropdown';
import DatePicker from 'shared/DatePicker';
import Input from 'Component/Input';
import Textarea from 'Component/Textarea';
import FormLine from './FormLine';
import RequiredMessage from 'Component/RequiredMessage';

import { changeOrderDetails, addOrderLines, changeOrderNo, formatDate, changeCustomerDetails } from './services';
import { getCustomer } from 'apiService/dropdown';
import { getCustomerDetail } from 'apiService';
import { validate } from 'email-validator';

import './style.scss';

const Form = ({ activeTab, isValidation }) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.so_resources);
  const createSO = useSelector((state) => state.createSO);
  const clientData = useSelector((state) => state.clientData);
  const orderDetails = useSelector((state) => state.orderDetails);
  const customerDetails = useSelector((state) => state.customerDetails);
  const orderLines = useSelector((state) => state.orderLines);
  const orderLinesData = useSelector((state) => state.orderLinesData);
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
    let tmp = resources?.site?.map((item, key) => {
      if (site === item.value) {
        let val = {
          value: item.value,
          label: `${item.label}`,
        };
        changeOrderDetails({ column: 'site', value: val, dispatch });
        return 0;
      }
    });
  }, [resources]);

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
            placeholder={orderDetails?.site?.text}
            options={resources?.site}
            title={orderDetails?.site?.text}
            selectedValue={orderDetails?.site?.value}
            onChangeDropdown={(selected) => changeOrderDetails({ column: 'site', value: selected, dispatch })}
            showTitle
            required
            readOnly={isReadonly || site}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: orderDetails?.site }}
          />
        </Col>
        <Col lg="3">
          <Dropdown
            name="orderType"
            placeholder={orderDetails?.orderType?.text}
            options={resources?.orderType}
            showTitle
            title={orderDetails?.orderType?.text}
            selectedValue={orderDetails?.orderType?.value}
            onChangeDropdown={(selected) => changeOrderDetails({ column: 'orderType', value: selected, dispatch })}
            required
            readOnly={isReadonly}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: orderDetails?.orderType }}
          />
        </Col>
        <Col lg="3">
          <Input
            name="customerOrderRef"
            title={orderDetails?.customerOrderRef?.text}
            showTitle
            placeholder={orderDetails?.customerOrderRef?.text}
            onChange={(e) => changeOrderDetails({ column: 'customerOrderRef', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Delivery Date</label>
          <DatePicker
            className="form-control"
            getDate={(date) => {
              changeOrderDetails({ column: 'deliveryDate', value: date, dispatch });
            }}
            readOnly={isReadonly}
            style={isReadonly ? { display: 'none' } : null}
          />
          <Input
            name="deliveryDate"
            placeholder="Order Date"
            value={formatDate(orderDetails?.deliveryDate?.value)}
            readOnly
            maxLength={30}
            style={!isReadonly ? { display: 'none' } : null}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: orderDetails?.deliveryDate }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Dropdown
            placeholder={orderDetails?.client?.text}
            options={clientOption}
            showTitle
            title={orderDetails?.client?.text}
            required
            selectedValue={orderDetails?.client?.value}
            onChangeDropdown={async (selected) => {
              await changeOrderDetails({ column: 'client', value: selected, dispatch });
              getCustomer({ client: orderDetails?.client, setCustomerData });
            }}
            readOnly={isReadonly || client}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: orderDetails?.client }}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="orderNo"
            title={orderDetails?.orderNo?.text}
            showTitle
            placeholder={orderDetails?.orderNo?.text}
            maxLength={12}
            onChange={(e) =>
              changeOrderNo({
                orderNo: e.target.value.toUpperCase(),
                client: orderDetails?.client?.value,
                setCheckingOrderNo,
                dispatch,
              })
            }
            onKeyUp={(e) => {
              let orderNo = e.target.value;
              e.target.value = orderNo.toUpperCase();
            }}
            messageRequired={true}
            messageParam={{
              messageShow: isValidation || checkingOrderNo?.status === false,
              messageData: orderDetails?.orderNo,
              customMessage: checkingOrderNo,
            }}
            alphaNumeric
            required
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="vendorOrderRef"
            title={orderDetails?.vendorOrderRef?.text}
            showTitle
            placeholder={orderDetails?.vendorOrderRef?.text}
            onChange={(e) => changeOrderDetails({ column: 'vendorOrderRef', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Textarea
            name="deliveryInstructions"
            onChange={(e) => changeOrderDetails({ column: 'deliveryInstructions', value: e.target.value, dispatch })}
            className="form-control"
            title={orderDetails?.deliveryInstructions?.text}
            placeholder={orderDetails?.deliveryInstructions?.text}
            readOnly={isReadonly}
            showTitle
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
            placeholder={customerDetails?.customer?.text}
            options={customerData}
            title={customerDetails?.customer?.text}
            selectedValue={customerDetails?.customer?.value}
            onChangeDropdown={(selected) => {
              changeCustomerDetails({ column: 'customer', value: selected, dispatch });
              getCustomerDetail({ client: orderDetails?.client, customer: selected, customerDetails, dispatch });
            }}
            showTitle
            required
            readOnly={isReadonly}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: customerDetails?.customer }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Input
            name="address1"
            value={customerDetails?.address1?.value}
            title={customerDetails?.address1?.text}
            showTitle
            placeholder={customerDetails?.address1?.text}
            onChange={(e) => changeCustomerDetails({ column: 'address1', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
            required
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: customerDetails?.address1 }}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="address2"
            value={customerDetails?.address2?.value}
            title={customerDetails?.address2?.text}
            showTitle
            placeholder={customerDetails?.address2?.text}
            onChange={(e) => changeCustomerDetails({ column: 'address2', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="address3"
            value={customerDetails?.address3?.value}
            title={customerDetails?.address3?.text}
            showTitle
            placeholder={customerDetails?.address2?.text}
            onChange={(e) => changeCustomerDetails({ column: 'address3', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Input
            name="address4"
            value={customerDetails?.address4?.value}
            title={customerDetails?.address4?.text}
            showTitle
            placeholder={customerDetails?.address4?.text}
            onChange={(e) => changeCustomerDetails({ column: 'address4', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="address5"
            value={customerDetails?.address5?.value}
            title={customerDetails?.address5?.text}
            showTitle
            placeholder={customerDetails?.address5?.text}
            onChange={(e) => changeCustomerDetails({ column: 'address5', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Input
            name="suburb"
            value={customerDetails?.suburb?.value}
            title={customerDetails?.suburb?.text}
            showTitle
            placeholder={customerDetails?.suburb?.text}
            onChange={(e) => changeCustomerDetails({ column: 'suburb', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="postcode"
            value={customerDetails?.postcode?.value}
            title={customerDetails?.postcode?.text}
            showTitle
            placeholder={customerDetails?.postcode?.text}
            onChange={(e) => changeCustomerDetails({ column: 'postcode', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
            required
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: customerDetails?.postcode }}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="state"
            title={customerDetails?.state?.text}
            value={customerDetails?.state?.value}
            showTitle
            placeholder={customerDetails?.state?.text}
            onChange={(e) => changeCustomerDetails({ column: 'state', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
            required
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: customerDetails?.state }}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="country"
            title={customerDetails?.country?.text}
            value={customerDetails?.country?.value}
            showTitle
            placeholder={customerDetails?.country?.text}
            onChange={(e) => changeCustomerDetails({ column: 'country', value: e.target.value, dispatch })}
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
                <div className="c-400 required px-1">{orderLines?.product?.text}</div>{' '}
              </td>
              <td>
                {' '}
                <div className="c-600 px-1">{orderLines?.description?.text}</div>{' '}
              </td>
              <td>
                <div className="c-100 required px-1">{orderLines?.qty?.text}</div>
              </td>
              <td>
                <div className="c-170 px-1">{orderLines?.weight?.text}</div>
              </td>
              <td>
                <div className="c-150 required px-1">{orderLines?.uom?.text}</div>
              </td>
              <td>
                <div className="c-250 px-1">{orderLines?.batch?.text}</div>
              </td>
              <td>
                <div className="c-100 px-1">{orderLines?.ref3?.text}</div>
              </td>
              <td>
                <div className="c-100 px-1">{orderLines?.ref4?.text}</div>
              </td>
              <td>
                <div className="c-150 px-1">{orderLines?.disposition?.text}</div>
              </td>
              <td>
                <div className="c-150">{orderLines?.packId?.text}</div>
              </td>
              <td>
                <div className="c-150">{orderLines?.rotaDate?.text}</div>
              </td>
              <td>
                <div className="c-50" />
              </td>
            </tr>
          </thead>
          <tbody>
            {orderLinesData?.map((item, i) => {
              return (
                <FormLine
                  isValidation={isValidation}
                  index={i}
                  data={item}
                  orderDetails={orderDetails}
                  isReadonly={isReadonly}
                  setOrderLineSelectOpen={setOrderLineSelectOpen}
                  orderLines={orderLines}
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
          onClick={() => addOrderLines({ dispatch })}
        >
          ADD LINE
        </button>
        <RequiredMessage
          column="OrderLines"
          messageShow={isValidation}
          data={{
            text: 'Order Lines',
            value: orderLinesData.length,
          }}
        />
      </div>
    </div>
  );
};

export default Form;
