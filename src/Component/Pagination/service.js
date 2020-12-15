export const onChange = ({page, setPage, e}) => {
    const newPage = { ...page }
    if (e.target.value === '') {
        newPage.PagingPage = ''
        setPage(newPage)
    }
    else {
       const targetValue = e.target.value
        newPage.PagingPage = parseFloat(targetValue)
        setPage(newPage)
    }
  };

export const numberCheck = (e) => {
    if (!/^[0-9]+$/.test(e.key)) {
      e.preventDefault()
    }
  }
