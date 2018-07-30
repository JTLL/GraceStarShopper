import axios from 'axios'
// import history from '../history'

const REMOVE_STAR_FROM_CART = 'REMOVE_STAR_FROM_CART'
const ADD_STAR_TO_CART = 'ADD_STAR_TO_CART'
const RETURN_CART = 'RETURN_CART'
const EMPTY_OUT_CART = 'EMPTY_OUT_CART'
const CLEAN_CART = 'CLEAN_CART'
const INVALID_ITEMS = 'INVALID_ITEMS'

const initialState = {
  cart: [],
  invalidItems: []
}

const removeStarFromCart = star => ({
  type: REMOVE_STAR_FROM_CART,
  star
})

export const addStarToCart = star => ({
  type: ADD_STAR_TO_CART,
  star
})

const returnCart = cart => ({
  type: RETURN_CART,
  cart
})

const emptyOutCart = () => ({
  type: EMPTY_OUT_CART
})

const invalidateItems = invalidItems => ({
  type: INVALID_ITEMS,
  invalidItems
})

export const addToCart = (starId, userId) => async dispatch => {
  try {
    const res = await axios.get(`api/stars/${starId}`)
    if(userId){
      await axios.put(`api/cart/${userId}`, res.data)
    }
    else {
      localStorage.setItem('starCart', [
        localStorage.getItem('starCart'),
        res.data.id
      ])
    }
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
  let invalidItems = []
  try {
    if (userId > 0) {
      const res = await axios.get(`api/cart/${userId}`)
      for (let i = 0; i < res.data.stars.length; i++) {
        let star = await axios.get(`api/stars/${res.data.stars[i]}`)
        if(!star.data.owned){
          cart.push(star.data)
        }
        else {
          invalidItems.push(star.data)
        }
      }
    } else {
      if (localStorage.getItem('starCart')) {
        let starCart = localStorage.getItem('starCart').split(',')
        for (let i = 1; i < starCart.length; i++) {
          let star = await axios.get(`api/stars/${starCart[i]}`)
          if(!star.data.owned){
            cart.push(star.data)
          }
          else {
            invalidItems.push(star.data)
          }
        }
      }
    }
    dispatch(returnCart(cart))
    dispatch(invalidateItems(invalidItems))
  } catch (error) {
    console.error(error)
  }
}

export const clearCart = (userId = 0) => async dispatch => {
  try {
    if (userId) {
      await axios.put('/api/cart/remove', {userId})
    } else {
      localStorage.clear()
    }
    dispatch(emptyOutCart())
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_STAR_TO_CART:
      state.cart.forEach(star => {
        if (star.id === action.star.id) {
          return state
        }
      })
      return {...state, cart: [...state.cart, action.star]}
    case REMOVE_STAR_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(star => star.id !== action.star.id)
      }
    case RETURN_CART:
      return {
        ...state,
        cart: action.cart
      }
    case EMPTY_OUT_CART:
      return initialState
    case CLEAN_CART:
      return state.filter(star => !action.invalidItems.includes(star.id))
    case INVALID_ITEMS:
      return {
        ...state,
        invalidItems: action.invalidItems
      }
    default:
      return state
  }
}
