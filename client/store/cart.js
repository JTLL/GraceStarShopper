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

export const addToCart = (starId, userId) => async dispatch => {
  try {
    const cart = await axios.get(`api/cart/${userId}`)
    for (let i = 0; i < cart.data.stars.length; i++) {
      if (cart.data.stars[i] === starId) {
        return
      }
    }
    const res = await axios.get(`api/stars/${starId}`)
    await axios.put(`api/cart/${userId}`, res.data)
    dispatch(addStarToCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeFromCart = (starId, userId = 0) => async dispatch => {
  try {
    const res = await axios.get(`api/stars/${starId}`)
    if (userId > 0) {
      await axios.put(`api/cart/remove/${userId}`, res.data)
    }
    dispatch(removeStarFromCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchCart = (userId = 0) => async dispatch => {
  let cart = []
  if (userId > 0) {
    const res = await axios.get(`api/cart/${userId}`)
    for (let i = 0; i < res.data.stars.length; i++) {
      let star = await axios.get(`api/stars/${res.data.stars[i]}`)
      cart.push(star.data)
    }
  } else {
    if (localStorage.getItem('starCart')) {
      let starCart = localStorage.getItem('starCart').split(',')
      for (let i = 1; i < starCart.length; i++) {
        let star = await axios.get(`api/stars/${starCart[i]}`)
        cart.push(star.data)
      }
    }
  }
  dispatch(returnCart(cart))
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_STAR_TO_CART:
      state.forEach(star => {
        if (star.id === action.star.id) {
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
