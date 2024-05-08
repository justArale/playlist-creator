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
  //   const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const getArtistInput = localStorage.getItem("artist");
  const getMoodInput = localStorage.getItem("mood");
  const getArtistImage = localStorage.getItem("artistImage");
  const tokenFromLocalStorage = localStorage.getItem("accessTokenLocal");
  const [currentAudio, setCurrentAudio] = useState(null);

  const loadRecommendations = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/recommendations?limit=30&seed_artists=${artistID}&min_danceability=${danceMin}&max_danceability=${danceMax}`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
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
    loadRecommendations();
  }, []);
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

  const playAudio = (url) => {
    if (currentAudio) {
      // If there is currently playing audio, pause it first
      currentAudio.pause();
    }
    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);
  };

  return (
    <div className="Results">
      {/* Display results here */}
      {loading ? (
        <div className="loading flex flex-col justify-center">
          <p className="mt-8 text-xl ">Your playlist is loading...</p>
          <br></br>
          <img
            src={loadingIcon}
            alt="loading"
            className="w-xl mb-10 animate-spin items-center self-center delay-700"
          />
        </div>
      ) : (
        <div className="resultsPageAfterLoading">
          {/* Display results here */}
          <div className="resultsPage flex flex-col justify-center">
            <header
              className="mb-6 h-5/6 bg-gray-900 bg-cover bg-center bg-no-repeat font-semibold md:h-3/4 lg:h-2/5 "
              style={{
                backgroundImage: `url(${getArtistImage})`,
              }}
            >
              <div className="flex w-5/6 items-center py-4 pl-2 text-left sm:h-3/4 md:h-3/4 lg:py-20 xl:py-12 ">
                <div className="ml-3 mt-4 justify-center text-left">
                  <div className="col-1 container mx-auto grid items-center justify-center px-6">
                    <div className="mx-auto mb-8 max-w-2xl text-left sm:max-w-xl md:ml-10 md:max-w-md md:pl-4 lg:max-w-4xl xl:ml-28 xl:max-w-3xl xl:py-20 ">
                      <span className="text-sm font-semibold uppercase tracking-widest text-gray-200 md:text-xl lg:ml-8 lg:text-2xl">
                        Your new playlist
                      </span>
                      <h2 className="mb-6 mt-6 font-bold text-gray-100 sm:text-5xl md:mt-8 md:py-6 md:text-5xl md:leading-relaxed lg:mb-4 lg:ml-8 lg:mt-2  lg:text-5xl xl:mb-12 xl:mt-10 xl:py-4 xl:text-5xl">
                        Here is your{" "}
                        <span className="text-violet-500 underline">
                          {getMoodInput}
                        </span>{" "}
                        mood playlist, inspired by{" "}
                        <span className="text-pink-700 underline">
                          {getArtistInput}
                        </span>
                        , with Spotify.
                      </h2>
                      {/* <img
                          src={getArtistImage}
                          alt="artist image"
                          className="m-8 rounded-xl shadow-lg md:mb-10 md:ml-12 md:mt-10 md:max-w-md lg:mb-6 lg:ml-24 lg:max-w-lg"
                        /> */}
                      <SavePlaylistOnSpotify results={results} />
                      <Link
                        to={"/generator"}
                        className="inline-block w-auto rounded-xl border-transparent bg-gray-200 px-4 py-2 font-bold text-violet-900 transition duration-200 hover:bg-violet-500 md:mr-6 md:mt-4 md:w-auto md:px-5 md:py-4 md:text-2xl lg:ml-8 lg:px-7 lg:py-4 lg:text-2xl xl:mb-0"
                      >
                        <button>Create new playlist</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className="resultsList mb-10 rounded-2xl border border-b-8 border-violet-900 bg-gray-200 p-6 shadow-md sm:max-w-sm md:max-w-md md:self-center lg:mb-20 lg:max-w-5xl lg:border-b-8">
              <div className="mb-4 flex items-center justify-center">
                <h3 className="self-center border-b-4 border-violet-900 pb-4 text-xl font-bold leading-none text-violet-900 md:text-2xl lg:my-4 lg:border-b-8 lg:text-2xl ">
                  Your new playlist
                </h3>
              </div>
              {results.map((item, index) => (
                <div key={index} className="Track Item flow-root">
                  <ul
                    role="list"
                    className="divide-y divide-gray-700 rounded-md bg-gray-100 lg:rounded-xl"
                  >
                    <li className="my-1 ml-2 self-center py-2 text-left md:ml-6 md:py-3 lg:my-1 lg:py-2">
                      <div className="flex items-center space-x-4 self-center">
                        <div className="min-w-0 flex-1 self-center">
                          <p className="self-center truncate text-lg font-medium text-gray-900 lg:text-xl">
                            {item.artists[0].name}
                          </p>
                          <p className="truncate text-lg text-gray-700 lg:text-xl">
                            {item.name}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          <button
                            className="mx-2 my-3 rounded-full border border-violet-900 px-2 py-1 hover:bg-violet-900 focus:bg-violet-900 active:bg-violet-900 md:mx-5 md:px-3 md:py-2"
                            onClick={() => {
                              addFavoriteSong(item);
                            }}
                          >
                            💜
                          </button>
                        </div>
                      </div>
                      {item.preview_url && (
                        <li>
                          <audio controls className="w-full">
                            <source
                              src={item.preview_url}
                              type="audio/mpeg"
                              onClick={() => {
                                playAudio(item.preview_url);
                              }}
                            />
                          </audio>
                        </li>
                      )}
                    </li>
                  </ul>
                </div>
              ))}
              <ToastContainer />
            </div>
          </div>
        </div>
      )}
      <RelatedArtists artistID={artistID} />
    </div>
  );
}
export default LoadResults;
