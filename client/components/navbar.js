import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  //   <div className="ui secondary  menu">
  //     <div className="header item">
  //       <Link className="item" to="/home">
  //         Grace Star Shopper
  //       </Link>
  //     </div>
  //     <div className="right menu">
  //       {isLoggedIn ? (
  //         <a href="#" className="item" onClick={handleClick}>
  //           Login
  //         </a>
  //       ) : (
  //         <div>
  //           <Link className="item" to="/signup">
  //             Sign Up
  //           </Link>
  //           <Link className="item ui" to="/login">
  //             Login
  //           </Link>
  //         </div>
  //       )}
  //     </div>
  //     <hr />
  //  </div>

  <div className="ui secondary  menu" style={{ backgroundColor: '#C0C0C0' }}>
    <Link className="item" to="/">
      <h1 className="ui header">Grace Star Shopper</h1>
    </Link>
    <div className="right menu">
      {isLoggedIn ? (
        <div className="item">
          <Link className="item" to="/cart">
            <i className="shopping cart icon" /> Cart
          </Link>
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
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

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
