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
    if (userId) {
      await axios.put(`api/cart/update`, res.data)
    } else {
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
      await axios.put(`api/cart/removeOne`, res.data)
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
      const res = await axios.get(`api/cart`)
      for (let i = 0; i < res.data.stars.length; i++) {
        let star = await axios.get(`api/stars/${res.data.stars[i]}`)
        if (!star.data.owned) {
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
          if (!star.data.owned) {
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

<<<<<<< HEAD
export default function(state = initialState, action) {
=======
const validateCart = (userId = 0, itemArray) => async dispatch => {
  console.log('where am I?')
  let userCart
  try {
    if (userId) {
      let res = await axios.get(`/api/cart`)
      userCart = res.data.stars
    } else {
      userCart = localStorage.getItem('starCart').split(',')
    }
    console.log('usercart', userCart)
    userCart.forEach(async starId => {
      let res = await axios.get(`/api/stars/${starId}`)
      let star = res.data
      console.log('star', star)
      if (star.owned) {
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
  console.log('invalidItems', invalidItems)
  return invalidItems
}

export default function(state = defaultCart, action) {
>>>>>>> master
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
