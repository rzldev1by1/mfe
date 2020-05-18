const headerValidation = (header) => {
    let required = []
    let ordNo = header.orderNo
    if(ordNo === null) ordNo = []
    if (!header.site) required.push(['site', 'Site value must be entered'])
    if (!header.client) required.push(['client', 'Client value must be entered'])
    if (!header.orderType) required.push(['orderType', 'Order type value must be entered']) 
    if (ordNo.length === 0) required.push(['orderNo', 'Order no cannot be empty'])
    if(ordNo.length < 5 && ordNo.length !== 0)
    {
        const ordNo = document.getElementById('orderNo')
        ordNo.focus()
        required.push(['orderNo', 'Order No must have min 5 characters or more'])
    }
    if (!header.orderDate) required.push(['orderDate', 'Order date must be entered'])

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