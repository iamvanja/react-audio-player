import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Renders player's controls.
 *
 * @class      PlayerControls (name)
 * @param      {Object}       props             Component properties
 * @param      {Function}     props.togglePlay  The toggle play
 * @param      {Bool}         props.isPlaying   Indicates if playing
 * @return     {ReactElement} markup
 */
const PlayerControls = ({ togglePlay, isPlaying, isPlayDisabled }) => {
    return (
        <div className="player-controls">
            <button className="play-toggle reset" onClick={(e)=>togglePlay(e)} disabled={isPlayDisabled}>
                <CSSTransitionGroup transitionName="button-icon" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {!isPlaying && <i className="icon-play"></i>}
                    {isPlaying && <i className="icon-pause"></i>}
                </CSSTransitionGroup>
            </button>
        </div>
    );
};

/**
 * Defines property types for this component.
 */
PlayerControls.propTypes = {
    togglePlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isPlayDisabled: PropTypes.bool.isRequired,
};

export default PlayerControls;
