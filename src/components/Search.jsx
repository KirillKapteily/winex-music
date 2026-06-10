import { useState } from "react";
import "../styles/search.scss"

export default function Search({onSubmit}) {
const [input, setInput] = useState("");

const hanndleSumit = (e) => {
e.preventDefault();

onSubmit(input);
}

    return (
      <header>
          <form onSubmit={hanndleSumit} className="music__search__form">
            <input type="text" placeholder="search" className="music__search" onChange={(e) => setInput(e.target.value)}/>
            <button className="music__search__btn" type="submit">Search</button>
        </form>
      </header>
    )
}