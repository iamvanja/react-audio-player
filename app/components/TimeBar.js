import React from 'react';
import PropTypes from 'prop-types';

const TimeBar = ({ currentTime, progress, totalTime }) => {
    return (
        <div className="time-bar">
            <span className="time current">{currentTime}</span>
            <div className="progress-container">
                <progress value={progress} max="100"></progress>
            </div>
            <span className="time total">{totalTime}</span>
        </div>
    );
};

TimeBar.propTypes = {
    currentTime: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    progress: PropTypes.number.isRequired,
    totalTime: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

export default TimeBar;
