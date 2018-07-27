import axios from 'axios'

const initialState = {
  order: {},
  ccType: '',
  ccNumber: '',
  cvc: ''
}

const PURCHASE = 'PURCHASE'
const CCTYPECHANGE = 'CCTYPE'
const CCNUMBERCHANGE = 'CCNUMBER'
const CVCCHANGE = 'CVC'

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

export const completeOrder = (amount, cardType, history) => async dispatch => {
  try {
    const {data} = await axios.post('/api/stripe/charge', {
      amount,
      cardType
    })
    dispatch(purchase(data))
    history.push('/order-confirmation')
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
        cvc: ''
      }
    default:
      return state
  }
}
