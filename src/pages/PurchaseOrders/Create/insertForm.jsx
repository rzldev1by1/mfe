import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'Component/Dropdown';
import DatePicker from 'shared/DatePicker';
import Input from 'Component/Input';
import './style.scss';

const InsertForm = ({ activeTab }) => {
  const resources = useSelector((state) => state.po_resources);
  const client = useSelector((state) => state.client);

  const [orderDate, setOrderDate] = useState();
  //   let expandDropdownCheck =
  //     this.state.UOMStatus.includes(true) ||
  //     this.state.dispositionStatus.includes(true) ||
  //     this.state.productStatus.includes(true);

  let expandDropdownCheck = true;
  let datepickerExpandStyle = true ? ' lineDetailsTopExpand' : '';
  let dropdownExpandStyle = expandDropdownCheck ? ' lineDetailsBottomExpandPO' : '';

  return (
    <div>
      <h3 className="text-primary font-20">Order Details</h3>
      {/* Start Order Details */}
      <Row>
        <Col lg="3">
          <Dropdown
            placeholder="Site"
            options={resources?.site}
            onChangeDropdown
            showTitle={true}
            title="Site"
            required={true}
          />
        </Col>
        <Col lg="3">
          <Dropdown
            placeholder="Order Type"
            options={resources?.orderType}
            onChangeDropdown
            showTitle={true}
            title="Order Type"
            required={true}
          />
        </Col>
        <Col lg="3">
          <Dropdown
            placeholder="Supplier"
            options
            onChangeDropdown
            showTitle={true}
            title="Supplier"
            required={false}
          />
        </Col>
        <Col lg="3">
          <Input
            name="customerOrderRef"
            title="Customer Order Ref"
            showTitle={true}
            placeholder="Customer Order Ref"
            maxLength={30}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" className="mt-45">
          <Dropdown
            placeholder="Client"
            options={client}
            onChangeDropdown
            showTitle={true}
            title="Client"
            required={true}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="orderNo"
            title="Order No"
            showTitle={true}
            placeholder="Order No"
            maxLength={30}
            required={true}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <label className="text-muted mb-0 required">Date Picker</label>
          <DatePicker
            className="form-control"
            placeholder="Order Date"
            getDate={(date) => {
              setOrderDate(date);
            }}
          />
        </Col>
        <Col lg="3" className="mt-45">
          <Input
            name="customerOrderRef"
            title="Customer Order Ref"
            showTitle={true}
            placeholder="Customer Order Ref"
            maxLength={30}
          />
        </Col>
      </Row>
      {/* End Order Details */}

      {/* Start Line Details */}
      <div className={'orderline mb-2 pb-2 scroll-x-y' + datepickerExpandStyle + dropdownExpandStyle}>
        <h3 className="text-primary font-20">Line Details</h3>
        {/* End Line Details */}
        <table>
          <thead>
            <tr className="text-muted">
              <td>
                <div className="c-50 text-center">#</div>
              </td>
              <td>
                <div className="c-400 required px-1">Product</div>
              </td>
              <td>
                <div className="c-600 px-1">Description</div>
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
                <div className="c-50"></div>
              </td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default InsertForm;
