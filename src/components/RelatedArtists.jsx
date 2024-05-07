import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RelatedArtists = ({ artistID }) => {
  const [searchRelatedArtists, setSearchRelatedArtists] = useState([]);
  // const [accessToken, setAccessToken] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const tokenFromLocalStorage = localStorage.getItem("accessTokenLocal");


  // Function to fetch the Bearer token from Spotify
  // const getAccessToken = async () => {
  //   const base64Encoded = btoa(
  //     `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`,
  //   );

  //   try {
  //     const response = await axios.post(
  //       "https://accounts.spotify.com/api/token",
  //       "grant_type=client_credentials",
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           Authorization: `Basic ${base64Encoded}`,
  //         },
  //       },
  //     );

  //     setAccessToken(response.data.access_token);
  //   } catch (error) {
  //     console.log("Error getting access token:", error);
  //   }
  // };

  // Function to search related artists based on artist id
  const getRelatedArtists = async () => {
    try {
      // if (!accessToken) {
      //   await getAccessToken(); // Get the token if not available
      // }

      if (requestCount < 10) {
        // Send request only if request count is less than 10
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistID}/related-artists`,
          {
            headers: {
              Authorization: `Bearer ${tokenFromLocalStorage}`,
            },
          },
        );

        setSearchRelatedArtists((prevArtists) => [
          ...prevArtists,
          ...response.data.artists,
        ]);

        setRequestCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.log("Error searching for related artists:", error.response.data);
    }
  };

  useEffect(() => {
    getRelatedArtists();
  }, []); // Run once on component mount

  // useEffect(() => {
  //   if (accessToken) {
  //     getRelatedArtists();
  //   }
  // }, [accessToken]);

  return (
    <div className="relatedArtistsContainer mb-4">
      <h2 className="mb-6 font-bold text-violet-900 sm:text-2xl md:text-3xl lg:text-4xl">
        Related Artists
      </h2>
      <div className="mb-8 flex h-full w-full items-center justify-center bg-purple-300 p-2 md:py-10">
        <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-2 lg:grid-cols-4 lg:gap-6 xl:p-6">
          {searchRelatedArtists &&
            searchRelatedArtists.slice(0, 8).map((artist) => (
              <a
                href={`https://open.spotify.com/artist/${artist.id}`}
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
