import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { GridTile } from 'material-ui'

class Results extends Component {
  render() {
    if(!this.props.searchResults) {
      return <Redirect to='/' />
    }
    if(this.props.searchResults.error) {
      return(
        <div className='container-fluid results-background vh-100'>
          <div className='row m-b'>
            <div className='col-md-12 text-center '>
              <h1 className='how-it-works-header'>{this.props.searchResults.error}</h1>
              <p className='how-it-works-sub-header'>Sorry we couldn't find exactly what you were looking for.</p>
              <Link to='/' style={{color: '#4285f4'}}>Try another search term.</Link>
            </div>
          </div>
        </div>
      )
    }
    return(
      <div className='container-fluid text-white results-background'>
        <div className='row m-b'>
          {
            this.props.searchResults.results.map(result => {
              return(
                <div className='col-md-3 m-t m-b result-card' key={result.imageUrl}>
                  <GridTile
                    style={{boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px'}}
                    key={result.imageUrl}
                    title={result.name}
                    subtitle={<span><b>{result.currency}</b> ${result.price}</span>}
                  >
                    <img src={result.imageUrl} alt=''/>
                  </GridTile>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults
})

export default connect(mapStateToProps)(Results)
