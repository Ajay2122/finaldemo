const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/jwt_verifyToken");
const orderController = require("../controllers/order.controller");

// Route for creating a payment intent for an order
// It expects a POST request with the order ID parameter
router.post(
  "/create-payment-intent/:id",
  validateToken,
  orderController.createPaymentIntent
);

// Route for retrieving orders
// It expects a GET request
router.get("/", validateToken, orderController.getOrder);

// Route for confirming an order
// It expects a PUT request
router.put("/", validateToken, orderController.confirm);

module.exports = router;
