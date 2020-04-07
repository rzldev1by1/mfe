
const headerValidation = (header) => {
    if(!header.site || header.site == '')
    {
        alert('site cannot be empty')
        return false
    }

    return true
}

export{headerValidation}