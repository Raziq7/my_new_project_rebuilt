const express = require("express");
const {
  addProduct,
  getProductDetails,
  deleteProduct,
  editProduct,
  editProTake,
  stockParchase,
  categorySet,
  categoryShow,
  deleteCategory,
  increaseValueStock,
  setSubCategory,
  getCategory,
  deleteSubCategory,
  downloadBarcode,
} = require("../controllers/sAdminController");
const protect = require("../Middleware/auth");
const router = express.Router();

//add Product
router.route("/").post(addProduct);

//get Product
router.route("/getProduct").get(getProductDetails);

//deleteProduct
router.route("/deletePro/").delete(deleteProduct);

//edit Product
router.route("/editPro/").get(editProduct);

//edit product take
router.route("/editProTake/").put(editProTake);

//parchase Stocks
router.route("/parchaseHistory").get(stockParchase);

//category Add
router.route("/categorySet").post(categorySet);

//show category
router.route("/getCategories").get(categoryShow);

//Delete Category

router.route("/deleteCategory/").delete(deleteCategory);

//increasStock

router.route("/increasStock").post(increaseValueStock);

//setSubCategory

router.route("/setSubCategory").post(setSubCategory);

//Get Category
router.route("/getCategory").get(getCategory);

//delete SubCategory
router.route("/deleteSubCategory").post(deleteSubCategory);

//download Barcode
router.route("/downloadBarcode").post(downloadBarcode);
module.exports = router;
