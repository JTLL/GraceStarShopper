import axios from 'axios'

const initialState = {
  orders: []
}

const MOUNT_ORDERS = 'MOUNT_ORDERS'

const mountOrders = orders => ({
  type: MOUNT_ORDERS,
  orders
})

export const fetchOrders = () => async dispatch => {
  console.log('fetching orders')
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(mountOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOUNT_ORDERS:
      return {
        ...state,
        orders: action.orders
      }
    default:
      return state
  }
}
