const headerValidation = (header) => {
    let required = []
    let ordNo = header.orderNo
    if(ordNo === null) ordNo = []
    if (!header.site) required.push(['site', 'site value must be entered'])
    if (!header.client) required.push(['client', 'client value must be entered'])
    if (!header.orderType) required.push(['orderType', 'order type value must be entered']) 
    if (ordNo.length === 0) required.push(['orderNo', 'order no cannot be empty'])
    if(ordNo.length < 5 && ordNo.length !== 0)
    {
        const ordNo = document.getElementById('orderNo')
        ordNo.focus()
        required.push(['orderNo', 'order no must have min 5 characters or more'])
    }
    if (!header.orderDate) required.push(['orderDate', 'order date must be entered'])

    if (required.length > 0) return required
    return []
}

const lineValidation = (line, idx) => {
    idx = idx+1
    const {
        product,
        qty,
        uom,
    } = line

    if(!product || product == '')
    {
        return false
    }

    if(!qty || qty == '')
    {
        idx = idx-1
        idx = 'qty_'+idx
        const qty = document.getElementById(idx)
        qty.focus()
        return false
    }

    if(!uom || uom == '')
    {
        return false
    }
    return true
}

export { headerValidation, lineValidation }