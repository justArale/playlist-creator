//component will need artist iD (seed_1) fetched from artistInput in search
//this should be rendered in the results page
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RelatedArtists = () => {
  // const RelatedArtists = ({ artistId }) => {}
  // const [artistId, setArtistId] = useState("")
  const artistId = "4kIwETcbpuFgRukE8o7Opx";
  const [searchRelatedArtists, setSearchRelatedArtists] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  // Function to fetch the Bearer token from Spotify
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

  // Function to search related artists based on artist id
  const getRelatedArtists = async () => {
    try {
      if (!accessToken) {
        await getAccessToken(); // Get the token if not available
      }

      // The request endpoint is this: /artists/{id}/related-artists
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.artists, "artist");
      //   console.log(response, "response");

      setSearchRelatedArtists(response.data.artists);
    } catch (error) {
      console.error(
        "Error searching for related artists:",
        error.response.data
      );
    }
  };
  getRelatedArtists();

  return (
    <div className="relatedArtistsContainer">
      <h2>Related Artists</h2>
      <ul className="imageGallery">
        {searchRelatedArtists &&
          searchRelatedArtists.slice(0, 6).map((artist) => (
            <li key={artist.id}>
              <img src={artist.images[0].url} alt={artist.name} />
              <p>{artist.name}</p>
              <p>{artist.id}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RelatedArtists;
