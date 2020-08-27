import _ from 'lodash'
export default (thisState, changedColumn) => {
  console.log(thisState)
  console.log(changedColumn)
  let error = {}
  let { fields } = thisState
  changedColumn.map((tsData,i1) =>{
        changedColumn.map((ccData, i2) => {
          if(tsData.header === ccData.header && i1 !== i2) {
            error[tsData.headerData] = `${ccData.header} column cannot be the same name`
            // return error
          }
        })
})
//   if (!rename) {
//     error.rename = 'Rename column cannot be the same name'
//   }
  return error
}
