const express = require("express");
const seizureController = require("../controllers/seizureController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Routes
router.get("/logged-days", protect, seizureController.getSeizureLoggedDays);
router.post("/", protect, seizureController.createSeizure); // Create a seizure record
router.get("/:id", protect, seizureController.getSeizureById); // Get a specific seizure record by ID
router.put("/:id", protect, seizureController.updateSeizure); // Update a seizure record by ID
router.delete("/:id", protect, seizureController.deleteSeizure); // Delete a seizure record by ID
router.get("/", protect, seizureController.getSeizuresForUser);
router.get("/logged-days", protect, seizureController.getSeizureLoggedDays);


module.exports = router;