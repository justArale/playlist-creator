import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchArtist from "./SearchArtist";
import RangeButton from "./RangeButton";
import { Link } from "react-router-dom";

const GeneratorBox = () => {
  const [artistID, setArtistID] = useState("");
  const [danceMin, setDanceMin] = useState(null);
  const [danceMax, setDanceMax] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [linkToResults, setLinkToResults] = useState(null);

  useEffect(() => {
    if (artistID && danceMin !== null && danceMax !== null) {
      setLinkToResults({
        pathname: "/results",
        state: {
          artistID: artistID,
          danceMin: danceMin,
          danceMax: danceMax,
        },
      });
    }
  }, [artistID, danceMin, danceMax]);

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

  const getDanceability = (min, max) => {
    setDanceMin(min);
    setDanceMax(max);
  };

  const getArtistId = (chosenArtistId) => {
    setArtistID(chosenArtistId);
  };
  console.log(artistID);
  console.log(danceMin, danceMax);

  return (
    <div>
      <SearchArtist
        getArtistId={getArtistId}
        getAccessToken={getAccessToken}
        accessToken={accessToken}
      />
      <RangeButton getDanceability={getDanceability} />
      <br></br>
      {linkToResults && (
        <Link to={linkToResults.pathname} state={linkToResults.state}>
          <button className="create-playlist-button">Create Playlist</button>
        </Link>
      )}
    </div>
  );
};

export default GeneratorBox;
