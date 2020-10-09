import _ from 'lodash'
export default (values) => {
  let error = {}
  let { filterType, startDate, endDate } = values
  if (!filterType.value) {
    error.filterType = 'Display Period must be selected'
  }
  if(endDate < startDate){
      error.endDate = "Must not older than Date From"
  }
  return error
}
