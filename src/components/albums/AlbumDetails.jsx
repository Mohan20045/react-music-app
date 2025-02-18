// AlbumDetails.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Player from "../player/Player"; 

const AlbumDetails = ({ songs }) => {
  const { albumName } = useParams();
  const [selectedSong, setSelectedSong] = useState(null); 

  // Filter songs based on the selected album (movie name)
  const albumSongs = songs.filter((song) => song.Movie_Name === albumName);

  // Handle song click to select it
  const handleSongClick = (song) => {
    setSelectedSong(song); // Set the selected song
  };

  return (
    <div className="album-details mt-5">
      <h2 className="pt-5">Songs from {albumName}</h2>

      <div className="song-list">
        {albumSongs.length > 0 ? (
          albumSongs.map((song) => (
            <div key={song.id} className="song-card" onClick={() => handleSongClick(song)}>
              <img
                src={song.image || "/path/to/default/image.jpg"}
                alt={song.song_name}
                className="song-image"
              />
              <div className="song-info">
                <h3>{song.song_name}</h3>
                <p>Movie: {song.Movie_Name}</p>
                <p>Music: {song.music}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No songs found for this album.</p>
        )}
      </div>

      {/* Show the player if a song is selected */}
      {selectedSong && (
        <Player
          selectedSong={selectedSong} 
          songs={songs} 
          setSelectedSong={setSelectedSong} 
        />
      )}
    </div>
  );
};

export default AlbumDetails;
