export const setSite = ({ selected, action, dispatch }) => {
  if (selected) dispatch({ type: 'SITE', data: selected });
  else dispatch({ type: 'SITE', data: null });
};

export const setClient = ({ selected, dispatch }) => {
  if (selected) dispatch({ type: 'CLIENT', data: selected });
  else dispatch({ type: 'CLIENT', data: null });
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
