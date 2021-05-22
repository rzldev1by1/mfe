import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const changeColor = ({e, props, column, isInvalidOrderQty, dispatch}) => {   
    const elementOrderQty = document.getElementById(`order_qty_${props?.row._index}`);
    const elementEditQty = document.getElementById(`edit_qty_${props?.row._index}`);
    const elementPackFactor = document.getElementById(`packfactor_1_${props?.row._index}`);
    const elementEditCarton = document.getElementById(`edit_cartons_${props?.row._index}`);

    if (column === 'order_qty' && e.target.value > props?.original.order_qty){
      elementOrderQty.style.color = 'red';
      elementEditQty.classList.add("outOfRemaining-input");
    } else {
      elementPackFactor.style.color = 'orange';
      elementOrderQty.style.color = 'orange';
      elementEditQty.classList.add("remaining-input");
    }
    if (column === 'packfactor_1'){
      if( e.target.value > props?.original.packfactor_1){
        elementPackFactor.style.color = 'red';
        elementEditCarton.classList.add("outOfRemaining-input");
      }else{
        elementPackFactor.style.color = 'orange';
        elementOrderQty.style.color = 'orange';
        elementEditCarton.classList.add("remaining-input");
      }
    }
}

const blurColor = ({props}) => {
  document.getElementById(`order_qty_${props?.row._index}`).style.color = 'black';
  document.getElementById(`packfactor_1_${props?.row._index}`).style.color = 'black';
}

const renderTooltipRename = ({field, props}) => (
  <Tooltip id='edit-qty-tooltip' onClickCapture={() => false}>
    Remaining qty: 
    {' '}
    <span>{field === 'edit_qty' ? props?.original.order_qty : props?.original.packfactor_1 }</span>
  </Tooltip>
);

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
  isInvalidOrderQty,
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

  let cc = false
  // Edit Order Qty Supplier Portal 
  if ( editOrderQty === true) {
    const obj = {
      accessor: 'edit_qty',
      placeholder: 'Edit Qty',
      Header: 'Edit Qty',
      width: 130,
      headerStyle: { textAlign: 'left', marginLeft: '1rem' },
      sortable:false,
      Cell: (props) => (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipRename({field:'edit_qty', props})}
        >
          <input id={`edit_qty_${props?.row._index}`} className='input-in-table' style={{width:'100px', marginLeft: '1rem'}} onFocusCapture={(e) => changeColor({e, props, column: 'order_qty', cc})} onBlur={() => blurColor({props})} onChange={(e) => changeColor({e, props, column:'order_qty', isInvalidOrderQty, dispatch})} />
        </OverlayTrigger>
      )
      ,
    };
    schema = [...schema, obj];
  }
  

   // Edit Order Qty Supplier Portal 
   if ( editCarton === true) {
    const obj = {
      accessor: 'edit_cartons',
      placeholder: 'Edit Carton',
      Header: 'Edit Cartons',
      headerStyle: { textAlign: 'left', marginLeft: '-1rem', justifyContent: 'end' },
      sortable:false,
      width: 120,
      Cell: (props) => (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipRename('edit_cartons', props)}
        >
          <input id={`edit_cartons_${props?.row._index}`} value={ props.value } className='input-in-table' style={{width:'100px'}} onFocusCapture={(e) => changeColor({e, props, column: 'packfactor_1'})} onBlur={() => blurColor({props})} onChange={(e) => changeColor({e, props, column:'packfactor_1'})} />
        </OverlayTrigger>
    ),
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
  // dispatch({ type: 'REORDER', data: true });

  // set to local storage
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(newSchemaOrder));

  // set Local
};
