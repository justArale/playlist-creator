import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Overlay from './Overlay';


function SavePlaylistOnSpotify({results}) {
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [userId, setUserId] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    // const [isOverlayOben, setIsOverlayOben] = useState(false);

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
            description: "Created with Playlist-Creator from Anna, Cami and Arale",
            public: true
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setPlaylistId(response.data.id); // Save the new playlist ID for further use
        console.log('Playlist created successfully!');
      } catch (error) {
        console.log('Error creating playlist:', error);
      }
    };

    // const createPlaylist = async () => {
    //   if (!token) {
    //     setIsOverlayOben(true);
    // } else {
    //   try {
    //   const response = await axios.post(
    //     PLAYLIST_ENDPOINT,
    //     {
    //       name: `${getArtistInput} ${getMoodInput} Playlist`,
    //       description: "Created from my app",
    //       public: true
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //       }
    //     }
    //   );
    //   setPlaylistId(response.data.id); // Save the new playlist ID for further use
    //   console.log('Playlist created successfully!');
    // } catch (error) {
    // setShowOverlay(true);
    //   console.log('Error creating playlist:', error);
    // }}
        
    //   };

    useEffect(() => {
      const notify = () => toast("Playlist is now in your Spotify library!");
      const setTracksToPlaylist = async () => {
        if (!playlistId) return

        const trackURIs = results.map(track => track.uri)
        console.log(results)
        try {
          await axios.post(
            TRACK_ENDPOINT,
            {
                uris: trackURIs, // Pass the array directly
                position: 0
              },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log('Tracks added successfully!');
        } catch (error) {
          console.log('Error adding tracks to playlist:', error);
        }
      }
      setTracksToPlaylist();
      notify();
    }, [playlistId])


    return (
        <div>
             <button className="px-3 py-1" onClick={() => {createPlaylist()}}>+ Save to my Spotify</button>
             {/* <Overlay isOpen={isOverlayOben} onClose={()=> setIsOverlayOben(!isOverlayOben)} createPlaylist={createPlaylist}/> */}
            <ToastContainer />
        </div>
    );

}

export default SavePlaylistOnSpotify;