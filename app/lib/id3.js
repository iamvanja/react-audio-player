/**
 * Returns the base64 image.
 *
 * @param      {Object}       image   The image object from ID3
 * @return     {Bool|String}          The base64 image
 */
const getImage = function(image) {
    if (image) {
        var base64String = '';
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        return `data:${image.format};base64,${window.btoa(base64String)}`;
    }
    return false;
};

/**
 * Gets the meta data using ID3 plugin (currently in the global window namespace due to no module support).
 *
 * @param      {String}   url     The url
 * @param      {Object}   config  The configuration
 * @return     {Promise}  The meta data.
 */
const getMetaData = function(url, config = {}) {
    config.tags = config.tags || ['artist', 'title', 'album', 'picture'];
    return new Promise((resolve) => {
        window.ID3.loadTags(url, () => {
            let tags = window.ID3.getAllTags(url);
            tags.picture = getImage(tags.picture);
            resolve(tags);
        }, config);
    });
};

export default getMetaData;
