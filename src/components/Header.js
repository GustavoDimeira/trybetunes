import React, { Component } from 'react';

import LoadingMsg from './LoadingMsg';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const name = await getUser();
    this.setState({ name: name.name });
    this.setState({ loading: false });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <LoadingMsg /> : (
          <h1
            data-testid="header-user-name"
          >
            { name }
          </h1>
        )}
      </header>
    );
  }
}

export default Header;
