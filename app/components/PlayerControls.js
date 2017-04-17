import React from 'react';
import PropTypes from 'prop-types';

const PlayerControls = ({ togglePlay, isPlaying }) => {
    return (
        <div className="player-controls">
            <button className="play-toggle reset" onClick={(e)=>togglePlay(e)}>
                {!isPlaying && <i className="icon-play"></i>}
                {isPlaying && <i className="icon-pause"></i>}
            </button>
        </div>
    );
};

PlayerControls.propTypes = {
    togglePlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

export default PlayerControls;
