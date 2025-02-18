import React from "react";
import { Link } from "react-router-dom"; // For routing to AlbumDetails page
import './album.css'

const Album = ({ songs }) => {
  // Create a list of unique album names (based on Movie_Name)
  const albumNames = [...new Set(songs.map((song) => song.Movie_Name))];

  return (
    <div className="album-list mt-5 pt-5">
      <h2>Albums</h2>
      <div className="albums">
        {albumNames.map((albumName, index) => (
          <div key={index} className="album-card">
            <Link to={`/album/${albumName}`} className="album-link">
              <h3>{albumName}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
