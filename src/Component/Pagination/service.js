import { getSummaryData, getForecast, getDetailData } from '../../apiService';

export const goToPage = ({ goto, pagination, page, setPage, dispatch, module, props, searchFilter, user }) => {
  const newPage = { ...page };
  let paramPaging = '';
  let paramType = '';
  switch (module) {
    case 'StockHolding':
      paramType = 'GET_SH_SUMMARY';
      paramPaging = 'PAGING_SH';
      break;
    case 'purchaseOrder':
      paramType = 'GET_PO_SUMMARY';
      paramPaging = 'PAGING_PO';
      break;
    case 'salesOrder':
      paramType = 'GET_SO_SUMMARY';
      paramPaging = 'PAGING_SO';

      break;
    case 'UserManagement':
      paramType = 'GET_UM_SUMMARY';
      paramPaging = 'PAGING_UM';

      break;
    case 'StockHoldingForecast':
      paramType = 'GET_SH_DETAIL_FORESCAST';
      paramPaging = 'PAGING_SH_FORECAST';

      break;
    case 'StockHoldingDetail':
      paramType = 'GET_SH_DETAIL_TABLE';
      paramPaging = 'PAGING_SH_DETAIL';
      break;
    case 'PurchaseOrdersDetail':
      paramType = 'GET_PO_DETAIL_TABLE';
      paramPaging = 'PAGING_PO_DETAIL';
      break;
    case 'SalesOrdersDetail':
      paramType = 'GET_SO_DETAIL_TABLE';
      paramPaging = 'PAGING_SO_DETAIL';
      break;
    case 'SupplierManagement':
      paramType = 'GET_SP_SUMMARY';
      paramPaging = 'PAGING_SP';
      break;
    case 'SupplierManagementDetail':
      paramType = 'GET_SP_DETAIL_TABLE';
      paramPaging = 'PAGING_SP_DETAIL';
      break;
  }

  // if (module === 'StockHolding') {
  //   paramType = 'GET_SH_SUMMARY';
  //   paramPaging = 'PAGING_SH';
  // }
  // if (module === 'purchaseOrder') {
  //   paramType = 'GET_PO_SUMMARY';
  //   paramPaging = 'PAGING_PO';
  // }
  // if (module === 'salesOrder') {
  //   paramType = 'GET_SO_SUMMARY';
  //   paramPaging = 'PAGING_SO';
  // }
  // if (module === 'UserManagement') {
  //   paramType = 'GET_UM_SUMMARY';
  //   paramPaging = 'PAGING_UM';
  // }
  // if (module === 'StockHoldingForecast') {
  //   paramType = 'GET_SH_DETAIL_FORESCAST';
  //   paramPaging = 'PAGING_SH_FORECAST';
  // }
  // if (module === 'StockHoldingDetail') {
  //   paramType = 'GET_SH_DETAIL_TABLE';
  //   paramPaging = 'PAGING_SH_DETAIL';
  // }
  // if (module === 'PurchaseOrdersDetail') {
  //   paramType = 'GET_PO_DETAIL_TABLE';
  //   paramPaging = 'PAGING_PO_DETAIL';
  // }
  // if (module === 'SalesOrdersDetail') {
  //   paramType = 'GET_SO_DETAIL_TABLE';
  //   paramPaging = 'PAGING_SO_DETAIL';
  // }
  // if (module === 'SupplierManagement') {
  //   paramType = 'GET_SP_SUMMARY';
  //   paramPaging = 'PAGING_SP';
  // }
  // if (module === 'SupplierManagementDetail') {
  //   paramType = 'GET_SP_DETAIL_TABLE';
  //   paramPaging = 'PAGING_SP_DETAIL';
  // }

  if (newPage.goPage === 0 || newPage.goPage === null || newPage.goPage === '' || newPage.goPage === undefined) {
    return false;
  }

  if (newPage.goPage > pagination.last_page) {
    newPage.notifPaging = true;
    setPage(newPage);
    return 0;
  }
  dispatch({ type: paramType, data: [] });

  if (goto) {
    goto(newPage.goPage);
  } else {
    dispatch({ type: paramPaging || 'PAGING', data: { ...pagination, active: newPage.goPage } });
  }
  const arraySummary = ['StockHolding', 'purchaseOrder', 'salesOrder', 'UserManagement']
  if (arraySummary.includes(module)) {
    getSummaryData({
      dispatch,
      active: newPage.goPage,
      module,
      props,
      siteVal: searchFilter.siteVal,
      clientVal: searchFilter.clientVal,
      orderType: searchFilter.orderType,
      task: searchFilter.task,
      status: searchFilter.status,
      user
    });
  }

  if (module === 'SupplierManagement') {
    getSummaryData({
      dispatch,
      active: newPage.goPage,
      module,
      props,
      user
    });
  }

  if (module === 'StockHoldingForecast') {
    getForecast({ dispatch, active: newPage.goPage, module, props });
  }
  const arrayDetail = ['StockHoldingDetail', 'PurchaseOrdersDetail', 'SalesOrdersDetail']
  if (arrayDetail.includes(module)) {
    getDetailData({ dispatch, active: newPage.goPage, module, props });
  }
  return false
};

export const onChange = ({ e, page, setPage, setValuePaging }) => {
  const newPage = { ...page };
  if (setValuePaging) {
    setValuePaging(e.target.value)
  }
  if (e.target.value === '') {
    newPage.goPage = '';
    setPage(newPage);
  } else {
    newPage.goPage = e.target.value;
    setPage(newPage);
  }
};

export const numberCheck = (e) => {
  if (!/^[0-9]+$/.test(e.key)) {
    e.preventDefault();
  }
};

export const changePage = ({ active, dispatch, module, props, searchFilter, user }) => {
  let paramType = '';
  switch (module) {
    case 'StockHolding':
      paramType = 'GET_SH_SUMMARY';
      break;
    case 'purchaseOrder':
      paramType = 'GET_PO_SUMMARY';
      break;
    case 'salesOrder':
      paramType = 'GET_SO_SUMMARY';
      break;
    case 'UserManagement':
      paramType = 'GET_UM_SUMMARY';
      break;
    case 'StockHoldingForecast':
      paramType = 'GET_SH_DETAIL_FORECAST';
      break;
    case 'StockHoldingDetail':
      paramType = 'GET_SH_DETAIL_TABLE';
      break;
    case 'PurchaseOrdersDetail':
      paramType = 'GET_PO_DETAIL_TABLE';
      break;
    case 'SalesOrdersDetail':
      paramType = 'GET_SO_DETAIL_TABLE';
      break;
    case 'SupplierManagement':
      paramType = 'GET_SP_SUMMARY';
      break;
    case 'SupplierManagementDetail':
      paramType = 'GET_SP_DETAIL_TABLE';
      break;
  }
  dispatch({ type: paramType, data: [] });
  const arraySummary = ['StockHolding', 'purchaseOrder', 'salesOrder', 'UserManagement']
  if (arraySummary.includes(module)) {
    getSummaryData({
      dispatch,
      active,
      module,
      props,
      siteVal: searchFilter.siteVal,
      clientVal: searchFilter.clientVal,
      orderType: searchFilter.orderType,
      task: searchFilter.task,
      status: searchFilter.status,
      user
    })
  }

  if (module === 'StockHoldingForecast') {
    getForecast({ dispatch, active, module, props });
  }
  const arrayDetail = ['StockHoldingDetail', 'PurchaseOrdersDetail', 'SalesOrdersDetail']
  if (arrayDetail.includes(module)) {
    getDetailData({ dispatch, active, module, props });
  }
}