import React from 'react';
import * as constants from '../constants';

import Player from '../components/Player';

const PlayerContainer = () => {
    return (
        <Player mediaUrl={constants.songUrl} />
    );
};

export default PlayerContainer;
