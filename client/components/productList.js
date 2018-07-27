import React, {Component} from 'react'
import Product from './product'
import {fetchProducts} from '../store/products'
import {addToCart, fetchCart} from '../store/cart'
import {connect} from 'react-redux'

class productList extends Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.getCart(this.props.userId)
  }

  retrieveStripe() {}

  render() {
    return (
      <div className="ui link cards">
        {this.props.products.map(product => {
          return (
            <Product
              key={product.id}
              product={product}
              location={this.props.location}
              handleSubmit={this.props.handleSubmit}
              userId={this.props.userId}
              cart={this.props.cart}
            />
          )
        })}
        {/* <button onClick={}>Stripe Stuff</button> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getCart: id => dispatch(fetchCart(id)),
  handleSubmit: async (starId, userId) => {
    await dispatch(addToCart(starId, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(productList)
