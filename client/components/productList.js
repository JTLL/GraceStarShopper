import React, {Component} from 'react'
import Product from './product'
import {fetchProducts} from '../store/products'
import {addToCart, fetchCart} from '../store/cart'
import {searchUpdate, priceMinUpdate} from '../store/searchFilter'
import {connect} from 'react-redux'

class productList extends Component {
  componentDidMount() {
    this.props.getProducts()
    this.props.getCart(this.props.userId)
  }

  render() {
    const terms = this.props.searchTerm
    let searchTerms = ['']
    if (terms.length) searchTerms = terms.split(' ')
    return (
      <div>
        <div className="ui grid">
          <div className="sixteen column row">
            <div className="eight wide left floated column">
              <h2>Available Stars</h2>
            </div>
            <div className="four wide left floated column">
              <select
                className="ui dropdown"
                onChange={event =>
                  this.props.priceMinUpdate(event.target.value)
                }
              >
                <option value="0">Filter by Price</option>
                <option value="1000">Less Than $1,000</option>
                <option value="10000">Less Than $10,000</option>
                <option value="100000">Less Than $100,000</option>
              </select>
            </div>
            <div className="four wide left floated column">
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
        <div className="ui cards">
          {this.props.products.length ? (
            this.props.products
              .filter(product => {
                let result = true
                for (let i = 0; i < searchTerms.length; i++) {
                  if (
                    product.name.indexOf(searchTerms[i]) === -1 &&
                    product.name.toLowerCase().indexOf(searchTerms[i]) === -1 &&
                    product.magnitude.toString().indexOf(searchTerms[i]) ===
                      -1 &&
                    !Number(product.price)
                      .toLocaleString()
                      .startsWith(searchTerms[i])
                  ) {
                    result = false
                  }
                }
                if (
                  Number(product.price) > Number(this.props.priceMin) &&
                  Number(this.props.priceMin) !== 0
                )
                  result = false
                return result
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
<<<<<<< HEAD
  cart: state.cart.cart,
  searchTerm: state.searchFilter.searchTerm
=======
  cart: state.cart,
  searchTerm: state.searchFilter.searchTerm,
  priceMin: state.searchFilter.priceMin
>>>>>>> master
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getCart: id => dispatch(fetchCart(id)),
  searchUpdate: term => dispatch(searchUpdate(term)),
  priceMinUpdate: price => dispatch(priceMinUpdate(price)),
  handleSubmit: async (starId, userId) => {
    await dispatch(addToCart(starId, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(productList)
