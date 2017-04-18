import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const PlayerControls = ({ togglePlay, isPlaying }) => {
    return (
        <div className="player-controls">
            <button className="play-toggle reset" onClick={(e)=>togglePlay(e)}>
                <CSSTransitionGroup transitionName="button-icon" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {!isPlaying && <i className="icon-play"></i>}
                    {isPlaying && <i className="icon-pause"></i>}
                </CSSTransitionGroup>
            </button>
        </div>
    );
};

PlayerControls.propTypes = {
    togglePlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

export default PlayerControls;
