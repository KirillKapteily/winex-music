import { useState, useEffect, useRef } from "react"
import "../styles/player.scss"

export default function CustomAudioPlayerMaster2({ track, filter }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

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

    return (
        <div className="player__block floating">
            {filter === "song" || "podcast" || "audiobook" ? <audio
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
            {filter === "song" || "podcast" || "audiobook" ? <img src={track.artworkUrl100} alt={track.artistName} className="music__img" width="50" /> : null}
            <div className="player__wrapper">
                <div className="info__wrapper">
                    <p className="artist__text">{track.artistName}</p>
                    <p className="track__text">{track.trackName}</p>
                </div>
                <div className="btn__wrapper">
                    <button onClick={hanndlePlay} className="player__btn">{isPlaying ? "| |" : ">"}</button>
                    {/* <button onClick={hanndleMute} className={isMuted ? "player__btn__muted" : "player__btn"}>{isMuted ? "unmute" : "mute"}</button> */}
                </div>
            </div>

        </div>
    )
}