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
      vendorName,
      vendoreDetails,
      select,
    } = req.body;
    let productDetailsExist = await addProductModel.findOne({ productName });
    // console.log(productDetailsExist, "546546464646465654654");
    if (productDetailsExist) {
      console.log("errrrrrrrrrrrrrrrrrrrr");
      throw new Error("Product already Exist");
    } else {
      // var val = Math.floor(100000 + Math.random() * 900000);
      // // console.log(val);

      // console.log(select);
      let data = select.map(async (detail, index) => {
        var val = Math.floor(100000 + Math.random() * 900000);
        console.log(val);
        const { data } = await createStream(
          {
            symbology: SymbologyType.CODE11,
            data: productDetailsExist,
          },
          val
        );
        detail.barcode = data;
        detail.barcodepin = val;

        console.log("SUCCESSSSSSSSS", detail);

        let details = await addProductModel.create({
          productName,
          description,
          category,
          mainCategory,
          subCategory,
          brand,
          vendorName,
          vendoreDetails,
          productItemDetails: detail,
        });
        console.log("SUCCESSSSSSSSS", details);
        return details;
      });
      console.log(data);
      res.json({ data });
    }
  }),

  //get Product
  getProductDetails: async (req, res) => {
    try {
      let showProduct = await addProductModel.find({});
      console.log(showProduct.productItemDetails);
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
