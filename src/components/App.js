import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import Nav from './Nav'
import Footer from './Footer'

const App = () => (
  <div>
    <Nav />
    <main>
      <Route exact path='/' component={Home} />
    </main>
    <Footer />
  </div>
)

export default App
