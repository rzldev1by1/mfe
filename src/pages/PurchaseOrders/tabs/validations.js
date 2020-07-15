import _ from 'lodash'
export default (values) => {
  let error = {}
  let { site, client, orderId, orderType, orderDate, shipToAddress1, postCode, state, orderLine } = values
  if (!site) {
    error.site = 'Please select site'
  }
  if (!orderId) {
    error.orderId = 'Order No. cannot be empty'
  }
  if (!orderType) {
    error.orderType = 'Please select order type'
  }
  if (!client) {
    error.client = 'Please select client'
  }
  if (!orderDate) {
    error.orderDate = 'Order date must have a value'
  }
  if (!shipToAddress1) {
    error.shipToAddress1 = 'Address 1 cannot be empty'
  }
  if (!postCode) {
    error.postCode = 'Postcode cannot be empty'
  }
  if (!!postCode && postCode.length < 4) {
    error.postCode = 'Postcode must have min 4 characters'
  }
  if (!state) {
    error.state = 'State cannot be empty'
  }

  if (orderLine.length) {
    error.orderLine = []
    for (let i = 0; i < orderLine.length; i++) {
      const object = orderLine[i];
      error.orderLine[i] = {}
      if (!object.productVal) {
        error.orderLine[i].productVal = 'Product cannot be empty'
      }
      if (!object.qty) {
        error.orderLine[i].qty = 'Qty cannot be empty'
      }
      if (!object.uom) {
        error.orderLine[i].uom = 'UOM cannot be empty'
      }
      if (Object.keys(error.orderLine[i]).length < 1) {
        error.orderLine.splice(i, 1)
      }
    }
    if (error.orderLine.length < 1 || (error.orderLine.length === 1 && !error.orderLine[0])) {
      error = {}
    }
  }

  return error
}
