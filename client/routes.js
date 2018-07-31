import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  Products,
  Cart,
  Checkout,
  OrderConfirmation,
  Orders,
  Admin
} from './components'
import {me} from './store'
import productList from './components/productList'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <div className="ui container">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route
            exact
            path="/order-confirmation"
            render={props => <OrderConfirmation {...this.props} />}
          />
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/checkout" component={Checkout} />
          <Route path="/home" render={props => <Products {...this.props} />} />
          <Route path="/cart" render={props => <Cart {...this.props} />} />
          <Route
            exact
            path="/orders"
            render={props => <Orders {...this.props} />}
          />
          <Route exact path="/admin" component={Admin} />
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
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
