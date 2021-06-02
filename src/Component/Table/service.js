/* eslint-disable no-lonely-if */
/* eslint-disable no-multi-assign */
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const changeRowOnFocus = async({e, props, column, action}) => {  
  const val = e.target.value
  const elementOrderQty = document.getElementById(`order_qty_${props?.row._index}`);// id for column Order Qty
  const elementEditQty = document.getElementById(`edit_qty_${props?.row._index}`);// id for column element input Edit Qty
  const elementNoOfCarton = document.getElementById(`no_of_carton_${props?.row._index}`);// id for column No. Of Carton
  const elementEditCarton = document.getElementById(`edit_carton_${props?.row._index}`);// id for column element Edit Carton Qty
  const elementTooltip = document.getElementById(`tooltip-bottom_orderQty_${props?.row._index}`)
  const elementTooltipCarton = document.getElementById(`tooltip-bottom_noOfCarton_${props?.row._index}`)
  const printLabels = document.getElementById(`print-labels`)

  // change the style of the row in detail Table SP module when the input element is onfocus
  if ( action === 'onFocus' ){
    if (column === 'edit_qty'){
      if(parseFloat(val.replace(/,/g, '')) > parseFloat(props?.original.order_qty)){
        if(elementEditCarton.value.replace(/,/g, '') > parseFloat(props?.original.no_of_carton)){
          elementNoOfCarton.style.color = 'red'
          elementEditCarton.classList.add("invalid-input");
        }
        elementOrderQty.style.color = 'red'
        elementEditQty.classList.add("remaining-input");
        if (elementTooltip) elementTooltip.classList.add("tooltip-outOfReamining");
      }else {
        if (elementEditCarton.value.replace(/,/g, '') > parseFloat(props?.original.no_of_carton)){
          elementNoOfCarton.style.color = 'red'
          elementEditCarton.classList.add("invalid-input");
        }else{
          elementOrderQty.style.color = elementNoOfCarton.style.color = 'orange'
          elementEditQty.classList.add("remaining-input");
        }
      }
    }
    if (column === 'edit_carton'){
      if(parseFloat(val.replace(/,/g, '')) > parseFloat(props?.original.no_of_carton)){
        if (elementEditQty.value.replace(/,/g, '') > parseFloat(props?.original.order_qty)){
          elementOrderQty.style.color = 'red'
          elementEditQty.classList.add("invalid-input");
        }
        elementNoOfCarton.style.color = 'red'
        elementEditCarton.classList.add("remaining-input");
        if(elementTooltipCarton)elementTooltipCarton.classList.add("tooltip-outOfReamining");
      }else {
        if (elementEditQty.value.replace(/,/g, '') > parseFloat(props?.original.order_qty)){
          elementOrderQty.style.color = 'red'
          elementEditQty.classList.add("invalid-input");
        }else{
          elementOrderQty.style.color = elementNoOfCarton.style.color = 'orange'
        }
      }
    }
  }

  // change the style of the row in detail Table SP module when user type a value in edit qty and edit carton 
  if ( action === 'onChange' ){
    if (column === 'edit_qty'){
      if (parseFloat(val.replace(/,/g, '')) > parseFloat(props?.original.order_qty)){
        elementOrderQty.style.color = 'red'
        elementEditQty.classList.add("outOfRemaining-input");
        if(elementTooltip) elementTooltip.classList.add("tooltip-outOfReamining");
      }else {
        elementOrderQty.style.color = 'orange';
        elementEditQty.classList.remove("outOfRemaining-input");
        if(elementTooltip)elementTooltip.classList.remove("tooltip-outOfReamining");
        elementEditQty.classList.remove("invalid-input");
        elementEditQty.classList.add("remaining-input");
      }
    }
    if (column === 'edit_carton'){
      if (parseFloat(val.replace(/,/g, '')) > parseFloat(props?.original.no_of_carton)){
        elementNoOfCarton.style.color = 'red'
        elementEditCarton.classList.add("outOfRemaining-input");
        if(elementTooltipCarton)elementTooltipCarton.classList.add("tooltip-outOfReamining");
      }else {
        elementNoOfCarton.style.color = 'orange';
        elementEditCarton.classList.remove("outOfRemaining-input");
        if(elementTooltipCarton)elementTooltipCarton.classList.remove("tooltip-outOfReamining");
        elementEditCarton.classList.add("remaining-input");
      }
    }
  }

  // change the style of the row in detail Table SP module when user move the pointer around the element input
  if ( action === 'mouseEnter' ){
    if (column === 'edit_qty'){
      if (parseFloat(val.replace(/,/g, '')) > parseFloat(props?.original.order_qty)){
        setTimeout(() => {
          const elementTooltipz = document.getElementById(`tooltip-bottom_orderQty_${props?.row._index}`)
          if(elementTooltipz)elementTooltipz.classList.add("tooltip-outOfReamining")

          elementOrderQty.style.color = 'red'
        }, 451);
      }
    }
    if (column === 'edit_carton'){
      if (parseFloat(val.replace(/,/g, '')) > parseFloat(props?.original.no_of_carton)){
        setTimeout(() => {
          const elementTooltipCartonz = document.getElementById(`tooltip-bottom_noOfCarton_${props?.row._index}`)
          if(elementTooltipCartonz)elementTooltipCartonz.classList.add("tooltip-outOfReamining")

          elementNoOfCarton.style.color = 'red'
        }, 451);
      }
    }
  }

  // detect element which have invalid value
  if ( action === 'onBlur' ){
    const valEditQty = [];
    const valOrderQty = [];
    const valEditCarton = [];
    const valCartonQty = [];

    document.querySelectorAll('.val-order-qty').forEach(function(qty){
      valOrderQty.push(qty.innerHTML);
    })
    document.querySelectorAll('.input-order-qty').forEach(function(el){
      valEditQty.push(el.value);
    });

    document.querySelectorAll('.val-carton-qty').forEach(function(qty){
      valCartonQty.push(qty.innerHTML);
    })
    document.querySelectorAll('.input-carton-qty').forEach(function(el){
      valEditCarton.push(el.value);
    });

    valEditQty.forEach((data, idx)=>{
      const elementOrderQtys = document.getElementById(`order_qty_${idx}`);// id for column Order Qty
      const elementEditQtys = document.getElementById(`edit_qty_${idx}`);// id for column element input Edit Qty
      const elementNoOfCartons = document.getElementById(`no_of_carton_${idx}`);// id for column No. Of Carton

      if (valOrderQty[idx] < data.replace(/,/g, '')){
        elementOrderQtys.style.color = 'red';
        elementNoOfCartons.style.color = 'black';
        elementEditQtys.classList.add("invalid-input");
      }else{
        elementOrderQtys.style.color = 'black';
        elementNoOfCartons.style.color = 'black';
        elementEditQtys.classList.remove("invalid-input");
      }
    })
  
    valEditCarton.forEach((data, idx) => {
      const elementOrderQtys = document.getElementById(`order_qty_${idx}`);// id for column Order Qty
      const elementNoOfCartons = document.getElementById(`no_of_carton_${idx}`);// id for column No. Of Carton
      const elementEditCartons = document.getElementById(`edit_carton_${idx}`);// id for column element Edit Carton Qty

      if (valCartonQty[idx] < parseFloat(data.replace(/,/g, ''))){
        elementOrderQtys.style.color = 'balck';
        elementNoOfCartons.style.color = 'red';
        elementEditCartons.classList.add("invalid-input");
      }else{
        elementOrderQtys.style.color = 'black';
        elementNoOfCartons.style.color = 'black';
        elementEditCartons.classList.remove("invalid-input");
      }
    })
  }
}

