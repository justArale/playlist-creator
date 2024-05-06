import React from "react";
import { useState } from "react";
import axios from "axios";

// const API_TRACK = `https://api.spotify.com/v1/audio-features/${trackId}/danceability`;

function RangeButton(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const artistID = "0CxkG7EdCzA4QJoDeiODFP";

  // Function to fetch the Bearer token from Spotify
  // const getAccessToken = async () => {
  //   const base64Encoded = btoa(
  //     `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
  //   );

  //   try {
  //     const response = await axios.post(
  //       "https://accounts.spotify.com/api/token",
  //       "grant_type=client_credentials",
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           Authorization: `Basic ${base64Encoded}`,
  //         },
  //       }
  //     );
  //     setAccessToken(response.data.access_token);
  //   } catch (error) {
  //     console.error("Error getting access token:", error);
  //   }
  // };

  // Function to search for tracks by danceability

  //   const searchTracks = async () => {
  //    try {
  //      if (!accessToken) {
  //        await getAccessToken(); // Get the token if not available
  //        }
  //
  //        const response = await axios.get(
  //          `https://api.spotify.com/v1/recommendations?seed_artists=${artistID}&&min_danceability=${danceMin}&max_danceability=${danceMax}`,
  //          {
  //            headers: {
  //              Authorization: `Bearer ${accessToken}`,
  //            },
  //          }
  //       );

  // const searchTracks = async () => {
  //   try {
  //     if (!accessToken) {
  //       await getAccessToken(); // Get the token if not available
  //     }

  //     const response = await axios.get(
  //       `https://api.spotify.com/v1/recommendations?seed_artists=${artistID}&seed_tracks=0c6xIDDpzE81m2q797ordA&min_danceability=${danceMin}&max_danceability=${danceMax}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     setSearchResults(response.data.artists.items);
  //   } catch (error) {
  //     console.error("Error searching for tracks:", error.response.data);
  //   }
  // };

  const moodSelector = (id, min, max) => {
    localStorage.setItem("mood", id)
    return props.getDanceability(min, max);
  };

  return (
    <section className="SelectMood mx-auto mt-5 w-full max-w-sm rounded-lg border border-violet-300 p-5 md:max-w-lg">
      <h4 className="text-md mb-3 font-semibold lg:text-2xl">Select Your Mood</h4>
      <ul className="col-1 mt-4 grid flex-wrap items-start lg:px-5">
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl">
          <button id="sleepy" onClick={() => moodSelector("sleepy", 0.0, 0.2)}>
            💤 <span className="ml-2 lg:ml-3">Sleepy</span>
          </button>
        </li>
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl">
          <button id="calm" onClick={() => moodSelector("calm", 0.201, 0.4)}>
            🛁 <span className="ml-2 lg:ml-3">Calm</span>
          </button>
        </li>
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl">
          <button id="studying" onClick={() => moodSelector("studying", 0.401, 0.6)}>
            📚 <span className="ml-2 lg:ml-3">Studying</span>
          </button>
        </li>
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl">
          <button id="cooking" onClick={() => moodSelector("cooking", 0.601, 0.8)}>
            🍳 <span className="ml-2 lg:ml-3">Cooking</span>
          </button>
        </li>
        <li className="bg-grey-300 mb-2 flex rounded-lg border border-violet-300 px-4 py-1 text-violet-900 hover:bg-violet-300 active:bg-violet-700 active:text-white md:text-lg lg:text-xl">
          <button id="dancing" onClick={() => moodSelector("dancing", 0.801, 1)}>
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

// danceability
// number [float]
// Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.

// Example: 0.585

// /audio-features/{id}/danceability
