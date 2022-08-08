import axios from 'axios';
import validations from './validations';
import endpoints from '../../../helpers/endpoints';

export const showColumn = ({ header, length, setState, state }) => {
  const max = length - Object.keys(state.editColumn).length > 1;
  const hide = !state.editColumn.includes(header); // true || false
  const newState = { ...state };
  if (hide && max) {
    state.editColumn.push(header);
    newState.editColumn = state.editColumn;
    setState(newState);
  } else if ((!hide && max) || (!max && !hide)) {
    const tmpIndex = state.editColumn.indexOf(header);
    state.editColumn.splice(tmpIndex, 1);
    newState.editColumn = state.editColumn;
    setState(newState);
  }
};

export const saveEdit = ({ state, title, user, setEditColumnTemp, setShowModal, dispatch }) => {
  const savedTableColumns = localStorage.getItem('tableColumns')
    ? JSON.parse(localStorage.getItem('tableColumns'))
    : [];
  const hiddenColumn = Object.values(state.editColumn);
  if (savedTableColumns.length > 0) {
    savedTableColumns.forEach((data, index) => {
      if (data.title === title) {
        savedTableColumns.splice(index, 1);
      }
    });
    savedTableColumns.push({
      userId: user.userId,
      title,
      columns: hiddenColumn,
    });
  } else {
    savedTableColumns.push({
      userId: user.userId,
      title,
      columns: hiddenColumn,
    });
  }

  localStorage.setItem('tableColumns', JSON.stringify(savedTableColumns));

  setEditColumnTemp(state.editColumn);
  setShowModal(false);
  try {
    dispatch({ type: 'CHANGE_HEADER', data: true });
  } catch (e) {
    console.log(e)
  }
};

export const changedColumn = ({ e, state, setState, fields, defaults, id, name }) => {
  let value = e?.target?.value;
  let ids = e?.target?.id
  let names = e?.target?.name
  if (defaults) {
    value = defaults
    ids = id
    names = name
    document.getElementById(ids).value = value
  }
  const newVal = { ...state };
  const split = value.split(' ');
  if (split.length > 1) {
    const join = [];
    split.map((val) => (val?.length !== 0 ? join.push(val) : null));
    value = join.join(' ');
  }

  const { newError, newSameColumns, newSameColumnsIdx } = validations(state, value, ids, fields);
  const { changedColumns } = state;
  newVal.error = newError;
  newVal.sameColumns = newSameColumns;
  newVal.sameColumnsIdx = newSameColumnsIdx;
  setState(newVal);

  if (Object.keys(newError).length !== 0) {
    return null;
  }

  if (value.length > 0) {
    changedColumns.forEach((item, idx) => {
      if (item.headerData) {
        if (item.headerData === names) {
          changedColumns.splice(idx, 1);
        }
      }
    });

    changedColumns[ids] = {
      headerData: names,
      header: value,
    };
    newVal.changedColumns = changedColumns;
    setState(newVal);
  }
};

export const headerRename = async ({ UrlHeader, fields, setFields, data }) => {
  const dataSum = data
  if (UrlHeader) {
    const url = UrlHeader();
    const { data } = await axios.get(url);
    const newFields = [];
    const accessor = fields.map((dataX) => { return dataX.accessor });
    const style = fields.map((dataX) => { return dataX.style });
    const Cell = fields.map((dataX) => { return dataX.Cell });
    const placeholder = fields.map((dataX) => { return dataX.placeholder })
    const width = fields.map((dataX) => { return dataX.width })
    const space = fields.map((dataX) => { return dataX.space })
    const align = fields.map((dataX) => { return dataX.align })

    const sortable = fields.map((dataX) => {
      let hiddenSort
      if (dataSum) {
        if (dataSum.length > 1) hiddenSort = dataX.sortable
        if (dataSum.length === 1) hiddenSort = false
        else hiddenSort = dataX.sortable
      } else {
        hiddenSort = dataX.sortable
      }
      return hiddenSort;
    });
    const sortType = fields.map((dataX) => {
      let split;
      if (dataX.sortType) {
        split = dataX.sortType;
      } else {
        split = null;
      }
      return split;
    });

    const headerData = Object.keys(data[0]);
    accessor.forEach((accessorNew, idx) => {
      const lowerCase = accessorNew.toLowerCase();
      if (lowerCase.includes(' ')) {
        const split = lowerCase.split(' ');
        const result = split.join('_');
        accessor[idx] = result;
      } else {
        accessor[idx] = lowerCase;
      }
    });

    Object.values(data[0]).forEach((dataHeader, idx) => {
      const headerTable = {
        accessor: '',
        Header: '',
        Cell: [],
        headerData,
        placeholder: '',
        width: null,
        space: null,
        style: null,
        sortable: false,
        align: null,
      };
      headerTable.Header = dataHeader;
      headerTable.placeholder = placeholder[idx];
      headerTable.accessor = accessor[idx];
      headerTable.Cell = Cell[idx];
      headerTable.headerData = headerData[idx];
      headerTable.width = width[idx];
      headerTable.space = space[idx];
      headerTable.align = align[idx];
      headerTable.style = style[idx];
      headerTable.sortable = sortable[idx];
      if (sortType[idx]) {
        headerTable.sortType = sortType[idx];
      }
      newFields.push(headerTable);
    });
    if (data.length) {
      setFields(newFields);
    }
  }
};

const renameSubmits = async ({ state, UrlAll, fields, setFields }) => {
  const { changedColumns } = state;
  const changedField = changedColumns;
  const changedFieldHeaderData = [];
  const changedFieldHeader = [];
  const newState = { ...state };

  changedField.forEach((item) => {
    changedFieldHeaderData.push(item.headerData);
    changedFieldHeader.push(item.header);
  });

  const ni = fields.map((item) => {
    changedFieldHeaderData.forEach((data, idx) => {
      if (item.Header === data) {
        item.Header = changedFieldHeader[idx];
      }
    });
    return item;
  });

  setFields(ni);

  const payload = {};
  ni.forEach((obj) => {
    payload[obj.headerData.replaceAll(' ', '_').toLowerCase()] = obj.Header;
  });
  newState.columnsPayload = payload;
  const baseUrl = endpoints.env.REACT_APP_API_URL;
  try {
    const urlAll = await axios.post(baseUrl + UrlAll(), payload);
    console.log(urlAll)
  } catch (error) {
    console.log(error);
  }
};

export const renameSubmit = ({ state, setState, setShowMod, UrlAll, fields, setFields }) => {
  const { newError, newSameColumns, newSameColumnsIdx } = validations(state, fields);
  const newState = { ...state };

  if (Object.keys(newError).length) {
    newState.error = newError;
    newState.sameColumns = newSameColumns;
    newState.sameColumnsIdx = newSameColumnsIdx;
    setState(newState);
  } else {
    renameSubmits({ state, setState, UrlAll, fields, setFields });
    setShowMod(false);
    newState.error = {};
    setState(newState);
  }
};

export const resetColumnName = async ({ user, splitModule }) => {
  const baseUrl = endpoints.env.REACT_APP_API_URL;
  const version = endpoints.env.REACT_APP_API_URL_VERSION;
  const { data, status } = await axios.post(`${baseUrl}/${version}/settings/field-label/${splitModule}/reset?client=${user?.client}`)
  console.log(data, status)
  window.location.reload()
}

export const resetColumnTable = ({ module, user, dragStatus, dispatch }) => {
  if (dragStatus) {
    localStorage.removeItem(`tables__${module}__${user.name}`);
    dispatch({ type: 'DRAG_STATUS', data: false });
    window.location.reload();
  }
}
