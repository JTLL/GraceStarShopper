import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class orderConfirmation extends Component {
  render() {
    return (
      <div>
        <h1>Your order is complete!</h1>
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
