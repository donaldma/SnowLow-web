import React, { Component } from 'react'

class Nav extends Component {

  render() {
    return(
      <nav className='navbar navbar-light navbar-expand-md'>
        <a className='navbar-brand' href='/'>
          <img src='/img/logo.png' className='logo-image' />
          <span className='align-middle'>SnowLow</span>
        </a>
        <button className='navbar-toggler navbar-toggler-right collapsed' type='button' data-toggle='collapse' data-target='#navigation'>
          <span> </span>
          <span> </span>
          <span> </span>
        </button>

        <div className='collapse navbar-collapse ' id='navigation'>
          <ul className='nav navbar-nav mt-3 mt-md-0 ml-md-auto'>
            <li className='nav-item d-flex d-md-none'>
              <a className='nav-link' href='/'>Home</a>
            </li>

            <li className='nav-item'>
              <a className='nav-link' href='/login'>Log in</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/signup'>Sign up</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav