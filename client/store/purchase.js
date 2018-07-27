import axios from 'axios'

const initialState = {
  order: {},
  ccType: '',
  ccNumber: '',
  cvc: '',
  ccTypeValid: true,
  ccNumberValid: true,
  cvcValid: true,
  purchase: true
}

const PURCHASE = 'PURCHASE'
const CCTYPECHANGE = 'CCTYPE'
const CCNUMBERCHANGE = 'CCNUMBER'
const CVCCHANGE = 'CVC'
const CCTYPEVALID = 'CCTYPEVALID'
const CCNUMBERVALID = 'CCNUMBERVALID'
const CVCVALID = 'CVCVALID'
const INVALID_PURCHASE = 'INVALID_PURCHASE'

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
    if(amount <= 0){
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
      const {data} = await axios.post('/api/stripe/charge', {
        amount,
        cardType
      })
      const order = await axios.post('/api/order', {
        amount,
        stripeId: data.id,
        userId,
        stars
      })
      dispatch(purchase(order.data))
      history.push('/order-confirmation')
    }
  } catch (err) {
    console.error(err)
  }
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
    default:
      return state
  }
}
