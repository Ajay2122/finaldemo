const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/jwt_verifyToken");
const Conversation = require("../controllers/conversation.controller");

// Route for retrieving all conversations
router.get("/", validateToken, Conversation.getConversation);

// Route for creating a new conversation
router.post("/", validateToken, Conversation.createConversation);

// Route for retrieving a single conversation by its ID
// It expects a GET request with the conversation ID parameter
router.get("/single/:id", validateToken, Conversation.getSingleConversation);

// Route for updating a conversation by its ID
// It expects a PUT request with the conversation ID parameter
router.put("/:id", validateToken, Conversation.upDateConversation);

module.exports = router;
