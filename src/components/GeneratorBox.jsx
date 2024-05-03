import React, { useState, useEffect } from "react";
import axios from "axios";

const GeneratorBox = () => {
  const [artistNameInput, setArtistNameInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);

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
        }
      );

      setSearchResults(response.data.artists.items);
      console.log(response.data.artists.items);
    } catch (error) {
      console.error("Error searching for artists:", error.response.data);
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
        }
      );

      setSelectedArtist(response.data);
    } catch (error) {
      console.error("Error getting artist by ID:", error.response.data);
    }
  };

  // Trigger search when artistNameInput changes
  useEffect(() => {
    if (artistNameInput.trim() !== "") {
      searchArtist();
    } else {
      setSearchResults([]); // Clear results if input is empty
    }
  }, [artistNameInput]);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // No need for search, just select the artist if available
    const selected = searchResults.find(artist => artist.name === artistNameInput);
    if (selected) {
      handleOptionClick(selected);
    }
  };

  // Function to set the selected artist when an option is clicked
  const handleOptionClick = (artist) => {
    getArtistById(artist.id);
  };

  return (
    <div>
      {!selectedArtist && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={artistNameInput}
            onChange={(e) => setArtistNameInput(e.target.value)}
            placeholder="Enter artist name"
            list="artists" // Associate input with datalist
          />
          <datalist id="artists"> {/* Datalist for autocomplete options */}
            {searchResults.map((artist) => (
              <option
                key={artist.id}
                value={artist.name}
                onMouseDown={() => handleOptionClick(artist)} // Use onMouseDown instead of onClick
              />
            ))}
          </datalist>
          <br></br>
          <button type="submit" className="find-artist-button">Choose this Artist</button>
        </form>
      )}
      {selectedArtist && (
        <div>
          <p>Selected Artist:</p>
          <p>{selectedArtist.name}</p>
          <img
            src={selectedArtist.images[0]?.url}
            alt={selectedArtist.name}
          />
        </div>
      )}
    </div>
  );
};

export default GeneratorBox;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// const GeneratorBox = () => {
//   const [artistIdInput, setArtistIdInput] = useState("");
//   const [topTracks, setTopTracks] = useState([]);
//   const [accessToken, setAccessToken] = useState("");
//   console.log();
//   // Function to fetch the Bearer token from Spotify
//   const getAccessToken = async () => {
//     const base64Encoded = btoa(
//       `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
//     );
//     try {
//       const response = await axios.post(
//         "https://accounts.spotify.com/api/token",
//         "grant_type=client_credentials",
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization: `Basic ${base64Encoded}`,
//           },
//         }
//       );
//       setAccessToken(response.data.access_token);
//     } catch (error) {
//       console.error("Error getting access token:", error);
//     }
//   };
//   // Function to fetch the top tracks of an artist by ID
//   const getTopTracks = async () => {
//     try {
//       if (!accessToken) {
//         await getAccessToken(); // Get the token if not available
//       }
//       const response = await axios.get(
//         `https://api.spotify.com/v1/artists/${artistIdInput}/top-tracks`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       setTopTracks(response.data.tracks);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching top tracks:", error.response.data);
//     }
//   };
//   // Function to handle the form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     getTopTracks();
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={artistIdInput}
//           onChange={(e) => setArtistIdInput(e.target.value)}
//           placeholder="Enter artist ID"
//         />
//         <br />
//         <button type="submit">Get Top Tracks</button>
//       </form>
//       <ul>
//         {topTracks.map((track) => (
//           <li key={track.id}>
//             {track.name} <br />
//             <a href={track.preview_url}>Link</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default GeneratorBox;
