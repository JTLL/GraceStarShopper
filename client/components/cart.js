import React, {Component} from 'react'
import Product from './product'
import {fetchCart, removeFromCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends Component {
  componentDidMount() {
    this.props.userId
      ? this.props.getCart(this.props.userId)
      : this.props.getCart(0)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.cart.length > 0 ? (
          <div className="ui card">
            {this.props.cart.map(product => {
              return (
                <Product
                  key={product.id}
                  product={product}
                  location={this.props.location}
                  handleRemove={this.props.handleRemove}
                  userId={this.props.userId}
                />
              )
            })}
          </div>
        ) : (
          <h3>Your cart is empty.</h3>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(fetchCart(id)),
  handleRemove: async (star, userId) => {
    await dispatch(removeFromCart(star, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
