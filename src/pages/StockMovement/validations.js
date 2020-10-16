import _ from 'lodash'
export default (values) => {
  let error = {}
  let { filterType, startDate, endDate } = values
  if (!filterType.value) {
    error.filterType = 'Display Period must be selected'
  }
  if(!startDate){
    error.startDate = "Please select a valid date"
  }
  if(!endDate){
    error.endDate = "Please select a valid date"
  }
  if(endDate < startDate){
      error.endDate = "Please select a valid date"
  }
  return error
}
