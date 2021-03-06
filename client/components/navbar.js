import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userName, isAdmin}) => (
  <div className="ui secondary  menu" style={{backgroundColor: '#C0C0C0'}}>
    <Link className="item" to="/products">
      <h1 className="ui header">Grace Star Shopper</h1>
    </Link>
    <div className="right menu">
      {isLoggedIn ? (
        <div className="item">
          <p className="item">Logged in as: {userName}</p>
          {isAdmin ? (
            <Link className="item" to="/admin">
              Admin Panel
            </Link>
          ) : (
            <div />
          )}
          <Link className="item" to="/orders">
            Orders
          </Link>
        </div>
      ) : (
        <div />
      )}
      <Link className="item" to="/cart">
        <i className="shopping cart icon" /> Cart
      </Link>
      {isLoggedIn ? (
        <div className="item">
          <a href="#" className="item" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="item">
          <Link className="item" to="/signup">
            Sign Up
          </Link>
          <Link className="item ui" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  userName: state.user.name,
  isAdmin: state.user.admin
})

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
