import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ onSearch }) => {

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Reset the search query when Enter is pressed
      onSearch(e.target.value);  // Perform the search
      e.target.value="";  // Clear the input field
    }
  };
  return (
    <div className="navbar navbar-expand-lg set-color bg-danger fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <div className="navbar-brand text-white">
          {/* <img src="/assets/geetanjali-logo1.webp" alt="Geetanjali Logo" style={{ height: '50px', width: '90px' }} /> */}
          <p>Geetanjali</p>
        </div>



        {/* Search Bar (Always Visible) */}
        <div className="search-bar-wrapper ms-auto">
          <input
            type="text"
            name="search"
            placeholder="Search your favourite song..."
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="form-control rounded-pill search-bar"
          />
        </div>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler ms-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-flex align-items-center ms-auto gap-3">
            {/* Navigation Links */}
            <Link to="/" className="nav-link text-white">Home</Link>
            <Link to="/albums" className="nav-link text-white">Albums</Link>
            <Link to="/artists" className="nav-link text-white">Artists</Link>

            {/* Link to Add Song */}
            <Link to="/add-song">
              <button className="btn btn-primary bg-white text-dark add-song-btn">Add Song</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
