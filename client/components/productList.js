import React, {Component} from 'react'
import Product from './product'
import {fetchProducts} from '../store/products'
import {addToCart, fetchCart} from '../store/cart'
import {searchUpdate} from '../store/searchFilter'
import {connect} from 'react-redux'

class productList extends Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.getCart(this.props.userId)
  }

  retrieveStripe() {}

  render() {
    const termsArr = this.props.searchTerm
    let searchTerms
    if (termsArr.length) {
      searchTerms = termsArr.split(' ')
    } else {
      searchTerms = ''
    }
    return (
      <div>
        <div className="ui grid">
          <div className="sixteen column row">
            <div className="eight wide left floated column">
              <h2>Available Stars</h2>
            </div>
            <div className="eigt wide left floated column">
              <div className="ui search">
                <div className="ui icon input">
                  <input
                    className="prompt"
                    type="text"
                    placeholder="Search for a star..."
                    onChange={event => {
                      this.props.searchUpdate(event.target.value)
                    }}
                  />
                  <i className="search icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui link cards">
          {this.props.products.length ? (
            this.props.products
              .filter(product => {
                if (
                  product.name.indexOf(searchTerms[0]) !== -1 ||
                  product.name.toLowerCase().indexOf(searchTerms[0]) !== -1 ||
                  !searchTerms.length
                ) {
                  return true
                } else {
                  return false
                }
              })
              .map(product => {
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
              })
          ) : (
            <h3>
              There are no stars available at this time, you are a star so it's
              all good!
            </h3>
          )}
          {/* <button onClick={}>Stripe Stuff</button> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart.cart,
  searchTerm: state.searchFilter.searchTerm
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getCart: id => dispatch(fetchCart(id)),
  searchUpdate: term => dispatch(searchUpdate(term)),
  handleSubmit: async (starId, userId) => {
    await dispatch(addToCart(starId, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(productList)
