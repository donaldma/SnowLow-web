import React from 'react'
import { Route, Link } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Login from './Login'

const App = () => (
  <div>
    <Nav />
    <main>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
    </main>
    <Footer />
  </div>
)

export default App
