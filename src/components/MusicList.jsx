import MusicItem from "./MusicItem";
import "../styles/music-list.scss";

export default function MusicList({ musicList,setCurrentTrack }) {
console.log(musicList);

    return (
        <ul className="music__list">
            {
                musicList.map((track) => (
                    <MusicItem
                        key={track.trackId} 
                    artworkUrl30={track.artworkUrl30}
                    artistName={track.artistName}
                    collectionName={track.collectionName}
                    trackName={track.trackName}
                   
                    track={track} 
                    setCurrentTrack={setCurrentTrack}
                    />
                ))
            }
        </ul>
    )
}