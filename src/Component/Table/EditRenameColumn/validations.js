import { isEmptyObject } from 'jquery';

export default (state, renameField, indexField, fields) => {
  const { sameColumns, sameColumnsIdx, error } = state;
  let newerror = error;
  const newsameColumns = sameColumns;
  let newsameColumnsIdx = sameColumnsIdx;
  const idxField = parseInt(indexField, 10);
  if (fields) {
    fields.forEach((item, idx) => {
      if (idx !== idxField) {
        if (renameField && renameField?.toUpperCase() === item?.Header?.toUpperCase()) {
          newsameColumns.push(item?.Header?.toUpperCase());
          newsameColumnsIdx.push(indexField);
        }
      }
      if (idx === idxField) {
        if (renameField?.toUpperCase() === item?.Header?.toUpperCase()) {
          newsameColumns.push(item?.Header?.toUpperCase());
          newsameColumnsIdx.push(indexField);
        }
      }
      if (!newsameColumns.includes(renameField?.toUpperCase())) {
        newsameColumnsIdx = newsameColumnsIdx.filter((value) => value !== idxField);
      }
      if (!isEmptyObject(newsameColumnsIdx)) {
        if (idxField || idxField === 0) {
          newerror[fields[indexField].Header] = `Columns cannot contain the same name`;
        }
      } else {
        newerror = {};
      }
    });
  }
  return { newerror, newsameColumns, newsameColumnsIdx };
};
