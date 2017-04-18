import React from 'react';
import PropTypes from 'prop-types';

/**
 * Album Art component. Renders empty div and sets the
 * background image from props.
 *
 * @class      AlbumArt      (name)
 * @param      {Object}       props           Component properties
 * @param      {String|Bool}  props.imageSrc  The image source
 * @return     {ReactElement} markup
 */
const AlbumArt = ({ imageSrc }) => {
    const albumArtStyle = imageSrc ? {backgroundImage:`url(${imageSrc})`} : {};
    return (
        <div className="album-art" style={albumArtStyle}></div>
    );
};

/**
 * Defines property types for this component.
 */
AlbumArt.propTypes = {
    imageSrc: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
};

export default AlbumArt;
