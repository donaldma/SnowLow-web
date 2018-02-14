import React, { Component } from 'react'
import TextField from 'material-ui/TextField'

class Home extends Component {

  render() {
    return(
      <div>
        <TextField
          hintText="Hint Text"
          errorText="This field is required"
          floatingLabelText="Floating Label Text"
        />
      </div>
    )
  }
}

export default Home
