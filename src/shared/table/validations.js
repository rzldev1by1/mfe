import _ from 'lodash'
import { isEmptyObject } from 'jquery';
export default (thisState, changedColumn, renameField, indexField) => {
  console.log(thisState)
  console.log(changedColumn)
  let { fields, sameColumns, sameColumnsIdx, error } = thisState
  fields.map((item, idx) => {
    if(idx !== indexField){
        if(renameField && renameField?.toUpperCase() === item?.Header?.toUpperCase()){
            sameColumns.push(item?.Header?.toUpperCase())
            sameColumnsIdx.push(indexField)
        }
        
    }
  })
      if(!sameColumns.includes(renameField?.toUpperCase())){
          sameColumnsIdx = sameColumnsIdx.filter(value => value != indexField)
      }
  if(!isEmptyObject(sameColumnsIdx)){
    if(indexField){
        error[fields[indexField].headerData] = `Columns cannot contain the same name`
    }
  }else{
    error = {}
  }
  return {error, sameColumns, sameColumnsIdx}
}
