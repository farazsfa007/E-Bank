import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {userId: '', pin: '', errorMsg: '', showErrorMsg: false}

  onChangeUserInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserIdInput = () => {
    const {userId} = this.state
    return (
      <div className="input-content">
        <label className="label" htmlFor="userId">
          USER ID
        </label>
        <input
          placeholder="Enter User Id"
          id="userId"
          className="input-box"
          value={userId}
          type="text"
          onChange={this.onChangeUserInput}
        />
      </div>
    )
  }

  renderPinInput = () => {
    const {pin} = this.state
    return (
      <div className="input-content">
        <label className="label" htmlFor="pin">
          PIN
        </label>
        <input
          placeholder="Enter Pin"
          id="pin"
          className="input-box"
          value={pin}
          type="password"
          onChange={this.onChangePin}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-login">
        <div className="login-container-card">
          <img
            className="login-image"
            alt="website login"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          />
          <div className="login-container">
            <form onSubmit={this.submitLoginForm}>
              <h1 className="login-heading">Welcome Back!</h1>
              {this.renderUserIdInput()}
              {this.renderPinInput()}
              <button className="login-button" type="submit">
                Login
              </button>
              {showErrorMsg && <p className="error_msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
