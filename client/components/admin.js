import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/admin'

class admin extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    return (
      <div>
        {this.props.isAdmin ? (
          <div>
            <h1>Admin Panel</h1>
            <h2>All Orders</h2>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Stars IDs</th>
                  <th>Stripe ID</th>
                </tr>
              </thead>
              <tbody>
                {this.props.orders.map(order => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.userId}</td>
                      <td>{order.amount}</td>
                      <td>{String(order.stars)}</td>
                      <td>{order.stripeId}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h1>You need to be an admin ya punk.</h1>
            <img src="https://www.catster.com/wp-content/uploads/2015/06/angry-cat1.jpg" />
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  isAdmin: state.user.admin,
  orders: state.admin.orders
})

const mapDispatch = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(admin)
