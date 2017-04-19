import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants/player';

import AlbumArt from './AlbumArt';
import TimeBar from './TimeBar';
import SongMetaData from './SongMetaData';
import PlayerControls from './PlayerControls';

/**
 * Initial state of the component.
 *
 * @type       {Object}
 */
const initialState = {
    isPlaying: false,
    canPlay: false,
    isLoading: false,
    isLoadingMeta: false,
    progress: 0,
    currentTime: 0,
    totalTime: 0,
    title: '',
    albumName: '',
    artist: '',
    picture: false,
};

/**
  * Audio player component.
  *
  * Renders components:
  * AlbumArt
  * TimeBar
  * SongMetaData
  * PlayerControls
  *
  * @class      Player (name)
  *
  * @return {ReactElement} markup
  */
class Player extends Component {
    /**
     * Constructor.
     * Sets the initial state and methods from props for convenience later.
     *
     * @param   {object}  props  Component properties (for details check `Player.propTypes` at the bottom)
     */
    constructor(props) {
        super(props);

        this.state = initialState;
        this.durationFormatter = this.props.durationFormatter;
        this.metaDataGetter = this.props.metaDataGetter;
    }

    /**
     * When the component is in the DOM
     * (React's lifecycle hook)
     *
     */
    componentDidMount() {
        this.registerHandlers();
    }

    /**
     * Toggles play/pause
     */
    togglePlay() {
        const player = this.audioEl;
        player[ player.paused ? 'play' : 'pause']();
    }

    /**
     * Registers handlers
     */
    registerHandlers() {
        const player = this.audioEl;

        // Player began looking for media data
        player.addEventListener(constants.PLAYER_LOAD_STARTED, (e) => {
            this.setState({
                isLoadingMeta: true,
                canPlay: false,
                isLoading: true,
            });

            this.metaDataGetter(e.target.currentSrc)
            .then((tags) => {
                this.setState({
                    title: tags.title,
                    artist: tags.artist,
                    albumName: tags.album,
                    albumArt: tags.picture,
                    isLoadingMeta: false,
                })
                this.props.onLoadedMetadata && this.props.onLoadedMetadata(e, tags);
            });
        });

        // Player can play the media data at the current playback position for the first time
        player.addEventListener(constants.PLAYER_CAN_PLAY, (e) => {
            this.setState({
                canPlay: true,
            });
            this.props.onCanPlay && this.props.onCanPlay(e);
        });

        // Player can play the media data at the current playback position for the first time
        player.addEventListener(constants.PLAYER_LOADED_DATA, (e) => {
            this.setState({
                isLoading: false,
            });
            this.props.onLoadedData && this.props.onLoadedData(e);
        });

        // Player started playing
        player.addEventListener(constants.PLAYER_PLAY, (e) => {
            this.setState({
                isPlaying: true,
            });
            this.props.onPlay && this.props.onPlay(e);
        });

        // Player paused
        player.addEventListener(constants.PLAYER_PAUSE, (e) => {
            this.setState({
                isPlaying: false,
            });
            this.props.onPause && this.props.onPause(e);
        });

        // Player finished playing to the end
        player.addEventListener(constants.PLAYER_ENDED, (e) => {
            this.setState({
                isPlaying: false,
                currentTime: 0,
            });
            this.props.onEnded && this.props.onEnded(e);
        });

        // Player loaded metadata
        player.addEventListener(constants.PLAYER_LOADED_META, (e) => {
            this.setState({
                totalTime: this.durationFormatter(player.duration, {
                    format: this.props.totalTimeFormat,
                }),
            });
        });

        // Player updated time
        player.addEventListener(constants.PLAYER_TIME_UPDATE, (e) => {
            this.setState({
                progress: Math.floor((player.currentTime / player.duration) * 100),
                currentTime: this.durationFormatter(player.currentTime, {
                    format: this.props.currentTimeFormat,
                }),
            });
            this.props.onTimeUpdate && this.props.onTimeUpdate(e);
        });
    }

    /**
     * Renders the Player component.
     *
     * @return {ReactElement} markup
     */
    render() {
        const {
            unsupportedMessage,
            mediaUrl,
        } = this.props;
        const {
            isPlaying,
            currentTime,
            progress,
            totalTime,
            title,
            artist,
            albumName,
            albumArt,
            isLoadingMeta,
            isLoading,
            canPlay,
        } = this.state;

        return (
            <div className="player">
                <audio src={mediaUrl} autoPlay ref={(ref) => { this.audioEl = ref; }}>
                    <p>{unsupportedMessage}</p>
                </audio>

                <div className="player-top">
                    <AlbumArt imageSrc={albumArt} />
                    <TimeBar
                        currentTime={currentTime}
                        progress={progress}
                        totalTime={totalTime}
                        isVisible={currentTime !== 0}
                        componentClasses={isPlaying ? '': 'paused'}
                    />
                </div>
                <div className="player-bottom">
                    <SongMetaData
                        title={title}
                        albumName={albumName}
                        artist={artist}
                        componentClasses={isLoadingMeta ? 'loading' : ''}
                    />
                    <PlayerControls
                        togglePlay={()=>this.togglePlay()}
                        isPlaying={isPlaying}
                        isPlayDisabled={ !canPlay }
                    />
                </div>
            </div>
        );
    }
}

/**
 * Defines default values for the optional properties in case they are not passed from the parent component.
 */
Player.defaultProps = {
    unsupportedMessage: 'Please upgrade to a more modern browser to use this player.',
    durationFormatter: (duration => duration),
    currentTimeFormat: '00:00:00',
    totalTimeFormat: '00:00:00',
    metaDataGetter: (tags) => {
        return new Promise((resolve) => {
            resolve({
                title: 'Unknown Title',
                artist: 'Unknown Artist',
                album: 'Unknown Album',
                picture: false,
            })
        });
    },
};

/**
 * Defines property types for this component.
 */
Player.propTypes = {
    unsupportedMessage: PropTypes.string,
    mediaUrl: PropTypes.string.isRequired,
    durationFormatter: PropTypes.func,
    currentTimeFormat: PropTypes.string,
    totalTimeFormat: PropTypes.string,
    metaDataGetter: PropTypes.func,

    onPlay: PropTypes.func,
    onCanPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onLoadedData: PropTypes.func,
    onLoadedMetadata: PropTypes.func,
    onTimeUpdate: PropTypes.func,
};

export default Player;
