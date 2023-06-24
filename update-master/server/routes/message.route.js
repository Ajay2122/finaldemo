const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/jwt_verifyToken");
const messageController = require("../controllers/message.controller");

// Route for creating a new message
router.post("/", validateToken, messageController.createMessage);


// Route for retrieving messages for a specific conversation by its ID
// It expects a GET request with the conversation ID parameter
router.get("/:id", validateToken, messageController.getMessages);


module.exports = router;
