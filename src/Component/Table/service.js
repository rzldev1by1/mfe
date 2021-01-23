import React from 'react';

const getColumnWidth = (rows, accessor, headerText, minWidth) => {
  const maxWidth = 400;
  const magicSpacing = 10;
  const cellLength = Math.max(...rows.map((row) => (`${row[accessor]}` || '').length), headerText.length);
  const width = Math.min(maxWidth, cellLength * magicSpacing);
  if (minWidth > width) {
    return minWidth;
  }
  return width;
};

export const renewColumn = ({ data, fields, module, userId, editColumn, showModal, columnHidden }) => {
  // reorder column
  const key = `tables__${module}__${userId}`;
  let schema = [];
  const oldSchema = localStorage.getItem(key);

  const schemaOrder = JSON.parse(oldSchema);

  if (data) {
    if (columnHidden !== null && columnHidden !== undefined) {
      fields.map((datas) => {
        if (columnHidden.includes(datas.accessor)) {
          return 0;
        }
        schema.push(datas);
      });
    } else {
      fields.map(async (d, idx) => {
        if (oldSchema) {
          idx = schemaOrder.indexOf(d.accessor);
        }
        schema[idx] = d;
        schema[idx].width = await getColumnWidth(data, d.accessor, d.Header, d.width || 0);
      });
    }
  } else {
    schema = fields;
  }

  // Edit & Rename Column button icon
  if (editColumn !== 'false') {
    const editBtn = (
      <div className="edit-column" onClick={showModal.bind(this, true)}>
        <i className="iconU-edit" />
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

  return schema;
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
  draggedColumn,
  targetColumn,
  oldIndex,
  newIndex,
  module,
}) => {
  // get old schema from local storage data , if null then set schemaColumn as oldSchema
  const key = `tables__${module}__${userId}`;
  const newSchemaOrder = [];
  let oldSchema = localStorage.getItem(key);
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
};
