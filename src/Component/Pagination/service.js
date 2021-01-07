/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable radix */
export const  onActivePageChange = ({e, pagination, goto, dispatch}) => {
  const active = parseInt(e > 1 ? e : 1);
  if (goto) {
    goto(active)
  } else {
    dispatch({type:'PAGING', data:{ ...pagination, active }})
  }
};

export const goToPage = ({goto, pagination,page, setPage, dispatch}) => {
  const newPage = { ...page }
  if (newPage.goPage === 0 || newPage.goPage === null || newPage.goPage === '' || newPage.goPage === undefined) {
    return false;
  }

  if (newPage.goPage > pagination.last_page) {
    newPage.notifPaging = true
    setPage(newPage)
    return 0
  }

  if (goto) {
    goto(newPage.goPage);
  } else {
    dispatch({type:'PAGING', data:{ ...pagination, active: newPage.goPage}})
  }
};

export const   onChange = ({e, page, setPage}) => {
  const newPage = { ...page }
  if (e.target.value === '') {
    newPage.goPage = ''
    setPage(newPage)
  }
  else {
    newPage.goPage =  parseInt(e.target.value)
    setPage(newPage)
  }
};

export const numberCheck = (e) => {
    if (!/^[0-9]+$/.test(e.key)) {
      e.preventDefault()
    }
  }
