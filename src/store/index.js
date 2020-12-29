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
  let tmp = null;
  let orderLines = null;

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
    case 'CLIENT':
      return { ...state, client: data };
    case 'SITE':
      return { ...state, site: data };
    case 'ORDER_TYPE':
      return { ...state, order_type: data };
    case 'TASK':
      return { ...state, task: data };
    // Dropdown End

    case 'EXPIRED':
      return { ...state, expired: true };
    case 'TOTAL_LENGTH':
      return { ...state, total_length: data };
    case 'CHANGED_USER':
      return { ...state, lastChangedUser: data };

    // Pagingation
    case 'PAGING':
      return { ...state, pagination: data };
    // Pagination End

    // Summary
    case 'GET_PO_SUMMARY':
      return { ...state, poSummaryData: data };
    // Summary End

    // Resources for insert module
    case 'PO_RESOURCES':
      return { ...state, po_resources: data };
    case 'CREATE_PO':
      return { ...state, createPO: data };
    case 'CREATE_PO_DISPOSITION':
      return { ...state, po_disposition: data };
    case 'CREATE_PO_DETAILS':
      createPO = state.createPO;
      let orderDetails = createPO.orderDetails;
      orderDetails[column].value = data;
      tmp = { ...createPO, orderDetails };
      return { ...state, createPO: tmp };
    case 'CREATE_PO_LINES':
      createPO = state.createPO;
      orderLines = createPO.orderLines;
      let lineIndex = column.index;
      let lineColumn = column.column;
      console.log(lineIndex, lineColumn);
      orderLines[lineIndex][lineColumn].value = data;
      console.log(orderLines);
      tmp = { ...createPO, orderLines };
      return { ...state, createPO: tmp };
    case 'ADD_PO_LINES':
      createPO = state.createPO;
      orderLines = createPO.orderLines;
      orderLines.push(data);
      tmp = { ...createPO, orderLines };
      return { ...state, createPO: tmp };
    case 'DELETE_PO_LINES':
      createPO = state.createPO;
      orderLines = createPO.orderLines;
      orderLines.splice(data, 1);
      tmp = { ...createPO, orderLines };
      return { ...state, createPO: tmp };
    //end resources

    default:
      return state;
  }
};
