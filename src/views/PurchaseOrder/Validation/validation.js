const headerValidation = (header) => {
    let required = []
    let ordNo = header.orderNo
    if(ordNo === null) ordNo = []
    if (!header.site) required.push(['site', 'site value must be entered'])
    if (!header.client) required.push(['client', 'client value must be entered'])
    if (!header.orderType) required.push(['orderType', 'order type value must be entered']) 
    if (ordNo.length === 0) required.push(['orderNo', 'order no cannot be empty'])
    if(ordNo.length < 4 && ordNo.length !== 0)
    {
        const ordNo = document.getElementById('orderNo')
        ordNo.focus()
        required.push(['orderNo', 'order no must have min 4 characters or more'])
    }
    if (!header.orderDate) required.push(['orderDate', 'order date must be entered'])

    if (required.length > 0) return required
    return []
}

const lineValidation = (line, idx) => {
    let required = []
    idx = idx+1
    const {
        product,
        productDescription,
        qty,
        uom,
        rotadate,
        batch,
        ref3,
        ref4,
        disposition,
        weight,
        orderDate
    } = line

    if(!product)
    {
        alert('please select product in line '+idx)
        return false
    }

    if(!qty)
    {
        alert('qty in line '+idx+' cannot be empty ')
        idx = idx-1
        idx = 'qty_'+idx
        const qty = document.getElementById(idx)
        qty.focus()
        return false
    }

    if(!weight)
    {
        alert('weight in line '+idx+' cannot be empty ')
        return false
    }

    if(!uom)
    {
        alert('please select uom in line '+idx)
        return false
    }
    return true
}

export { headerValidation, lineValidation }