import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchArtist = ({ getArtistId, getAccessToken, accessToken }) => {
  const [artistNameInput, setArtistNameInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // Function to fetch the Bearer token from Spotify

  // Function to search for artists by name
  const searchArtist = async () => {
    try {
      if (!accessToken) {
        await getAccessToken(); // Get the token if not available
      }

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${artistNameInput}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setSearchResults(response.data.artists.items);
    } catch (error) {
      console.log("Error searching for artists:", error.response.data);
    }
  };

  // Function to fetch the specific artist by ID
  const getArtistById = async (artistId) => {
    try {
      if (!accessToken) {
        await getAccessToken(); // Get the token if not available
      }

      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setSelectedArtist(response.data);
      getArtistId(response.data.id);
    } catch (error) {
      console.log("Error getting artist by ID:", error.response.data);
    }
  };

  // Trigger search when artistNameInput changes
  useEffect(() => {
    if (artistNameInput.trim() !== "") {
      searchArtist();
      localStorage.setItem("artist", artistNameInput)
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
  }, [artistNameInput]);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // No need for search, just select the artist if available
    const selected = searchResults.find(
      (artist) => artist.name === artistNameInput,
    );
    if (selected) {
      handleOptionClick(selected);
    }
  };

  // Function to set the selected artist when an option is clicked
  const handleOptionClick = (artist) => {
    getArtistById(artist.id);
  };

  //   getArtistId(selectedArtist.id)

  return (
    <div>
      {!selectedArtist && (
        <form onSubmit={handleSubmit} className="">
          <input
            type="text"
            value={artistNameInput}
            onChange={(e) => setArtistNameInput(e.target.value)}
            placeholder="Enter artist name"
            list="artists" // Associate input with datalist
            className="w-full rounded-lg border border-violet-500 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 lg:max-w-2xl lg:text-xl"
          />
          <datalist
            id="artists"
            className="w-full rounded-lg border border-violet-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
          >
            {" "}
            {/* Datalist for autocomplete options */}
            {searchResults.map((artist) => (
              <option
                key={artist.id}
                value={artist.name}
                onMouseDown={() => handleOptionClick(artist)} // Use onMouseDown instead of onClick
                className="w-full rounded-lg border border-violet-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
              />
            ))}
          </datalist>
          <br></br>
          <button
            type="submit"
            className="my-6 rounded-xl bg-violet-300 px-5 py-2 text-sm uppercase text-violet-900 active:underline xl:text-lg"
          >
            Choose this Artist
          </button>
        </form>
      )}
      {selectedArtist && (
        <div className="col-1 grid items-center justify-center">
          <p className="md:text-lg lg:text-xl">Selected Artist:</p>
          <p className="my-1 text-lg font-semibold text-violet-900 md:my-3 md:text-3xl lg:text-4xl">
            {selectedArtist.name}
          </p>
          <img
            src={selectedArtist.images[0]?.url}
            alt={selectedArtist.name}
            className="my-3 h-full w-full rounded-xl object-cover md:mb-6 md:max-h-80 md:max-w-lg lg:max-h-96 lg:max-w-xl"
          />
        </div>
      )}
    </div>
  );
};

export default SearchArtist;
