const express = require("express");
const {
  addProduct,
  getProductDetails,
  deleteProduct,
} = require("../controllers/sAdminController");
const protect = require("../Middleware/auth");
const router = express.Router();

//add Product
router.route("/").post(addProduct);

//get Product
router.route("/getProduct").get(getProductDetails);

//deleteProduct
router.route("/deletePro/").delete(deleteProduct);

module.exports = router;
