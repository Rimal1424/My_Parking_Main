const express = require("express");
const router = express.Router();
const { getLocationAnalytics } = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/RoleMiddleware");

router.get(
  "/analytics/location-wise",
  authMiddleware,
  checkRole("provider"),
  getLocationAnalytics
);

module.exports = router;
