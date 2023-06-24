const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../error/AppError");
const asyncHandler = require("express-async-handler");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Please Login to Access", 401)); // If the token is not present in the request cookies, return an error indicating that the user needs to log in
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the JWT token using the secret key
  req.userId = await User.findById(decodedData.id); // Find the user by their ID extracted from the decoded token and assign it to the 'userId' property of the request object

  req.isSeller = await decodedData.isSeller; // Assign the 'isSeller' property from the decoded token to the 'isSeller' property of the request object

  next(); // Call the next middleware function
});

module.exports = isAuthenticated;
