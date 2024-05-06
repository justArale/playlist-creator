import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


function SavePlaylistOnSpotify() {
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [data, setData] = useState({});
    const [userId, setUserId] = useState("");

    const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/users/${userId}/playlists`
    const USER_ENDPOINT = `https://api.spotify.com/v1/me`


    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
    }, [token]);

    const getUserInfo = () => {
        axios.get(USER_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token,
            }
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

    const handleGetPlaylist = () => {
        axios.get(PLAYLIST_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((err) => {
            console.log("Error getting playlists:", err);
        });
    };

    return (
        <div>
            <button onClick={handleGetPlaylist}>Get Playlists</button>
        </div>
    );
}

export default SavePlaylistOnSpotify;