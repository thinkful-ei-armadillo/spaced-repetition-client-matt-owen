import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
        className='reg-form'
      >
        <div role='alert'>
          {error && <p className='error-message'>{error}</p>}
        </div>
        <div className='reg-name'>
          <Label className= 'reg-label' htmlFor='registration-name-input'>
            Enter your name<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            className='reg-input'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='reg-username'>
          <Label className= 'reg-label' htmlFor='registration-username-input'>
            Choose a username<Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            className='reg-input'
            placeholder='Choose a username'
            required
          />
        </div>
        <div className='reg-pasword'>
          <Label  className= 'reg-label' htmlFor='registration-password-input'>
            Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            className='reg-input'
            placeholder='Choose a password'
            required
          />
        </div>
        <footer className='reg-footer'>
          <Button role='button' className='reg-button' type='submit'>
            Sign up
          </Button>
          {' '}
          <div className="reg-link">
          <Link className='reg-link' to='/login'>Already have an account?</Link>
          </div>
          
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
