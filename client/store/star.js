import axios from 'axios' 
// import history from '../history' 

const REMOVE_STAR_FROM_CART = 'REMOVE_STAR_FROM_CART' 
const ADD_STAR_TO_CART = 'ADD_STAR_TO_CART'

const defaultCart = []

const removeStarFromCart = star => ({
  type: REMOVE_STAR_FROM_CART,
  star
})

const addStarToCart = star => ({
  type: ADD_STAR_TO_CART,
  star
})

export const addToCart = (id) => async dispatch => {
  try {
    const res = await axios.get(`api/stars/${id}`)
    dispatch(addStarToCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeFromCart = (id) => async dispatch => {
  try {
    const res = await axios.get(`api/stars/${id}`)
    dispatch(removeStarFromCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultCart, action){
  switch(action.type){
    case ADD_STAR_TO_CART:
      return [...state, action.star]
    case REMOVE_STAR_FROM_CART:
      return state.filter(star => star.id !== action.star.id)
    default:
      return state
  }
}