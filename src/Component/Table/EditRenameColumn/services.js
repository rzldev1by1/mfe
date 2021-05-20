import axios from 'axios';
import validations from './validations';

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
    savedTableColumns.map((data, index) => {
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
  } catch (e) {}
};

export const changedColumn = ({ e, state, setState, fields,defaults,id,name }) => {
  let value = e?.target?.value;
  let ids = e?.target?.id
  let names = e?.target?.name
  if(defaults){
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

  const { newerror, newsameColumns, newsameColumnsIdx } = validations(state, value, ids, fields);
  const { changedColumns } = state;
  newVal.error = newerror;
  newVal.sameColumns = newsameColumns;
  newVal.sameColumnsIdx = newsameColumnsIdx;
  setState(newVal);
  if (Object.keys(newerror).length !== 0) {
    return null;
  }

  if (value.length > 0) {
    changedColumns.map((item, idx) => {
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

export const headerRename = async ({ UrlHeader, state, setState, fields, setFields }) => {
  const newVal = { ...state };

  if (UrlHeader) {
    const url = UrlHeader();
    const { data } = await axios.get(url);
    const newfields = [];
    const accessor = fields.map((datas) => {
      const split = datas.accessor;
      return split;
    });
    const style = fields.map((datas) => {
      const split = datas.style;
      return split;
    });
    const Cell = fields.map((datas) => {
      const split = datas.Cell;
      return split;
    });
    const placeholder = fields.map((datas) => {
      const split = datas.placeholder;
      return split;
    });
    const width = fields.map((datas) => {
      const split = datas.width;
      return split;
    });
    const space = fields.map((datas) => {
      const split = datas.space;
      return split;
    });
    const align = fields.map((datas) => {
      const split = datas.align;
      return split;
    });
    const sortable = fields.map((datas) => {
      const split = datas.sortable;
      return split;
    });
    const sortType = fields.map((datas) => {
      let split;
      if (datas.sortType) {
        split = datas.sortType;
      } else {
        split = null;
      }
      return split;
    });

    const headerData = Object.keys(data[0]);
    accessor.map((data, idx) => {
      const lowerCase = data.toLowerCase();
      if (lowerCase.includes(' ')) {
        const split = lowerCase.split(' ');
        const result = split.join('_');
        accessor[idx] = result;
      } else {
        accessor[idx] = lowerCase;
      }
    });

    Object.values(data[0]).map((data, idx) => {
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
      headerTable.Header = data;
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
      newfields.push(headerTable);
    });
    if (data.length) {
      // newVal.products = data.data[0]
      // newVal.fields = newfields
      setFields(newfields);
      // setState(newVal);
    }
  }
};

const renameSubmits = async ({ state, UrlAll, fields, setFields }) => {
  const { changedColumns } = state;
  const changedField = changedColumns;
  const changedFieldHeaderData = [];
  const changedFieldHeader = [];
  const newState = { ...state };

  changedField.map((item) => {
    changedFieldHeaderData.push(item.headerData);
    changedFieldHeader.push(item.header);
  });

  const ni = fields.map((item) => {
    changedFieldHeaderData.map((data, idx) => {
      if (item.Header === data) {
        item.Header = changedFieldHeader[idx];
      }
    });
    return item;
  });

  setFields(ni);

  let payload = {};
  ni.map((obj) => {
    payload[obj.headerData.replaceAll(' ', '_').toLowerCase()] = obj.Header;
  });
  newState.columnsPayload = payload;
  const baseUrl = process.env.REACT_APP_API_URL;
  try {
    const urlAll = await axios.post(baseUrl + UrlAll(), payload);
  } catch (error) {
    console.log(error);
  }
};

export const renameSubmit = ({ state, setState, setShowMod, UrlAll, fields, setFields }) => {
  const { newerror, newsameColumns, newsameColumnsIdx } = validations(state, fields);
  const newState = { ...state };

  if (Object.keys(newerror).length) {
    newState.error = newerror;
    newState.sameColumns = newsameColumns;
    newState.sameColumnsIdx = newsameColumnsIdx;
    setState(newState);
  } else {
    renameSubmits({ state, setState, UrlAll, fields, setFields });
    setShowMod(false);
    newState.error = {};
    setState(newState);
  }
};

export const resetColumnName = async({user,splitModule}) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const {data, status} = await axios.post(`${baseUrl}/settings/field-label/${splitModule}/reset?client=${user?.client}`)
  window.location.reload()
}

export const resetColumnTable = ({module, user, fields, state}) => {
  const currentOrderColumn = localStorage.getItem(`tables__${module}__${user.name}`)
  ? JSON.parse(localStorage.getItem(`tables__${module}__${user.name}`))
  : [];
  let templateColumn = []
  fields.map((data) => {
    templateColumn.push(data.accessor)
  });
   if(JSON.stringify(currentOrderColumn) !== JSON.stringify(templateColumn)){
    localStorage.removeItem(`tables__${module}__${user.name}`);
    window.location.reload();
  }
}
