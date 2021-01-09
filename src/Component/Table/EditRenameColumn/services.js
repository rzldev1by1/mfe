import validations from '../../../shared/table/validations'

export const showColumn = ({header,  length, editColumn, setState}) => {
  const max = (length - Object.keys(editColumn).length) > 1
  const hide = !editColumn.includes(header) // true || false  
 
  if (hide && max) { 
    editColumn.push(header)  
    setState({editColumn})

  } else if ((!hide && max) || (!max && !hide)) {  
    const tmpIndex = editColumn.indexOf(header);
    editColumn.splice(tmpIndex, 1);  
    setState({editColumn})
  }  
}

export const saveEdit = ({editColumn, title, user, setState, setShowModal, dispatch}) => {
  const savedTableColumns = localStorage.getItem("tableColumns") ? JSON.parse(localStorage.getItem("tableColumns")) : []; 
  const hiddenColumn = Object.values(editColumn); 
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
  setState({editColumnTemp: editColumn})
  setShowModal(false)
  try { 
    dispatch({type:'CHANGE_HEADER', data:true})
  } catch (e){
    console.log(e)
  }
}

export const changedColumn = ({e, state, setState, fields}) => {
  const {error, sameColumns, sameColumnsIdx} = validations(state, e.target.value, e.target.id, fields)
  const {changedColumns} = state;

  setState({error, sameColumns, sameColumnsIdx })
  
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
    setState({changedColumns})
  }
};
 