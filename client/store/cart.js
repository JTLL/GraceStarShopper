import axios from 'axios'
// import history from '../history'

const REMOVE_STAR_FROM_CART = 'REMOVE_STAR_FROM_CART'
const ADD_STAR_TO_CART = 'ADD_STAR_TO_CART'
const RETURN_CART = 'RETURN_CART'
const EMPTY_OUT_CART = 'EMPTY_OUT_CART'
const CLEAN_CART = 'CLEAN_CART'

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

const emptyOutCart = () => ({
  type: EMPTY_OUT_CART
})

const cleanCart = invalidItems => ({
  type: CLEAN_CART,
  invalidItems
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
  try {
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

const validateCart = (userId = 0, itemArray) => async dispatch => {
  console.log("where am I?")
  let userCart
  try {
    if (userId) {
      let res = await axios.get(`/api/cart/${userId}`)
      userCart = res.data.stars
    } else {
      userCart = localStorage.getItem('starCart').split(',')
    }
    console.log('usercart', userCart)
    userCart.forEach(async starId => {
      let res = await axios.get(`/api/stars/${starId}`)
      let star = res.data
      console.log("star",star)
      if(star.owned){
        itemArray.push(star.name)
      }
    })
    dispatch(cleanCart(itemArray))
  } catch (error) {
    console.error(error)    
  }
}

export const invalidCartItems = async (userId = 0) => {
  let invalidItems = []
  const test = await validateCart(userId, invalidItems)
  console.log("invalidItems", invalidItems)
  return invalidItems
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
    case EMPTY_OUT_CART:
      return []
    case CLEAN_CART:
      return state.filter(star => !action.invalidItems.includes(star.id))
    default:
      return state
  }
}
