import React, {Component} from 'react'
import Product from './product'
import {fetchOrders} from '../store/orders'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.userId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId)
      this.props.getOrders(this.props.userId)
  }

  render() {
    return (
      <div>
        <h2>Order History:</h2>
        {this.props.orders.length ? (
          <div>
            {this.props.orders.map(order => {
              return (
                <div
                  className="ui card grid"
                  key={order.id}
                  style={{padding: '10px 0px'}}
                >
                  <div className="ui divided items">
                    <h3>Order ID: {order.id}</h3>
                    <div>Status: Complete</div>
                    <div>Total: ${order.amount.toLocaleString()} billion</div>
                    <br />
                    <div>Purchased Stars:</div>
                    {order.starsData.map(star => {
                      return (
                        <div className="item" key={star.id}>
                          <div className="ui tiny image">
                            <img src={star.image} />
                          </div>
                          <div className="middle aligned content">
                            {star.name}: ${Number(star.price).toLocaleString()}{' '}
                            billion
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>No Previous Orders</div>
        )}
        {console.log('these props', this.props.orders[0])}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  getOrders: id => dispatch(fetchOrders(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
