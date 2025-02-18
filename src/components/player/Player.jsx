import React, { useRef, useState, useEffect } from "react";
import "./player.css";

const Player = ({ songs = [], selectedSong, setSelectedSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Effect to update currentTime and duration
  useEffect(() => {
    if (!selectedSong || !audioRef.current || !selectedSong.song_url) return;

    const audio = audioRef.current;

    // Set the source dynamically
    audio.src = selectedSong.song_url;

    // Set duration when song metadata is loaded
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    // Update currentTime as the audio plays
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // Auto-play the song when a new song is selected
    if (isPlaying) {
      audio.play().catch((error) => console.error("Error playing the song", error));
    } else {
      audio.pause();
    }

    return () => {
      // Cleanup listeners when component unmounts
      audio.onloadedmetadata = null;
      audio.ontimeupdate = null;
    };
  }, [selectedSong, isPlaying]);

  // Play or Pause the song
  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Play the next song
  const handleNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setSelectedSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  // Play the previous song
  const handlePrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setSelectedSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  // Update time if user seeks using the progress bar
  const handleSeek = (event) => {
    const newTime = event.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // If no song is selected, render nothing
  if (!selectedSong || !selectedSong.song_url) {
    return null;
  }

  return (
    <div className="audio-player fixed-right">
      <div className="player-details">
        <img
          src={selectedSong.image}
          alt={selectedSong.song_name}
          className="player-image"
        />
        <h4>{selectedSong.song_name}</h4>
        <p>{selectedSong.Movie_Name}</p>
      </div>
      <div className="player-controls">
        <button onClick={handlePrevious} className="control-btn">
          <i className="bi bi-skip-backward-fill"></i>
        </button>
        <button onClick={handlePlayPause} className="control-btn">
          {isPlaying ? (
            <i className="bi bi-pause-fill"></i>
          ) : (
            <i className="bi bi-play-fill"></i>
          )}
        </button>
        <button onClick={handleNext} className="control-btn">
          <i className="bi bi-skip-forward-fill"></i>
        </button>
      </div>
      <div className="time-controls">
        <span className="current-time">{formatTime(currentTime)}</span>
        <div className="progress-wrapper">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
            style={{backgroundColor: "#000000"}}
          />
        </div>
        <span className="duration-time">{formatTime(duration)}</span>
      </div>

      <audio ref={audioRef} autoPlay />
    </div>
  );
};

export default Player;