import React from 'react';

import Header from '../components/Header';

class Search extends React.Component {
  state = {
    name: '',
    isDisabled: true,
  }
  
  handleChange = (event) => {
    const valor = event.target.value
    this.setState({ name: valor });
    if (valor.length > 1) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <textarea
            placeholder="Artista ou banda"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button 
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
