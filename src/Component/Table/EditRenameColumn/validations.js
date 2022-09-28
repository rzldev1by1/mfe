import { isEmptyObject } from 'jquery';

export default (state, renameField, indexField, fields) => {
  const { sameColumns, sameColumnsIdx, error } = state;
  let newError = error;
  const newSameColumns = sameColumns;
  let newSameColumnsIdx = sameColumnsIdx;
  const idxField = parseInt(indexField, 10);
  if (fields) {
    fields.forEach((item, idx) => {
      if (idx !== idxField) {
        if (renameField && renameField?.toUpperCase() === item?.Header?.toUpperCase()) {
          newSameColumns.push(item?.Header?.toUpperCase());
          newSameColumnsIdx.push(indexField);
        }
      }
      if (idx === idxField) {
        if (renameField?.toUpperCase() === item?.Header?.toUpperCase()) {
          newSameColumns.push(item?.Header?.toUpperCase());
          newSameColumnsIdx.push(indexField);
        }
      }
      if (!newSameColumns.includes(renameField?.toUpperCase())) {
        newSameColumnsIdx = newSameColumnsIdx.filter((value) => value !== idxField);
      }
      if (!isEmptyObject(newSameColumnsIdx)) {
        if (idxField || idxField === 0) {
          newError[fields[indexField].Header] = `Columns cannot contain the same name`;
        }
      } else {
        newError = {};
      }
    });
  }
  return { newError, newSameColumns, newSameColumnsIdx };
};
