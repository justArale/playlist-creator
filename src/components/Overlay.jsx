import React, { useState, useEffect } from 'react';
import "./Overlay.css";
import overlayImg from '../assets/Graphic.png';

////777//

const CLIENT_ID = `${import.meta.env.VITE_CLIENT_ID}`;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize?";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/results";
const SPACE = "%20";
const SCOPES = ["user-read-private", "user-read-email", "playlist-read-private", "playlist-modify-public"];
const SCOPES_URL_PARAMS = SCOPES.join(SPACE);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((acc, currValue) => {
    const [key, value] = currValue.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return paramsSplitUp;
};

function Overlay({isOpen, onClose, createPlaylist}) {
    const [token, setToken] = useState(localStorage.getItem("accessToken"));

    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
          localStorage.clear();
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("expiresIn", expires_in);
          localStorage.setItem("tokenType", token_type);
        }
      });
      const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialoge=true`;
      };

    const handleConnectAndSave = () => {
        if (token) {
          createPlaylist();
        } else {
            handleLogin();
        }
      };

      useEffect(() => {
        // Event-Listener to close the overlay if you click outside
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest(".overlay-container")) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <> 
        {isOpen ? (
            <div className="overlay">
                <div className="overlay_background" onClick={onClose}/>
                <div className="overlay-container">
                    <div className="overlay__controls">
                        <h3 className="overlay-header">Save Playlist</h3>
                        <div className="graphics"><img src={overlayImg}/></div>
                        <p className='overlay-description'>Connect our App with your Spotify account to save your new playlist.</p>
                        <button className="overlay-button" onClick={handleConnectAndSave}>Connect and save playlist</button>
                    </div>
                </div>
            </div>) 
            : null}
        </>
    );
}

export default Overlay;
