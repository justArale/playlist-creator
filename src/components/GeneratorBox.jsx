import React, { useState } from "react";
import axios from "axios";

const GeneratorBox = () => {
  const [artistNameInput, setArtistNameInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    searchArtist();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={artistNameInput}
          onChange={(e) => setArtistNameInput(e.target.value)}
          placeholder="Enter artist name"
        />
        <br />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((artist) => (
          <li key={artist.id}>
            {artist.name} <br />
            <img src={artist.images[0]?.url} alt={artist.name} /> <br />
            {/* <button onClick={() => getTopTracks(artist.id)}>Get Top Tracks</button> */}
          </li>
        ))}
      </ul>
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
