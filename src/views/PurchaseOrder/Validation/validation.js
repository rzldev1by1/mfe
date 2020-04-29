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
    alert(line.toString())
    return true
}

export { headerValidation, lineValidation }