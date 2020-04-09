
const headerValidation = (header) => {
    if(!header.site || header.site == '')
    {
        alert('site cannot be empty')
        return false
    }
    if(!header.client || header.client == '')
    {
        alert('client cannot be empty')
        return false
    }
    if(!header.orderType || header.orderType == '')
    {
        alert('order type cannot be empty')
        return false
    }
    if(!header.orderId || header.orderId == '')
    {
        alert('order No cannot be empty') 
        document.getElementById('orderId').focus()      
        return false
    }
    if(header.orderId.length < 4)
    {
      alert('Order No must have min, 4 characters or more')
      document.getElementById('orderId').value = null
      document.getElementById('orderId').focus()
      return false
    }
    if(!header.deliveryDate || header.deliveryDate == '')
    {
        alert('delivery date cannot be empty')
        return false
    }


    if(header.customerVal == null || header.customerVal == '')
    {
      alert('customer cannot be empty')
      return
    }
    if(header.shipToAddress1 == null || header.shipToAddress1 == '')
    {
      alert('address 1 cannot be empty')
      document.getElementById('shipToAddress1').focus()
      return
    }
    if(header.postCode == null || header.postCode == '')
    {
      alert('post code cannot be empty')
      document.getElementById('postCode').focus()
      return
    }
    if(header.postCode.length < 4)
    {
      alert('post code must have min, 4 characters or more')
      document.getElementById('postCode').value = null
      document.getElementById('postCode').focus()
      return
    }
    if(header.state == null || header.state == '')
    {
      alert('state cannot be empty')
      document.getElementById('state').focus()
      return
    }

    return true
}

const lineDetailValidation = (lineDetail, idx) => {
  let qty = document.getElementById('qty_'+idx)
  
  if(!lineDetail.productVal || lineDetail.productVal == '')
  {
    alert('product in line '+idx+' must be choosen')
    return false 
  }
  if(!lineDetail.qty || lineDetail.qty == '')
  {
    alert('quantity in line '+idx+' cannot be empty')    
    qty.focus()
    qty.value = null
    return false
  }
  if(lineDetail.qty.includes('-') || lineDetail.qty.includes('e'))
  {
    alert('please insert number format in line '+idx)
    qty.focus()
    qty.value = null
    return false
  }

  if(!lineDetail.uom || lineDetail.uom == '')
  {
    alert('uom in line '+idx+' must be choosen')
    return false
  }
  
  return true
} 

export{headerValidation, lineDetailValidation}