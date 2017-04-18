/**
 * Shows the leading zero.
 *
 * @param      {Number}         num     The number
 * @return     {Number|String}          Formatted number
 */
const showLeadingZero = function(num){
    return num < 10 ? `0${num}` : num;
}

/**
 * Builds a time.
 *
 * @param      {Array}  timeArr    The time array
 * @param      {Array}  formatArr  The format array
 * @return     {String} The time.
 */
const buildTime = function(timeArr, formatArr) {
    return timeArr
        .map((el, i) => (formatArr[i].length === 2) ? showLeadingZero(el) : el)
        .join(':');
}

/**
 * Gets the formatted time.
 *
 * @param      {number}   time           The time
 * @param      {Object}   config         Configuration object.
 * @param      {string}   config.format  The format
 * @return     {string}                  The formatted time.
 */
const getFormattedTime = function(time, {format = '00:00:00'} = {}) {
    time = parseInt(time, 10);
    const formatArr = format.split(':');
    const showHour = formatArr.length === 3;
    let timeArr;

    if (showHour) {
        let hours = Math.floor(time / 3600, 10);
        let mins = Math.floor((time - (hours * 3600)) / 60, 10);
        let secs = Math.floor(time - (mins * 60) - (hours * 3600), 10);

        timeArr = [hours, mins, secs];
    }
    else {
        let mins = Math.floor((time / 60), 10);
        let secs = Math.floor(time - (mins * 60), 10);
        timeArr = [mins, secs];
    }

    return buildTime(timeArr, formatArr);
}

export default getFormattedTime;
