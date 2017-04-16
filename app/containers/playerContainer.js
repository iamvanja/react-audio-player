import React from 'react';
import * as constants from '../constants';
import getFormattedTime from '../lib/time.formatting.js';

import Player from '../components/Player';

const PlayerContainer = () => {
    return (
        <Player
            mediaUrl={constants.songUrl}
            durationFormatter={getFormattedTime}
            currentTimeFormat={'0:00'}
            totalTimeFormat={'00:00:00'}
        />
    );
};

export default PlayerContainer;
