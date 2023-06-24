const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/jwt_verifyToken");
const gigController = require("../controllers/gig.controller");

// Route for creating a new gig
router.post("/", validateToken, gigController.createGig);

// Route for deleting a gig by its ID
// It expects a DELETE request with the gig ID parameter
router.delete("/:id", validateToken, gigController.deleteGig);

// Route for retrieving a single gig by its ID
router.get("/single/:id", gigController.getGig);

// Route for retrieving all gigs
router.get("/", gigController.getGigs);

module.exports = router;
