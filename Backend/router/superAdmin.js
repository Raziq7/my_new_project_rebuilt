const express = require("express");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
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
  addProductPost,
  billing,
  getBillingDetails,
  decreasBillingQty,
  increasBillingQty,
  deleteBillingPro,
} = require("../controllers/sAdminController");
const protect = require("../Middleware/auth");
var multer = require("multer");
const router = express.Router();

//add Product
// router.route("/").post(addProduct);

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

//Add product Post
router.route("/addProductPost").post(addProductPost);

//billing
router.route("/billing").post(billing);

//get Billing Details
// router.route("/getBillingDetails").get(getBillingDetails);

//increas Billing Qty
router.route("/increasBillingQty").post(increasBillingQty);

//decreasBillingQty
router.route("/decreasBillingQty").post(decreasBillingQty);

//deleteBillingPro
router.route("/deleteBillingPro").post(deleteBillingPro);

module.exports = router;
