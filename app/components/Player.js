import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Player extends Component {
    render() {
        const { mediaUrl } = this.props;

        return (
            <div className="player">
                <audio src={mediaUrl}>
                    <p>Please upgrade to a more modern browser to use this player.</p>
                </audio>

                <div className="player-top">
                    <div className="album-art">
                        {/* img or background-image? */}
                    </div>
                    <div className="time-bar">
                        <span className="current-time">00:00</span>
                        <progress value="50" max="100"></progress>
                        <span className="total-time">02:59</span>
                    </div>
                </div>
                <div className="player-bottom">
                    <div className="song-info">
                        <h1 className="song-title">Three Little Birds</h1>
                        <h2 className="song-album">The best of Bob Marley & the Waiters</h2>
                        <h2 className="song-artist">Bob Marley</h2>
                    </div>
                    <div className="player-controls">
                        <button className="play-toggle">
                            <span className="play">PLAY</span>
                            <span className="pause">PAUSE</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Player.propTypes = {
    mediaUrl: PropTypes.string.isRequired,
};

export default Player;
