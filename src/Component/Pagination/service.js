export const onChange = ({page, setPage, e}) => {
    let newPage = { ...page }
    if (e.target.value === '') {
        newPage.PagingPage = ''
        setPage(newPage)
    }
    else {
        newPage.PagingPage = parseInt(e.target.value)
        setPage(newPage)
    }
  };

export const numberCheck = (e) => {
    var tmpChar = e.key;
    if (!/^[0-9]+$/.test(e.key)) {
      e.preventDefault()
    }
  }
