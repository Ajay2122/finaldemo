const asyncHandler = require("express-async-handler");
const AppError = require("../error/AppError");
const Review = require("../models/review.model");
const Gig = require("../models/gig.model");

// Create a new review
const createReview = asyncHandler(async (req, res, next) => {
  // Check if the user is a seller, and if so, throw an error
  if (req.userId.isSeller) {
    return next(new AppError("Seller can't create a review", 403));
  }

  // Create a new review instance
  const newReview = await Review({
    userId: req.userId._id,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    // Check if the user has already created a review for the given gig
    const review = await Review.findOne({
      userId: req.userId._id,
      gigId: req.body.gigId,
    });

    if (review) {
      return next(new AppError("You have already created a review", 403));
    }

    // Save the new review
    const savedReview = await newReview.save();

    // Update the corresponding gig with the totalStars and starNumber fields
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(200).send(savedReview); // Send the saved review as the response
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Get all reviews for a given gig
const getReview = asyncHandler(async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews); // Send the reviews as the response
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Delete a review
const deleteReview = asyncHandler(async (req, res, next) => {
  try {
    // Implement the logic to delete a review
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = { createReview, getReview, deleteReview };
