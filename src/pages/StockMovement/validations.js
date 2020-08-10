import _ from 'lodash'
export default (values) => {
  let error = {}
  let { periodSelected } = values
  if (!periodSelected.value) {
    error.periodSelected = 'Display Period must be selected'
  }
  
  return error
}
