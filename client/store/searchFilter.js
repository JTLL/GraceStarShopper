const initialState = {
  searchTerm: [],
  priceMin: 0
}

const SEARCH_UPDATE = 'SEARCH UPDATE'
const PRICE_MIN_UPDATE = 'PRICE_MIN_UPDATE'

export const searchUpdate = searchTerm => ({
  type: SEARCH_UPDATE,
  searchTerm
})

export const priceMinUpdate = priceMin => ({
  type: PRICE_MIN_UPDATE,
  priceMin
})

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_UPDATE:
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    case PRICE_MIN_UPDATE:
      return {
        ...state,
        priceMin: action.priceMin
      }
    default:
      return state
  }
}
