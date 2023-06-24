/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  // Render a clickable link to the gigs page filtered by the category
  return (
    <Link to={`/gigs?cat=${encodeURIComponent(card.title)}`}>
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}

export default CatCard;
