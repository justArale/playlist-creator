import React, { useEffect } from "react";

const CLIENT_ID = `${import.meta.env.VITE_CLIENT_ID}`;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize?";
const REDIRECT_URL_AFTER_LOGIN = `${import.meta.env.REDIRECT_URL_AFTER_LOGIN}`;
const SPACE = "%20";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",
];
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

function SpotifyLogin() {
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

  return <button onClick={handleLogin}>SPOTIFY LOGIN</button>;
}

export default SpotifyLogin;
