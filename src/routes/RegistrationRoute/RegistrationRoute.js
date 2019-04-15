import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationRoute.css'
class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className='reg-form-container'>
        <div className="reg-text-container">
        <p>
          Practice learning a language with the spaced reptition revision technique.
        </p>
        <h2>Sign up</h2>
        </div>
        
        <RegistrationForm
          className='reg-form-com'
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
