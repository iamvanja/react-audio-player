import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

/**
 * Renders TimeBar components. Also provides classes to allow animations through CSS.
 *
 * @class      TimeBar (name)
 * @param      {Object}  props                          Component properties
 * @param      {String|number}  props.currentTime       The current time
 * @param      {number}         props.progress          The progress
 * @param      {String|number}  props.totalTime         The total time
 * @param      {Bool}           props.isVisible         Indicates if visible
 * @param      {String}         props.componentClasses  The component classes
 * @return     {ReactElement}   markup
 */
const TimeBar = ({ currentTime, progress, totalTime, isVisible, componentClasses }) => {
    /**
     * Returns component JSX to allow for a cleaner syntax in the return.
     *
     * @return     {ReactElement}   markup
     */
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

/**
 * Defines default values for the optional properties in case they are not passed from the parent component.
 */
TimeBar.defaultProps = {
    isVisible: true,
    componentClasses: '',
};

/**
 * Defines property types for this component.
 */
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
