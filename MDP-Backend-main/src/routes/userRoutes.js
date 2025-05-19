const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", userController.createUser); // Register a new user
router.post("/login", userController.loginUser); // Login a user

// Protected Routes
router.get("/:id", protect, userController.getUserById); // Get user by ID
router.put("/:id", protect, userController.updateUser); // Update user by ID
router.delete("/:id", protect, userController.deleteUser); // Delete user by ID

module.exports = router;