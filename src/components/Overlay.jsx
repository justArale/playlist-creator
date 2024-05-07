import React, { useState, useEffect } from 'react';
import "./Overlay.css";
import SpotifyLogin from './SpotifyLogin'; // Importiere die SpotifyLogin-Komponente hier

function Overlay({isOpen, onClose, createPlaylist}) {
    const [token, setToken] = useState(localStorage.getItem("accessToken"));

    const handleConnectAndSave = () => {
        if (token) {
          createPlaylist();
        } else {
          SpotifyLogin();
        }
      };

    return (
        <> 
        {isOpen ? (
            <div className="overlay">
                <div className="overlay_background" onClick={onClose}/>
                <div className="overlay-container">
                    <h3 className="overlay-header">Save Playlist</h3>
                    <div className="graphics"><img src="../assets/overlay-graphics/Graphic.png"/></div>
                    <p>Connect our App with your Spotify account to save your new playlist.</p>
                    <button className="overlay-button" onClick={handleConnectAndSave}>Connect and save playlist</button>
                </div>
            </div>) 
            : null}
        </>
    );
}

export default Overlay;
