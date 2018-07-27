import React, {Component} from 'react'
import Product from './product'
import {fetchProducts} from '../store/products'
import {addToCart} from '../store/cart'
import {connect} from 'react-redux'

class productList extends Component {
  componentDidMount() {
    this.props.getProducts()
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
            />
          )
        })}
        {/* <button onClick={}>Stripe Stuff</button> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  handleSubmit: async (starId, userId) => {
    await dispatch(addToCart(starId, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(productList)
