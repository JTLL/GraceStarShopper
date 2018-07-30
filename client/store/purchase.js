import axios from 'axios'
import {clearCart} from './cart'

const initialState = {
  order: {},
  ccType: '',
  ccNumber: '',
  cvc: '',
  ccTypeValid: true,
  ccNumberValid: true,
  cvcValid: true,
  purchase: true,
  validCartContents: true
}

const PURCHASE = 'PURCHASE'
const CCTYPECHANGE = 'CCTYPE'
const CCNUMBERCHANGE = 'CCNUMBER'
const CVCCHANGE = 'CVC'
const CCTYPEVALID = 'CCTYPEVALID'
const CCNUMBERVALID = 'CCNUMBERVALID'
const CVCVALID = 'CVCVALID'
const INVALID_PURCHASE = 'INVALID_PURCHASE'
const RESET = 'RESET'
const INVALID_CART = 'INVALID_CART'

const purchase = order => ({
  type: PURCHASE,
  order
})

export const ccTypeChange = ccType => ({
  type: CCTYPECHANGE,
  ccType
})

export const ccNumberChange = ccNumber => ({
  type: CCNUMBERCHANGE,
  ccNumber
})

export const cvcChange = cvc => ({
  type: CVCCHANGE,
  cvc
})

const cardTypeCheck = () => ({
  type: CCTYPEVALID
})

const cardNumberCheck = () => ({
  type: CCNUMBERVALID
})

const cvcCheck = () => ({
  type: CVCVALID
})

const invalidPurchase = () => ({
  type: INVALID_PURCHASE
})

const validCartCheck = () => ({
  type: INVALID_CART
})

export const clearErrors = () => ({
  type: RESET
})

export const completeOrder = (
  amount,
  cardType,
  cardNumber,
  cvc,
  history,
  userId,
  stars
) => async dispatch => {
  try {
    let trigger = true
    if (amount <= 0) {
      dispatch(invalidPurchase())
      trigger = false
    }
    if (cardType === '') {
      dispatch(cardTypeCheck())
      trigger = false
    }
    if (typeof Number(cardNumber) !== 'number' || cardNumber.length !== 16) {
      dispatch(cardNumberCheck())
      trigger = false
    }
    if (typeof Number(cvc) !== 'number' || cvc.length !== 3) {
      dispatch(cvcCheck())
      trigger = false
    }
    if (trigger) {
      const whatever = await validateCart(stars)
      console.log('await part', !whatever)
      if (!whatever) {
        console.log('inside?')
        dispatch(validCartCheck())
        return
      }
      console.log('passed validity check')
      const {data} = await axios.post('/api/stripe/charge', {
        amount,
        cardType
      })

      console.log('data', data)
      const order = await axios.post('/api/orders', {
        amount,
        stripeId: data.id,
        userId,
        stars
      })

      dispatch(purchase(order.data))
      dispatch(clearCart(userId))
      setOwners(userId, stars)
      history.push('/order-confirmation')
    }
  } catch (err) {
    console.error(err)
  }
}

const setOwners = (userId, stars) => {
  stars.forEach(async star => {
    await axios.put(`/api/stars/${star}`, {userId: userId, owned: true})
  })
}

const validateCart = stars => {
  let validity = true
  stars.forEach(async starId => {
    const res = await axios.get(`/api/stars/${starId}`)
    console.log('purchase validate cart', res.data.owned)
    if (res.data.owned) {
      validity = false
    }
  })
  return validity
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CCTYPECHANGE:
      return {
        ...state,
        ccType: action.ccType
      }
    case CCNUMBERCHANGE:
      return {
        ...state,
        ccNumber: action.ccNumber
      }
    case CVCCHANGE:
      return {
        ...state,
        cvc: action.cvc
      }
    case PURCHASE:
      return {
        ...state,
        order: action.order,
        ccType: '',
        ccNumber: '',
        cvc: '',
        ccTypeValid: true,
        ccNumberValid: true,
        cvcValid: true
      }
    case CCTYPEVALID:
      return {
        ...state,
        ccTypeValid: false
      }
    case CCNUMBERVALID:
      return {
        ...state,
        ccNumberValid: false
      }
    case CVCVALID:
      return {
        ...state,
        cvcValid: false
      }
    case INVALID_PURCHASE:
      return {
        ...state,
        purchase: false
      }
    case RESET:
      return initialState
    case INVALID_CART:
      return {
        ...state,
        validCartContents: false
      }
    default:
      return state
  }
}
