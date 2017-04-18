# React Audio Player

Audio player built using using [React](https://facebook.github.io/react/). The build tool used is [Webpack](https://webpack.github.io/). Some of the features include responsiveness and dynamically reading ID3 tags.

### Getting started
**Step 1**. Make sure that you have [Node.js](https://nodejs.org/) v6 or newer and ideally [Yarn](https://yarnpkg.com/) installed on your machine (npm is fine too).

**Step 2**. Install project dependencies listed in `package.json` by running:  
`yarn install` or `npm install`

**Step 3**. Compile and launch the app by running:  
`yarn start` or `npm start`

**Step 4**.
Open the app at [http://localhost:8080/](http://localhost:8080/)

### Documentation
To see documentation, run `yarn docs` or `npm run docs`.

### Demo
Demo can be seen at [http://vanja.gavric.org/playground/player/](http://vanja.gavric.org/playground/player/).

### To-do
- [ ] Write tests
- [ ] Indicate buffering (progress bar and play/pause button) 
- [ ] Add playlist
- [ ] Add full controls
- [ ] Add persistency layer for current song, current playing time etc
- [ ] Skip to time
- [ ] Keyboard controls
- [ ] Shim [id3-reader](https://github.com/aadsm/JavaScript-ID3-Reader) properly or use another library


