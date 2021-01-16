import _ from 'lodash'

export default (state, renameField, indexField) => {
  const { fields, sameColumns, sameColumnsIdx, error } = state
  console.log(fields);

  fields.map((item, idx) => {
    if(idx !== indexField){
        if(renameField && renameField?.toUpperCase() === item?.Header?.toUpperCase()){
            sameColumns.push(item?.Header?.toUpperCase())
            sameColumnsIdx.push(indexField)
        }
        
    }
  })

  if(!sameColumns.includes(renameField?.toUpperCase())){
      sameColumnsIdx.filter(value => value !== indexField)
  }

  if(Object.keys(sameColumnsIdx).length !== 0){
    if(indexField){
        error[fields[indexField].headerData] = `Columns cannot contain the same name`
        console.log(Object.keys(sameColumnsIdx).length !== 0);
        console.log(sameColumnsIdx);
        console.log(error);
    }

  }else{
    // error = {}
  }

  console.log(sameColumnsIdx);
  console.log(error);
  return {error, sameColumns, sameColumnsIdx}
}
