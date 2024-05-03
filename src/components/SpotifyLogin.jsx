import React from "react";

const CLIENT_ID = `${import.meta.env.VITE_CLIENT_ID}`;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize?";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/";
const SPACE = "%20";
const SCOPES = ["user-read-private", "user-read-email"];
const SCOPES_URL_PARAMS = SCOPES.join(SPACE);

function SpotifyLogin() {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialoge=true`;
  };

  return <button onClick={handleLogin}>SpotifyLogin</button>;
}

export default SpotifyLogin;
