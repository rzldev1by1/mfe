const INITIAL_STATE = {
  user: null,
}

// REDUCERS
export const rootReducer = (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
    case 'SET_AUTH':
      return Object.assign({}, state, { user: data })
    default:
      return state
  }
}
