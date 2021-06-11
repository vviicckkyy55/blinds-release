import React from 'react';
import axios from 'axios';


import videojs from 'video.js';
import './videojs.css';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            videojsOptions: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3333/api/videoList', {
        }).then(res => {
            res.data.map(video => {
                if (video.upload_title === this.props.match.params.videoTitle) {
                    this.setState({
                        loaded: true,
                        videojsOptions: {
                            autoplay: false,
                            controls: true,
                            sources: [{
                                src: video.video_path
                            }]
                        }
                    }, () => {
                        this.player = videojs(this.videoNode, this.state.videojsOptions, function onPlayerReady() {
                            //  console.log('onPlayerReady', this)
                        });
                    });
                }
                return this.player;
            });
        });
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (

            <div className="row">
                <div className="col-2">
                    {this.state.loaded ? (
                        <div data-vjs-player>
                            <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered vjs-default-skin" data-setup='{"fluid": true}'/>
                        </div>
                    ) : ' Loading ...'}
                </div>
            </div>
        );
    }
}


export default VideoPlayer;