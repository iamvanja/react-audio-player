import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const TimeBar = ({ currentTime, progress, totalTime, isVisible, componentClasses }) => {
    const renderComponent = () => {

        return (
            <div className={`time-bar ${componentClasses}`}>
                <span className="time current">{currentTime}</span>
                <div className="progress-container">
                    <progress value={progress} max="100"></progress>
                </div>
                <span className="time total">{totalTime}</span>
            </div>
        );
    }

    return (

        <div className="time-bar-wrapper">
            <CSSTransitionGroup transitionName="bar" transitionEnterTimeout={2000} transitionLeaveTimeout={2000}>
                { isVisible && renderComponent() }
            </CSSTransitionGroup>
        </div>
    );
};

TimeBar.defaultProps = {
    isVisible: true,
    componentClasses: '',
};

TimeBar.propTypes = {
    currentTime: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    progress: PropTypes.number.isRequired,
    totalTime: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    isVisible: PropTypes.bool,
    componentClasses: PropTypes.string,
};

export default TimeBar;
