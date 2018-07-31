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
    if (prevProps.userId !== this.props.userId)
      this.props.getCart(this.props.userId)
  }

  render() {
    return (
      <div className="ui grid">
        <div className="sixteen column row">
          <div className="eight wide left floated column">
            <h2>Shopping Cart</h2>
            {this.props.invalidItems.length ? (
              <p>
                The following items are no longer available and have been
                removed from your cart:
                {this.props.invalidItems.map((star, index) => {
                  let str = ' ' + star.name
                  if (index + 1 === this.props.invalidItems.length) {
                    return str + '.'
                  } else {
                    return str + ','
                  }
                })}
              </p>
            ) : (
              <div />
            )}
          </div>
          <div className="eight wide right floated column">
            <Link className="ui button right floated" to="/checkout">
              Go to Checkout
            </Link>
          </div>
        </div>
        {this.props.cart.length > 0 ? (
          <div className="ui cards">
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
          <h3 className="red">Your cart is empty.</h3>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.validItems,
  invalidItems: state.cart.invalidItems
})

const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(fetchCart(id)),
  handleRemove: async (star, userId) => {
    if (userId) {
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
