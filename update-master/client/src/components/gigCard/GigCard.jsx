/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../service/userApi";
import "./GigCard.scss";

// Component for rendering a Gig Card
const GigCard = ({ item }) => {
  const { data, isLoading, isError } = useGetUserQuery(item.userId);

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : isError ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc.split(" ").slice(0, 10).join(" ")}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>  
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
