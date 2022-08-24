export const changeValue = ({ selected, dispatch, setAllFilter, allFilter, onChangeGetTask, getTask, getTaskParam, columns }) => {
  const newFilter = { ...allFilter }
  if (selected) newFilter[columns] = selected
  else newFilter[columns] = null

  if (columns === 'client') dispatch({ type: setAllFilter, data: { ...allFilter, task: [] } });

  dispatch({ type: setAllFilter, data: newFilter });
  if (onChangeGetTask) getTask({ dispatch, client: getTaskParam?.client, [columns]: selected });
};

export const changeDropdown = ({ selected, dispatch, setAllFilter, allFilter, dropName, dataHidden }) => {
  if (dataHidden) {
    const newAllFilter = { ...allFilter }
    newAllFilter[dropName] = selected
    newAllFilter.typeDate = dataHidden.accessor
    dispatch({ type: setAllFilter, data: newAllFilter });
  } else if (selected) dispatch({ type: setAllFilter, data: { ...allFilter, [dropName]: selected } });
  else dispatch({ type: setAllFilter, data: { ...allFilter, [dropName]: null } });
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

export const showFilter = ({ item, columnFilter, setColumnFilter, setValidResetFilter }) => {
  const dateFilter = ['dateReceived', 'dateReleased', 'dateReleased', 'dateCompleted', 'orderDate', 'deliveryDate']
  columnFilter.forEach(data => {
    if (data.accessor === item.accessor) {
      if (dateFilter.includes(data.accessor)) {
        if (data.hiddenFilter) data.hiddenFilter = false
        else {
          columnFilter.forEach(dataDate => {
            if (dateFilter.includes(dataDate.accessor)) dataDate.hiddenFilter = false
          })
          data.hiddenFilter = true
        }
      } else {
        data.hiddenFilter = !item.hiddenFilter
      }
    }
  });
  setValidResetFilter(false)
  setColumnFilter(columnFilter)
}

export const resetFilter = ({ module, filterHidden, dispatch, setShowModal, columnFilter, setColumnFilter, setAllFilter, allFilter }) => {
  const newAllFilter = { ...allFilter }
  columnFilter.forEach(data => { data.hiddenFilter = false })
  filterHidden.forEach(data => { data.hiddenFilter = false })
  localStorage.setItem(`filterHidden_${module}`, JSON.stringify(filterHidden));
  newAllFilter.site = ''
  newAllFilter.client = ''
  newAllFilter.orderType = ''
  newAllFilter.status = ''
  newAllFilter.task = ''
  newAllFilter.fromDate = ''
  newAllFilter.toDate = ''
  setColumnFilter(columnFilter)
  dispatch({ type: 'CHANGE_FILTER', data: true });
  setShowModal(false)
  dispatch({ type: setAllFilter, data: newAllFilter });
}

export const saveFilterSearch = ({ module, dispatch, columnFilter }) => {
  localStorage.setItem(`filterHidden_${module}`, JSON.stringify(columnFilter));
  dispatch({ type: 'CHANGE_FILTER', data: true });
}

export const closeModalFilter = ({ setColumnFilter, module, setShowModal, setChangeFilter, showModal, setValidResetFilter, utils }) => {
  const dataDefault = JSON.parse(localStorage.getItem(`filterHidden_${module}`));
  if (dataDefault) setColumnFilter(dataDefault);
  else setColumnFilter(utils[`${module}FilterSearch`]);
  setShowModal(!showModal);
  setChangeFilter(true);
  setValidResetFilter(true)
}

export const allModule = {
  StockHolding: {
    paramType: 'GET_SH_SUMMARY',
    filterType: 'FILTER_DATA_SH',
    getFilterType: 'shFilter'
  },
  purchaseOrder: {
    paramType: 'GET_PO_SUMMARY',
    filterType: 'FILTER_DATA_PO',
    getFilterType: 'poFilter'
  },
  salesOrder: {
    paramType: 'GET_SO_SUMMARY',
    filterType: 'FILTER_DATA_SO',
    getFilterType: 'soFilter'
  },
  UserManagement: {
    paramType: 'GET_UM_SUMMARY',
  },
  SupplierManagement: {
    paramType: 'GET_SP_SUMMARY',
  },
}
