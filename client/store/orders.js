import axios from 'axios'

const RETURN_ORDERS = 'RETURN_ORDERS'

const defaultOrders = []

const returnOrders = orders => ({
  type: RETURN_ORDERS,
  orders
})

export const fetchOrders = () => async dispatch => {
  let orders = []
  const allOrders = await axios.get(`api/orders/user`)
  for (let i = 0; i < allOrders.data.length; i++) {
    let order = allOrders.data[i]
    let starsInOrder = allOrders.data[i].stars
    let stars = []
    for (let j = 0; j < starsInOrder.length; j++) {
      let star = await axios.get(`api/stars/${starsInOrder[j]}`)
      stars.push(star.data)
    }
    order.starsData = stars
    orders.push(order)
  }
  dispatch(returnOrders(orders))
}

export default function(state = defaultOrders, action) {
  switch (action.type) {
    case RETURN_ORDERS:
      return action.orders
    default:
      return state
  }
}
