import _ from 'lodash'
export default (values) => {
  let error = {}
  let { rename } = values
  if (!rename) {
    error.rename = 'Rename column cannot be the same name'
  }
  return error
}
