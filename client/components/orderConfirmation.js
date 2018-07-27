import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class orderConfirmation extends Component {
  render() {
    console.log(this.props.order)
    return (
      <div>
        <h1>Your order is complete!</h1>
        <p>Your purchase amount is: {this.props.order.amount}</p>
        <p>Your order ID is: {this.props.order.id}</p>
        <Link to="/">Return Home</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.purchase.order
})

export default connect(mapStateToProps)(orderConfirmation)
