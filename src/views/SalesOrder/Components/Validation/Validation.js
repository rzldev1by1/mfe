
const headerValidation = (header) => {
  let error = []
    if(!header.site || header.site == '')
    {
        error.push(['site', 'please select site'])
    }
    if(!header.client || header.client == '')
    {
        error.push(['client', 'please select client'])
    }
    if(!header.orderType || header.orderType == '')
    {
        error.push(['order type', 'please select order type'])
    }
    if(!header.orderId || header.orderId == '')
    {
        document.getElementById('orderId').focus()      
        error.push(['order no', 'order no cannot be empty'])
    }
    if(header.orderId && header.orderId.length < 4)
    {
      document.getElementById('orderId').value = null
      document.getElementById('orderId').focus()
      error.push(['order no length', 'order no must have min 4 characters or more'])
    }
    if(!header.deliveryDate || header.deliveryDate == '')
    {
        error.push(['delivery date', ' Delivery Date must have a value'])
    }
    if(header.shipToAddress1 == null || header.shipToAddress1 == '')
    {
      document.getElementById('shipToAddress1').focus()
      error.push(['ship to address1', 'address 1 cannot be empty'])
    }
    if(header.postCode == null || header.postCode == '')
    {
      document.getElementById('postCode').focus()
      error.push(['post code', 'post code cannot be empty'])
    }
    if(header.postCode && header.postCode.length < 4)
    {
      document.getElementById('postCode').value = null
      document.getElementById('postCode').focus()
      error.push(['post code length', 'post code must have min, 4 characters or more'])
    }
    if(header.state == null || header.state == '')
    {
      document.getElementById('state').focus()
      error.push(['state', 'state cannot be empty'])
    }

    if(error.length > 0) return error
    else return true
}

const lineDetailValidation = (lineDetail, idx) => {
  let qty = document.getElementById('qty_'+idx)
  
  if(!lineDetail.product || lineDetail.product == '')
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