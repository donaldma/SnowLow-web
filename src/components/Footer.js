import React, { Component } from 'react'

export default class Nav extends Component {

  render() {
    return(
      <footer className='copyright'>
        <a href='mailto:donald@hotmail.ca?Subject=Snowlow%20Contact' className='contact-link'><p className='m-b-0 m-l-2 f-l'>Contact Us</p></a>
        <p className='m-b-0 m-r-2 f-r'>&copy; SnowLow 2018</p>
      </footer>
    )
  }
}