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

  const moodSelector = (min, max) => {
    return props.getDanceability(min, max);
  };

  return (
    <>
      <button id="sleepy" onClick={() => moodSelector(0.0, 0.2)}>
        💤 Sleepy
      </button>
      <button id="calm" onClick={() => moodSelector(0.201, 0.4)}>
        🛁 Calm
      </button>
      <button id="studying" onClick={() => moodSelector(0.401, 0.6)}>
        📚 Studying
      </button>
      <button id="cooking" onClick={() => moodSelector(0.601, 0.8)}>
        🍳 Cooking
      </button>
      <button id="dancing" onClick={() => moodSelector(0.801, 1)}>
        🕺 Dancing
      </button>
    </>
  );
}

export default RangeButton;

// danceability
// number [float]
// Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.

// Example: 0.585

// /audio-features/{id}/danceability
