import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants/player';

import AlbumArt from './AlbumArt';
import TimeBar from './TimeBar';
import SongMetaData from './SongMetaData';
import PlayerControls from './PlayerControls';

const initialState = {
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    totalTime: 0,
    title: '',
    albumName: '',
    artist: '',
    picture: false,
};

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.durationFormatter = this.props.durationFormatter;
        this.metaDataGetter = this.props.metaDataGetter;
    }

    componentDidMount() {
        this.registerHandlers();
    }

    togglePlay() {
        const player = this.audioEl;
        if (player.paused) {
            player.play();
        }
        else {
            player.pause();
        }
    }

    registerHandlers() {
        const player = this.audioEl;

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

            this.metaDataGetter(e.target.currentSrc)
            .then((tags) => {
                this.setState({
                    title: tags.title,
                    artist: tags.artist,
                    albumName: tags.album,
                    albumArt: tags.picture,
                })
            });
            this.props.onLoadedMetadata && this.props.onLoadedMetadata(e);
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
        } = this.state;

        return (
            <div className="player">
                <audio src={mediaUrl} ref={(ref) => { this.audioEl = ref; }}>
                    <p>{unsupportedMessage}</p>
                </audio>

                <div className="player-top">
                    <AlbumArt imageSrc={albumArt} />
                    <TimeBar
                        currentTime={currentTime}
                        progress={progress}
                        totalTime={totalTime}
                    />
                </div>
                <div className="player-bottom">
                    <SongMetaData
                        title={title}
                        albumName={albumName}
                        artist={artist}
                    />
                    <PlayerControls
                        togglePlay={()=>this.togglePlay()}
                        isPlaying={isPlaying}
                    />
                </div>
            </div>
        );
    }
}

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

Player.propTypes = {
    unsupportedMessage: PropTypes.string,
    mediaUrl: PropTypes.string.isRequired,
    durationFormatter: PropTypes.func,
    currentTimeFormat: PropTypes.string,
    totalTimeFormat: PropTypes.string,
    metaDataGetter: PropTypes.func,

    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onLoadedMetadata: PropTypes.func,
    onTimeUpdate: PropTypes.func,
};

export default Player;
