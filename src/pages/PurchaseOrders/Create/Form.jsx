import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'Component/Dropdown';
import DatePicker from 'shared/DatePicker';
import Input from 'Component/Input';
import FormLine from './FormLine';
import RequiredMessage from './RequiredMessage';

import { changeOrderDetails, addOrderLines, createData, changeOrderNo, formatDate } from './services';
import { getSupplier } from 'apiService/dropdown';
import { validate } from 'email-validator';

import './style.scss';

const Form = ({ activeTab, isValidation, createData }) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.po_resources);
  const clientData = useSelector((state) => state.clientData);
  const siteData = useSelector((state) => state.siteData);
  const user = useSelector((state) => state.user);

  const [orderDate, setOrderDate] = useState({});
  const [line, setLine] = useState([]);
  const [clientOption, setClientOption] = useState(null);
  const [siteOption, setSiteOption] = useState(null);
  const [supplier, setSupplier] = useState([]);
  const [isReadonly, setIsReadOnly] = useState(false);
  const [orderLineSelectOpen, setOrderLineSelectOpen] = useState(false);
  const [dropdownExpandStyle, setDropdownExpandStyle] = useState(null);
  const [checkingOrderNo, setCheckingOrderNo] = useState(null);
  const { company, client, site } = user;
  const { orderDetails, orderLines, orderLinesData } = createData;

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
    getSupplier({ client, site, setSupplier });
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
            title={orderDetails?.site?.text}
            options={siteOption}
            selectedValue={orderDetails?.site?.value}
            onChangeDropdown={(selected) => changeOrderDetails({ column: 'site', value: selected, dispatch })}
            showTitle
            required
            readOnly={isReadonly || site}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: orderDetails?.site }}
            parentDivClassName={isValidation && !orderDetails?.site?.value ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3">
          <Dropdown
            name="orderType"
            placeholder={orderDetails?.orderType?.text}
            title={orderDetails?.orderType?.text}
            options={resources?.orderType}
            selectedValue={orderDetails?.orderType?.value}
            onChangeDropdown={(selected) => changeOrderDetails({ column: 'orderType', value: selected, dispatch })}
            showTitle
            required
            readOnly={isReadonly || site}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: orderDetails?.orderType }}
            parentDivClassName={isValidation && !orderDetails?.orderType?.value ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3">
          <Dropdown
            name="supplier"
            placeholder={orderDetails?.supplier?.text}
            options={supplier}
            showTitle
            placeholder={orderDetails?.supplier?.text}
            title={orderDetails?.supplier?.text}
            required={false}
            selectedValue={orderDetails?.supplier?.value}
            onChangeDropdown={(selected) => changeOrderDetails({ column: 'supplier', value: selected, dispatch })}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3">
          <Input
            name="customerOrderRef"
            title={orderDetails?.customerOrderRef?.text}
            placeholder={orderDetails?.customerOrderRef?.text}
            showTitle
            onChange={(e) => changeOrderDetails({ column: 'customerOrderRef', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Dropdown
            name="client"
            title={orderDetails?.client?.text}
            placeholder={orderDetails?.client?.text}
            options={clientOption}
            showTitle
            required
            selectedValue={orderDetails?.client?.value}
            onChangeDropdown={async (selected) => {
              await changeOrderDetails({ column: 'client', value: selected, dispatch });
              getSupplier({ orderDetails, setSupplier });
              setSupplier([]);
              changeOrderDetails({ column: 'supplier', value: null, dispatch });
            }}
            readOnly={isReadonly || client}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: orderDetails?.client }}
            parentDivClassName={isValidation && !orderDetails?.client?.value ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="orderNo"
            title={orderDetails?.orderNo?.text}
            placeholder={orderDetails?.orderNo?.text}
            showTitle
            maxLength={12}
            onChange={(e) =>
              changeOrderNo({
                orderNo: e.target.value.toUpperCase(),
                client: orderDetails?.client?.value,
                setCheckingOrderNo,
                dispatch,
              })
            }
            className={
              (isValidation && !orderDetails?.orderNo?.value) || checkingOrderNo?.status === false ? 'input-danger' : ''
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
              messageData: orderDetails?.orderNo,
              customMessage: checkingOrderNo,
            }}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <label className="text-muted mb-0 required">{orderDetails?.orderDate?.text}</label>
          <DatePicker
            getDate={(date) => {
              changeOrderDetails({ column: 'orderDate', value: date, dispatch });
            }}
            readOnly={isReadonly}
            style={isReadonly ? { display: 'none' } : null}
            className={'form-control ' + (isValidation && !orderDetails?.deliveryDate?.value ? 'input-danger' : '')}
          />
          <Input
            name="orderDate"
            placeholder={orderDetails?.orderDate?.text}
            value={formatDate(orderDetails?.orderDate?.value)}
            readOnly
            maxLength={30}
            style={!isReadonly ? { display: 'none' } : null}
            messageRequired={true}
            messageParam={{ messageShow: isValidation, messageData: orderDetails?.orderDate }}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="vendorOrderRef"
            title={orderDetails?.vendorOrderRef?.text}
            placeholder={orderDetails?.vendorOrderRef?.text}
            showTitle
            onChange={(e) => changeOrderDetails({ column: 'vendorOrderRef', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      {/* End Order Details */}

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
                <div className="c-150">Rotadate</div>
              </td>
              <td>
                <div className="c-50" />
              </td>
            </tr>
          </thead>
          <tbody>
            {orderLinesData.map((item, i) => {
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
          columnText="Order Lines"
          isValidation={isValidation}
          data={orderLinesData.length}
        />
      </div>
    </div>
  );
};

export default Form;
