import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Landing,
  Signup,
  Products,
  Cart,
  Checkout,
  OrderConfirmation,
  Orders,
  Admin,
  MarioParty
} from './components'
import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    return (
      <div className="ui container">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/checkout" component={Checkout} />
          <Route path="/products" render={() => <Products {...this.props} />} />
          <Route path="/cart" render={() => <Cart {...this.props} />} />
          <Route
            exact
            path="/orders"
            render={() => <Orders {...this.props} />}
          />
          <Route
            exact
            path="/order-confirmation"
            render={() => <OrderConfirmation {...this.props} />}
          />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/mario-party" component={MarioParty} />
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    cart: state.cart.validItems,
    isAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
