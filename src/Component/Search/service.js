export const setSite = ({ selected, dispatch }) => {
    if (selected) dispatch({ type: 'SITE', data:selected })
}

export const setClient = ({ selected, dispatch }) => {
    if (selected) dispatch({ type: 'CLIENT', data: selected })
}

export const setOrderType = ({selected, dispatch}) => {
    if (selected) dispatch({type:'ORDER_TYPE', data: selected})
}

export const setTask = ({selected, dispatch}) => {
    if (selected) dispatch({type:'TASK', data:selected})
}

export const setStatus = ({selected, dispatch}) => {
    if (selected) dispatch({type:'STATUS', data:selected})
}
