import { useState } from "react";
import "../styles/search.scss"
import { useEffect } from "react";

export default function Search({ onSubmit, filterEnts }) {
    const [input, setInput] = useState("");
    const [fill, setFill] = useState("song")

    useEffect(() => {
        filterEnts(fill)
    }, [fill]);

    const hanndleSumit = (e) => {
        e.preventDefault();
        onSubmit(input);
    };

    return (
        <header>
            <form onSubmit={hanndleSumit} className="music__search__form">
                <input type="text" placeholder="search" className="music__search" onChange={(e) => setInput(e.target.value)} />
                <button className="music__search__btn" type="submit">Search</button>
            </form>

            <select name="entities" value={fill} onChange={(e) => setFill(e.target.value)} className="music__search__selector">
                <option value="movie">Movie</option>
                <option value="podcast">Podcast</option>
                <option value="song">Music</option>
                <option value="musicVideo">Music Video</option>
                <option value="audiobook">audio book</option>
            </select>
        </header>
    )
}