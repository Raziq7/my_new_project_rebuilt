const express = require("express");
const router = express.Router();
const StaffHelpers = require("../controllers/staffController.js");

router.route("/").post(StaffHelpers.staffRegsterDetails);

router.route("/login").post(StaffHelpers.staffLoginDetails);

router.route("/showStaff").get(StaffHelpers.staffShowing);

router.route("/changeStatus").post(StaffHelpers.staffStatusChange);

module.exports = router;
