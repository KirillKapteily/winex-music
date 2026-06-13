import { useEffect, useState } from 'react';

export default function useMediaQuery(query) {
   const [matches, setMatches] = useState(window.matchMedia(query).matches);

   useEffect(() => {
const media = window.matchMedia(query);

const listener = () =>{
    setMatches(event.matches)
}

addEventListener('change', listener);

return () => {
    removeEventListener('change', listener);
}

   }, [query])

   return matches;
}