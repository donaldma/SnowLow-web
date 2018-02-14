import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userHasAuthenticated } from '../actions/index'
import { signOutUser } from '../actions/awsActions'

class Nav extends Component {

  async handleLogout() {
    await signOutUser()
    this.props.userHasAuthenticated(false)
    window.location.href = '/'
  }

  render() {
    return(
      <nav className='navbar navbar-light navbar-expand-md'>
        <Link to={'/'} className='navbar-brand'>
          <img src='/img/logo.png' alt='logo.png' className='logo-image' />
          <span className='align-middle'>SnowLow</span>
        </Link>
        <button className='navbar-toggler navbar-toggler-right collapsed' type='button' data-toggle='collapse' data-target='#navigation'>
          <span> </span>
          <span> </span>
          <span> </span>
        </button>

        <div className='collapse navbar-collapse ' id='navigation'>
          <ul className='nav navbar-nav mt-3 mt-md-0 ml-md-auto'>
            <li className='nav-item d-flex d-md-none'>
              {/* <a className='nav-link' href='/'>Home</a> */}
              <Link to={'/'} className='nav-link'>Home</Link>
            </li>
            {
              !this.props.isAuthenticated &&
              <li className='nav-item'>
                {/* <a className='nav-link' href='/login'>Log in</a> */}
                <Link to={'/login'} className='nav-link'>Log in</Link>
              </li>
            }
            {
              !this.props.isAuthenticated &&
              <li className='nav-item'>
                {/* <a className='nav-link' href='/signup'>Sign up</a> */}
                <Link to={'/signup'} className='nav-link'>Sign up</Link>
              </li>
            }
            {
              this.props.isAuthenticated &&
              <li className='nav-item'>
                <a className='nav-link' onClick={() => this.handleLogout()}>Log out</a>
              </li>
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default connect(null, { userHasAuthenticated })(Nav)