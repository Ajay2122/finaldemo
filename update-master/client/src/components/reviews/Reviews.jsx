/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  // Fetch reviews data
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  // Mutation for adding a review
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      // Invalidate the reviews query to refetch data
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review added successfully", {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      });
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Failed to add review";
      toast.error(errorMessage, {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {/* Render loading state, error message, or reviews */}
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        {/* Review form */}
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            {/* Review rating options */}
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
