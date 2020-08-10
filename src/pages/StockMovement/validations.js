import _ from 'lodash'
export default (values) => {
  let error = {}
  let { periodSelected } = values
  if (!periodSelected.value) {
    error.periodSelected = 'Please select display period'
  }
  
  return error
}
