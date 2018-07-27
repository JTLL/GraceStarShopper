import axios from 'axios' 
// import history from '../history' 

const REMOVE_STAR_FROM_CART = 'REMOVE_STAR_FROM_CART' 
const ADD_STAR_TO_CART = 'ADD_STAR_TO_CART'
const RETURN_CART = 'RETURN_CART'

const defaultCart = []

const removeStarFromCart = star => ({
  type: REMOVE_STAR_FROM_CART,
  star
})

const addStarToCart = star => ({
  type: ADD_STAR_TO_CART,
  star
})

const returnCart = cart => ({
  type: RETURN_CART,
  cart
})

export const addToCart = (id, userId) => async dispatch => {
  try {
    const res = await axios.get(`api/stars/${id}`)
    await axios.put(`api/cart/${userId}`, res.data)
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

export const fetchCart = id => async dispatch => {
  const res = await axios.get(`api/cart/${id}`)
  let cart = []
  for(let i = 0; i < res.data.stars.length; i++){
    let star = await axios.get(`api/stars/${res.data.stars[i]}`)
    cart.push(star.data)
  }
  dispatch(returnCart(cart))
}

export default function(state = defaultCart, action){
  switch(action.type){
    case ADD_STAR_TO_CART:
      state.forEach(star => {
        if(star.id === action.star.id){
          return state
        }
      })
      return [...state, action.star]
    case REMOVE_STAR_FROM_CART:
      return state.filter(star => star.id !== action.star.id)
    case RETURN_CART:
      return action.cart
    default:
      return state
  }
}