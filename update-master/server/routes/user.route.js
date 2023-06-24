const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validateToken = require("../middleware/jwt_verifyToken");

// Route for deleting a user
// It expects a DELETE request with the user ID parameter
router.delete("/:id", validateToken, userController.deleteUser);

// Route for retrieving a user
// It expects a GET request with the user ID parameter
router.get("/:id", validateToken, userController.getUser);

module.exports = router;
