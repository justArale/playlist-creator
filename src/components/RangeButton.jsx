import React from "react";
import { useState } from "react";
import axios from "axios";

// const API_TRACK = `https://api.spotify.com/v1/audio-features/${trackId}/danceability`;

function RangeButton() {
  const [minDanceability, setMinDanceability] = useState(0);
  const [maxDanceability, setMaxDanceability] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const artistID = "0CxkG7EdCzA4QJoDeiODFP";

  // Function to fetch the Bearer token from Spotify
  const getAccessToken = async () => {
    const base64Encoded = btoa(
      `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
    );

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${base64Encoded}`,
          },
        }
      );
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("Error getting access token:", error);
    }
  };

  // Function to search for tracks by danceability
  const searchTracks = async () => {
    try {
      if (!accessToken) {
        await getAccessToken(); // Get the token if not available
      }

      const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?seed_artists=${artistID}&seed_tracks=0c6xIDDpzE81m2q797ordA&min_danceability=${minDanceability}&max_danceability=${maxDanceability}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSearchResults(response.data.artists.items);
    } catch (error) {
      console.error("Error searching for tracks:", error.response.data);
    }
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    searchTracks();
  };

  const moodSelector = (id) => {
    switch (id) {
      case "sleepy":
        setMinDanceability = 0.0;
        setMaxDanceability = 0.2;
        break;
      case "calm":
        setMinDanceability = 0.201;
        setMaxDanceability = 0.4;
        break;
      case "studying":
        setMinDanceability = 0.401;
        setMaxDanceability = 0.6;
        break;
      case "cooking":
        setMinDanceability = 0.601;
        setMaxDanceability = 0.8;
        break;
      case "dancing":
        setMinDanceability = 0.801;
        setMaxDanceability = 1.0;
        break;
      default:
        console.log("Unknown mood");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button id="sleepy" onClick={() => moodSelector("sleepy")}>
          💤 Sleepy
        </button>
        <button id="calm" onClick={() => moodSelector("calm")}>
          🛁 Calm
        </button>
        <button id="studying" onClick={() => moodSelector("studying")}>
          📚 Studying
        </button>
        <button id="cooking" onClick={() => moodSelector("cooking")}>
          🍳 Cooking
        </button>
        <button id="dancing" onClick={() => moodSelector("dancing")}>
          🕺 Dancing
        </button>
        <button type="submit">MOOOODY</button>
      </form>
      <ul>
        {searchResults.map((track) => (
          <li key={track.id}>
            {track.name} <br />
            <img src={track.images[0]?.url} alt={track.name} /> <br />
            {/* <button onClick={() => getTopTracks(artist.id)}>Get Top Tracks</button> */}
          </li>
        ))}
      </ul>
    </>
  );
}

export default RangeButton;

// danceability
// number [float]
// Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.

// Example: 0.585

// /audio-features/{id}/danceability
