import React from 'react';
import Player from '../components/Player';

import getFormattedTime from '../lib/time.formatting';
import getMetaData from '../lib/id3';

const songUrl = 'audio/02+Three+Little+Birds.mp3';
/**
 * Player container component. Defines specific functionality for the Player component.
 *
 * @class      PlayerContainer (name)
 * @return     {ReactElement}   markup
 */
const PlayerContainer = () => {
    return (
        <Player
            mediaUrl={songUrl}
            durationFormatter={getFormattedTime}
            metaDataGetter={getMetaData}
            currentTimeFormat={'0:00'}
            totalTimeFormat={'00:00:00'}
        />
    );
};

export default PlayerContainer;
