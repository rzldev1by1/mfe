export default (state, renameField, indexField) => {
  const { fields, sameColumns, sameColumnsIdx, error } = state
  let newerror = error 
  let newsameColumns = sameColumns
  let newsameColumnsIdx = sameColumnsIdx
  fields.map((item, idx) => {
    const idxField = parseInt(indexField,10)
    if(idx === idxField && renameField?.toUpperCase() === item?.Header?.toUpperCase()){
      newerror[fields[indexField].Header] = `Columns cannot contain the same name`
      newsameColumns.push(item?.Header?.toUpperCase())
      newsameColumnsIdx.push(indexField)
    }
    else if(idx === idxField && renameField?.toUpperCase() !== item?.Header?.toUpperCase()){
      delete newerror[fields[indexField].Header]
      const i = newsameColumnsIdx.indexOf(indexField)
      delete newsameColumnsIdx[i]
    }
  })
  return {newerror, newsameColumns, newsameColumnsIdx}
}