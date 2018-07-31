import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class Product extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  render() {
    const {
      product,
      handleSubmit,
      handleRemove,
      location,
      userId,
      cart
    } = this.props
    const cartReducer = (accumulator, currentValue) => {
      return currentValue.id === product.id || accumulator
    }
    return (
      <div className="ui card">
        <div className="image">
          <img src={product.image} style={{height: '290px', width: '290px'}} />
        </div>
        <div className="content">
          <p className="header">{product.name}</p>
          <div className="description margin-bottom">
            Magnitude: {product.magnitude} | Price: ${Number(
              product.price
            ).toLocaleString()}
          </div>
          {location.pathname === '/cart' ? (
            <button
              className="ui button"
              onClick={() => {
                handleRemove(product.id, userId)
              }}
            >
              Remove
            </button>
          ) : cart.reduce(cartReducer, false) ? (
            <button className="ui button">Added</button>
          ) : (
            <div
              className="ui vertical animated button"
              tabIndex="0"
              onClick={() => handleSubmit(product.id, userId)}
            >
              <div className="hidden content">Add</div>
              <div className="visible content">
                <i className="shop icon" />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart.validItems
})

const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(fetchCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
