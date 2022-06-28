import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    musics: [],
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    this.setState({ musics });
  }

  render() {
    const { musics } = this.state;
    return (
      <div key={ 1 } data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">
          Artist Name
        </h3>
        <h3 data-testid="album-name">
          Collection Name
        </h3>
        {musics.map((music) => {
          if (music.kind === 'song') {
            return (
              <MusicCard key={ music.trackName } music={ music } />
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
