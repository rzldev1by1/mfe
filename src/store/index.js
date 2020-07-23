const INITIAL_STATE = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false,
  user: null,
  loading: true,
  expired:false
}

// REDUCERS
export const rootReducer = (state = INITIAL_STATE, { type, data, ...rest }) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, user: data, expired:false }
    case 'LOGOUT':
      return { ...state, user: null, expired:true }
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
    default:
      return state
  }
}