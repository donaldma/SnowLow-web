import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import SearchBar from '../headache/material-ui-search-bar/lib/index'
import { combinedDataList } from '../helpers/DataList'
import { getSearchResults } from '../actions/index'
import SearchRequestHelper from '../helpers/SearchRequestHelper'
import RaisedButton from 'material-ui/RaisedButton'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchBarText: null,
      isLoading: undefined,
      redirect: false
    }
  }

  handleChange = (e) => {
    this.setState({ searchBarText: e })
  }

  handleSubmit = async() => {
    try {
      this.setState({ isLoading: true })
      const sanitizedSearchTerm = SearchRequestHelper.getSanitizedSearchTerm(this.state.searchBarText)
      await this.props.getSearchResults(sanitizedSearchTerm)
    } catch(error) {
      console.log(error)
    }
    this.setState({ isLoading: false, redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect from='/' to='/results'/>
    }

    return(
      <div className='container-fluid text-white home-background'>
        <section className='container-fluid search-hero'>
          <div className='row justify-content-center'>
            <div className='col-lg-10 center'>
              <h1 className='text-center main-header'>Snow equipment shopping shouldn't be hard</h1>
              <p className='mt-4 text-center sub-header'>Let us help</p>
              <div className='pt-5'>
                <SearchBar
                  dataSource={combinedDataList}
                  onChange={(e) => this.handleChange(e)}
                  onRequestSearch={() => this.handleSubmit()}
                  style={{
                    margin: '0 auto',
                    maxWidth: 800
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults
})

export default connect(mapStateToProps, { getSearchResults })(Search)