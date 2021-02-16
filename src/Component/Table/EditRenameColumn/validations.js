export default (state, renameField, indexField, fields) => {
  const { sameColumns, sameColumnsIdx, error } = state;
  let newerror = error;
  let newsameColumns = sameColumns;
  let newsameColumnsIdx = sameColumnsIdx;
  if (fields) {
    fields.map((item, idx) => {
      const idxField = parseInt(indexField, 10);
      if (idx === idxField && renameField === item?.Header) {
        newerror[fields[indexField].Header] = `Columns cannot contain the same name`;
        newsameColumns.push(item?.Header);
        newsameColumnsIdx.push(indexField);
      } else if (idx === idxField && renameField !== item?.Header) {
        delete newerror[fields[indexField].Header];
        const i = newsameColumnsIdx.indexOf(indexField);
        delete newsameColumnsIdx[i];
      }
    });
  }

  return { newerror, newsameColumns, newsameColumnsIdx };
};
