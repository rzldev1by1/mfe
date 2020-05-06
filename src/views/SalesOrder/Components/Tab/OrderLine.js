import React from "react";
import Dropdown from "../../../../AppComponent/Dropdown";
import DatePicker from "../../../../AppComponent/DatePicker";

const OrderLine = (props) => {
  const {
    number,
    productVal,
    product,
    qty,
    weight,
    uom,
    rotaDate,
    batch,
    ref3,
    ref4,
    dispositionVal,
    disposition,
    packId
  } = props.parameters;

  let idx = props.idx + 1;

  return (
    <div style={{ marginBottom: "1%" }}>
      <div className="line">
        <table className="">
          <tr>
            <td>
              <div id="orderline-header-number-val-id">
                <input
                  className="form-control put "
                  id="rowNumber"
                  readOnly
                  value={number}
                />
              </div>
            </td>
            <td>
              <div id="orderline-header-product-val-id">
                <Dropdown
                  optionSelected={productVal}
                  getValue={(productVal, product) =>
                    props.setProduct(productVal, product, props.idx)
                  }
                  placeHolder="Product"
                  style={{ minWidth: "100%", zIndex: props.parametersLength - idx }}
                  optionList={props.productdata.code.toString()}
                  optionValue={props.productdata.code.toString()}
                />
              </div>
            </td>
            <td>
              <div id="orderline-header-description-val-id">
                <input
                  className="form-control put "
                  placeholder="Product Name"
                  readOnly
                  value={product}
                />
              </div>
            </td>
            <td>
              <div id="orderline-header-qty-val-id">
                <input
                  id={"qty_" + idx}
                  type="number"
                  maxLength="9"
                  className="form-control put "
                  placeholder="Qty"
                  value={qty}
                  maxLength="9"
                  onChange={(e) => props.setQty(e.target.value, props.idx)}
                />
              </div>
            </td>
            <td>
              <div id="orderline-header-weight-val-id">
                <input
                  id={"weight_" + idx}
                  className="form-control put "
                  placeholder="Weight"
                  value={weight}
                  maxLength="9"
                  onChange={(e) => props.setWeight(e.target.value, props.idx)}
                />
              </div>
            </td>
            <td>
              <div id="orderline-header-uom-val-id">
                <Dropdown
                  optionSelected={uom}
                  getValue={(uom) => props.setUom(uom, props.idx)}
                  placeHolder="UOM"
                  style={{ zIndex: idx }}
                  optionList={props.uomdata.toString()}
                  optionValue={props.uomdata.toString()}
                />
              </div>
            </td>
            <td>
              <div id="orderline-header-rotadate-val-id">
                <DatePicker
                  getDate={(date) => props.setRotaDate(date, props.idx)}
                />
              </div>
            </td>

            <td>
              <div id='orderline-header-batch-val-id'>
                <input id={'batch_' + idx}
                  className="form-control put "
                  placeholder='Batch'
                  value={batch}
                  maxLength='9'
                  onChange={(e) => props.setBatch(e.target.value, props.idx)} />
              </div>
            </td>
            <td>
              <div id='orderline-header-ref3-val-id'>
                <input id={'ref3_' + idx}
                  className="form-control put "
                  placeholder='Ref3'
                  value={ref3}
                  onChange={(e) => props.setRef3(e.target.value, props.idx)} />
              </div>
            </td>
            <td>
              <div id='orderline-header-ref4-val-id'>
                <input id={'ref4_' + idx}
                  className="form-control put "
                  placeholder='Ref4'
                  value={ref4}
                  onChange={(e) => props.setRef4(e.target.value, props.idx)} />
              </div>
            </td>
            <td>
              <div id='orderline-header-disposition-val-id'>
                <Dropdown optionSelected={dispositionVal}
                  getValue={(dispositionVal, dispositionName) => props.setDispoisition(dispositionVal, dispositionName, props.idx)}
                  placeHolder="Disposition"
                  style={{ minWidth: "100%", zIndex: idx }}
                  optionList={props.dispositiondata.code.toString()}
                  optionValue={props.dispositiondata.code.toString()} />
              </div>
            </td>
            <td>
              <div id='orderline-header-packid-val-id'>
                <input id={'packId_' + idx}
                  className="form-control put "
                  placeholder='Pack ID'
                  value={packId}
                  onChange={(e) => props.setPackid(e.target.value, props.idx)} />
              </div>
            </td>
            <td>
              <div id='orderline-header-number-val-id'>
                <label onClick={() => props.removeLineHandler(idx)} className="iconU-delete" />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default OrderLine;
