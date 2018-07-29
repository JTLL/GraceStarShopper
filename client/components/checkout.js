import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  ccTypeChange,
  ccNumberChange,
  cvcChange,
  completeOrder,
  clearErrors
} from '../store/purchase'
import {fetchCart} from '../store/cart'

class Checkout extends Component {
  componentDidMount() {
    this.props.clearErrorState()
    this.props.userId
      ? this.props.getCart(this.props.userId)
      : this.props.getCart(0)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId)
      this.props.getCart(this.props.userId)
  }

  simplifyCart = () => {
    return this.props.cart.map(star => star.id)
  }

  render() {
    const total = this.props.cart.reduce((start, item) => {
      return start + Number(item.price)
    }, 0)

    return (
      <div>
        <h2>Checkout</h2>
        <p>
          Total is:
          {' $' + total.toLocaleString() + ' in billions, of course.'}
        </p>
        <form
          className="ui form"
          onSubmit={event => {
            event.preventDefault()
            this.props.completeOrder(
              total,
              this.props.ccType,
              this.props.ccNumber,
              this.props.cvc,
              this.props.userId,
              this.simplifyCart()
            )
          }}
        >
          <div className=" field six wide">
            <label>Credit Card Type</label>
            <select
              className="ui dropdown"
              onChange={event => this.props.ccTypeChange(event.target.value)}
            >
              <option value="">Credit Card</option>
              <option value="visa">Visa</option>
              <option value="visaDebit">Visa Debit</option>
              <option value="masterCard">Mastercard</option>
              <option value="mastercardDebit">Mastercard Debit</option>
              <option value="mastercardPrepaid">Mastercard Prepaid</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
              <option value="diners">Diners</option>
              <option value="jcb">JCB</option>
              <option value="unionpay">Unionpay</option>
            </select>
          </div>
          <div className="field six wide">
            <label>Credit Card Number</label>
            <input
              type="text"
              name="credit-card-number"
              placeholder="Credit Card Number"
              onChange={event => this.props.ccNumberChange(event.target.value)}
            />
          </div>
          <div className="field six wide">
            <label>CVC</label>
            <input
              type="text"
              name="last-name"
              placeholder="CVC"
              onChange={event => this.props.cvcChange(event.target.value)}
            />
          </div>
          <button className="ui button" type="submit">
            Complete Purchase
          </button>
          {this.props.ccTypeValid ? (
            <div />
          ) : (
            <p className="red">Please select a credit card type.</p>
          )}
          {this.props.ccNumberValid ? (
            <div />
          ) : (
            <p className="red">Please input a valid credit card number.</p>
          )}
          {this.props.cvcValid ? (
            <div />
          ) : (
            <p className="red">Please enter a valid CVC code.</p>
          )}
          {this.props.purchase ? (
            <div />
          ) : (
            <p className="red">You have nothing in your cart.</p>
          )}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  ccType: state.purchase.ccType,
  ccNumber: state.purchase.ccNumber,
  cvc: state.purchase.cvc,
  ccTypeValid: state.purchase.ccTypeValid,
  ccNumberValid: state.purchase.ccNumberValid,
  cvcValid: state.purchase.cvcValid,
  cart: state.cart,
  purchase: state.purchase.purchase
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCart: userId => dispatch(fetchCart(userId)),
  ccTypeChange: type => dispatch(ccTypeChange(type)),
  ccNumberChange: number => dispatch(ccNumberChange(number)),
  cvcChange: number => dispatch(cvcChange(number)),
  completeOrder: (amount, cardType, cardNumber, cvc, userId, stars) =>
    dispatch(
      completeOrder(
        amount,
        cardType,
        cardNumber,
        cvc,
        ownProps.history,
        userId,
        stars
      )
    ),
  clearErrorState: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
