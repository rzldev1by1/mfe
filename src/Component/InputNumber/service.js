export const  numberCheck = ({e, comma}) => {
    tmpChar = e.key;
    if (!comma && !/^[0-9]+$/.test(e.key)) {
      e.preventDefault()
    } else if (comma && !/^[0-9.]|[\b]+$/.test(e.key)) {
      e.preventDefault()
    }
  }