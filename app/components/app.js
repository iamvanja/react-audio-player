import React from 'react';

import PlayerContainer from '../containers/playerContainer';

 /**
  * Entry point for the view layer of the app
  *
  * Renders:
  * PlayerContainer (container component for the Player component)
  *
  * @return {ReactElement} markup
  */
const App = () => {
    return (
        <div className="app">
            <PlayerContainer />
        </div>
    );
};

export default App;
