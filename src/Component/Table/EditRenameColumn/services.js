 

export const showColumn = ({header,  length, editColumn, setEditColumn}) => {
  const max = (length - Object.keys(editColumn).length) > 1
  const hide = !editColumn.includes(header) // true || false  
 
  if (hide && max) { 
    editColumn.push(header)  
    setEditColumn(editColumn)

  } else if ((!hide && max) || (!max && !hide)) {  
    let tmpIndex = editColumn.indexOf(header);
    editColumn.splice(tmpIndex, 1);  
    setEditColumn(editColumn)
  }  
}

export const saveEdit = ({editColumn, title, user, setEditColumnTemp, setShowModal, dispatch}) => {
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
  setEditColumnTemp(editColumn)
  setShowModal(false)
  try { 
    dispatch({type:'CHANGE_HEADER', data:true})
  } catch (e){
    console.log(e)
  }
}
 