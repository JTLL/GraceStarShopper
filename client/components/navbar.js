import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
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

  <div className="ui secondary  menu">
    <Link className="item" to="/home">
      Grace Star Shopper
    </Link>
    <div className="right menu">
      {isLoggedIn ? (
        <a href="#" className="item" onClick={handleClick}>
          Logout
        </a>
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
