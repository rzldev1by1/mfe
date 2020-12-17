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
      return { ...state, darkMode: data }
    case 'CLIENT':
      return { ...state, client: data }
    case 'SITE' :
      return { ...state, site: data }
    case 'STATUS' :
      return {...state, status: data}
    case 'ORDER_TYPE' :
      return {...state, orderType: data}
    case 'TASK' :
      return {...state, task: data}
    case 'EXPIRED' :
      return {...state, expired:true}
    case 'TOTAL_LENGTH' :
      return {...state, total_length:data}
    case 'CHANGED_USER':
      return {...state, lastChangedUser: data}
    default:
      return state
  }
}