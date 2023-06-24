const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/jwt_verifyToken");
const reviewController = require("../controllers/review.controller");

// Route for creating a review
// It expects a POST request
router.post("/", validateToken, reviewController.createReview);

// Route for retrieving reviews for a specific gig
// It expects a GET request with the gig ID parameter
router.get("/:gigId", reviewController.getReview);

// Route for deleting a review
// It expects a DELETE request with the review ID parameter
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
