import React from 'react';
import { Link } from 'react-router-dom';

import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import LoadingMsg from '../components/LoadingMsg';

class Search extends React.Component {
  state = {
    name: '',
    artistName: '',
    isDisabled: true,
    isLoading: false,
    finded: undefined,
    musics: [],
    searchd: false,
  }

  handleChange = (event) => {
    const valor = event.target.value;
    this.setState({ name: valor });
    if (valor.length > 1) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClick = async () => {
    this.setState({ isDisabled: true });
    const { name } = this.state;
    this.setState({ isLoading: true });
    const resultado = await searchAlbumsAPI(name);
    this.setState({ isLoading: false, artistName: name, name: '', musics: resultado, searchd: true });
    if (resultado.length > 0) {
      this.setState({ finded: true });
    } else {
      this.setState({ finded: false });
    }
    this.setState({ isDisabled: false });
  }

  render() {
    const { isDisabled, name, isLoading, artistName, finded, musics, searchd } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <textarea
            placeholder="Artista ou banda"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ name }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        { isLoading && <LoadingMsg /> }
        { searchd && <div> 
          <h3>
           {`Resultado de álbuns de: ${artistName}`}
          </h3>
          <div>
            {finded
              ? musics.map((music) => (
                <Link
                  key={ music.collectionId }
                  to={ `/album/${music.collectionId}` }
                  data-testid={ `link-to-album-${music.collectionId}` }
                >
                  <p>
                    Coleção:
                    { music.collectionName }
                  </p>
                  <p>
                    Artist:
                    { music.artistName }
                  </p>
                  <img src={ music.artworkUrl100 } alt="NotFound" />
                  <p>
                    Price:
                    { music.collectionPrice }
                  </p>
                </Link>
              )) : <p>Nenhum álbum foi encontrado</p>}
          </div>
        </div> }
      </div>
    );
  }
}

export default Search;
