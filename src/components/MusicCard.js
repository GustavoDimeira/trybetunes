import React from 'react';
import PropTypes from 'prop-types';

import { addSong } from '../services/favoriteSongsAPI';
import LoadingMsg from './LoadingMsg';

class MusicCard extends React.Component {
  state = {
    loadingMsg: false,
  }

  handleClick = async (music) => {
    this.setState({ loadingMsg: true });
    await addSong(music);
    this.setState({ loadingMsg: false });
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loadingMsg } = this.state;
    return (
      <div>
        { loadingMsg && <LoadingMsg />}
        <p>{ trackName }</p>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.handleClick(music) }
          />
        </label>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
