import axios from "axios";
import MusicList from "./components/MusicList";
import Search from "./components/Search";
import CustomAudioPlayer from "./components/CustomAudioPlayer";
import CustomAudioPlayerMaster2 from "./components/CustomAudioPlayerMaster2";
import Button from "./components/Button";
//import Loader from "./components/Loader";
import "./styles/body.scss"
import { useEffect, useState } from "react";

const itunesApi = axios.create({
  baseURL: 'https://itunes.apple.com'
})

// axios.defaults.baseURL = "https://itunes.apple.com";

function App() {
  const [musicList, setMusicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("song")
  const [limit, setLimit] = useState(25)
  const [isLoading, setLoading] = useState(false);
  const [resultCount, setResultCount] = useState(0)
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  const ITEMS_PER_PAGE = 25;

  const loadMusic = async (query, currentOffset) => {
    setLoading(true);
    console.log("Fetching:", query, "Offset:", currentOffset);
    try {
      const response = await itunesApi.get(`/search?term=${query}&entity=${filter}&limit=${ITEMS_PER_PAGE}&offset=${currentOffset}`);
      // setMusicList(response.data.results);

      const results = response.data.results || [];
      const resCount = response.data.resultCount;

      console.log("Count: ", resCount);

      // if (resCount == musicList.length) {
      //   setHasMore(false)
      // } else {
      //   setHasMore(true)
      // }

      console.log("is more", hasMore)
      console.log("lenght", musicList.length)

      console.log(response);
      //: results.length === 0 ? null 

      console.log(results.map(song => song.trackId));

      setMusicList(prevList => currentOffset === 0 ? results : ([...prevList, ...results]))

    } catch (error) {
      console.log("uh-oh", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (resultCount == musicList.length) {
      console.log("lenght", musicList.length)
     
      setHasMore(false)
    } else {
      console.log("lenght", musicList.length)
      setHasMore(true)
    }
  }, [resultCount])

  const filterEnts = (fill, query) => {
    setFilter(fill);
    console.log(fill);
    setMusicList([]);
    setOffset(0);
  }

  const searchMusic = async (query, currentOffset) => {
    setSearchQuery(query);
    setOffset(0);
    setMusicList([]);
  }

  //EFFECT!
  useEffect(() => {
    if (!searchQuery) return;

    console.log(musicList.length);

    if (musicList.length >= 200) {
      setHasMore(false)
    }

    console.log("Fetching:", searchQuery, offset);

    loadMusic(searchQuery, offset);
  }, [searchQuery, offset, filter])

  // const getSecureAudioUrl = (url) => {
  //   if (!url) return "";
  //   return url.replace("http://", "https://");
  // };

  const loadMore = () => {
    setOffset(prev => prev + ITEMS_PER_PAGE);
    console.log(limit);
  }

  return (
    <>
      <Search onSubmit={searchMusic} filterEnts={filterEnts} />
      {isLoading && musicList.length === 0 ? (<h1>Loading</h1>) : (<div className="layout__wrapper lay__wra__2">
        <div>
          <MusicList musicList={musicList} setCurrentTrack={setCurrentTrack} />
        </div>
        <div>
          <CustomAudioPlayerMaster2 track={currentTrack} filter={filter} />
        </div>
      </div>)}

      {hasMore == true && musicList.length > 0 && <Button onClick={loadMore} />}

      {/* {isLoading && <h1>Loading...</h1>} */}
      {error && <p>err</p>}
    </>
  );
}

export default App
