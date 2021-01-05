const setSite = ({ selected, dispatch }) => {
    if (selected) dispatch({ type: 'SITE', data:selected })
}

const setClient = ({ selected, dispatch }) => {
    if (selected) dispatch({ type: 'CLIENT', data: selected })
}

export {setSite, setClient}