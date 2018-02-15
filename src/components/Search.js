import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchBar from '../headache/material-ui-search-bar/lib/index'
import { combinedDataList } from '../helpers/DataList'
import { getSearchResults } from '../actions/index'
import SearchRequestHelper from '../helpers/SearchRequestHelper'
import RaisedButton from 'material-ui/RaisedButton'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchBarText: null
    }
  }

  handleChange = (e) => {
    this.setState({ searchBarText: e })
  }

  handleSubmit = async() => {
    const sanitizedSearchTerm = SearchRequestHelper.getSanitizedSearchTerm(this.state.searchBarText)
    await this.props.getSearchResults(sanitizedSearchTerm)
    console.log(this.props.searchResults)
  }

  render() {

    const buttonStyle = {
      display: this.state.searchBarText && this.state.searchBarText !== '' ? 'inline-block' : 'none'
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
          <div className='row justify-content-center p-t'>
            <div className='col-lg-12 center text-center'>
              <RaisedButton
                onClick={() => this.handleSubmit()}
                style={buttonStyle}
                default={true}
                label='Search'
              />
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