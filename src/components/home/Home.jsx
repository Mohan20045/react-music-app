
import React, { useState, useEffect } from "react";
import "./home.css";
import Player from "../player/Player";

const Home = ({ Songs: initialSongs }) => {
  console.log(initialSongs); // For debugging
  const [songs, setSongs] = useState(initialSongs); // State for managing songs
  const [selectedSong, setSelectedSong] = useState(null);

  // Sync songs state with initialSongs when initialSongs changes
  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  const handleDelete = (songId) => {
    const updatedSongs = songs.filter((song) => song.id !== songId);
    setSongs(updatedSongs);

    // Clear the selected song if it is deleted
    if (selectedSong?.id === songId) {
      setSelectedSong(null);
    }
  };

  return (
    <div className="home-container mt-5 pt-5">
      <div className="song-list mt-2">
        <div className="row">
          {songs.length > 0 ? (
            songs.map((song) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={song.id}>
                <div className="song-card">
                  <img
                    src={song.image}
                    alt={song.song_name}
                    className="song-image"
                    onClick={() => handleSongClick(song)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{song.song_name}</h5>
                    <p className="card-text">{song.Movie_Name}</p>
                    <button
                      className="btn btn-danger del-button"
                      onClick={() => handleDelete(song.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No songs found.</p>
          )}
        </div>
      </div>

      {/* Fixed Player */}
      <Player
        songs={songs}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
      />
    </div>
  );
};

export default Home;
