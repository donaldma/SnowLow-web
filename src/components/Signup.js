import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Paper, RaisedButton, LinearProgress } from 'material-ui'
import config from '../config'
import { CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { userHasAuthenticated } from '../actions/index'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      formSubmitted: false,
      formFocused: false,
      locationChange: false,
      name: undefined,
      email: undefined,
      password: undefined,
      location: props.userIpLocation,
      newUser: null,
      confirmationCode: undefined,
      confirmationLengthError: undefined,

      styles: {
        paperStyle: {
          height: 450,
          width: '100%',
          display: 'inline-block',
        },
        paperStyleSmall: {
          height: 270,
          width: '100%',
          display: 'inline-block',
        },
        buttonStyle: {
          float: 'right'
        },
        underlineStyle: {
          borderColor: 'black'
        },
        floatingLabelFocusStyle: {
          color: 'black'
        }
      }
    }
  }

  signup(name, email, password, location) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })

    return new Promise((resolve, reject) =>
      userPool.signUp(email, password, [{ Name: 'name',Value: name }, { Name: 'locale',Value: location}], null, (err, result) => {
        if (err) {
          reject(err)
          return
        }

        resolve(result.user)
      })
    )
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    )
  }

  authenticate(user, email, password) {
    const authenticationData = {
      Username: email,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    )
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ isLoading: true, formSubmitted: true })
    if(!this.state.name || !this.state.email || !this.state.password || !this.state.location) {
      return
    }

    try {
      const newUser = await this.signup(this.state.name, this.state.email, this.state.password, this.state.location)
      this.setState({ isLoading: false })
      this.setState({ newUser: newUser })
    } catch (err) {
      console.log(err)
      this.setState({ isLoading: false })
    }

  }

  handleConfirmation = async (event, val) => {
    event.preventDefault()
    await this.setState({ confirmationCode: val, formFocused: true })

    if(val.length > 6) {
      this.setState({ confirmationLengthError: 'Code must not be over 6 characters' })
    }

    if(val.length !== 6) {
      return
    }

    this.setState({ isLoading: true, confirmationLengthError: undefined })

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode)
      await this.authenticate(this.state.newUser, this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
      window.location.href = '/'
    } catch (err) {
      console.log(err)
      this.setState({ isLoading: false })
    }
  }

  renderForm() {
    const nameError = this.state.formSubmitted && !this.state.name ? 'Please enter a name' : ''
    const emailError = this.state.formSubmitted && !this.state.email ? 'Please enter an email' : ''
    const passwordError = this.state.formSubmitted && !this.state.password ? 'Please enter a password' : ''
    const locationError = this.state.formSubmitted && !this.state.location ? 'Please enter a location' : ''

    return (
      <Paper style={this.state.styles.paperStyle} zDepth={1}>
        {
          this.state.isLoading &&
          <LinearProgress mode='indeterminate' style={{width: '100%', backgroundColor: 'white'}} color='#4285f4' />
        }
        <div className='login-form p-l-3 p-r-3'>
          <h1 className='m-0'>Sign up</h1>

          <form onSubmit={e => this.handleSubmit(e)}>
            <TextField
              errorText={nameError}
              floatingLabelText='Name'
              fullWidth={true}
              underlineFocusStyle={this.state.styles.underlineStyle}
              floatingLabelFocusStyle={this.state.styles.floatingLabelFocusStyle}
              onChange={(e, val) => this.setState({ name: val })}
            />
            <TextField
              errorText={emailError}
              floatingLabelText='Email'
              fullWidth={true}
              type='email'
              underlineFocusStyle={this.state.styles.underlineStyle}
              floatingLabelFocusStyle={this.state.styles.floatingLabelFocusStyle}
              onChange={(e, val) => this.setState({ email: val })}
            />
            <TextField
              errorText={passwordError}
              floatingLabelText='Password'
              fullWidth={true}
              type='password'
              underlineFocusStyle={this.state.styles.underlineStyle}
              floatingLabelFocusStyle={this.state.styles.floatingLabelFocusStyle}
              onChange={(e, val) => this.setState({ password: val })}
            />
            {
              this.state.locationChange ?
              <TextField
                className='m-b-1'
                defaultValue={this.state.location}
                errorText={locationError}
                floatingLabelText='Location'
                fullWidth={true}
                underlineFocusStyle={this.state.styles.underlineStyle}
                floatingLabelFocusStyle={this.state.styles.floatingLabelFocusStyle}
                onChange={(e, val) => this.setState({ location: val })}
              /> :
              <div className='m-t-1'>
                <i className='fas fa-map-marker-alt'></i>
                <div className='m-b-2 i-b m-l-05'>{this.state.location}</div>
                <a className='location-change-link' onClick={() => this.setState({ locationChange: true })}><span>(change)</span></a>
              </div>
            }
            <RaisedButton
              onClick={e => this.handleSubmit(e)}
              disabled={this.state.isLoading}
              style={this.state.styles.buttonStyle}
              default={true}
              label='Continue'
            />
          </form>
        </div>
      </Paper>
    )
  }

  renderConfirmationForm() {
    const confirmationError = this.state.formFocused && !this.state.confirmationCode ? 'Please enter a valid code' : undefined

    return (
      <Paper style={this.state.styles.paperStyleSmall} zDepth={1}>
        {
          this.state.isLoading &&
          <LinearProgress mode='indeterminate' style={{width: '100%', backgroundColor: 'white'}} color='#4285f4' />
        }
        <div className='login-form p-l-3 p-r-3'>
          <h1 className='m-0'>Confirmation</h1>

          <TextField
            className='m-t'
            id='confirmation'
            type='number'
            errorText={this.state.confirmationLengthError || confirmationError}
            fullWidth={true}
            defaultValue=''
            underlineFocusStyle={this.state.styles.underlineStyle}
            onChange={(e, val) => this.handleConfirmation(e, val)}
          />
          <div className='f-s-12 m-b-2'>*Check junk or spam folders</div>
        </div>
      </Paper>
    )
  }

  render() {
    return(
      <div className='container-fluid login-background'>
        <div className='row justify-content-center login-container'>
          <div className='col-lg-4 m-t-2 m-b-2'>
          {
            this.state.newUser
            ? this.renderConfirmationForm()
            : this.renderForm()
          }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { userHasAuthenticated })(Signup)
