export const setSite = ({ selected, dispatch, onChangeGetTask, getTask, getTaskParam, dropdownVelue, setdropdownVelue}) => {
  const newDropdownVelue = { ...dropdownVelue };
  if (selected) newDropdownVelue.site = selected 
  else newDropdownVelue.site = null

  if (onChangeGetTask) {
    getTask({ dispatch, client: getTaskParam?.client, site: selected });
  }
  setdropdownVelue(newDropdownVelue)
};

export const setClient = ({ selected, dispatch, onChangeGetTask, getTask, getTaskParam, dropdownVelue, setdropdownVelue}) => {
  const newDropdownVelue = { ...dropdownVelue };
  if (selected) newDropdownVelue.client = selected 
  else newDropdownVelue.client = null

  if (onChangeGetTask) {
    getTask({ dispatch, client: selected, site: getTaskParam?.site });
    setdropdownVelue(newDropdownVelue)
  }
};

export const setOrderType = ({ selected, dispatch, dropdownVelue, setdropdownVelue }) => {
  const newDropdownVelue = { ...dropdownVelue };
  if (selected) newDropdownVelue.orderType = selected 
  else newDropdownVelue.orderType = null
  setdropdownVelue(newDropdownVelue)
};

export const setTask = ({ selected, dispatch, dropdownVelue, setdropdownVelue }) => {
  const newDropdownVelue = { ...dropdownVelue };
  if (selected) newDropdownVelue.task = selected 
  else newDropdownVelue.task = null
  setdropdownVelue(newDropdownVelue)
};

export const setStatus = ({ selected, dispatch, dropdownVelue, setdropdownVelue  }) => {
  // if (selected) dispatch({ type: 'STATUS', data: selected });
  // else dispatch({ type: 'STATUS', data: null });
  const newDropdownVelue = { ...dropdownVelue };
  if (selected) newDropdownVelue.status = selected 
  else newDropdownVelue.status = null
  setdropdownVelue(newDropdownVelue)
};
