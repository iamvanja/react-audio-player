import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants/player';

const initialState = {
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    totalTime: 0,
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
            console.log('play');
            this.setState({
                isPlaying: true,
            });
            this.props.onPlay && this.props.onPlay(e);
        });

        // Player paused
        player.addEventListener(constants.PLAYER_PAUSE, (e) => {
            console.log('pause');
            this.setState({
                isPlaying: false,
            });
            this.props.onPause && this.props.onPause(e);
        });

        // Player finished playing to the end
        player.addEventListener(constants.PLAYER_ENDED, (e) => {
            console.log('ended');
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
        const { mediaUrl } = this.props;
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

        const albumArtStyle = albumArt ? {backgroundImage:`url(${albumArt})`} : {};
        return (
            <div className="player">
                <audio src={mediaUrl} ref={(ref) => { this.audioEl = ref; }}>
                    <p>Please upgrade to a more modern browser to use this player.</p>
                </audio>

                <div className="player-top">
                    <div className="album-art" style={albumArtStyle}></div>
                    <div className="time-bar">
                        <span className="time current">{currentTime}</span>
                        <div className="progress-container">
                            <progress value={progress} max="100"></progress>
                        </div>
                        <span className="time total">{totalTime}</span>
                    </div>
                </div>
                <div className="player-bottom">
                    <div className="song-info">
                        <h1 className="info-item primary-content title">{title}</h1>
                        <h2 className="info-item secondary-content album">{albumName}</h2>
                        <h2 className="info-item secondary-content artist">{artist}</h2>
                    </div>
                    <div className="player-controls">
                        <button className="play-toggle reset" onClick={(e)=>this.togglePlay(e)}>
                            {!isPlaying && <i className="icon-play"></i>}
                            {isPlaying && <i className="icon-pause"></i>}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Player.defaultProps = {
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
