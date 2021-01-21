export const setSite = ({ selected, dispatch, onChangeGetTask, getTask, getTaskParam, dropdownValue, setdropdownValue}) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.site = selected 
  else newDropdownValue.site = null

  if (onChangeGetTask) {
    getTask({ dispatch, client: getTaskParam?.client, site: selected });
  }
  setdropdownValue(newDropdownValue)
};

export const setClient = ({ selected, dispatch, onChangeGetTask, getTask, getTaskParam, dropdownValue, setdropdownValue}) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.client = selected 
  else newDropdownValue.client = null

  if (onChangeGetTask) {
    getTask({ dispatch, client: selected, site: getTaskParam?.site });
    setdropdownValue(newDropdownValue)
  }
};

export const setOrderType = ({ selected, dropdownValue, setdropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.orderType = selected 
  else newDropdownValue.orderType = null
  setdropdownValue(newDropdownValue)
};

export const setTask = ({ selected, dropdownValue, setdropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.task = selected 
  else newDropdownValue.task = null
  setdropdownValue(newDropdownValue)
};

export const setStatus = ({ selected, dropdownValue, setdropdownValue  }) => {
  // if (selected) dispatch({ type: 'STATUS', data: selected });
  // else dispatch({ type: 'STATUS', data: null });
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.status = selected 
  else newDropdownValue.status = null
  setdropdownValue(newDropdownValue)
};
