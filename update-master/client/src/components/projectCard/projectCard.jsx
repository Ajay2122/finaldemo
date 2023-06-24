/* eslint-disable react/prop-types */
import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      {/* Project image */}
      <img src={card.img} alt="" />
      <div className="info">
        {/* Profile picture */}
        <img src={card.pp} alt="" />
        <div className="texts">
          {/* Category */}
          <h2>{card.cat}</h2>
          {/* Username */}
          <span>{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
