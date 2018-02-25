import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Paper, RaisedButton, LinearProgress } from 'material-ui'
import config from '../config'
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import { userHasAuthenticated } from '../actions/index'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      formSubmitted: false,
      email: undefined,
      password: undefined,
      loginError: undefined
    }
  }

  login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })
    const user = new CognitoUser({ Username: email, Pool: userPool })
    const authenticationData = { Username: email, Password: password }
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

    if(!this.state.email || !this.state.password) {
      this.setState({ isLoading:false })
      return
    }

    try {
      await this.login(this.state.email, this.state.password)
      this.setState({ isLoading: false })
      this.props.userHasAuthenticated(true)
      window.location.href = '/'
    } catch (err) {
      console.log(err)
      this.setState({
        isLoading: false,
        loginError: err.message
      })
    }
  }

  render() {
    const styles = {
      paperStyle: {
        height: 350,
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

    let passwordError, emailError = ''
    if(this.state.formSubmitted) {
      if(!this.state.password) {
        passwordError = 'Please enter a password'
      } else if(!this.state.email) {
        emailError = 'Please enter an email'
      } else if(this.state.loginError) {
        passwordError = this.state.loginError
      }
    }

    return(
      <div className='container-fluid login-background'>
        <div className='row justify-content-center login-container'>
          <div className='col-lg-4 m-t-2 m-b-2'>
            <Paper style={styles.paperStyle} zDepth={1}>
              {
                this.state.isLoading &&
                <LinearProgress mode='indeterminate' style={{width: '100%', backgroundColor: 'white'}} color='#4285f4' />
              }
              <div className='login-form'>
                <h1 className='m-0'>Log in</h1>

                <form onSubmit={e => this.handleSubmit(e)}>
                  <TextField
                    errorText={emailError}
                    floatingLabelText='Email'
                    fullWidth={true}
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    onChange={(e, val) => this.setState({ email: val })}
                  />
                  <TextField
                    className='m-b-2'
                    errorText={passwordError}
                    floatingLabelText='Password'
                    fullWidth={true}
                    type='password'
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    onChange={(e, val) => this.setState({ password: val })}
                  />
                  <RaisedButton
                    onClick={e => this.handleSubmit(e)}
                    disabled={this.state.isLoading}
                    style={styles.buttonStyle}
                    default={true}
                    label='Log in'
                  />
                </form>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { userHasAuthenticated })(Login)
