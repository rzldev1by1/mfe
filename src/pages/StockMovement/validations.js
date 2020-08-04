import _ from 'lodash'
export default (values) => {
  let error = {}
  let { periods } = values
  if (!periods.value) {
    error.periods = 'Please select display period'
  }
  
  return error
}
