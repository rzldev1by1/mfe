import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'Component/Dropdown';
import DropdownAxios from 'Component/Dropdown/DropdownAxios';
import DatePicker from 'shared/DatePicker';
import InputNumber from 'Component/InputNumber';
import { productHandler, numberCheck, changeOrderLines, deleteOrderLines, formatDate } from './services';
import { getProduct } from 'apiService/dropdown';
import Input from 'Component/Input';

const FormLine = ({
  index,
  data,
  orderDetails,
  orderLines,
  setOrderLines,
  isReadonly,
  isValidation,
  setOrderLineSelectOpen,
  isInvalidProduct
}) => {
  const dispositionData = useSelector((state) => state.po_disposition);
  const [isLoading, setIsLoading] = useState(false);
  const [isProduct, setIsProduct] = useState(null);
  const [isUom, setIsUom] = useState(null);
  return (
    <tr className="py-1 orderline-row" style={{ height: '70px' }}>
      <td className="px-1">
        <input value={index + 1} className="form-control text-center" readOnly style={{ backgroundColor: '#f6f7f9' }} />
      </td>
      <td>
        <DropdownAxios
          name="product"
          options={isProduct}
          placeholder="Product"
          onChangeDropdown={(val) => {
            productHandler({ val, column: 'product', index, orderLines, setOrderLines, setIsUom });
          }}
          onInputChange={(val) => {
            getProduct({ val, client: orderDetails?.client?.value, setIsLoading, setIsProduct });
            setIsLoading(true);
          }}
          showLabelOnly
          minChar={3}
          required={true}
          isLoading={isLoading}
          readOnly={isReadonly}
          messageRequired={true}
          messageParam={{
            messageShow: isInvalidProduct || isValidation,
            value: data?.product,
            messageCustom: isInvalidProduct ? 'Product is unavailable' : ''
          }}
          selectedValue={data.product}
          parentDivClassName={isValidation && !data?.validation_product ? 'input-danger' : ''}
        />
      </td>
      <td className="px-1">
        <Input
          value={data?.productDesc}
          className="form-control"
          placeholder="Choose a product first"
          readOnly
          style={!isReadonly ? { backgroundColor: '#f6f7f9' } : null}
        />
      </td>
      <td className="px-1">
        <InputNumber
          placeholder={'Qty'}
          name="qty"
          autoComplete="off"
          onKeyPress={(e) => numberCheck(e)}
          value={data.qty}
          onChange={(e) =>
            changeOrderLines({
              val: e.target.value,
              column: 'qty',
              index,
              orderLines,
              setOrderLines,
            })
          }
          type="text"
          className={`form-control ${isValidation && !data?.validation_qty ? 'input-danger' : ''}`}
          maxLength={9}
          isReadOnly={isReadonly}
          messageRequired={true}
          messageParam={{
            messageShow: !isInvalidProduct ? isValidation : false,
            value: data?.qty,
          }}
        />
      </td>
      <td className="px-1">
        <InputNumber
          name="weight"
          placeholder={'Weight'}
          autoComplete="off"
          onKeyPress={(e) => numberCheck(e)}
          onChange={(e) =>
            changeOrderLines({
              val: e.target.value,
              column: 'weight',
              index,
              orderLines,
              setOrderLines,
            })
          }
          type="text"
          maxLength={8}
          isReadOnly={isReadonly}
          isDecimal
          className={`form-control`}
          value={data.weight}
        />
      </td>
      <td className="px-1">
        <Dropdown
          name="uom"
          placeholder={'UOM'}
          options={isUom}
          required
          selectedValue={data?.uom}
          onChangeDropdown={(selected) =>
            changeOrderLines({
              val: selected,
              column: 'uom',
              index,
              orderLines,
              setOrderLines,
            })
          }
          readOnly={isReadonly}
          onMenuOpen={() => setOrderLineSelectOpen('dropdown')}
          onMenuClose={() => setOrderLineSelectOpen(null)}
          messageRequired={true}
          messageParam={{
            messageShow: !isInvalidProduct ? isValidation : false,
            value: data?.uom,
          }}
          parentDivClassName={isValidation && !data?.validation_uom ? 'input-danger' : ''}
        />
      </td>
      <td className="px-1">
        <Input
          name={'batch'}
          placeholder={'Batch'}
          autoComplete="off"
          onChange={(e) =>
            changeOrderLines({
              val: e.target.value,
              column: 'batch',
              index,
              orderLines,
              setOrderLines,
            })
          }
          className="form-control"
          maxLength="30"
          readOnly={isReadonly}
          value={data.batch}
        />
      </td>
      <td className="px-1">
        <Input
          name="ref3"
          placeholder={'Ref3'}
          autoComplete="off"
          onChange={(e) =>
            changeOrderLines({
              val: e.target.value,
              column: 'ref3',
              index,
              orderLines,
              setOrderLines,
            })
          }
          className="form-control"
          maxLength="30"
          readOnly={isReadonly}
          value={data.ref3}
        />
      </td>
      <td className="px-1">
        <Input
          name="ref4"
          placeholder={'Ref4'}
          autoComplete="off"
          onChange={(e) =>
            changeOrderLines({
              val: e.target.value,
              column: 'ref4',
              index,
              orderLines,
              setOrderLines,
            })
          }
          className="form-control"
          maxLength="30"
          readOnly={isReadonly}
          value={data.ref4}
        />
      </td>
      <td className="px-1">
        <Dropdown
          name="disposition"
          placeholder={'Disposition'}
          options={dispositionData}
          required
          selectedValue={data?.disposition}
          onChangeDropdown={(selected) => {
            changeOrderLines({
              val: selected,
              column: 'disposition',
              index,
              orderLines,
              setOrderLines,
            });
          }}
          readOnly={isReadonly}
          onMenuOpen={() => setOrderLineSelectOpen('dropdown')}
          onMenuClose={() => setOrderLineSelectOpen(null)}
        />
      </td>
      <td className="px-1">
        <Input
          value={data?.packId}
          name="packId"
          autoComplete="off"
          onChange={(e) => {
            changeOrderLines({
              val: e.target.value,
              column: 'packId',
              index,
              orderLines,
              setOrderLines,
            });
          }}
          className="form-control"
          placeholder={'Pack ID'}
          maxLength="30"
          readOnly={isReadonly}
        />
      </td>
      <td className="px-1">
        <DatePicker
          top={true}
          getDate={(date) => {
            changeOrderLines({
              val: date,
              column: 'rotaDate',
              index,
              orderLines,
              setOrderLines,
            });
            setOrderLineSelectOpen('datePicker');
          }}
          showDatePicker={() => {
            setOrderLineSelectOpen('datePicker');
          }}
          classNameInput={`form-control `}
          placeholder="Select Date"
          style={isReadonly ? { display: 'none' } : null}
          selectedDates={data?.rotaDate || ''}
        />
        <Input
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
          onClick={() => deleteOrderLines({ orderLines, setOrderLines, index })}
        >
          <i className="iconU-delete" />
        </button>
      </td>
    </tr>
  );
};

export default FormLine;
