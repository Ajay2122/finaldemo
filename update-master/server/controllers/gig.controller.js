// Import required modules and files
const asyncHandler = require("express-async-handler");
const AppError = require("../error/AppError");
const Gig = require("../models/gig.model");
const color = require("colors");

// Create a new gig
const createGig = asyncHandler(async (req, res, next) => {
  if (!req.userId.isSeller) {
    return next(new AppError("Only sellers can create a gig", 403));
  }

  const newGig = new Gig({
    userId: req.userId._id,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(200).json(savedGig);
  } catch (error) {
    next(error);
  }
});

// Delete a gig
const deleteGig = asyncHandler(async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return next(new AppError("Gig not found", 404));
    }

    if (gig.userId.toString() !== req.userId._id.toString()) {
      return next(new AppError("You cannot delete this gig", 403));
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(201).send("Gig has been deleted");
  } catch (error) {
    next(error);
  }
});

// Get a single gig by ID
const getGig = asyncHandler(async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return next(new AppError("ID not found", 404));
    }
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
});

// Get gigs with optional filters and pagination
const getGigs = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = 4
  const skipIndex = (page - 1) * 4;

  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }), // Filter by user ID
    ...(q.cat && { cat: q.cat }), // Filter by category
    ...((q.min || q.max) && {
      // Filter by price range
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }), // Filter by title using regex search
  };

  try {
    const allGigs = await Gig.find();
    const gigs = await Gig.find(filters)

      .sort({ [q.sort]: -1 }) // Sort gigs based on provided sort parameter
      .skip(skipIndex) // Apply pagination
      // Set limit for number of results per page
      .limit(limit);
// console.log(gigs.length,"lenthuiu")
// console.log(limit,"linubet")
const totalGigs = await Gig.countDocuments(filters);
      const totalPages = Math.ceil(totalGigs / limit);
// console.log("hello",gigs,page,totalPages)
    res.status(200).send(
     { gigs,
      page,
      totalPages,}
      );
  } catch (error) {
    next(error);
  }
});

module.exports = { createGig, deleteGig, getGig, getGigs };
