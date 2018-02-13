import React, { Component } from 'react'
import { Paper } from 'material-ui'

class HowItWorks extends Component {

  render() {
    const paperStyle = {
      height: 250,
      width: 250,
      margin: 20,
      padding: '0 15px',
      textAlign: 'center',
      display: 'inline-block',
    }

    return(
      <div className='container-fluid text-black how-it-works-container'>
        <section className='container-fluid'>
          <div className='row justify-content-center pt-5'>
            <div className='col-lg-10 center'>
              <h1 className='text-center how-it-works-header'>How it works</h1>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-auto m-3'>
              <Paper style={paperStyle} className='paper' zDepth={3}>
                <h1>Step 1</h1>
                <hr className='card-seperator'/>
                <i className='fas fa-search card-icon'></i>
                <div className='sub-header'>Enter a search term</div>
              </Paper>
            </div>

            <div className='col-auto m-3'>
              <Paper style={paperStyle} className='paper' zDepth={3}>
                <h1>Step 2</h1>
                <hr className='card-seperator'/>
                <i className='fas fa-dollar-sign card-icon'></i>
                <div className='sub-header'>Find the best deals</div>
              </Paper>
            </div>
          </div>
          <div className='row justify-content-center pb-5'>
            <div className='col-lg-10 center'>
              <p className='text-center how-it-works-sub-header'>Isn't that easy?</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default HowItWorks