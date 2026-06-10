import { useState, useEffect, useRef } from "react"

export default function CustomAudioPlayer({ track }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);


    useEffect(() => {
        setIsPlaying(true);
    }, [track]);

if (!track || !track.previewUrl) {
    return null; 
  }

    const controlPlaying = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    const toggleMute = () => {
        const muteState = !isMuted;
        audioRef.current.muted = muteState;
        setIsMuted(muteState);
    }

    const hanndleVolumeChange = (evnet) => {
        const nextVolume = parseFloat(evnet.target.value);

        audio.current.volume = nextVolume;
        
        setVolume(nextVolume);
        setIsMuted(nextVolume === 0);
    }


    return (<div>
        <audio
            ref={audioRef}
            key={track.trackId || track.previewUrl}
            src={track.previewUrl.replace("http://", "https://")}
            autoPlay
            onEnded={setIsPlaying(false)}
        />

        <h3>{track.artistName}</h3>
        <p>{track.trackName}</p>

        <button onClick={controlPlaying}>{isPlaying ? "pause" : "Play"}</button>
        <button onClick={toggleMute}>{isMuted ? "unmute" : "mute"}</button>
        <input type="range" 
        min="0"
        max="1"
        step="0.05" 
         value={isMuted ? 0 : volume} 
         onChange={hanndleVolumeChange}
        />
    </div>)
}