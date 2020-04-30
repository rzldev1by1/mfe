const headerValidation = (header) => {
    let required = []
    if (!header.site) required.push(['site', 'please select site'])
    if (!header.client) required.push(['client', 'please select client'])
    if (!header.orderType) required.push(['orderType', 'please select ordertype'])
    if (!header.orderNo) required.push(['orderNo', 'order no must be filled'])
    if (!header.orderDate) required.push(['orderDate', 'please choose orderdate'])

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