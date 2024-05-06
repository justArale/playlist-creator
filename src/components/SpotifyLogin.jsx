import React, { useEffect } from "react";

const CLIENT_ID = `${import.meta.env.VITE_CLIENT_ID}`;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize?";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/";
const SPACE = "%20";
const SCOPES = ["user-read-private", "user-read-email"];
const SCOPES_URL_PARAMS = SCOPES.join(SPACE);

/* 
http://localhost:5173/#access_token=BQCR2z45pnGv1WqxF52aOZ7KNbt53IFibv2Q_xNrsMqBzVKKg0hC-Os-xogd0wlOvhkQnzrKMSvVP-usfR4qsZdCuTwjitRz51DRebNGcY_3_nzMexd3bQVrfK9ciyJPEJsyiKNLOYNvjXnRFrIN_Rg34rpGQjsFRq7UuY6dlzqRnzCSFusj8QwXI3TnpP_O1rXhrQ&token_type=Bearer&expires_in=3600
*/

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
