import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function SavePlaylistOnSpotify({ results }) {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [data, setData] = useState({});
  const [userId, setUserId] = useState("");
  const [playlistId, setPlaylistId] = useState("");

  const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const TRACK_ENDPOINT = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const USER_ENDPOINT = `https://api.spotify.com/v1/me`;
  const getArtistInput = localStorage.getItem("artist");
  const getMoodInput = localStorage.getItem("mood");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, [token]);

  const getUserInfo = () => {
    axios
      .get(USER_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((err) => {
        console.log("Error getting user info:", err);
      });
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  const createPlaylist = async () => {
    try {
      const response = await axios.post(
        PLAYLIST_ENDPOINT,
        {
          name: `${getArtistInput} ${getMoodInput} Playlist`,
          description: "Created from my app",
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setPlaylistId(response.data.id); // Save the new playlist ID for further use
      console.log("Playlist created successfully!");
      await setTracksToPlaylist();
    } catch (error) {
      console.log("Error creating playlist:", error);
    }
  };

  const setTracksToPlaylist = async () => {
    if (!playlistId) return;

    const trackURIs = results.map((track) => track.uri);
    console.log(results);
    try {
      await axios.post(
        TRACK_ENDPOINT,
        {
          uris: trackURIs, // Pass the array directly
          position: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Tracks added successfully!");
    } catch (error) {
      console.log("Error adding tracks to playlist:", error);
    }
  };

  return (
    <div>
      <button
        className="mb-4 inline-block w-auto rounded-xl border-transparent bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-2 font-bold text-white transition duration-200 hover:bg-violet-500 md:mr-6 md:w-auto md:px-8 md:py-5 md:text-xl lg:text-2xl xl:mb-0"
        onClick={() => {
          createPlaylist();
        }}
      >
        + SAVE TO YOUR SPOTIFY
      </button>
    </div>
  );
}

export default SavePlaylistOnSpotify;
