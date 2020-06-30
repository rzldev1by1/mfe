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
      return { user: data }
    case 'LOGOUT':
      return { user: null }
    case 'ASIDE':
      return { asideShow: data }
    case 'SIDEBAR':
      return { sidebarShow: data }
    case 'DARKMODE':
      return { darkMode: data }
    default:
      return state
  }
}