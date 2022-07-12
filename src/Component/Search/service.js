/* eslint-disable no-param-reassign */
export const setSite = ({ selected, dispatch, onChangeGetTask, getTask, getTaskParam, dropdownValue, setDropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.site = selected
  else newDropdownValue.site = null

  if (onChangeGetTask) {
    getTask({ dispatch, client: getTaskParam?.client, site: selected });
  }
  setDropdownValue(newDropdownValue)
};

export const setClient = ({ selected, dispatch, onChangeGetTask, getTask, getTaskParam, dropdownValue, setDropdownValue }) => {
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
    setDropdownValue(newDropdownValue)
  }
};

export const setOrderType = ({ selected, dropdownValue, setDropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.orderType = selected
  else newDropdownValue.orderType = null
  setDropdownValue(newDropdownValue)
};

export const setTask = ({ selected, dropdownValue, setDropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.task = selected
  else newDropdownValue.task = null
  setDropdownValue(newDropdownValue)
};

export const setStatus = ({ selected, dropdownValue, setDropdownValue }) => {
  // if (selected) dispatch({ type: 'STATUS', data: selected });
  // else dispatch({ type: 'STATUS', data: null });
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.status = selected
  else newDropdownValue.status = null
  setDropdownValue(newDropdownValue)
};

export const setStyle = ({ selected, dropdownValue, setDropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.style = selected
  else newDropdownValue.style = null
  setDropdownValue(newDropdownValue)
};

export const setStyleDesc = ({ selected, dropdownValue, setDropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.styleDesc = selected
  else newDropdownValue.styleDesc = null
  setDropdownValue(newDropdownValue)
};

export const setColor = ({ selected, dropdownValue, setDropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.color = selected
  else newDropdownValue.color = null
  setDropdownValue(newDropdownValue)
};

export const setDimensions = ({ selected, dropdownValue, setDropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.dimensions = selected
  else newDropdownValue.dimensions = null
  setDropdownValue(newDropdownValue)
};

export const setSize = ({ selected, dropdownValue, setDropdownValue }) => {
  const newDropdownValue = { ...dropdownValue };
  if (selected) newDropdownValue.size = selected
  else newDropdownValue.size = null
  setDropdownValue(newDropdownValue)
};

export const handleFullFillMarked = ({ dispatch, spDetailTable, clearMarked, setShowFulfillMod }) => {
  let newArray = [...spDetailTable]
  newArray = newArray.map((data) => {
    const isMarkeds = data.isMarked
    if (isMarkeds) {
      data.edit_qty = clearMarked ? '' : data.order_qty
      data.edit_carton = clearMarked ? '' : data.no_of_carton
      if (clearMarked) {
        data.isMarked = false
        data.isInvalidOrderCarton = false
        data.isInvalidOrderQty = false
      }
    }
    return data
  });

  dispatch({ type: 'GET_SP_DETAIL_TABLE', data: newArray })
  setShowFulfillMod(false)
}