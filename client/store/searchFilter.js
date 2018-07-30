const initialState = {
  searchTerm: []
}

const SEARCH_UPDATE = 'SEARCH UPDATE'

export const searchUpdate = searchTerm => ({
  type: SEARCH_UPDATE,
  searchTerm
})

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_UPDATE:
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    default:
      return state
  }
}
