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
    console.log(e)
  }
}

export const changedColumn = ({e, state, setState}) => {
  console.log(state);
  const {error, sameColumns, sameColumnsIdx} = validations(state, e.target.value, e.target.id, setState)
  const {changedColumns} = state;
  const newState = {...state}
  newState.error = error
  newState.sameColumns = sameColumns
  newState.sameColumnsIdx = sameColumnsIdx
  setState(newState);

  if(Object.keys(error).length === 0){
      return null
  }

  if (e.target.value.length > 0) {
    changedColumns.map((item, idx) => {
      if (item.headerData) {
        if (item.headerData === e.target.name) {
          changedColumns.splice(idx, 1);
        }
      }
    });

    changedColumns[e.target.id] = {
      headerData: e.target.name,
      header: e.target.value,
    }

    newState.changedColumns = changedColumns

    setState(newState);
  }
};

const renameSubmits = async ({state, setState}) => {
  console.log(state);
  const {fields, changedColumns, products} = state;
  const changedField = changedColumns;
  const changedFieldHeaderData = [];
  const changedFieldHeader = [];
  const newState = {...state}

  changedField.map((item, idx) => {
    changedFieldHeaderData.push(item.headerData);
    changedFieldHeader.push(item.header);
  });

  fields.map((item, idx) => {
    changedFieldHeaderData.map((data, idx) => {
      if (item.headerData === data) {
        item.Header = changedFieldHeader[idx];
      }
    });
  });

  newState.fields = fields
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

  const newPayload = {};

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
      baseUrl + this.props.UrlAll(),
      payload
    );
    
    const { data } = urlAll;
  } catch (error) {
    // console.log(error);
  }
};

export const renameSubmit = ({ state, setState, setShowMod }) => {
  const {error, sameColumns, sameColumnsIdx } = validations(state)
  const newState = {...state}

  if (Object.keys(error).length) {
    newState.error = error
    newState.sameColumns = sameColumns
    newState.sameColumnsIdx = sameColumnsIdx
    setState(newState)
  } else{
    renameSubmits({state, setState});
    setShowMod(false)
    newState.error = {}
    setState(newState);
  }
  
};
 