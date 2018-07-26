import React, {Component} from 'react'
import Product from './product'
import {fetchCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends Component{
  componentDidMount(){
    this.props.getCart()
  }

  render(){
    return(
     
    <React.Fragment>
      {console.log('these props', this.props)}
      {this.props.cart.length > 0 ?
        <div className='ui card'>
          {this.props.cart.map(product => {
            return <Product key={product.id} product={product} />
          })}
        </div>
      : <h3>Your cart is empty.{console.log("hi")}</h3>
      } 
    </React.Fragment>
    )
  } 
}

const mapStateToProps = state => ({
  cart : state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)