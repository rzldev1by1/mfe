const INITIAL_STATE = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false,
  user: null,
}

// REDUCERS
export const rootReducer = (state = INITIAL_STATE, { type, data, ...rest }) => {
  switch (type) {
    case 'SET_AUTH':
      return Object.assign({}, state, { user: data })
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}