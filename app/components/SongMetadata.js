import React from 'react';
import PropTypes from 'prop-types';

const SongMetaData = ({ title, albumName, artist }) => {
    return (
        <div className="song-metadata">
            <div className="primary-container">
                <h1 className="info-item primary-content title">{title}</h1>
            </div>
            <h2 className="info-item secondary-content album">{albumName}</h2>
            <h2 className="info-item secondary-content artist">{artist}</h2>
        </div>
    );
};

SongMetaData.propTypes = {
    title: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
};

export default SongMetaData;
