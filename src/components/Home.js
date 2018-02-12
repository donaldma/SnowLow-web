import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Search from './Search'
import HowItWorks from './HowItWorks'
// import reducers here

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

const mapStateToProps = state => ({
  // count: state.counter.count
})

export default connect(mapStateToProps, null)(Home)
