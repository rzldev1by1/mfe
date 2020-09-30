import _ from 'lodash'
export default (values) => {
  let error = {}
  let { site, client, orderId, orderType, orderDate, shipToAddress1, postCode, state, orderLine, } = values
  if (!site.value) {
    error.site = 'Site must be entered'
  }
  if (!orderId) {
    error.orderId = 'Order Number must be entered'
  }
  if (!orderType) {
    error.orderType = 'Order Type must be entered'
  }
  if (!client.value) {
    error.client = 'Client must be entered'
  }
  if (!orderDate) {
    error.orderDate = 'Order Date must be entered'
  }

  if (orderLine.length) {
    error.orderLine = []
    for (let i = 0; i < orderLine.length; i++) {
      const object = orderLine[i];
      error.orderLine[i] = {}
      if (!object.productVal) {
        error.orderLine[i].productVal = 'Product must be entered'
      }
      if (!object.qty) {
        error.orderLine[i].qty = 'Qty must be entered'
      }
      if (!object?.uom?.value) {
        error.orderLine[i].uom = 'UOM must be entered'
      }
      if (Object.keys(error.orderLine[i]).length < 1) {
        error.orderLine = []
      }
    }
    if (error.orderLine.length < 1 || (error.orderLine.length === 1 && !error.orderLine[0])) {
      delete error.orderLine
    }
  }if (orderLine.length < 1 ){
    error.deleteMs = 'At least one line is required to continue'
  }

  return error
}
