import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Products,
  Cart,
  Checkout,
  OrderConfirmation
} from './components'
<<<<<<< HEAD

=======
>>>>>>> master
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
<<<<<<< HEAD
=======
    console.log('routes props', this.props)
>>>>>>> master
    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
<<<<<<< HEAD
=======

>>>>>>> master
          <Route
            exact
            path="/order-confirmation"
            component={OrderConfirmation}
          />
<<<<<<< HEAD
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/checkout" component={Checkout} />
          <Route path="/home" render={props => <Products {...this.props} />} />
          <Route path="/cart" render={props => <Cart {...this.props} />} />
=======

          <Redirect exact from="/" to="/home" />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/checkout" component={Checkout} />
          {isLoggedIn && (
            <Switch>
              <Route
                path="/home"
                render={props => <Products {...this.props} />}
              />
              <Route path="/cart" render={props => <Cart {...this.props} />} />
            </Switch>
>>>>>>> master
          )}
          {/* Displays our Login component as a fallback */}
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
    cart: state.cart
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
