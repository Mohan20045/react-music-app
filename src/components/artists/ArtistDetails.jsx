import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './artistDetails.css';
import Player from "../player/Player";

const ArtistDetails = ({ data }) => {
  const { artistName } = useParams();
  const [selectedSong, setSelectedSong] = useState(null); 

  // Filter songs based on the selected artist
  const artistSongs = data.filter((song) => song.artist === artistName);

  // console.log(artistName); // Debugging output
  // console.log(artistSongs); // Debugging output

  // Handle song click to set the selected song
  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  return (
    <div className="artist-details mt-5">
      <h2 className="pt-5">Top hits of {artistName}</h2>


      {/* Display filtered songs */}
      <div className="song-list">
        {artistSongs.length > 0 ? (
          artistSongs.map((song) => (
            <div
              key={song.id}
              className="song-card"
              onClick={() => handleSongClick(song)} // Set the song when clicked
            >
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
          <p>No songs found for this artist.</p>
        )}
      </div>

      {/* Conditionally render the Player component if a song is selected */}
      {selectedSong && (
        <div className="player-container">
          <Player
            songs={artistSongs}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
          />
        </div>
      )}
    </div>
  );
};

export default ArtistDetails;
