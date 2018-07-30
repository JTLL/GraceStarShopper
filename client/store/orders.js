import axios from 'axios'
// import history from '../history'

const RETURN_ORDERS = 'RETURN_ORDERS'

const defaultOrders = []

const returnOrders = orders => ({
  type: RETURN_ORDERS,
  orders
})

export const fetchOrders = (userId = 0) => async dispatch => {
  let orders = []
  // if (userId > 0) {
  const allOrders = await axios.get(`api/orders/${userId}`)
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
    //   }
    // } else {
    //   if (localStorage.getItem('starCart')) {
    //     let starCart = localStorage.getItem('starCart').split(',')
    //     for (let i = 1; i < starCart.length; i++) {
    //       let star = await axios.get(`api/stars/${starCart[i]}`)
    //       cart.push(star.data)
    //     }
    //   }
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
