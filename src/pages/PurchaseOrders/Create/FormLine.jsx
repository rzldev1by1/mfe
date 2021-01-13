import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'Component/Dropdown';
import DropdownAxios from 'Component/Dropdown/DropdownAxios';
import DatePicker from 'shared/DatePicker';
import RequiredMessage from './RequiredMessage';
import InputNumber from 'Component/InputNumber';

import { productHandler, numberCheck, changeOrderLines, deleteOrderLines, formatDate } from './services';
import { getProduct } from 'apiService/dropdown';

const FormLine = ({ index, data, orderDetails, isReadonly, isValidation, setOrderLineSelectOpen }) => {
  const dispatch = useDispatch();
  const disposition = useSelector((state) => state.po_disposition);
  const [isLoading, setIsLoading] = useState(false);
  const [isProduct, setIsProduct] = useState(null);
  const [isProductDesc, setIsProductDesc] = useState(null);
  const [isUom, setIsUom] = useState(null);

  return (
    <tr className="py-1 orderline-row" style={{ height: '70px' }}>
      <td className="px-1">
        <input value={index + 1} className="form-control text-center" readOnly style={{ backgroundColor: '#f6f7f9' }} />
      </td>
      <td>
        <DropdownAxios
          placeholder="Product"
          options={isProduct}
          selectedValue
          onChangeDropdown={(val) => {
            setIsProductDesc(val?.label);
            productHandler({ val, column: 'product', index, orderDetails, setIsUom, dispatch });
          }}
          onInputChange={(val) => {
            getProduct({ val, client: orderDetails?.client?.value?.value, setIsLoading, setIsProduct });
            setIsLoading(true);
          }}
          minChar={3}
          required={true}
          isLoading={isLoading}
          readOnly={isReadonly}
        />
        <RequiredMessage column="product" columnText="Product" isValidation={isValidation} data={data?.product} />
      </td>
      <td className="px-1">
        <input
          value={isProductDesc}
          className="form-control"
          placeholder="Choose a product first"
          readOnly
          style={!isReadonly ? { backgroundColor: '#f6f7f9' } : null}
        />
      </td>
      <td className="px-1">
        <InputNumber
          name="qty"
          autoComplete="off"
          onKeyPress={(e) => numberCheck(e)}
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'qty', index, dispatch })}
          value={data?.qty?.value}
          type="text"
          className="form-control"
          placeholder="Qty"
          maxLength={9}
          isReadOnly={isReadonly}
        />
        <RequiredMessage column="qty" columnText="Qty" isValidation={isValidation} data={data?.qty} />
      </td>
      <td className="px-1">
        <InputNumber
          name="weight"
          autoComplete="off"
          onKeyPress={(e) => numberCheck(e)}
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'weight', index, dispatch })}
          value={data?.weight?.value}
          type="text"
          className="form-control"
          placeholder="Weight"
          maxLength={8}
          isReadOnly={isReadonly}
          isDecimal
        />
      </td>
      <td className="px-1">
        <Dropdown
          placeholder="UOM"
          options={isUom}
          required
          selectedValue={data?.uom?.value}
          onChangeDropdown={(selected) => {
            changeOrderLines({ val: selected, column: 'uom', index, dispatch });
          }}
          readOnly={isReadonly}
          onMenuOpen={() => setOrderLineSelectOpen('dropdown')}
          onMenuClose={() => setOrderLineSelectOpen(null)}
        />
        <RequiredMessage column="uom" columnText="UOM" isValidation={isValidation} data={data?.uom} />
      </td>
      <td className="px-1">
        <input
          name="batch"
          autoComplete="off"
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'batch', index, dispatch })}
          value={data?.batch?.value}
          className="form-control"
          placeholder="Batch"
          maxLength="30"
          readOnly={isReadonly}
        />
      </td>
      <td className="px-1">
        <input
          name="ref3"
          autoComplete="off"
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'ref3', index, dispatch })}
          value={data?.ref3?.value}
          className="form-control"
          placeholder="Ref3"
          maxLength="30"
          readOnly={isReadonly}
        />
      </td>
      <td className="px-1">
        <input
          name="ref4"
          autoComplete="off"
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'ref4', index, dispatch })}
          value={data?.ref4?.value}
          className="form-control"
          placeholder="Ref4"
          maxLength="30"
          readOnly={isReadonly}
        />
      </td>
      <td className="px-1">
        <Dropdown
          placeholder="Disposition"
          options={disposition}
          required
          selectedValue={data?.disposition?.value}
          onChangeDropdown={(selected) => {
            changeOrderLines({ val: selected, column: 'disposition', index, dispatch });
          }}
          readOnly={isReadonly}
          onMenuOpen={() => setOrderLineSelectOpen('dropdown')}
          onMenuClose={() => setOrderLineSelectOpen(null)}
        />
      </td>
      <td className="px-1">
        <DatePicker
          top={true}
          getDate={(date) => {
            changeOrderLines({ val: date, column: 'rotaDate', index, dispatch });
            setOrderLineSelectOpen(null);
          }}
          showDatePicker={() => {
            setOrderLineSelectOpen('datePicker');
          }}
          // className={`form-control ${overflow[i] && overflow[i].date ? 'absolute right' : null}`}
          className={`form-control `}
          placeholder="Select Date"
          style={isReadonly ? { display: 'none' } : null}
        />

        <input
          value={formatDate(data?.rotaDate?.value)}
          readOnly
          maxLength={30}
          style={!isReadonly ? { display: 'none' } : null}
          className={`form-control `}
          placeholder="Select Date"
        />
      </td>
      <td className="px-1" style={isReadonly ? { display: 'none' } : null}>
        <button
          type="button"
          className="btn btn-light-gray btn-block"
          onClick={() => deleteOrderLines({ dispatch, index })}
        >
          <i className="iconU-delete" />
        </button>
      </td>
    </tr>
  );
};

export default FormLine;
