import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import RelatedArtists from "./RelatedArtists";
import LoadingIcon from "../assets/LoadingIcon.png";

function LoadResults() {
  const location = useLocation();
  const { artistID, danceMin, danceMax } = location.state;
  const [results, setResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getAccessToken = async () => {
      const base64Encoded = btoa(
        `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`,
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
          },
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };

    getAccessToken();
  }, []);

  const loadRecommendations = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?limit=30&seed_artists=${artistID}&min_danceability=${danceMin}&max_danceability=${danceMax}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setResults(response.data.tracks);
      setLoading(false);
      console.log(response.data.tracks);
    } catch (error) {
      console.error("Error searching for artists:", error.response.data);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadRecommendations();
    }
  }, [accessToken]);

  return (
    <div>
      {/* Display results here */}
      {loading ? (
        <div className="loading">
          <p>Loading your playlist...</p>
          <img src={LoadingIcon} alt="loading" />
        </div>
      ) : (
        <div>
          {/* Display results here */}
          <div>
            {results.map((item, index) => (
              <div key={index}>
                {/* Render each item here */}
                <p>
                  {item.name} - {item.artists[0].name}
                </p>
                <br></br>
                {item.preview_url && (
                  <audio controls>
                    <source src={item.preview_url} type="audio/mpeg" />
                  </audio>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <RelatedArtists artistID={artistID} />
    </div>
  );
}

export default LoadResults;
