import React, { Component } from 'react'
import SearchBar from 'material-ui-search-bar'
import { AutoComplete } from 'material-ui'
import { DataList } from '../helpers/DataList'

class Search extends Component {

  render() {
    return(
      <div className='container-fluid text-white home-background'>
        <section className='container-fluid' style={{paddingTop: '300px', paddingBottom: '300px'}}>
          <div className='row justify-content-center'>
            <div className='col-lg-12 center'>
              <h1 className='text-center main-header'>Snow equipment shopping shouldn't be hard</h1>
              <p className='mt-4 text-center sub-header'>Let us help</p>
              <div className='pt-5'>
                <SearchBar
                  dataSource={DataList}
                  onChange={(e) => console.log(e)}
                  onRequestSearch={() => console.log('onRequestSearch')}
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

export default Search