import React, {Component} from 'react'
import Product from './product'
import {fetchCart, removeFromCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends Component {
  componentDidMount() {
    this.props.userId
      ? this.props.getCart(this.props.userId)
      : this.props.getCart(0)
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps)
    console.log('thisprops', this.props)
    if (prevProps.userId !== this.props.userId)
      this.props.getCart(this.props.userId)
  }

  render() {
    return (
      <React.Fragment>
        <Link className="ui button" to="/checkout">
          Go to Checkout
        </Link>
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
                  cart={this.props.cart}
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
    if (userId > 0) {
      await dispatch(removeFromCart(star, userId))
    } else {
      let currentLS = localStorage.getItem('starCart').split(',')
      let newCart = currentLS.filter(starId => +starId !== star)
      localStorage.setItem('starCart', newCart)
      await dispatch(removeFromCart(star, userId))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
