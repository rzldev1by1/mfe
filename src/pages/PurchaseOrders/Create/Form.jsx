import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getSupplier, getDisposition } from '../../../apiService/dropdown';
import {
  changeOrderDetails,
  addOrderLines,
  changeOrderNo,
  formatDate,
  changeClient,
  validationOrderLines,
  changeOrderDetailSiteAndClient,
} from './services';
import DatePicker from '../../../shared/DatePicker';
import Dropdown from '../../../Component/Dropdown';
import Input from '../../../Component/Input';
import RequiredMessage from '../../../Component/RequiredMessage';
import FormLine from './FormLine';
import './style.scss';

const Form = ({
  activeTab,
  isValidation,
  setIsValidation,
  orderDetails,
  setOrderDetails,
  orderLines,
  setOrderLines,
}) => {
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.po_resources);
  const clientData = useSelector((state) => state.clientData);
  const siteData = useSelector((state) => state.siteData);
  const user = useSelector((state) => state.user);

  const [clientOption, setClientOption] = useState(null);
  const [siteOption, setSiteOption] = useState(null);
  const [supplier, setSupplier] = useState([]);
  const [isReadonly, setIsReadOnly] = useState(false);
  const [orderLineSelectOpen, setOrderLineSelectOpen] = useState(false);
  const [dropdownExpandStyle, setDropdownExpandStyle] = useState(null);
  const [checkingOrderNo, setCheckingOrderNo] = useState(null);
  const { client, site } = user;

  useEffect(() => {
    if (orderLines?.length < 1) {
      addOrderLines({ orderLines, setOrderLines });
    }
  }, []);

  useEffect(() => {
    // set client dropdown option
    const reqClientOption = [];
    const reqSiteOption = [];
    let valClient = null;
    let valSite = null;
    if (clientData) {
      clientData.forEach((item) => {
        if (item.value !== 'all') {
          reqClientOption.push(item);
        }

        if (client === item.value) {
          valClient = {
            value: item.value,
            label: `${item.label}`,
          };
        }
      });
    }

    // set site dropdown option
    if (siteData) {
      siteData.forEach((item) => {
        if (item.value !== 'all') {
          reqSiteOption.push(item);
        }
        if (site === item.value) {
          valSite = {
            value: item.value,
            label: `${item.label}`,
          };
        }
      });
    }

    if (client) getSupplier({ client, site: orderDetails?.site, setSupplier });

    changeOrderDetailSiteAndClient({ valClient, valSite, setOrderDetails, orderDetails });
    setSiteOption(reqSiteOption);
    setClientOption(reqClientOption);
  }, [clientData, siteData]);

  useEffect(() => {
    if (activeTab === 'review') {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (orderLineSelectOpen === 'datePicker') {
      setDropdownExpandStyle('lineDetailsTopExpand');
    } else if (orderLineSelectOpen === 'dropdown') {
      setDropdownExpandStyle('lineDetailsBottomExpand');
    } else {
      setDropdownExpandStyle(null);
    }
  }, [orderLineSelectOpen]);
  const messageShowOrderType = isValidation && !orderDetails?.orderType?.value;
  const styleAddLine = isReadonly ? `btn-light-two` : `btn-light-ones`;
  return (
    <div>
      <h3 className="text-primary font-20">Order Details</h3>
      {/* Start Order Details */}
      <Row className="h-93">
        <Col lg="3">
          <Dropdown
            name="site"
            title="Site"
            options={siteOption}
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
              changeOrderDetails({ column: 'orderType', value: selected, orderDetails, setOrderDetails })}
            required
            readOnly={isReadonly}
            messageRequired
            messageParam={{
              messageShow: messageShowOrderType,
              value: orderDetails?.orderType,
            }}
            parentDivClassName={messageShowOrderType ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3">
          <Dropdown
            name="supplier"
            title="Supplier"
            options={supplier}
            selectedValue={orderDetails?.supplier}
            onChangeDropdown={(selected) =>
              changeOrderDetails({ column: 'supplier', value: selected, orderDetails, setOrderDetails })}
            readOnly={isReadonly}
          />
        </Col>
        <Col lg="3">
          <Input
            name="customerOrderRef"
            title="Customer Order Ref"
            placeholder={orderDetails?.customerOrderRef}
            onChange={(val) =>
              changeOrderDetails({ column: 'customerOrderRef', value: val.target.value, orderDetails, setOrderDetails })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      <Row className="h-93">
        <Col lg="3">
          <Dropdown
            name="client"
            title="Client"
            options={clientOption}
            required
            selectedValue={orderDetails?.client}
            onChangeDropdown={(selected) => {
              changeClient({ value: selected, orderDetails, setOrderDetails, setSupplier, orderLines, setOrderLines });
              setSupplier([]);
              if (selected) {
                getSupplier({ client: selected.value, site: orderDetails?.site, setSupplier });
                getDisposition({ dispatch, client: selected.value });
              }
            }}
            readOnly={isReadonly || client}
            messageRequired
            messageParam={{
              messageShow: isValidation,
              value: orderDetails?.client,
            }}
            parentDivClassName={isValidation && !orderDetails?.client ? 'input-danger' : ''}
          />
        </Col>
        <Col lg="3">
          <Input
            id="orderNo"
            name="orderNo"
            title="Order No"
            style={{ marginLeft: '-3px' }}
            maxLength={12}
            onChange={(e) => {
              const val = e.target.value.toUpperCase();
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
              const orderNo = e.target.value;
              e.target.value = orderNo.toUpperCase();
            }}
            alphaNumeric
            required
            readOnly={isReadonly}
            messageRequired
            messageParam={{
              messageShow: isValidation || checkingOrderNo?.status === false,
              value: orderDetails?.orderNo,
              customMessage: checkingOrderNo?.message,
            }}
          />
        </Col>
        <Col lg="3">
          <label className="text-muted mb-0 required">Order Date</label>
          <DatePicker
            getDate={(date) => {
              changeOrderDetails({ column: 'orderDate', value: date, orderDetails, setOrderDetails });
            }}
            readOnly={isReadonly}
            style={isReadonly ? { display: 'none' } : null}
            classNameInput={`form-control ${isValidation && !orderDetails?.orderDate ? 'input-danger' : ''}`}
            selectedDates={orderDetails?.orderDate}
          />
          <Input
            name="orderDate"
            placeholder="Order Date"
            value={formatDate(orderDetails?.orderDate)}
            readOnly
            style={!isReadonly ? { display: 'none' } : null}
            messageRequired
            messageParam={{
              messageShow: isValidation,
              value: orderDetails?.orderDate,
            }}
          />
        </Col>
        <Col lg="3">
          <Input
            name="vendorOrderRef"
            title="Vendor Order Ref"
            onChange={(e) =>
              changeOrderDetails({ column: 'vendorOrderRef', value: e.target.value, orderDetails, setOrderDetails })}
            maxLength={30}
            readOnly={isReadonly}
          />
        </Col>
      </Row>
      {/* End Order Details */}

      {/* Start Line Details */}
      <h3 className="text-primary font-20 mt-45">Line Details</h3>
      <div
        id="orderLines"
        className={`orderline mb-2 pb-2 scroll-x-y row  ${dropdownExpandStyle}`}
        style={{ marginLeft: '-4.5px', marginRight: '-4.5px' }}
      >
        {/* End Line Details */}
        <table>
          <thead>
            <tr className="text-muted">
              <td>
                <div className="c-50 text-center">#</div>
              </td>
              <td>
                {' '}
                <div className="c-400 required px-1">Product</div>
                {' '}
              </td>
              <td>
                {' '}
                <div className="c-600 px-1">Description</div>
                {' '}
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
            {orderLines.map((item, i) => {
              return (
                <FormLine
                  isValidation={item.validation}
                  index={i}
                  data={item}
                  orderDetails={orderDetails}
                  isReadonly={isReadonly}
                  setOrderLineSelectOpen={setOrderLineSelectOpen}
                  orderLines={orderLines}
                  setOrderLines={setOrderLines}
                  isInvalidProduct={item.validation_invalidProduct}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <button
          type="button"
          className={`btn m-0 ${styleAddLine}`}
          onClick={async () => {
            setIsValidation(true);
            const validate = await validationOrderLines({ orderLines, setOrderLines });
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
          messageShow={isValidation}
          value={orderLines.length}
        />
      </div>
    </div>
  );
};

export default Form;
