import React from "react";
import { useState } from "react";
import axios from "axios";

// const API_TRACK = `https://api.spotify.com/v1/audio-features/${trackId}/danceability`;

function RangeButton(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const artistID = "0CxkG7EdCzA4QJoDeiODFP";


  const moodSelector = (id, min, max) => {
    localStorage.setItem("mood", id)
    return props.getDanceability(min, max);
  };

  return (
    <section className="SelectMood mx-auto mt-5 w-full max-w-sm rounded-lg border border-violet-300 p-5 md:max-w-lg">
      <h4 className="text-md mb-3 font-semibold lg:text-2xl">Select Your Mood</h4>
      <ul className="col-1 mt-4 grid flex-wrap items-start lg:px-5">
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl" onClick={() => moodSelector("sleepy", 0.0, 0.2)}>
          <button id="sleepy" >
            💤 <span className="ml-2 lg:ml-3">Sleepy</span>
          </button>
        </li>
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl" onClick={() => moodSelector("calm", 0.201, 0.4)}>
          <button id="calm" >
            🛁 <span className="ml-2 lg:ml-3">Calm</span>
          </button>
        </li>
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl" onClick={() => moodSelector("studying", 0.401, 0.6)}>
          <button id="studying" >
            📚 <span className="ml-2 lg:ml-3">Studying</span>
          </button>
        </li>
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl" onClick={() => moodSelector("cooking", 0.601, 0.8)}>
          <button id="cooking" >
            🍳 <span className="ml-2 lg:ml-3">Cooking</span>
          </button>
        </li>
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl" onClick={() => moodSelector("dancing", 0.801, 1)}>
          <button id="dancing" >
            🕺 <span className="ml-2 lg:ml-3">Dancing</span>
          </button>
        </li>
        <li className="text-sm text-gray-500 lg:text-base">
          *Mood is required
        </li>
      </ul>
    </section>
  );
}

export default RangeButton;


