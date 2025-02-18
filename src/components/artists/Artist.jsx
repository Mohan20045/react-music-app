import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './artist.css';

const Artist = ({ data }) => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();
  // console.log(data);
  // console.log(data.map((song) => song.artist)); 


  useEffect(() => {
    if (data && data.length > 0) {
      // Get unique artists from the data
      const uniqueArtists = [...new Set(data.map((song) => song.artist))]; 
      setArtists(uniqueArtists);
    }
  }, [data]);
  

  // Handle artist click to navigate to the artist details page
  const handleArtistClick = (artist) => {
    navigate(`/artists/${artist}`);  // Navigate to the specific artist page
  };
console.log(artists);
  return (
    <div className="artist-container mt-5 pt-5">
      <h2>Artists</h2>
      <div className="artist-list">
        {artists.length > 0 ? (
          artists.map((artist, index) => (
            <div
              key={index}
              className="artist-card p-4"
              onClick={() => handleArtistClick(artist)}  // Navigate when clicked
            >
              <h3>{artist}</h3>
            </div>
          ))
        ) : (
          <p>No artists available.</p>
        )}
      </div>
    </div>
  );
};

export default Artist;


