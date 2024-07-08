import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        {loading ? <LoadingMsg /> : (
          <div>
            <h2
              data-testid="header-user-name"
            >
              {name}
            </h2>
            <div>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Search
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
