import { useState, useEffect, useRef } from "react"

export default function CustomAudioPlayerMaster({ track }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        setIsPlaying(true);
    }, [track])

    if (!track || !track.previewUrl) {
        return null
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
      setIsMuted(muteState)
    }

    const hanndleVolumeChange = (evnet) => {
        const nextVolume = parseFloat(event.target.value);
        setVolume(nextVolume);
        setIsMuted(nextVolume == 0);
    }

    return (
        <div>
            <audio
                ref={audioRef}
                key={track.trackId || track.previewUrl}
                onEnded={() => { setIsPlaying(false) }}
                autoPlay
                src={track.previewUrl.replace("http://", "https://")}
            />

            <h3>{track.artistName}</h3>
            <p>{track.collectionName}</p>
            <strong>{track.trackName}</strong>

            <button onClick={hanndlePlay}>{isPlaying ? "pause" : "play"}</button>
            <button onClick={hanndleMute}>{isMuted ? "unmute" : "mute"}</button>

            <input type="range"
                value={volume}
                max="1"
                min="0"
                onChange={hanndleVolumeChange}
            />
        </div>
    )


}