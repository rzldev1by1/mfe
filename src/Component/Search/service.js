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
  if (selected) {
    newDropdownValue.client = selected 
  }
  else {
    newDropdownValue.client = null
    newDropdownValue.task = []
  }

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

export const setStyle = ({ selected, dropdownValue, setdropdownValue  }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.style = selected 
  else newDropdownValue.style = null
  setdropdownValue(newDropdownValue)
};

export const setStyleDesc = ({ selected, dropdownValue, setdropdownValue  }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.styleDesc = selected 
  else newDropdownValue.styleDesc = null
  setdropdownValue(newDropdownValue)
};

export const setColor = ({ selected, dropdownValue, setdropdownValue  }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.color = selected 
  else newDropdownValue.color = null
  setdropdownValue(newDropdownValue)
};

export const setDimensions = ({ selected, dropdownValue, setdropdownValue  }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.dimensions = selected 
  else newDropdownValue.dimensions = null
  setdropdownValue(newDropdownValue)
};

export const setSize = ({ selected, dropdownValue, setdropdownValue  }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.size = selected 
  else newDropdownValue.size = null
  setdropdownValue(newDropdownValue)
};