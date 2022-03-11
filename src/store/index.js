/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
const INITIAL_STATE = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false,
  customDarkMode: true,
  user: null,
  loading: true,
  expired: false,
  lastChangedUser: null,
  markedRow: []
};

// REDUCERS
export const rootReducer = (state = INITIAL_STATE, { type, data, column, ...rest }) => {
  let createPO = null;
  let createSO = null;
  let tmp = null;
  let customerDetails = null;
  let orderDetails = null;
  let orderLinesData = null;

  switch (type) {
    case 'LOGIN':
      return { ...state, user: data, expired: false };
    case 'LOGOUT':
      return { ...state, user: null, po_resources: null };
    case 'ASIDE':
      return { ...state, asideShow: data };
    case 'SIDEBAR':
      return { ...state, sidebarShow: data };
    case 'DARKMODE':
      return { ...state, darkModeMLS: data };
    // Dropdown Start
    case 'CLIENT_DATA':
      return { ...state, clientData: data };
    case 'SITE_DATA':
      return { ...state, siteData: data };
    case 'ORDER_TYPE_DATA':
      return { ...state, orderTypeData: data };
    case 'TASK_DATA':
      return { ...state, taskData: data };
    case 'STATUS_DATA':
      return { ...state, statusData: data };
    case 'SEARCH_FILTER':
      return { ...state, searchFilter: data };
    // Dropdown End

    case 'EXPIRED':
      return { ...state, expired: true };
    case 'TOTAL_LENGTH':
      return { ...state, total_length: data };
    case 'CHANGED_USER':
      return { ...state, lastChangedUser: data };
    case 'CHANGE_HEADER':
      return { ...state, changeHeader: data };

    // Pagingation
    case 'PAGING':
      return { ...state, pagination: data };
    case 'PAGING_SH':
      return { ...state, paginationSh: data };
    case 'PAGING_SO_DETAIL':
      return { ...state, paginationSoDetail: data };
    case 'PAGING_PO_DETAIL':
      return { ...state, paginationPoDetail: data };
    case 'PAGING_SH_DETAIL':
      return { ...state, paginationShDetail: data };
    case 'PAGING_SP_DETAIL':
      return { ...state, paginationSpDetail: data };
    case 'PAGING_SH_FORECAST':
      return { ...state, paginationShForecast: data };
    case 'PAGING_SO':
      return { ...state, paginationSo: data };
    case 'PAGING_PO':
      return { ...state, paginationPo: data };
    case 'PAGING_UM':
      return { ...state, paginationUm: data };
    case 'PAGING_SP':
      return { ...state, paginationSp: data };
    // Pagination End

    // Stock Holding
    case 'GET_SH_SUMMARY':
      return { ...state, shSummaryData: data };
    case 'GET_SH_DETAIL':
      return { ...state, shDetail: data };
    case 'GET_SH_DETAIL_TABLE':
      return { ...state, shDetailTable: data };
    case 'GET_SH_DETAIL_FORESCAST':
      return { ...state, shDetailForescast: data };
    // Purchase Order End

    // Purchase Order
    case 'GET_PO_SUMMARY':
      return { ...state, poSummaryData: data };
    case 'GET_PO_DETAIL':
      return { ...state, poDetail: data };
    case 'GET_PO_DETAIL_TABLE':
      return { ...state, poDetailTable: data };
    // Purchase Order End

    // Sales Order
    case 'GET_SO_SUMMARY':
      return { ...state, soSummaryData: data };
    case 'GET_SO_DETAIL':
      return { ...state, soDetail: data };
    case 'GET_SO_DETAIL_TABLE':
      return { ...state, soDetailTable: data };
    // Sales Order End

    // CREATE PO
    case 'PO_RESOURCES':
      return { ...state, po_resources: data };
    case 'CREATE_PO_DISPOSITION':
      return { ...state, po_disposition: data };

    // CREATE SO
    case 'SO_RESOURCES':
      return { ...state, so_resources: data };
    case 'CREATE_SO_DISPOSITION':
      return { ...state, so_disposition: data };

    // CREATE PO/SO
    case 'SET_ORDER_DETAIL':
      orderDetails = state.orderDetails;
      orderDetails[column].value = data;
      return { ...state, orderDetails };
    case 'RESET_ORDER_DETAIL':
      return { ...state, orderDetails: data };
    case 'SET_CUSTOMER_DETAIL':
      customerDetails = state.customerDetails;
      customerDetails[column].value = data;
      return { ...state, customerDetails };
    case 'RESET_CUSTOMER_DETAIL':
      return { ...state, customerDetails: data };
    case 'RESET_ORDER_LINES':
      return { ...state, orderLines: data };
    case 'RESET_ORDER_LINES_DATA':
      return { ...state, orderLinesData: data };
    case 'SET_ORDER_LINES_DATA':
      orderLinesData = state.orderLinesData;
      orderLinesData[column.index][column.column] = data;
      return { ...state, orderLinesData };
    case 'DELETE_ORDER_LINES_DATA':
      orderLinesData = state.orderLinesData;
      orderLinesData.splice(data, 1);
      return { ...state, orderLinesData };
    case 'ADD_ORDER_LINES_DATA':
      orderLinesData = state.orderLinesData;
      orderLinesData.push(data);
      return { ...state, orderLinesData };

    // Export
    case 'EXPORT_DATA':
      return { ...state, exportData: data };
    case 'EXPORT_STATUS':
      return { ...state, exportStatus: data };
    // end Export

    // Print Label
    case 'PRINT_LABEL_DATA':
      return { ...state, printLabelData: data };
    // end Print Label

    // Stock Movement
    case 'GET_SM_SUMMARY':
      return { ...state, smSummaryData: data };
    case 'GET_ACTIVE_PAGE':
      return { ...state, getActivePage: data };
    // Stock Movement End

    // Table Status
    case 'TABLE_STATUS':
      return { ...state, tableStatus: data };
    case 'REORDER':
      return { ...state, reorder: data };
    // and Table Status

    // STYLE of ROW TABLE
    case 'IDX_ROWS':
      return { ...state, idxRows: data }
    case 'IS_FOCUS':
      return { ...state, isFocusss: data }
    // User Management
    case 'GET_UM_SUMMARY':
      return { ...state, umSummaryData: data };
    case 'GET_UM_USERS_DATA':
      return { ...state, usersData: data };
    case 'GET_UM_INFO_ACCOUNT':
      return { ...state, accountInfo: data };
    case 'GET_UM_MODAL_ACCESS':
      return { ...state, moduleAccess: data };
    case 'GET_UM_LOAD_SITE':
      return { ...state, loadSite: data };
    case 'GET_UM_LOAD_CLIENT':
      return { ...state, loadClient: data };
    // User Management End

    // Supplier Management
    case 'GET_SP_SUMMARY':
      return { ...state, spSummaryData: data };
    case 'GET_SP_DETAIL_TABLE':
      return { ...state, spDetailTable: data };
    case 'TEST':
    case 'MARKED':
      return { ...state, markedRow: data }
    // Supplier Management End

    // Status drag table
    case 'DRAG_STATUS':
      return { ...state, dragStatus: data }
    // end

    default:
      return state;
  }
};
