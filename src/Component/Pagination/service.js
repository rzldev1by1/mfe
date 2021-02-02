/* eslint-disable consistent-return */
/* eslint-disable radix */
import { getSummaryData } from '../../apiService';

export const onActivePageChange = ({ e, pagination, goto, dispatch, module }) => {
  const active = parseInt(e > 1 ? e : 1);
  let paramPaging = '';
  let paramType = '';
  if (module === 'StockHolding') {
    paramType = 'GET_SH_SUMMARY';
    paramPaging = 'PAGING_SH';
  }
  if (module === 'purchaseOrder') {
    paramType = 'GET_PO_SUMMARY';
    paramPaging = 'PAGING_PO';
  }
  if (module === 'salesOrder') {
    paramType = 'GET_SO_SUMMARY';
    paramPaging = 'PAGING_SO';
  }
  if (module === 'UserManagement') {
    paramType = 'GET_UM_SUMMARY';
    paramPaging = 'PAGING_UM';
  }
  dispatch({ type: paramType, data: [] });
  if (goto) {
    goto(active);
  } else {
    dispatch({ type: paramPaging || 'PAGING', data: { ...pagination, active } });
  }
  getSummaryData({ dispatch, active: active, module });
};

export const goToPage = ({ goto, pagination, page, setPage, dispatch, module }) => {
  const newPage = { ...page };
  let paramPaging = '';
  let paramType = '';
  if (module === 'StockHolding') {
    paramType = 'GET_SH_SUMMARY';
    paramPaging = 'PAGING_SH';
  }
  if (module === 'purchaseOrder') {
    paramType = 'GET_PO_SUMMARY';
    paramPaging = 'PAGING_PO';
  }
  if (module === 'salesOrder') {
    paramType = 'GET_SO_SUMMARY';
    paramPaging = 'PAGING_SO';
  }
  if (module === 'UserManagement') {
    paramType = 'GET_UM_SUMMARY';
    paramPaging = 'PAGING_UM';
  }
  dispatch({ type: paramType, data: [] });

  if (newPage.goPage === 0 || newPage.goPage === null || newPage.goPage === '' || newPage.goPage === undefined) {
    return false;
  }

  if (newPage.goPage > pagination.last_page) {
    newPage.notifPaging = true;
    setPage(newPage);
    return 0;
  }
  if (goto) {
    goto(newPage.goPage);
  } else {
    dispatch({ type: paramPaging || 'PAGING', data: { ...pagination, active: newPage.goPage } });
  }
  getSummaryData({ dispatch, active: newPage.goPage, module });
};

export const onChange = ({ e, page, setPage }) => {
  const newPage = { ...page };
  if (e.target.value === '') {
    newPage.goPage = '';
    setPage(newPage);
  } else {
    newPage.goPage = parseInt(e.target.value);
    setPage(newPage);
  }
};

export const numberCheck = (e) => {
  if (!/^[0-9]+$/.test(e.key)) {
    e.preventDefault();
  }
};