const getColumnWidth = (rows, accessor, headerText, minWidth) => {
  const magicSpacing = 9;
  const cellLength = Math.max(...rows.map((row) => (`${row[accessor]}` || '').length), headerText.length);
  const width = cellLength * magicSpacing;
  if (width < minWidth) {
    return minWidth;
  } 
    return width;
};

export const renewColumn = async ({
  setNewSchema,
  data,
  fields,
  module,
  userId,
  editColumn,
  showModal,
  columnHidden,
  editOrderQty,
  editCarton,
  dispatch
}) => {
  // reorder column
  const key = `tables__${module}__${userId}`;
  let schema = [];
  const oldSchema = localStorage.getItem(key);
  const schemaOrder = JSON.parse(oldSchema);

  // reorder column first
  const tmp_oldSchema = [];
  await fields.forEach(async (d, idx) => {
    if (oldSchema) {
      idx = schemaOrder.indexOf(d.accessor);
    }
    tmp_oldSchema[idx] = d;
    if (data) {
      tmp_oldSchema[idx].width = await getColumnWidth(data, d.accessor, d.Header, d.width || 70);
    }
  });

  // hide column
  if (columnHidden !== null && columnHidden !== undefined) {
    await tmp_oldSchema.forEach(async (d, idx) => {
      if (columnHidden.includes(d.accessor)) {
        return 0;
      }
      schema.push(d);
    });
  } else {
    schema = tmp_oldSchema;
  }

  // Edit Order Qty Supplier Portal 
  if ( editOrderQty === true) {
    const obj = {
      accessor: 'edit_qty',
      Header: 'Edit Qty',
      width: 130,
      headerStyle: { textAlign: 'left', marginLeft: '1rem' },
      sortable:false,
      Cell: (props) => (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 200, hide: 350 }}
          overlay={(
            <Tooltip id={`tooltip-bottom_orderQty_${props?.row._index}`} className='tooltip-remaining'>
              Remaining qty: 
              {' '}
              <strong>{props?.original.order_qty}</strong>
            </Tooltip>
          )}
        >
          <NumberFormat
            autoComplete="off"
            thousandSeparator
            style={{width:'100px', marginLeft: '1rem'}}
            className="input-in-table input-order-qty"
            value={props.value}
            decimalScale={0}
            id={`edit_qty_${props?.row._index}`}
            onFocusCapture={(e) => changeRowOnFocus({e, props, column: 'edit_qty', action:'onFocus'})}
            onChange={(e) => changeRowOnFocus({e, props, column: 'edit_qty', action:'onChange'})}
            onBlur={(e) => changeRowOnFocus({e, props, column: 'edit_qty', action:'onBlur'})}
            onMouseEnter={(e) => changeRowOnFocus({e, props, column: 'edit_qty', action: 'mouseEnter'})}
          />
        </OverlayTrigger>
      )
    };
    schema = [...schema, obj];
  }
  
  // Edit Order Qty Supplier Portal 
  if ( editCarton === true) {
    const obj = {
      accessor: 'edit_carton',
      Header: 'Edit Cartons',
      width: 130,
      headerStyle: { textAlign: 'left', marginLeft: '-0.5rem' },
      sortable:false,
      Cell: (props) => (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={(
            <Tooltip id={`tooltip-bottom_noOfCarton_${props?.row._index}`} className='tooltip-remaining'>
              Remaining qty: 
              {' '}
              <strong>{props?.original.no_of_carton}</strong>
            </Tooltip>
          )}
        >
          <NumberFormat
            autoComplete="off"
            thousandSeparator
            style={{width:'100px'}}
            className="input-in-table input-carton-qty"
            value={props.value}
            decimalScale={0}
            id={`edit_carton_${props?.row._index}`}
            onFocusCapture={(e) => changeRowOnFocus({e, props, column: 'edit_carton', action:'onFocus'})}
            onChange={(e) => changeRowOnFocus({e, props, column:'edit_carton', action: 'onChange'})}
            onBlur={(e) => changeRowOnFocus({e, props, column: 'edit_carton', action:'onBlur'})}
            onMouseEnter={(e) => changeRowOnFocus({e, props, column: 'edit_carton', action: 'mouseEnter'})}
          />
        </OverlayTrigger>
      )
      ,
    };
    schema = [...schema, obj];
  }

  // Edit & Rename Column button icon
  if (editColumn !== 'false') {
    const editBtn = (
      <div className="edit-column" onClick={showModal.bind(this, true)}>
        <i className="newIcon-edit_column" />
      </div>
    );
    const obj = {
      Header: editBtn,
      accessor: 'editBtn',
      width: 50,
      style: { textAlign: 'center' },
      sortable: false,
    };
    schema = [...schema, obj];
  }
  setNewSchema([...schema]);

};

