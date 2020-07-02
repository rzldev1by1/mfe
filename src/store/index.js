const INITIAL_STATE = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false,
  user: null,
  loading: true,
}

// REDUCERS
export const rootReducer = (state = INITIAL_STATE, { type, data, ...rest }) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, user: data }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'ASIDE':
      return { ...state, asideShow: data }
    case 'SIDEBAR':
      return { ...state, sidebarShow: data }
    case 'DARKMODE':
      return { ...state, darkMode: data }
    default:
      return state
  }
}