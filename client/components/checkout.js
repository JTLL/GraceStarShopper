import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  ccTypeChange,
  ccNumberChange,
  cvcChange,
  completeOrder
} from '../store/purchase'

class Checkout extends Component {
  render() {
    return (
      <div>
        <form
          className="ui form"
          onSubmit={event => {
            event.preventDefault()
            this.props.completeOrder(70, this.props.ccType)
          }}
        >
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
          <div className="field">
            <label>Credit Card Number</label>
            <input
              type="text"
              name="credit-card-number"
              placeholder="Credit Card Number"
              onChange={event => this.props.ccNumberChange(event.target.value)}
            />
          </div>
          <div className="field">
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
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ccType: state.purchase.ccType
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ccTypeChange: type => dispatch(ccTypeChange(type)),
  ccNumberChange: number => dispatch(ccNumberChange(number)),
  cvcChange: number => dispatch(cvcChange(number)),
  completeOrder: (amount, cardType) =>
    dispatch(completeOrder(amount, cardType, ownProps.history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
