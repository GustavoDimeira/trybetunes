import React from 'react';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favorites: [],
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  }

  isFavorite = () => true;

  render() {
    const { favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {favorites.map((music) => {
          if (music.kind === 'song') {
            return (
              <MusicCard
                key={ music.trackName }
                music={ music }
                favorite={ this.isFavorite }
              />
            );
          }
        })}
      </div>
    );
  }
}

export default Favorites;
