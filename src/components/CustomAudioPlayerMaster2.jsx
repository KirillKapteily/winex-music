import { useState, useEffect, useRef } from "react"
import "../styles/player.scss"

export default function CustomAudioPlayerMaster2({ track, filter }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        console.log(filter);
        
        setIsPlaying(true);
    }, [track]);

    if (!track || !track.previewUrl) {
        return null;
    }

    const hanndlePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    const hanndleMute = () => {
        const muteState = !isMuted;
        audioRef.current.muted = muteState;
        setIsMuted(muteState);
    }

    const hanndleVolumeChange = (event) => {
        const nextVolume = parseFloat(event.target.value);

        audioRef.current.volume = nextVolume;

        setVolume(nextVolume);
        setIsMuted(nextVolume === 0);
    }

    return (
        <div className="player__block floating">
            {filter === "song" ? <audio
                ref={audioRef}
                onEnded={() => (setIsPlaying(false))}
                autoPlay
                src={track.previewUrl.replace("http://", "https://")}
            />

                :

                <video
                    width="300"
                    controls
                     ref={audioRef}
                    src={track.previewUrl.replace("http://", "https://")}
                    autoPlay
                    onEnded={() => (setIsPlaying(false))}
                />
            }
           {filter === "song" ? <img src={track.artworkUrl100} alt={track.artistName} className="music__img" width="300"/> : null}

            <h3>{track.artistName}</h3>
            <p>{track.collectionName}</p>
            <strong>{track.trackName}</strong>

            <div className="btn__wrapper">
                <button onClick={hanndlePlay} className="player__btn">{isPlaying ? "pause" : "play"}</button>
                <button onClick={hanndleMute} className={isMuted ? "player__btn__muted" : "player__btn"}>{isMuted ? "unmute" : "mute"}</button>
            </div>


            <input type="range"
                value={volume}
                min="0"
                max="1"
                step="0.01"
                onChange={hanndleVolumeChange}
            />
        </div>
    )
}