import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ mediaUrl }) => {
    return (
        <div className="player">
            <audio src={mediaUrl} controls>
                <p>Please upgrade to a more modern browser to use this player.</p>
            </audio>
        </div>
    );
};

Player.propTypes = {
    mediaUrl: PropTypes.string.isRequired,
};

export default Player;
