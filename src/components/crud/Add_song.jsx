import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const AddSong = ({ addSong }) => {
  const navigate = useNavigate();

  // State for the form data
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [movieName, setMovieName] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Handle file change for song
  const handleSongFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSongFile(file);
    }
  };

  // Handle file change for image
  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Process song and image files (creating URLs for now)
    const songUrl = URL.createObjectURL(songFile); // Temporary URL for the song file
    const imageUrl = URL.createObjectURL(imageFile); // Temporary URL for the image file

    // Create song object
    const newSong = {
      id: Date.now(), // Use a unique ID based on timestamp
      song_name: songName,
      artist,
      Movie_Name: movieName,
      song_url: songUrl,
      image: imageUrl
    };

    // Call addSong from App.jsx to update the song list
    addSong(newSong);

    // Redirect back to Home page after adding the song
    navigate("/");
  };

  return (
    <div className="container mt-5 pt-5 ">
      <h2>Add New Song</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Song Name</Form.Label>
          <Form.Control
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Song File</Form.Label>
          <Form.Control
            type="file"
            onChange={handleSongFileChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image File</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageFileChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Song
        </Button>
      </Form>
    </div>
  );
};

export default AddSong;
