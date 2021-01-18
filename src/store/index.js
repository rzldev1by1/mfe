/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
const INITIAL_STATE = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false,
  user: null,
  loading: true,
  expired: false,
  lastChangedUser: null,
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
      // Dropdown Start
      return { ...state, darkMode: data };
    case 'CLIENT_DATA':
      return { ...state, clientData: data };
    case 'CLIENT':
      return { ...state, client: data };
    case 'SITE_DATA':
      return { ...state, siteData: data };
    case 'SITE':
      return { ...state, site: data };
    case 'ORDER_TYPE_DATA':
      return { ...state, orderTypeData: data };
    case 'ORDER_TYPE':
      return { ...state, orderType: data };
    case 'TASK_DATA':
      return { ...state, taskData: data };
    case 'TASK':
      return { ...state, task: data };
    case 'STATUS_DATA':
      return { ...state, statusData: data };
    case 'STATUS':
      return { ...state, status: data };
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
    // Pagination End

    // Stock Holding
    case 'GET_SH_SUMMARY':
      return { ...state, shSummaryData: data };
    case 'GET_SH_DETAIL':
      return { ...state, shDetail: data };
    case 'GET_SH_DETAIL_TABLE':
      return { ...state, shDetailTable: data };
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

    //CREATE PO
    case 'PO_RESOURCES':
      return { ...state, po_resources: data };
    case 'CREATE_PO_DISPOSITION':
      return { ...state, po_disposition: data };

    //CREATE SO
    case 'SO_RESOURCES':
      return { ...state, so_resources: data };
    case 'CREATE_SO_DISPOSITION':
      return { ...state, so_disposition: data };

    //CREATE PO/SO
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

    default:
      return state;
  }
};
