/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
const INITIAL_STATE = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false,
  user: null,
  loading: true,
  expired:false,
  lastChangedUser: null
}

// REDUCERS
export const rootReducer = (state = INITIAL_STATE, { type, data, ...rest }) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, user: data, expired:false }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'ASIDE':
      return { ...state, asideShow: data }
    case 'SIDEBAR':
      return { ...state, sidebarShow: data }
    case 'DARKMODE':

      // Dropdown Start
      return { ...state, darkMode: data }
    case 'CLIENT_DATA':
      return { ...state, clientData: data }
    case 'CLIENT':
      return { ...state, client: data }
    case 'SITE_DATA' :
      return { ...state, siteData: data }
    case 'SITE' :
      return { ...state, site: data }
    case 'ORDER_TYPE_DATA' :
      return { ...state, orderTypeData: data }
    case 'ORDER_TYPE' :
      return { ...state, orderType: data }
    case 'TASK_DATA' :
      return { ...state, taskData: data }
    case 'TASK' :
      return { ...state, task: data }
    case 'STATUS_DATA' :
        return { ...state, statusData: data }
    case 'STATUS' :
      return { ...state, status: data }
      // Dropdown End

    case 'EXPIRED' :
      return {...state, expired:true}
    case 'TOTAL_LENGTH' :
      return {...state, total_length:data}
    case 'CHANGED_USER':
      return {...state, lastChangedUser: data}

    // Pagingation
    case 'PAGING':
      return {...state, pagination: data}
    // Pagination End

    // Summary
    case 'GET_PO_SUMMARY':
      return {...state, poSummaryData:data}
    // Summary End
    
    default:
      return state
  }
}