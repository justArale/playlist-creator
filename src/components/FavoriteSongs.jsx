import React, { useEffect, useState } from 'react'
import axios from "axios";


function FavoriteSongs() {

    const [favoriteSongs, setFavoriteSongs] = useState([]);

    useEffect(() => {
        const fetchFavoriteSongs = async () => {
          const backendUrl = 'https://playlist-creator-backend.adaptable.app/favoriteSongs';
          try {
            const response = await axios.get(backendUrl);
            setFavoriteSongs(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching favorite songs:', error);
          }
        };
    
        fetchFavoriteSongs();
      }, []);

    const deleteFavoriteSong = async (song) => {
        const backendUrl = `https://playlist-creator-backend.adaptable.app/favoriteSongs/${song.id}`;
        try {
          await axios.delete(backendUrl);
          const newSongsList = favoriteSongs.filter(favorites => favorites.id !== song.id);
          setFavoriteSongs(newSongsList);
          console.log('Song deleted successfully');
        } catch (error) {
          console.error('Error deleting favorite song:', error);
        }
      };
    
    
  return (
    <div>
        {favoriteSongs.map((song) => (
            <div>
                <p key={song.id}>{song.title} - {song.artist}</p>
                <button onClick={() => deleteFavoriteSong(song)} className="px-3 py-1 border border-black rounded">Delete Song</button>
            </div>
      ))}
    </div>

  )
}

export default FavoriteSongs;