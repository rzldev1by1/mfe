import _ from 'lodash'
export default (values) => {
  let error = {}
  let { site, client, orderId, orderType, orderDate, shipToAddress1, postCode, state, orderLine, orderStatus } = values
  if (!site.value) {
    error.site = 'Site must be entered'
  }
  if(orderStatus !== true && orderId){
    error.orderId = 'Order number exist'
  }
  if (!client) {
    error.orderId = 'Please select client first'
    // return this.setState({ error }) && false
  }
  if (!orderId) {
    error.orderId = 'Order Number must be entered'
  }
  if (orderId?.length < 4) {
    error.orderId = 'Order no. must have min 4 characters'
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
      
    //   const weightArray = object?.weight?.split('')
    //   if(weightArray[weightArray.length - 1] === '.' || weightArray[weightArray.length - 1] === '.' ){
    //     error.orderLine[i].weight = 'Incorrect number format'
    //   }
      
      if (!object.qty) {
        error.orderLine[i].qty = 'Qty must be entered'
      }else if (object.qty == 0) {
        error.orderLine[i].qty = 'Qty cannot be 0'
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
