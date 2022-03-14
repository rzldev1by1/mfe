/* eslint-disable consistent-return */
/* eslint-disable radix */
import { getSummaryData, getForescast, getDetailData } from '../../apiService';

export const onActivePageChange = ({ e, pagination, goto, dispatch, module, props, searchFilter, user }) => {
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
  if (module === 'StockHoldingForecast') {
    paramType = 'GET_SH_DETAIL_FORESCAST';
    paramPaging = 'PAGING_SH_FORECAST';
  }
  if (module === 'StockHoldingDetail') {
    paramType = 'GET_SH_DETAIL_TABLE';
    paramPaging = 'PAGING_SH_DETAIL';
  }
  if (module === 'PurchaseOrdersDetail') {
    paramType = 'GET_PO_DETAIL_TABLE';
    paramPaging = 'PAGING_PO_DETAIL';
  }
  if (module === 'SalesOrdersDetail') {
    paramType = 'GET_SO_DETAIL_TABLE';
    paramPaging = 'PAGING_SO_DETAIL';
  }
  if (module === 'SupplierManagement') {
    paramType = 'GET_SP_SUMMARY';
    paramPaging = 'PAGING_SP';
  }
  if (module === 'SupplierManagementDetail') {
    paramType = 'GET_SP_DETAIL_TABLE';
    paramPaging = 'PAGING_SP_DETAIL';
  }
  dispatch({ type: paramType, data: [] });
  if (goto) {
    goto(active);
  } else {
    dispatch({ type: paramPaging || 'PAGING', data: { ...pagination, active } });
  }
  let arraySummary = ['StockHolding', 'purchaseOrder', 'salesOrder', 'UserManagement']
  if (arraySummary.includes(module)) {
    getSummaryData({
      dispatch,
      active: active,
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
    getForescast({ dispatch, active: active, module, props });
  }
  let arrayDetail = ['StockHoldingDetail', 'PurchaseOrdersDetail', 'SalesOrdersDetail']
  if (arrayDetail.includes(module)) {
    getDetailData({ dispatch, active: active, module, props });
  }
};

export const goToPage = ({ goto, pagination, page, setPage, dispatch, module, props, searchFilter, user }) => {
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
  if (module === 'StockHoldingForecast') {
    paramType = 'GET_SH_DETAIL_FORESCAST';
    paramPaging = 'PAGING_SH_FORECAST';
  }
  if (module === 'StockHoldingDetail') {
    paramType = 'GET_SH_DETAIL_TABLE';
    paramPaging = 'PAGING_SH_DETAIL';
  }
  if (module === 'PurchaseOrdersDetail') {
    paramType = 'GET_PO_DETAIL_TABLE';
    paramPaging = 'PAGING_PO_DETAIL';
  }
  if (module === 'SalesOrdersDetail') {
    paramType = 'GET_SO_DETAIL_TABLE';
    paramPaging = 'PAGING_SO_DETAIL';
  }
  if (module === 'SupplierManagement') {
    paramType = 'GET_SP_SUMMARY';
    paramPaging = 'PAGING_SP';
  }
  if (module === 'SupplierManagementDetail') {
    paramType = 'GET_SP_DETAIL_TABLE';
    paramPaging = 'PAGING_SP_DETAIL';
  }

  if (newPage.goPage === 0 || newPage.goPage === null || newPage.goPage === '' || newPage.goPage === undefined) {
    return false;
  }

  if (newPage.goPage > pagination.last_page) {
    newPage.notifPaging = true;
    setPage(newPage);
    return 0;
  } else {
    dispatch({ type: paramType, data: [] });
  }

  if (goto) {
    goto(newPage.goPage);
  } else {
    dispatch({ type: paramPaging || 'PAGING', data: { ...pagination, active: newPage.goPage } });
  }
  let arraySummary = ['StockHolding', 'purchaseOrder', 'salesOrder', 'UserManagement']
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
    getForescast({ dispatch, active: newPage.goPage, module, props });
  }
  let arrayDetail = ['StockHoldingDetail', 'PurchaseOrdersDetail', 'SalesOrdersDetail']
  if (arrayDetail.includes(module)) {
    getDetailData({ dispatch, active: newPage.goPage, module, props });
  }
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
    newPage.goPage = parseInt(e.target.value);
    setPage(newPage);
  }
};

export const numberCheck = (e) => {
  if (!/^[0-9]+$/.test(e.key)) {
    e.preventDefault();
  }
};

export const changePage = ({ active, dispatch, module, props, searchFilter, user }) => {
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
  if (module === 'StockHoldingForecast') {
    paramType = 'GET_SH_DETAIL_FORESCAST';
    paramPaging = 'PAGING_SH_FORECAST';
  }
  if (module === 'StockHoldingDetail') {
    paramType = 'GET_SH_DETAIL_TABLE';
    paramPaging = 'PAGING_SH_DETAIL';
  }
  if (module === 'PurchaseOrdersDetail') {
    paramType = 'GET_PO_DETAIL_TABLE';
    paramPaging = 'PAGING_PO_DETAIL';
  }
  if (module === 'SalesOrdersDetail') {
    paramType = 'GET_SO_DETAIL_TABLE';
    paramPaging = 'PAGING_SO_DETAIL';
  }
  if (module === 'SupplierManagement') {
    paramType = 'GET_SP_SUMMARY';
    paramPaging = 'PAGING_SP';
  }
  if (module === 'SupplierManagementDetail') {
    paramType = 'GET_SP_DETAIL_TABLE';
    paramPaging = 'PAGING_SP_DETAIL';
  }
  dispatch({ type: paramType, data: [] });
  let arraySummary = ['StockHolding', 'purchaseOrder', 'salesOrder', 'UserManagement']
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
    getForescast({ dispatch, active, module, props });
  }
  let arrayDetail = ['StockHoldingDetail', 'PurchaseOrdersDetail', 'SalesOrdersDetail']
  if (arrayDetail.includes(module)) {
    getDetailData({ dispatch, active, module, props });
  }
}