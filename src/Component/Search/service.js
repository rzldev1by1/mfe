const setSite = ({ selected, dispatch }) => {
    if (selected) dispatch({ type: 'SITE', site:selected })
}

const setClient = ({ selected, dispatch }) => {
    if (selected) dispatch({ type: 'CLIENT', client: selected })
}

export {setSite, setClient}