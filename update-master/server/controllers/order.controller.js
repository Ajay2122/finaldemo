const asyncHandler = require("express-async-handler");
const AppError = require("../error/AppError");
const Order = require("../models/order.model");
const Gig = require("../models/gig.model");
const Stripe = require("stripe");

// Create a payment intent for a gig
const createPaymentIntent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE); // Create a new instance of the Stripe client

  const gig = await Gig.findById(req.params.id); // Find the gig based on the provided ID

  // Create a payment intent using the Stripe client
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100, // Convert the price to the smallest currency unit (e.g., cents)
    currency: "inr", // Specify the currency 
    automatic_payment_methods: {
      enabled: true, // Enable automatic payment methods
    },
  });

  // Create a new order with the gig and payment intent information
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save(); // Save the new order to the database

  res.status(200).send({
    clientSecret: paymentIntent.client_secret, // Send the client secret for the payment intent as the response
  });
};

// Get completed orders for a user
const getOrder = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller
        ? { sellerId: req.userId._id }
        : { buyerId: req.userId._id }),
      isCompleted: true,
    })
    .populate({
      path: "buyerId",
      select: "username phone",
      model: "User", // Replace "User" with the actual model name for the buyer
    })
    .populate({
      path: "sellerId",
      select: "username phone",
      model: "User", // Replace "User" with the actual model name for the seller
    });
    res.status(200).send(orders); // Send the orders as the response
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Confirm a payment by updating the corresponding order
const confirm = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent }, // Find the order based on the provided payment intent
      {
        $set: {
          isCompleted: true, // Set the isCompleted field of the order to true
        },
      }
    );

    res.status(200).send(order); // Send the updated order as the response
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = { getOrder, createPaymentIntent, confirm };
