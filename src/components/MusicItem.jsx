import "../styles/music-item.scss"

export default function MusicItem({ track, setCurrentTrack }) {
    // console.log(track.previewUrl);
    // console.log("setCurrentTrack:", setCurrentTrack);

    return (
        <li className="music__item">
            <img src={track.artworkUrl100} alt={track.artistName} className="music__img"/>
            <div>
                 <h3>{track.artistName}</h3>
            {/* <p>{track.collectionName}</p> */}
            <strong>{track.trackName}</strong>
            <br />
            <button onClick={() => {
                console.log("CLICKED");
                setCurrentTrack(track);
                // console.log("TRACK:", track);
            }}>
                play
            </button>
            </div>
           
        </li>
    );
}