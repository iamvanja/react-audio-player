import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        player.addEventListener('play', (e) => {
            console.log('play');
            this.setState({
                isPlaying: true,
            });
            this.props.onPlay && this.props.onPlay(e);
        });

        // Player paused
        player.addEventListener('pause', (e) => {
            console.log('pause');
            this.setState({
                isPlaying: false,
            });
            this.props.onPause && this.props.onPause(e);
        });

        // Player finished playing to the end
        player.addEventListener('ended', (e) => {
            console.log('ended');
            this.setState({
                isPlaying: false,
            });
            this.props.onEnded && this.props.onEnded(e);
        });

        // Player loaded metadata
        player.addEventListener('loadedmetadata', (e) => {
            this.setState({
                totalTime: this.durationFormatter(player.duration, {
                    format: this.props.totalTimeFormat,
                }),
            });
            this.props.onLoadedMetadata && this.props.onLoadedMetadata(e);
        });

        // Player updated time
        player.addEventListener('timeupdate', (e) => {
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
            currentTime,
            progress,
            totalTime,
        } = this.state;
        return (
            <div className="player">
                <audio src={mediaUrl} ref={(ref) => { this.audioEl = ref; }}>
                    <p>Please upgrade to a more modern browser to use this player.</p>
                </audio>

                <div className="player-top">
                    <div className="album-art">
                        {/* img or background-image? */}
                    </div>
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
                        <h1 className="info-item primary-content title">Three Little Birds</h1>
                        <h2 className="info-item secondary-content album">The best of Bob Marley & the Waiters</h2>
                        <h2 className="info-item secondary-content artist">Bob Marley</h2>
                    </div>
                    <div className="player-controls">
                        <button className="play-toggle" onClick={(e)=>this.togglePlay(e)}>
                            <span className="play">PLAY</span>
                            <span className="pause">PAUSE</span>
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
};

Player.propTypes = {
    mediaUrl: PropTypes.string.isRequired,
    durationFormatter: PropTypes.func,
    currentTimeFormat: PropTypes.string,
    totalTimeFormat: PropTypes.string,

    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onLoadedMetadata: PropTypes.func,
    onTimeUpdate: PropTypes.func,
};

export default Player;
