const asyncHandler = require("express-async-handler");
const addProductModel = require("../Models/addProductModel");
const { SymbologyType, createStream } = require("symbology");
const { nanoid } = require("nanoid");
var ObjecId = require("mongodb").ObjecId;
const { ObjectId } = require("bson");
const protect = require("../Middleware/auth");
module.exports = {
  addProduct: asyncHandler(async (req, res) => {
    const {
      productName,
      description,
      category,
      mainCategory,
      subCategory,
      brand,
      size,
      color,
      marketPrice,
      sellingPrice,
      discountPrice,
      stocks,
      vendorCode,
    } = req.body;
    let productDetailsExist = await addProductModel.findOne({ productName });
    if (productDetailsExist) {
      throw new Error("Product already Exist");
    } else {
      var val = Math.floor(1000 + Math.random() * 9000);
      const { data } = await createStream(
        {
          symbology: SymbologyType.CODE11,
          data: productDetailsExist,
        },
        val
      );

      let details = await addProductModel.create({
        productName,
        description,
        category,
        mainCategory,
        subCategory,
        brand,
        size,
        color,
        marketPrice,
        sellingPrice,
        discountPrice,
        stocks,
        vendorCode,
        barcode: data,
      });
      console.log("SUCCESSSSSSSSS", details);
      res.json({ details });
    }
  }),

  //get Product
  getProductDetails: async (req, res) => {
    try {
      let showProduct = await addProductModel.find({});
      res.json({ showProduct });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  //delete Product
  deleteProduct: async (req, res) => {
    console.log(req.params, "iddddddddddddddddddddddddd");
    try {
      let id = req.query.id;
      let deleted = await addProductModel.findByIdAndDelete({
        _id: ObjectId(id),
      });
      console.log(deleted);
      res.json({ deleted });
    } catch (err) {
      console.log(err);
    }
  },
};
