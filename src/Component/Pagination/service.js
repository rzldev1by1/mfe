import { getSummaryData, getForecast, getDetailData } from '../../apiService';

const allModule = {
  StockHolding: {
    paramType: 'GET_SH_SUMMARY',
    paramPaging: 'PAGING_SH'
  },
  purchaseOrder: {
    paramType: 'GET_PO_SUMMARY',
    paramPaging: 'PAGING_PO'
  },
  salesOrder: {
    paramType: 'GET_SO_SUMMARY',
    paramPaging: 'PAGING_SO',
  },
  UserManagement: {
    paramType: 'GET_UM_SUMMARY',
    paramPaging: 'PAGING_UM'
  },
  StockHoldingForecast: {
    paramType: 'GET_SH_DETAIL_FORECAST',
    paramPaging: 'PAGING_SH_FORECAST'
  },
  StockHoldingDetail: {
    paramType: 'GET_SH_DETAIL_TABLE',
    paramPaging: 'PAGING_SH_DETAIL'
  },
  PurchaseOrdersDetail: {
    paramType: 'GET_PO_DETAIL_TABLE',
    paramPaging: 'PAGING_PO_DETAIL',
  },
  SalesOrdersDetail: {
    paramType: 'GET_SO_DETAIL_TABLE',
    paramPaging: 'PAGING_SO_DETAIL'
  },
  SupplierManagement: {
    paramType: 'GET_SP_SUMMARY',
    paramPaging: 'PAGING_SP'
  },
  SupplierManagementDetail: {
    paramType: 'GET_SP_DETAIL_TABLE',
    paramPaging: 'PAGING_SP_DETAIL'
  }
}
const arraySummary = ['StockHolding', 'purchaseOrder', 'salesOrder', 'UserManagement']
const arrayDetail = ['StockHoldingDetail', 'PurchaseOrdersDetail', 'SalesOrdersDetail']

export const goToPage = ({ goto, pagination, page, setPage, dispatch, module, props, searchFilter, user }) => {
  const newPage = { ...page };
  let paramPagingData = '';
  let paramData = '';

  Object.keys(allModule).forEach((allModuleKey) => {
    if (allModuleKey === module) {
      paramData = allModule[allModuleKey].paramType
      paramPagingData = allModule[allModuleKey].paramPaging
    }
  });

  if (newPage.goPage === 0 || newPage.goPage === null || newPage.goPage === '' || newPage.goPage === undefined) {
    return false;
  }

  if (newPage.goPage > pagination.last_page) {
    newPage.noticePaging = true;
    setPage(newPage);
    return 0;
  }
  dispatch({ type: paramData, data: [] });

  if (goto) goto(newPage.goPage);
  else dispatch({ type: paramPagingData || 'PAGING', data: { ...pagination, active: newPage.goPage } });
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
  if (arrayDetail.includes(module)) {
    getDetailData({ dispatch, active: newPage.goPage, module, props });
  }
  return false
};

export const onChange = ({ e, page, setPage, setValuePaging }) => {
  const newPage = { ...page };
  const valuePage = e.target.value

  if (setValuePaging) setValuePaging(+valuePage)

  if (valuePage === '') {
    newPage.goPage = '';
    setPage(newPage);
  } else {
    newPage.goPage = +valuePage
    setPage(newPage);
  }
};

export const numberCheck = (e) => {
  if (!/^[0-9]+$/.test(e.key)) {
    e.preventDefault();
  }
};

export const changePage = ({ active, dispatch, module, props, searchFilter, user }) => {
  let paramData = '';
  Object.keys(allModule).forEach((allModuleKey) => {
    if (allModuleKey === module) {
      paramData = allModule[allModuleKey].paramType
    }
  });
  dispatch({ type: paramData, data: [] });
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
  if (arrayDetail.includes(module)) {
    getDetailData({ dispatch, active, module, props });
  }
}