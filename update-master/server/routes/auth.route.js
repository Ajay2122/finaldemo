const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/jwt_verifyToken");

const authController = require("../controllers/auth.controller");

router.post("/register", authController.register); // Route for user registration
router.post("/login", authController.login); // Route for user login
router.post("/logout", authController.logout); // Route for user logout
router.post(
  "/changePassword/:id",
  validateToken,
  authController.changeUserPassword
); // Route for changing user password (requires authentication)
router.post("/forgotPassword", authController.forgotPassword); // Route for requesting password reset
router.post("/resetPassword/:token", authController.resetPassword); // Route for resetting password with a valid token
router.get("/getCurrentUser",  authController.getCurrentUser); // Route for getting the current user's information (requires authentication)

module.exports = router;
