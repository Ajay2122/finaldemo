// Import required modules and files
const asyncHandler = require("express-async-handler");
const AppError = require("../error/AppError");
const Conversation = require("../models/conversation.model");

// Create a new conversation
const createConversation = asyncHandler(async (req, res, next) => {
  const newConversation = await new Conversation({
    id: req.isSeller ? req.userId._id + req.body.to : req.body.to + req.userId._id, // Generate conversation ID based on participants
    sellerId: req.isSeller ? req.userId._id : req.body.to, // Set seller ID
    buyerId: req.isSeller ? req.body.to : req.userId._id, // Set buyer ID
    readBySeller: req.isSeller, // Set read status for seller
    readByBuyer: !req.isSeller, // Set read status for buyer
  });

console.log(newConversation)

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
});

// Update conversation read status
const upDateConversation = asyncHandler(async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id }, // Find conversation by ID
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }), // Update read status based on participant
        },
      },
      { new: true }
    );

    res.status(200).json(updatedConversation);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ err });
    next(err);
  }
});

// Get a single conversation by ID
const getSingleConversation = asyncHandler(async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id }); // Find conversation by ID

    if (!conversation) return next(new AppError("Not found!", 404));
    res.status(200).send(conversation);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// Get conversations for a user
const getConversation = asyncHandler(async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId._Id } : { buyerId: req.userId._id } // Find conversations based on user role (seller/buyer)
    )
      .populate(req.isSeller ? "buyerId" : "sellerId", "username img email") // Populate user details for the other participant
      .sort({ updatedAt: -1 }); // Sort conversations by updatedAt in descending order
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getSingleConversation,
  upDateConversation,
  getConversation,
  createConversation,
};