export const setDraggableColumn = ({ fields }) => {
  const listHeader = fields.map((data) => {
    return data.accessor;
  });
  return listHeader;
};

export const saveSchemaToLocal = ({
  userId,
  schemaColumn,
  setNewSchema,
  draggedColumn,
  targetColumn,
  oldIndex,
  newIndex,
  module,
  dispatch
}) => {
  // get old schema from local storage data , if null then set schemaColumn as oldSchema
  const key = `tables__${module}__${userId}`;
  const newSchemaOrder = [];
  let oldSchema = localStorage.getItem(key) || null;
  if (oldSchema === null || oldSchema === undefined) {
    oldSchema = schemaColumn.map((data) => {
      return data.accessor;
    });
  } else {
    const tmp = oldSchema;
    oldSchema = JSON.parse(oldSchema);
  }
  const { length } = oldSchema;

  // move item from old schema to newschema
  newSchemaOrder[newIndex] = oldSchema[oldIndex];
  oldSchema.splice(oldIndex, 1);

  // reorder
  let i = 0;
  while (i < length) {
    if (i < newIndex) {
      // index before new index, position will same
      newSchemaOrder[i] = oldSchema[i];
    } else if (i == newIndex) {
      // index == newindex, abaikan
      i++;
      continue;
    } else {
      // index after newindex, index-1
      newSchemaOrder[i] = oldSchema[i - 1];
    }
    i++;
  }

  // set to local storage
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(newSchemaOrder));

  // set Local
};

export const markRow = ({props, markedRow, dispatch}) => {
  let arrayIdx = markedRow
  const idx = props?.rn - 1  
  if(arrayIdx.includes(idx) === false){
    arrayIdx.push(idx)
  }
  else if(arrayIdx.includes(idx)){
    arrayIdx = arrayIdx.filter(currentIdx => currentIdx !== idx)
  }

}
