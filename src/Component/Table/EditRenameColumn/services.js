import axios from 'axios';
import validations from './validations'

export const showColumn = ({header,  length, setState, state}) => {
  const max = (length - Object.keys(state.editColumn).length) > 1
  const hide = !state.editColumn.includes(header) // true || false  
  const newState = {...state}

  if (hide && max) { 
    state.editColumn.push(header)
    newState.editColumn = state.editColumn
    setState(newState)
  } else if ((!hide && max) || (!max && !hide)) {  
    const tmpIndex = state.editColumn.indexOf(header);
    state.editColumn.splice(tmpIndex, 1); 
    newState.editColumn = state.editColumn 
    setState(newState)
  }  
}

export const saveEdit = ({state, title, user, setEditColumnTemp, setShowModal, dispatch}) => {
  const savedTableColumns = localStorage.getItem("tableColumns") ? JSON.parse(localStorage.getItem("tableColumns")) : []; 
  const hiddenColumn = Object.values(state.editColumn); 

  if (savedTableColumns.length > 0) { 
    savedTableColumns.map((data, index) => {
      if (data.title === title) {  
        savedTableColumns.splice(index, 1);
      }
    })
    savedTableColumns.push({
      userId: user.userId,
      title,
      columns: hiddenColumn
    })
  } else { 
    savedTableColumns.push({
      userId: user.userId,
      title,
      columns: hiddenColumn
    })
  }

  localStorage.setItem("tableColumns", JSON.stringify(savedTableColumns))
  
  setEditColumnTemp(state.editColumn)
  setShowModal(false)
  try { 
    dispatch({type:'CHANGE_HEADER', data:true})
  } catch (e){
  }
}

export const changedColumn = ({e, state, setState}) => {
    let {value} = e.target
    const newVal = {...state}
    const split = value.split(" ");
    if(split.length > 1){
        const join = []
        split.map((val) => val?.length !== 0 ? join.push(val) : null)
        value = join.join(" ")
    }
    const {newerror, newsameColumns, newsameColumnsIdx} = validations(state, value, e.target.id)
    const {changedColumns} = state;
    newVal.error = newerror
    newVal.sameColumns = newsameColumns
    newVal.sameColumnsIdx = newsameColumnsIdx
    setState(newVal);
    
    if(Object.keys(newerror).length !== 0){
        return null
    }

    if (value.length > 0) {
      changedColumns.map((item, idx) => {
        if (item.headerData) {
          if (item.headerData === e.target.name) {
            changedColumns.splice(idx, 1);
          }
        }
      });

      changedColumns[e.target.id] = {
        headerData: e.target.name,
        header: value,
      }
      newVal.changedColumns = changedColumns
      setState(newVal)
    }
};

const renameSubmits = async ({state, setState, UrlAll}) => {
  const {fields, changedColumns, products} = state;
  const changedField = changedColumns;
  const changedFieldHeaderData = [];
  const changedFieldHeader = [];
  const newState = {...state}

  changedField.map((item, idx) => {
    changedFieldHeaderData.push(item.headerData);
    changedFieldHeader.push(item.header);
  });

  const ni = fields.map((item, idx) => {
    changedFieldHeaderData.map((data, idx) => {
      if (item.Header === data) {
        
        item.Header = changedFieldHeader[idx];
      }
    });
    return item
  });

  newState.fields = ni
  setState(newState);

  const payload = {};
  const payloadIndex = Object.keys(products);
  const defaultValues = Object.values(products);
  const fieldsHeaderData = changedFieldHeaderData;

  fieldsHeaderData.map((data, idx) => {
    if (data.includes(' ')) {
      const uppercaseHeaderData = data.toUpperCase();
      const index = uppercaseHeaderData.split(' ');
      fieldsHeaderData[idx] = index.join('_');
    } else {
      fieldsHeaderData[idx] = data.toUpperCase();
    }
  });

  payloadIndex.map((data, idx) => {
    if (data.includes(' ')) {
      const uppercaseHeaderData = data;
      const index = uppercaseHeaderData.split(' ');
      payloadIndex[idx] = index.join('_');
    }
  });

  for (let i = 0; i < Object.keys(products).length; i++) {
    fieldsHeaderData.map((data, idx) => {
      if (payloadIndex[i] === data) {
        payload[payloadIndex[i]] = changedFieldHeader[idx];
        payloadIndex.splice(i, 1);
        defaultValues.splice(i, 1);
      }
    });
  }

  payloadIndex.map((data, idx) => {
    payload[data] = defaultValues[idx];
  });

  newState.columnsPayload = payload
  setState(newState);

  const baseUrl = process.env.REACT_APP_API_URL;
  try {
    const urlAll = await axios.post(
      baseUrl + UrlAll(),
      payload
    );
    
  } catch (error) {
  }
};

export const renameSubmit = ({ state, setState, setShowMod, UrlAll }) => {
  const {newerror, newsameColumns, newsameColumnsIdx } = validations(state)
  const newState = {...state}

  if (Object.keys(newerror).length) {
    newState.error = newerror
    newState.sameColumns = newsameColumns
    newState.sameColumnsIdx = newsameColumnsIdx
    setState(newState)
  } else{
    renameSubmits({state, setState, UrlAll});
    setShowMod(false)
    newState.error = {}
    setState(newState);
  }
  
};
 