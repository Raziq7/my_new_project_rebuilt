const express = require("express");
const router = express.Router();
const StaffHelpers = require("../controllers/staffController.js");

router.route("/").post(StaffHelpers.staffRegsterDetails);

router.route("/login").post(StaffHelpers.staffLoginDetails);

module.exports = router;
