import React, { Component } from 'react'
import Search from './Search'
import HowItWorks from './HowItWorks'

class Home extends Component {

  render() {
    return(
      <div>
        <Search />
        <HowItWorks />
      </div>
    )
  }
}

export default Home
