const setSite = ({ selected, dispatch }) => {
    if (selected) dispatch({ type: 'SITE', data:selected })
}

const setClient = ({ selected, dispatch }) => {
    if (selected) dispatch({ type: 'CLIENT', data: selected })
}

const setOrderType = ({selected, dispatch}) => {
    if (selected) dispatch({type:'ORDER_TYPE', data: selected})
}

const setTask = ({selected, dispatch}) => {
    if (selected) dispatch({type:'TASK', data:selected})
}

const setStatus = ({selected, dispatch}) => {
    if (selected) dispatch({type:'STATUS', data:selected})
}

export {setSite, setClient, setOrderType, setTask, setStatus}