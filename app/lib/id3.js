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
