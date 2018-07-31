import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class orderConfirmation extends Component {
  render() {
    return (
      <div>
        {console.log('confirmation page', this.props)}
        {this.props.order.id ? (
          <div>
            <h2>Your order is complete!</h2>
            <p>
              Your purchase amount is: ${this.props.order.amount.toLocaleString()}
              , which is still in billions.
            </p>
            <p>Your order ID is: {this.props.order.id}</p>
            <Link to="/products" className="ui button">
              Browse More Products
            </Link>
          </div>
        ) : (
          <div>
            {this.props.userId ? (
              <h3>
                Please refer to your order history page if you recently made a
                purchase.
              </h3>
            ) : (
              <h3>Expired</h3>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.purchase.order
})

export default connect(mapStateToProps)(orderConfirmation)
