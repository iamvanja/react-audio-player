import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders SongMetaData components.
 *
 * @class      SongMetaData (name)
 * @param      {Object}       props                    Component properties
 * @param      {String}       props.title              The title
 * @param      {String}       props.albumName          The album name
 * @param      {String}       props.artist             The artist
 * @param      {String}       props.componentClasses   Component's classes
 * @return     {ReactElement} markup
 */
const SongMetaData = ({ title, albumName, artist, componentClasses }) => {
    return (
        <div className={`song-metadata ${componentClasses}`}>
            <div className="primary-container">
                <h1 className="info-item primary-content title">{title}</h1>
            </div>
            <h2 className="info-item secondary-content album">{albumName}</h2>
            <h2 className="info-item secondary-content artist">{artist}</h2>
        </div>
    );
};

/**
 * Defines default values for the optional properties in case they are not passed from the parent component.
 */
SongMetaData.defaultProps = {
    componentClasses: '',
};

/**
 * Defines property types for this component.
 */
SongMetaData.propTypes = {
    title: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    componentClasses: PropTypes.string,
};

export default SongMetaData;
