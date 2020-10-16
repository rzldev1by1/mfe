import _ from 'lodash'
export default (values) => {
  let error = {}
  let { site, client, orderId, orderType, deliveryDate, shipToAddress1, postCode, state, orderLine, orderStatus } = values
  if (!site.value) {
    error.site = 'Site must be entered'
  }
  if (!orderId) {
    error.orderId = 'Order Number must be entered'
  }
  if(orderStatus !== true && orderId){
    error.orderId = 'Order number exist'
  }
  if (!client.value) {
    error.orderId = 'Please select client first'
  }
  if (!!orderId && orderId.length < 4 && orderId.length > 12) {
    error.postCode = 'Order Number must have min 4 characters'
  }
  if (!orderType.value) {
    error.orderType = 'Order Type must be entered'
  }
  if (!client.value) {
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
      
    //   const weightArray = object?.weight?.split('')
    //   if(object?.weight?.length > 0){
    //     if(weightArray[weightArray.length - 1] === '.' || weightArray[weightArray.length - 1] === '.' ){
    //       error.orderLine[i].weight = 'Incorrect number format'
    //     }
    //   }

      if (!object.productVal) {
        error.orderLine[i].productVal = 'Product must be entered'
      }
      if (!object.qty) {
        error.orderLine[i].qty = 'Qty must be entered' 
      }else if (object.qty == 0) {
        error.orderLine[i].qty = 'Qty cannot be 0'
      }
      if (!object.uom) {
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
