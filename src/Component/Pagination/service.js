/* eslint-disable consistent-return */
/* eslint-disable radix */
export const  onActivePageChange = ({e, pagination, goto, dispatch, module}) => {
  const active = parseInt(e > 1 ? e : 1);
  let paramPaging = '';
  if (module === 'StockHolding')paramPaging = 'PAGING_SH';
  if (module === 'Purchase Orders')paramPaging = 'PAGING_PO';
  if (module === 'Sales Orders')paramPaging = 'PAGING_SO';

  if (goto) {
    goto(active)
  } else {
    dispatch({type: paramPaging ||'PAGING', data:{ ...pagination, active }})
  }
};

export const goToPage = ({goto, pagination,page, setPage, dispatch, module}) => {
  const newPage = { ...page }
  let paramPaging = '';
  if (module === 'StockHolding')paramPaging = 'PAGING_SH';
  if (module === 'Purchase Orders')paramPaging = 'PAGING_PO';
  if (module === 'Sales Orders')paramPaging = 'PAGING_SO';

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
    dispatch({type: paramPaging ||'PAGING', data:{ ...pagination, active: newPage.goPage}})
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
