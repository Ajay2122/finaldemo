/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./video.scss"; 

const Video = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleJoin = useCallback(() => {
    navigate(`/video/${value}`);
  }, [navigate, value]);

  return (
    <div className="video-container">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter Room code"
        className="video-input" // Apply SCSS class for styling
      />
      <Link to={`/video/${value}`} className="video-link"> 
        <button onClick={handleJoin} className="video-button">Join</button> 
      </Link>
    </div>
  );
};

export default Video;
