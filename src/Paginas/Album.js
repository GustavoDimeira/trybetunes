import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    favorites: [],
  }

  isFavorite = (music) => {
    const { favorites } = this.state;
    const includes = favorites.some((atual) => atual.trackName === music.trackName);
    return (includes);
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({
      musics,
      favorites,
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <div key={ 0 } data-testid="page-album">
        <Header />
        <h3 key={ 1 } data-testid="artist-name">
          Artist Name
        </h3>
        <h3 key={ 2 } data-testid="album-name">
          Collection Name
        </h3>
        {musics.map((music) => {
          if (music.kind === 'song') {
            return (
              <MusicCard
                key={ music.trackId }
                music={ music }
                favorite={ this.isFavorite }
              />
            );
          }
          return (
            <p key={ music.trackName } />
          );
        })}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
