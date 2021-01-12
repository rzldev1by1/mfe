export const setSite = ({ selected, dispatch, onChangeGetTask, getTask, getTaskParam }) => {
  if (selected) dispatch({ type: 'SITE', data: selected });
  else dispatch({ type: 'SITE', data: null });

  if (onChangeGetTask) {
    getTask({ dispatch, client: getTaskParam?.client, site: selected });
  }
};

export const setClient = ({ selected, dispatch, onChangeGetTask, getTask, getTaskParam }) => {
  if (selected) dispatch({ type: 'CLIENT', data: selected });
  else dispatch({ type: 'CLIENT', data: null });

  if (onChangeGetTask) {
    getTask({ dispatch, client: selected, site: getTaskParam?.site });
  }
};

export const setOrderType = ({ selected, dispatch }) => {
  if (selected) dispatch({ type: 'ORDER_TYPE', data: selected });
  else dispatch({ type: 'ORDER_TYPE', data: null });
};

export const setTask = ({ selected, dispatch }) => {
  if (selected) dispatch({ type: 'TASK', data: selected });
  else dispatch({ type: 'TASK', data: null });
};

export const setStatus = ({ selected, dispatch }) => {
  if (selected) dispatch({ type: 'STATUS', data: selected });
  else dispatch({ type: 'STATUS', data: null });
};
