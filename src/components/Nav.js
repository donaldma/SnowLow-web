import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userHasAuthenticated } from '../actions/index'
import { signOutUser } from '../actions/awsActions'
import { Drawer, MenuItem, Divider } from 'material-ui'

class Nav extends Component {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  async handleLogout() {
    await signOutUser()
    this.props.userHasAuthenticated(false)
    window.location.href = '/'
  }

  handleToggle = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  render() {
    return(
      <nav className='navbar navbar-light navbar-expand-md'>
        <button className='navbar-toggler navbar-toggler-right collapsed' type='button' onClick={this.handleToggle}>
          <span> </span>
          <span> </span>
          <span> </span>
        </button>
        <Link to={'/'} className='navbar-brand'>
          <img src='/img/logo.png' alt='logo.png' className='logo-image' />
          <span className='align-middle'>SnowLow</span>
        </Link>

        <div className='collapse navbar-collapse' id='navigation'>
          <ul className='nav navbar-nav mt-3 mt-md-0 ml-md-auto'>
            <li className='nav-item d-flex d-md-none'>
              <Link to={'/'} className='nav-link'>Home</Link>
            </li>
            {
              !this.props.isAuthenticated &&
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>Log in</Link>
              </li>
            }
            {
              !this.props.isAuthenticated &&
              <li className='nav-item'>
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
        <Drawer
          docked={false}
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to={'/'} className='navbar-brand'>
              <img src='/img/logo.png' alt='logo.png' className='logo-image' />
              <span className='align-middle'>SnowLow</span>
            </Link>
          </MenuItem>
          <Divider />
          {
            !this.props.isAuthenticated &&
            <MenuItem onClick={this.handleClose}>
              <Link to={'/login'} className='nav-link'>Log in</Link>
            </MenuItem>
          }
          {
            !this.props.isAuthenticated &&
            <MenuItem onClick={this.handleClose}>
              <Link to={'/signup'} className='nav-link'>Sign up</Link>
            </MenuItem>
          }
          {
            this.props.isAuthenticated &&
            <MenuItem onClick={this.handleClose}>
              <a className='nav-link' onClick={() => this.handleLogout()}>Log out</a>
            </MenuItem>
          }
        </Drawer>
      </nav>
    )
  }
}

export default connect(null, { userHasAuthenticated })(Nav)