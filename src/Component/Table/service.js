/* eslint-disable no-param-reassign */
import React from 'react';

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
  dispatch
}) => {
  const key = `tables__${module}__${userId}`;
  let schema = [];
  const oldSchema = localStorage.getItem(key);
  const schemaOrder = JSON.parse(oldSchema);
  const tmpOldSchema = [];
  const defaultSchema = [];
  await fields.forEach(async (d, idx) => {
    if (oldSchema) {
      idx = schemaOrder.indexOf(d.accessor);
      defaultSchema.push(d.accessor)
    }
    tmpOldSchema[idx] = d;
    if (data) {
      tmpOldSchema[idx].width = await getColumnWidth(data, d.accessor, d.Header, d.width || 70);
    }
  });

  if (schemaOrder?.toString() !== defaultSchema?.toString() && schemaOrder && defaultSchema) dispatch({ type: 'DRAG_STATUS', data: true });
  else dispatch({ type: 'DRAG_STATUS', data: false });

  if (columnHidden !== null && columnHidden !== undefined) {
    await tmpOldSchema.forEach((d) => {
      if (columnHidden.includes(d.accessor)) {
        return 0;
      }
      return schema.push(d);
    });
  } else {
    schema = tmpOldSchema;
  }

  if (editColumn !== 'false' && module !== 'SupplierManagementDetail') {
    const editBtn = (
      <div className="edit-column" onClick={() => showModal(true)} aria-hidden="true">
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
  oldIndex,
  newIndex,
  module,
}) => {
  const key = `tables__${module}__${userId}`;
  const newSchemaOrder = [];
  let oldSchema = localStorage.getItem(key) || null;
  if (oldSchema === null || oldSchema === undefined) {
    oldSchema = schemaColumn.map((data) => {
      return data.accessor;
    });
  } else {
    oldSchema = JSON.parse(oldSchema);
  }
  const { length } = oldSchema;

  const movedColumn = oldSchema[oldIndex];
  oldSchema.splice(oldIndex, 1);

  let i = 0;
  while (i < length) {
    if (i < newIndex) {
      newSchemaOrder[i] = oldSchema[i];
    } else if (i === newIndex) {
      newSchemaOrder[i] = movedColumn;
    } else {
      newSchemaOrder[i] = oldSchema[i-1];
    }
    i += 1;
  }
  
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(newSchemaOrder));
};