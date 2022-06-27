import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { createUser } from '../services/userAPI';
import LoadingMsg from './LoadingMsg';

class Login extends Component {
  state = {
    name: '',
    buttonDisabled: true,
    loadingMsg: false,
    redirected: false,
  }

  handleChange = (event) => {
    const valor = event.target.value;
    this.setState({ name: valor });
    if (valor.length > 2) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loadingMsg: true });
    await createUser({ name });
    this.setState({ redirected: true });
  }

  render() {
    const { redirected, loadingMsg, buttonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <textarea
            placeholder="Insira seu nome aqui"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        { redirected && <Redirect to="/search" /> }
        { loadingMsg && <LoadingMsg /> }
      </div>
    );
  }
}

export default Login;
