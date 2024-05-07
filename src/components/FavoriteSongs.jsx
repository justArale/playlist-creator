import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FavoriteSongs() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const backendUrl =
        "https://playlist-creator-backend.adaptable.app/favoriteSongs";
      try {
        const response = await axios.get(backendUrl);
        setFavoriteSongs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching favorite songs:", error);
      }
    };

    fetchFavoriteSongs();
  }, []);

  const deleteFavoriteSong = async (song) => {
    const notify = () => toast("Song deleted from favorites!");
    const backendUrl = `https://playlist-creator-backend.adaptable.app/favoriteSongs/${song.id}`;
    try {
      await axios.delete(backendUrl);
      const newSongsList = favoriteSongs.filter(
        (favorites) => favorites.id !== song.id,
      );
      setFavoriteSongs(newSongsList);
      console.log("Song deleted successfully");
    } catch (error) {
      console.error("Error deleting favorite song:", error);
    }
    notify();
  };

  return (
    <div className="FavouritesContainer">
      {favoriteSongs.map((song) => (
        <div key={song.id} className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-700 rounded-md bg-gray-100 lg:rounded-xl"
          >
            <li className="my-1 ml-2 self-center py-2 text-left md:ml-6 md:py-3 lg:my-1 lg:py-2">
              <div className="flex items-center space-x-4 self-center">
                <div className="min-w-0 flex-1 self-center">
                  <p className="self-center truncate text-lg font-medium text-gray-900 lg:text-xl">
                    {song.title}
                  </p>
                  <p className="truncate text-lg text-gray-700 lg:text-xl">
                    {song.artist}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  <button
                    className="mx-2 my-3 rounded-full border border-violet-900 px-2 py-1 hover:bg-violet-900 focus:bg-violet-900 active:bg-violet-900 md:mx-5 md:px-3 md:py-2"
                    onClick={() => deleteFavoriteSong(song)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <ToastContainer />
        </div>
      ))}
    </div>
  );
}

export default FavoriteSongs;
