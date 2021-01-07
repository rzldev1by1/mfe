import { isEmptyObject } from 'jquery'
import validations from './validations'

const showColumn = (header, index, length, editColumn, setEditColumn) => {
  const max = (length - Object.keys(editColumn).length) > 1
  const hide = editColumn[index] === undefined

  if (hide && max) {
    // hide column
    const obj = {
      [index]: header
    }

    const addColumn = {
      ...editColumn,
      ...obj
    }

    setEditColumn(addColumn)

  } else if ((!hide && max) || (!max && !hide)) {
    // show column
    const deleteColumn = {
      ...editColumn
    }
    delete deleteColumn[index]

    setEditColumn(deleteColumn)
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
  // dispatch({type:'CHANGE_HEADER', data:'true'})
}

export { showColumn }