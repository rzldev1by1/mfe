import _ from 'lodash'
export default (values) => {
  let error = {}
  let { site, client, orderId, orderType, deliveryDate, shipToAddress1, postCode, state, orderLine } = values
  if (!site) {
    error.site = 'Site must be entered'
  }
  if (!orderId) {
    error.orderId = 'Order Number must be entered'
  }
  if (!!orderId && orderId.length < 4 && orderId.length > 12) {
    error.postCode = 'Order Number must have min 4 characters'
  }
  if (!orderType) {
    error.orderType = 'Order Type must be entered'
  }
  if (!client) {
    error.client = 'Client must be entered'
  }
  if (!deliveryDate) {
    error.deliveryDate = 'Delivery Date must be entered'
  }
  if (!shipToAddress1) {
    error.shipToAddress1 = 'Address 1 must be entered'
  }
  if (!postCode) {
    error.postCode = 'Postcode must be entered'
  }
  if (!!postCode && postCode.length < 4) {
    error.postCode = 'Postcode must have min 4 characters'
  }
  if (!state) {
    error.state = 'State must be entered'
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
      if (!object.uom) {
        error.orderLine[i].uom = 'Uom must be entered' 
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
