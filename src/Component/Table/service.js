const getColumnWidth = (rows, accessor, headerText, minWidth) => {
  const maxWidth = 400;
  const magicSpacing = 10;
  const cellLength = Math.max(...rows.map((row) => (`${row[accessor]}` || '').length), headerText.length);
  const width = Math.min(maxWidth, cellLength * magicSpacing);
  if (minWidth > width) {
    return minWidth;
  } else {
    return width;
  }
};
export const renewColumn = ({ data, schemaColumn, module, userId }) => {
  // reorder column
  let key = `tables__${module}__${userId}`;
  let schema = [];
  const oldSchema = localStorage.getItem(key);
  const schemaOrder = JSON.parse(oldSchema);
  if (data) {
    schemaColumn.map(async (d, idx) => {
      if (oldSchema) {
        idx = schemaOrder.indexOf(d.accessor);
      }
      schema[idx] = d;
      schema[idx]['width'] = await getColumnWidth(data, d.accessor, d.Header, d.width || 0);
    });
  } else {
    schema = schemaColumn;
  }
  return schema;
};

export const old_renewColumn = ({ data, schemaColumn, module, userId }) => {
  // reorder column
  let key = `tables__${module}__${userId}`;
  let schema = [];
  const oldSchema = localStorage.getItem(key);
  if (oldSchema !== null && oldSchema !== undefined) {
    const schemaOrder = JSON.parse(oldSchema);
    schemaColumn.map((data) => {
      const schemaOrderIndex = schemaOrder.indexOf(data.accessor);
      schema[schemaOrderIndex] = data;
    });
  } else {
    if (data) {
      schemaColumn.map(async (d, idx) => {
        schema[idx] = d;
        schema[idx]['width'] = await getColumnWidth(data, d.accessor, d.Header, d.width || 0);
      });
    } else {
      schema = schemaColumn;
    }
    console.log(schema);
  }

  return schema;
};

export const setDraggableColumn = ({ schemaColumn }) => {
  const listHeader = schemaColumn.map((data) => {
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
  let key = `tables__${module}__${userId}`;
  let newSchemaOrder = [];
  let oldSchema = localStorage.getItem(key);
  if (oldSchema === null || oldSchema === undefined) {
    oldSchema = schemaColumn.map((data) => {
      return data.accessor;
    });
  } else {
    let tmp = oldSchema;
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
