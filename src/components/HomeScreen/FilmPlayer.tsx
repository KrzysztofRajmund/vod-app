import React, { useState, useEffect } from 'react';
//react-player
import ReactPlayer from 'react-player/lazy';
//material-ui
import CloseIcon from '@material-ui/icons/Close';
//assets
import PlaybackActive from '../../assets/playback-active.png';
import Playback from '../../assets/playback.png';
//components
import Message from '../utils/Message';

type Media = {
    MediaId: number,
    Title?: string,
    Description?: string,
    MediaTypeCode?: string,
    MediaTypeDisplayName?: string,
    StreamId?: string,
    Provider?: string,
    ContentUrl: string
}

interface Props {
    media: Media | undefined,
    openHandler: () => void
}

const FilmPlayer: React.FC<Props> = ({ media, openHandler }) => {
    const [toggle, setToggle] = useState(false);
    const [playbackRate, setplaybackRate] = useState(0);

    const closeHandler = () => {
        openHandler();
    };
    const playbackHandler = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        if (toggle) {
            setplaybackRate(4);
        } else {
            setplaybackRate(1);
        };
    }, [toggle]);

    let x: any;
    const mouseHandler = () => {
        let closeIcon = document.getElementsByClassName('closeIcon')[0];
        let playback = document.getElementsByClassName('playback')[0];
        let iconsArray: any = [closeIcon, playback];
        if (x) {
            clearTimeout(x);
        }
        if (iconsArray) {
            for (let i = 0; i < iconsArray.length; i++) {
                iconsArray[i].style.opacity = '1';
            };
            x = setTimeout(() => {
                for (let i = 0; i < iconsArray.length; i++) {
                    iconsArray[i].style.opacity = '0';
                };
            }, 5000);
        };
    };


    return (
        <section className="filmPlayerWrapper" onMouseMove={mouseHandler}>
            {media &&
                <>
                    <CloseIcon className="closeIcon" onClick={() => closeHandler()} />
                    <ReactPlayer
                        playing={true}
                        controls={true}
                        className='filmPlayer'
                        url={media.ContentUrl}
                        width='100%'
                        height='100%'
                        playbackRate={playbackRate}
                    />
                    {media.ContentUrl === undefined ? (<h2><Message message={`${media.Title} is currently unavailable`} /></h2>) : <h1>{media.Title}</h1>}
                    {toggle ? <img className="playback" onClick={() => playbackHandler()} src={PlaybackActive} alt="playback-active" />
                        : <img className="playback" onClick={() => playbackHandler()} src={Playback} alt="playback" />}

                </>
            }
        </section>
    );
};

export default FilmPlayer;
