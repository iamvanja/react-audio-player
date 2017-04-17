import React from 'react';
import PropTypes from 'prop-types';

const AlbumArt = ({ imageSrc }) => {
    const albumArtStyle = imageSrc ? {backgroundImage:`url(${imageSrc})`} : {};
    return (
        <div className="album-art" style={albumArtStyle}></div>
    );
};

AlbumArt.propTypes = {
    imageSrc: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
};

export default AlbumArt;
