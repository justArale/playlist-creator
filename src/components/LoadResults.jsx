import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import RelatedArtists from "./RelatedArtists";
import SavePlaylistOnSpotify from "./SavePlaylistOnSpotify";
import loadingIcon from "../assets/icons/icon-loading.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoadResults() {
  const location = useLocation();
  const { artistID, danceMin, danceMax } = location.state;
  const [results, setResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const getArtistInput = localStorage.getItem("artist");
  const getMoodInput = localStorage.getItem("mood");
  const getArtistImage = localStorage.getItem("artistImage");

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
        console.log("Error getting access token:", error);
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
      console.log("Error searching for artists:", error.response.data);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadRecommendations();
    }
  }, [accessToken]);

  //Function for Add Favorite Song

  const addFavoriteSong = (track) => {
    const notify = () => toast("Song added to favorites!");
    const backendUrl = "https://playlist-creator-backend.adaptable.app/";
    const data = {
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
    };

    axios
      .post(`${backendUrl}favoriteSongs`, data)
      .then((response) => {
        // Handle the response from the backend
        console.log("Song added successfully!", response.data);
        // You can access response data here if needed
      })
      .catch((error) => {
        // Handle errors
        console.log("Error adding song:", error);
      });

    notify();
  };

  return (
    <div className="Results">
      {/* Display results here */}
      {loading ? (
        <div className="loading flex items-center justify-center">
          <p>Loading...</p>
          <br></br>
          <img
            src={loadingIcon}
            alt="loading"
            className="w-2xl animate-spin justify-center delay-300"
          />
        </div>
      ) : (
        <div className="resultsPageAfterLoading">
          {/* Display results here */}
          <div className="resultsPage">
            <header className="mb-6 h-5/6 bg-gray-900 bg-cover bg-center bg-no-repeat font-semibold md:h-3/4 lg:h-2/5">
              <div className="flex w-5/6 items-center py-4 pl-2 text-left sm:h-3/4 md:h-3/4 lg:py-20 xl:py-12">
                <div className="ml-3 mt-4 justify-center text-left">
                  <div className="col-1 container mx-auto grid items-center justify-center px-6">
                    <img
                      src={getArtistImage}
                      alt="artist image"
                      className="mb-8 rounded-2xl shadow-lg md:mb-10 md:ml-14 md:mt-10 md:max-w-md"
                    />
                    <div className="mx-auto mb-8 max-w-2xl text-left sm:max-w-xl md:ml-10 md:max-w-md md:pl-4 lg:max-w-2xl xl:ml-28 xl:max-w-3xl xl:py-20">
                      <span className="text-sm font-semibold uppercase tracking-widest text-gray-200 md:text-xl">
                        Your new playlist
                      </span>
                      <h2 className="mb-6 mt-6 text-2xl font-bold text-gray-100 sm:text-4xl md:mt-8 md:py-6 md:text-4xl md:leading-relaxed lg:mb-4 lg:mt-4 lg:py-6 lg:text-4xl xl:mb-12 xl:mt-10 xl:py-4 xl:text-5xl">
                        Here is your{" "}
                        <span className="text-purple-400 underline">
                          {getMoodInput}
                        </span>{" "}
                        mood playlist, inspired by{" "}
                        <span className="text-pink-400 underline">
                          {getArtistInput}
                        </span>{" "}
                        , with Spotify.
                      </h2>
                      <SavePlaylistOnSpotify results={results} />
                      <Link
                        to={"/generator"}
                        className="inline-block w-auto rounded-xl border-transparent bg-gray-200 px-4 py-2 font-bold text-violet-900 transition duration-200 hover:bg-violet-500 md:mr-6 md:w-auto md:px-5 md:py-4 md:text-2xl lg:text-2xl xl:mb-0"
                      >
                        <button>Create new playlist</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="resultsList container mb-4 flex flex-col justify-center rounded-lg border bg-gray-100 px-4 py-4">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="Track Item content-even md:min-h-1/2 mb-3 flex max-w-4xl flex-col justify-center overflow-hidden rounded-xl bg-white px-4 md:ml-8 md:max-w-2xl"
                >
                  <div className="col-span-2 grid justify-around">
                    <div className="flex content-evenly items-center">
                      {/* New nested flex container for horizontal alignment */}
                      <p className="mt-2 text-base text-gray-900 md:text-2xl">
                        {item.name} - {item.artists[0].name}
                      </p>
                      <button
                        className="mx-2 my-3 rounded-full border border-gray-900 px-2 py-1 hover:bg-violet-900 focus:bg-violet-900 active:bg-violet-900 md:mx-5 md:px-3 md:py-2"
                        onClick={() => {
                          addFavoriteSong(item);
                        }}
                      >
                        💜
                      </button>
                    </div>
                  </div>

                  {item.preview_url && (
                    <audio
                      controls
                      className="mb-4 items-center justify-center self-center py-2 md:px-1 md:text-5xl"
                    >
                      {" "}
                      {/* Adjust audio position if needed */}
                      <source src="{item.preview_url}" type="audio/mpeg" />
                    </audio>
                  )}

                  <ToastContainer />
                </div>
              ))}
            </div>
          </div>
          <RelatedArtists artistID={artistID} />
        </div>
      )}
    </div>
  );
}

export default LoadResults;
