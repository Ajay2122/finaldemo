const asyncHandler = require("express-async-handler");
const AppError = require("../error/AppError");
const User = require("../models/user.model");

// Delete a user
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Find the user based on the provided ID

    // Check if the authenticated user is the same as the user being deleted
    if (req.userId._id.toString() !== user._id.toString()) {
      return next(new AppError("You can delete only your account!", 403));
    }

    await User.findByIdAndDelete(req.params.id); // Delete the user from the database
    res.status(200).send("Deleted Successfully."); // Send a success message as the response
  } catch (error) {
    return next(new AppError(error, 401)); // Pass the error to the error handling middleware
  }
});

// Get a user by ID
const getUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Find the user based on the provided ID
    res.status(200).send(user); // Send the user as the response
  } catch (error) {
    res.status(401).send("ID is not valid: " + error.message); // Send an error message if the ID is not valid
  }
});

module.exports = { deleteUser, getUser };
