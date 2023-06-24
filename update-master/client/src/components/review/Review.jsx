/* eslint-disable react/prop-types */
import React from "react";
import { useGetUserQuery } from "../../service/userApi";
import "./Review.scss";
import { getCountryFlag } from "../../utils/getCountryFlag";

const Review = ({ review }) => {
  // Fetch user data based on the review's userId
  const { data: userData, isLoading, isError } = useGetUserQuery(review.userId);

  // Get the country flag based on the user's country
  const country = getCountryFlag(userData?.country);
  console.log(country);

  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : isError ? (
        "error"
      ) : (
        <div className="user">
          {/* User profile picture */}
          <img
            className="pp"
            src={userData.img || "/img/noavatar.jpg"}
            alt=""
          />
          <div className="info">
            {/* User name */}
            <span>{userData.username}</span>
            <div className="country">
              {/* User country */}
              <span>{userData.country}</span>
              {/* Country flag */}
              <span className="flag">
                <img src={country.mini} alt="" />
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {/* Render star icons based on the review's star rating */}
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        {/* Display the star rating */}
        <span>{review.star}</span>
      </div>
      {/* Review description */}
      <p>{review.desc}</p>
      <div className="helpful">
        {/* Helpful section */}
        <span>Helpful?</span>
        {/* Like button */}
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        {/* Dislike button */}
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
