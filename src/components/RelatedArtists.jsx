//component will need artist iD (seed_1) fetched from artistInput in search
//this should be rendered in the results page
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const RelatedArtists = ({ artistID }) => {
  const [searchRelatedArtists, setSearchRelatedArtists] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  // Function to fetch the Bearer token from Spotify
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

  // Function to search related artists based on artist id
  const getRelatedArtists = async () => {
    try {
      if (!accessToken) {
        await getAccessToken(); // Get the token if not available
      }

      // The request endpoint is this: /artists/{id}/related-artists
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistID}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // console.log(response.data.artists, "artist");
      //   console.log(response, "response");

      setSearchRelatedArtists(response.data.artists);
    } catch (error) {
      console.error(
        "Error searching for related artists:",
        error.response.data,
      );
    }
  };
  getRelatedArtists();

  return (
    <div className="relatedArtistsContainer mb-4">
      <h2>Related Artists</h2>
      <div className="mb-8 flex h-full w-full items-center justify-center bg-purple-300 p-2">
        <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-2 lg:grid-cols-4 xl:p-6">
          {searchRelatedArtists &&
            searchRelatedArtists.slice(0, 8).map((artist) => (
              <a
                href="#"
                key={artist.id}
                className="flex items-center justify-center"
              >
                <div className="relative flex h-72 w-52 transform flex-col items-center rounded-lg bg-black shadow-md transition duration-500 hover:scale-105 dark:border-gray-200">
                  <div className="flex h-full w-full justify-center p-4">
                    {/* replace here for the actual link to detail page */}
                    <img
                      src={artist.images[0].url}
                      alt={artist.name}
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                  <div className="mt-2 px-4 pb-4">
                    <div>
                      <h5 className="text-xl font-semibold tracking-tight text-white hover:text-violet-400 ">
                        {artist.name}
                      </h5>
                    </div>
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
export default RelatedArtists;
