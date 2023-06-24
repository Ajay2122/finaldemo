const asyncHandler = require("express-async-handler");
const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");

// Create a new message
const createMessage = asyncHandler(async (req, res, next) => {
  // Create a new message instance
  const newMessage = new Message({
    conversationId: req.body.conversationId, // Get conversation ID from the request body
    userId: req.userId._id, // Get the user ID from the authenticated user
    desc: req.body.desc, // Get the message description from the request body
  });

  try {
    // Save the new message
    const savedMessage = await newMessage.save();

    // Update the conversation with the latest message information
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller, // Update readBySeller based on the sender
          readByBuyer: !req.isSeller, // Update readByBuyer based on the recipient
          lastMessage: req.body.desc, // Set the lastMessage field to the new message description
        },
      },
      { new: true }
    );
// console.log(savedMessage)
    res.status(201).send(savedMessage); // Send the saved message as the response
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

// Get all messages for a given conversation
const getMessages = asyncHandler(async (req, res, next) => {
  try {
    // Find all messages in the specified conversation and populate the userId field with user details (username, img, email)
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages); // Send the messages as the response
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

module.exports = { createMessage, getMessages };
