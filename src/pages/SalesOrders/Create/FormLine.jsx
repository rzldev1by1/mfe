import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'Component/Dropdown';
import DropdownAxios from 'Component/Dropdown/DropdownAxios';
import DatePicker from 'shared/DatePicker';
import InputNumber from 'Component/InputNumber';

import { productHandler, numberCheck, changeOrderLines, deleteOrderLines, formatDate } from './services';
import { getProduct } from 'apiService/dropdown';

const FormLine = ({ index, data, orderDetails, orderLines, isReadonly, isValidation, setOrderLineSelectOpen }) => {
  const dispatch = useDispatch();
  const dispositionData = useSelector((state) => state.po_disposition);
  const [isLoading, setIsLoading] = useState(false);
  const [isProduct, setIsProduct] = useState(null);
  const [isProductDesc, setIsProductDesc] = useState(null);
  const [isUom, setIsUom] = useState(null);
  const { product, description, qty, weight, uom, batch, ref3, ref4, disposition, packId, rotaDate } = orderLines;

  return (
    <tr className="py-1 orderline-row" style={{ height: '70px' }}>
      <td className="px-1">
        <input value={index + 1} className="form-control text-center" readOnly style={{ backgroundColor: '#f6f7f9' }} />
      </td>
      <td>
        <DropdownAxios
          name="product"
          placeholder={product?.text}
          options={isProduct}
          onChangeDropdown={(val) => {
            setIsProductDesc(val?.label);
            productHandler({ val, column: 'product', index, orderDetails, setIsUom, dispatch });
          }}
          onInputChange={(val) => {
            getProduct({ val, client: orderDetails?.client?.value?.value, setIsLoading, setIsProduct });
            setIsLoading(true);
          }}
          minChar={3}
          required={product?.required}
          isLoading={isLoading}
          readOnly={isReadonly}
          messageRequired={product?.required}
          messageParam={{ messageShow: isValidation, messageData: { text: product?.text, value: data?.product } }}
          parentDivClassName={isValidation && !data?.product?.value ? 'input-danger' : ''}
        />
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
          placeholder={qty?.text}
          autoComplete="off"
          onKeyPress={(e) => numberCheck(e)}
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'qty', index, dispatch })}
          type="text"
          maxLength={9}
          isReadOnly={isReadonly}
          messageRequired={qty?.required}
          messageParam={{ messageShow: isValidation, messageData: { text: qty?.text, value: data?.qty } }}
          className={`form-control ${isValidation && !data?.qty ? 'input-danger' : ''}`}
        />
      </td>
      <td className="px-1">
        <InputNumber
          name="weight"
          autoComplete="off"
          onKeyPress={(e) => numberCheck(e)}
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'weight', index, dispatch })}
          type="text"
          className="form-control"
          placeholder={weight?.text}
          maxLength={8}
          isReadOnly={isReadonly}
          isDecimal
        />
      </td>
      <td className="px-1">
        <Dropdown
          name="uom"
          placeholder={uom?.text}
          options={isUom}
          required
          selectedValue={data?.uom}
          onChangeDropdown={(selected) => {
            changeOrderLines({ val: selected, column: 'uom', index, dispatch });
          }}
          readOnly={isReadonly}
          onMenuOpen={() => setOrderLineSelectOpen('dropdown')}
          onMenuClose={() => setOrderLineSelectOpen(null)}
          messageRequired={product?.required}
          messageParam={{ messageShow: isValidation, messageData: { text: uom?.text, value: data?.uom } }}
          parentDivClassName={isValidation && !data?.uom?.value ? 'input-danger' : ''}
        />{' '}
      </td>
      <td className="px-1">
        <input
          name="batch"
          autoComplete="off"
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'batch', index, dispatch })}
          className="form-control"
          placeholder={batch?.text}
          maxLength="30"
          readOnly={isReadonly}
        />
      </td>
      <td className="px-1">
        <input
          name="ref3"
          autoComplete="off"
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'ref3', index, dispatch })}
          className="form-control"
          placeholder={ref3?.text}
          maxLength="30"
          readOnly={isReadonly}
        />
      </td>
      <td className="px-1">
        <input
          name="ref4"
          autoComplete="off"
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'ref4', index, dispatch })}
          className="form-control"
          placeholder={ref4?.text}
          maxLength="30"
          readOnly={isReadonly}
        />
      </td>
      <td className="px-1">
        <Dropdown
          name="disposition"
          placeholder={disposition?.text}
          options={dispositionData}
          required
          selectedValue={data?.disposition}
          onChangeDropdown={(selected) => {
            changeOrderLines({ val: selected, column: 'disposition', index, dispatch });
          }}
          readOnly={isReadonly}
          onMenuOpen={() => setOrderLineSelectOpen('dropdown')}
          onMenuClose={() => setOrderLineSelectOpen(null)}
        />
      </td>
      <td className="px-1">
        <input
          name="packId"
          autoComplete="off"
          onChange={(e) => changeOrderLines({ val: e.target.value, column: 'ref4', index, dispatch })}
          className="form-control"
          placeholder={packId?.text}
          maxLength="30"
          readOnly={isReadonly}
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
          value={formatDate(data?.rotaDate)}
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
