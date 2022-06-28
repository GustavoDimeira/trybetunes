import React from 'react';
import PropTypes from 'prop-types';

import { addSong, removeSong } from '../services/favoriteSongsAPI';
import LoadingMsg from './LoadingMsg';

class MusicCard extends React.Component {
  state = {
    loadingMsg: false,
    isChecked: false,
  }

  componentDidMount = () => {
    const { favorite, music } = this.props;
    this.setState({ isChecked: favorite(music) });
  }

  handleClick = async (music) => {
    const { isChecked } = this.state;
    this.setState({ loadingMsg: true });
    await addSong(music);
    this.setState({ loadingMsg: false });
    this.setState({ isChecked: !isChecked });
    if (isChecked) {
      this.setState({ loadingMsg: true });
      await removeSong(music);
      this.setState({ loadingMsg: false });
    }
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loadingMsg, isChecked } = this.state;
    return (
      <div>
        { loadingMsg && <LoadingMsg />}
        <p>{ trackName }</p>
        { console.log(trackName) }
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.handleClick(music) }
            checked={ isChecked }
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
  favorite: PropTypes.func.isRequired,
};

export default MusicCard;
