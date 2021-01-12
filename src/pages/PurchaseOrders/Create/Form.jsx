import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'Component/Dropdown';
import DatePicker from 'shared/DatePicker';
import Input from 'Component/Input';
import FormLine from './FormLine';
import RequiredMessage from './RequiredMessage';

import { changeOrderDetails, addOrderLines, changeOrderNo } from './services';
import { getSupplier } from 'apiService/dropdown';
import { validate } from 'email-validator';

import './style.scss';

const Form = ({ activeTab, isValidation }) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.po_resources);
  const createPO = useSelector((state) => state.createPO);
  const clientData = useSelector((state) => state.clientData);
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
  const orderDetails = createPO?.orderDetails;

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
    console.log(client, site, user);
    getSupplier({ client, site, setSupplier });
  }, []);

  useEffect(() => {
    if (orderLineSelectOpen == 'datePicker') {
      setDropdownExpandStyle('lineDetailsBottomExpand lineDetailsTopExpand');
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
            placeholder="Site"
            options={resources?.site}
            title="Site"
            selectedValue={orderDetails?.site?.value}
            onChangeDropdown={(selected) => changeOrderDetails({ column: 'site', value: selected, dispatch })}
            showTitle
            required
            readOnly={isReadonly || site}
          />
          <RequiredMessage column="site" columnText="Site" isValidation={isValidation} data={orderDetails?.site} />
        </Col>
        <Col lg="3">
          <Dropdown
            placeholder="Order Type"
            options={resources?.orderType}
            showTitle
            title="Order Type"
            selectedValue={orderDetails?.orderType?.value}
            onChangeDropdown={(selected) => changeOrderDetails({ column: 'orderType', value: selected, dispatch })}
            required
            readOnly={isReadonly}
          />
          <RequiredMessage
            column="orderType"
            columnText="Order Type"
            isValidation={isValidation}
            data={orderDetails?.orderType}
          />
        </Col>
        <Col lg="3">
          <Dropdown
            placeholder="Supplier"
            options={supplier}
            showTitle
            title="Supplier"
            required={false}
            selectedValue={orderDetails?.supplier?.value}
            onChangeDropdown={(selected) => changeOrderDetails({ column: 'supplier', value: selected, dispatch })}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3">
          <Input
            name="customerOrderRef"
            title="Customer Order Ref"
            showTitle
            placeholder="Customer Order Ref"
            onChange={(e) => changeOrderDetails({ column: 'customerOrderRef', value: e.target.value, dispatch })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Dropdown
            placeholder="Client"
            options={clientOption}
            showTitle
            title="Client"
            required
            selectedValue={orderDetails?.client?.value}
            onChangeDropdown={async (selected) => {
              await changeOrderDetails({ column: 'client', value: selected, dispatch });
              getSupplier({ createPO, setSupplier });
            }}
            readOnly={isReadonly || client}
          />
          <RequiredMessage
            column="client"
            columnText="Client"
            isValidation={isValidation}
            data={orderDetails?.client}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="orderNo"
            title="Order No"
            showTitle
            placeholder="Order No"
            maxLength={30}
            // onChange={(e) => changeOrderDetails({ column: 'orderNo', value: e.target.value, dispatch })}
            onChange={(e) =>
              changeOrderNo({
                orderNo: e.target.value,
                client: orderDetails?.client?.value?.value,
                setCheckingOrderNo,
                dispatch,
              })
            }
            required
            readOnly={isReadonly}
          />
          <RequiredMessage
            column="orderNo"
            columnText="Order No."
            isValidation={isValidation || checkingOrderNo?.status === false}
            customMessage={checkingOrderNo}
            data={orderDetails?.orderNo}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <label className="text-muted mb-0 required">Order Date</label>
          <DatePicker
            className="form-control"
            placeholder="Order Date"
            getDate={(date) => {
              changeOrderDetails({ column: 'orderDate', value: date, dispatch });
            }}
            readOnly={isReadonly}
            style={isReadonly ? { display: 'none' } : null}
          />
          <Input
            name="orderDate"
            placeholder="Order Date"
            value={orderDetails?.orderDate?.value}
            readOnly
            maxLength={30}
            style={!isReadonly ? { display: 'none' } : null}
          />
          <RequiredMessage
            column="orderDate"
            columnText="Order Date"
            isValidation={isValidation}
            data={orderDetails?.orderDate}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="vendorOrderRef"
            title="Vendor Order Ref"
            showTitle
            placeholder="Vendor Order Ref"
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
            {createPO.orderLines.map((item, i) => {
              return (
                <FormLine
                  isValidation={isValidation}
                  index={i}
                  data={item}
                  orderDetails={orderDetails}
                  isReadonly={isReadonly}
                  setOrderLineSelectOpen={setOrderLineSelectOpen}
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
          data={createPO.orderLines.length}
        />
      </div>
    </div>
  );
};

export default Form;
