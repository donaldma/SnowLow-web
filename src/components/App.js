import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'
import { authUser } from '../actions/awsActions'
import { userHasAuthenticated } from '../actions'
import config from '../config'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticating: true,
      userIpLocation: undefined
    }
  }

  async componentDidMount() {
    try {
      const ipResponse = await axios.get('https://ip.zxq.co/')
      const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ipResponse.data.loc}&key=${config.google.GEOCODE_API_KEY}`)
      const city = _.find(googleResponse.data.results, { types: ['locality', 'political'] })
      this.setState({ userIpLocation: city.formatted_address})
    } catch(err) {
      console.log(err)
      this.setState({ userIpLocation: 'Vancouver, BC, Canada'})
    }

    try {
      if (await authUser()) {
        this.props.userHasAuthenticated(true)
      }
    }
    catch(err) {
      console.log(err)
    }

    this.setState({ isAuthenticating: false })
  }

  render() {
    return (
      (!this.state.isAuthenticating && this.state.userIpLocation) &&
      <div>
        <Nav isAuthenticated={this.props.isAuthenticated}/>
        <main>
          <Switch>
            <Route exact path='/' render={()=><Home isAuthenticated={this.props.isAuthenticated}/>}/>
            <Route exact path='/login' render={()=><Login isAuthenticated={this.props.isAuthenticated}/>}/>
            <Route exact path='/signup' render={()=><Signup isAuthenticated={this.props.isAuthenticated} userIpLocation={this.state.userIpLocation} />}/>
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
})

export default connect(mapStateToProps, { userHasAuthenticated })(App)
