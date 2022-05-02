const asyncHandler = require("express-async-handler");
const product = require("../Models/productModel");
const { SymbologyType, createStream } = require("symbology");
const { nanoid } = require("nanoid");
const { ObjectId } = require("bson");
const category = require("../Models/category");
const protect = require("../Middleware/auth");
const res = require("express/lib/response");

module.exports = {
  addProduct: asyncHandler(async (req, res) => {
    const vendorCode = {
      0: "U",
      1: "C",
      2: "L",
      3: "O",
      4: "T",
      5: "H",
      6: "I",
      7: "N",
      8: "G",
      9: "S",
    };
    const {
      productName,
      description,
      category,
      mainCategory,
      subCategory,
      brand,
      meterial,
      vendorName,
      vendoreDetails,
      select,
    } = req.body;
    console.log(meterial);
    //for VendoreCode
    select.forEach((entry) => {
      let priceCoded = "";
      let price = entry.sellingPrice;
      for (let i = 0; i < price.length; i++) {
        let char = Number(price[i]);
        priceCoded = priceCoded + vendorCode[char];
      }
      entry.priceCode = priceCoded;
      entry.qty = parseInt(entry.qty);
      entry.marketPrice = parseInt(entry.marketPrice);
      entry.sellingPrice = parseInt(entry.sellingPrice);
      entry.MinQty = parseInt(entry.MinQty);
      entry.stocks = parseInt(entry.stocks);
    });

    console.log(select);

    let productDetailsExist = await product.findOne({ productName });
    if (productDetailsExist) {
      res.status(401);
      throw new Error("Product already Exist");
    } else {
      // var val = Math.floor(100000 + Math.random() * 900000);
      // // console.log(val);

      let data = select.map(async (detail, index) => {
        var val = Math.floor(100000 + Math.random() * 900000);
        var mrpVal = Math.floor(100000 + Math.random() * 900000);

        var { data } = await createStream(
          {
            symbology: SymbologyType.CODE11,
            data: productDetailsExist,
          },
          val
        );
        let barcode = data;

        var { data } = await createStream(
          {
            symbology: SymbologyType.CODE11,
            data: productDetailsExist,
          },
          mrpVal
        );

        let mrpBarCode = data;

        detail.barcode = barcode;
        detail.barcodepin = val;
        detail.mrpBarCode = mrpBarCode;
        detail.mrpBarCodePin = mrpVal;

        let details = await product.create({
          productName,
          description,
          category,
          mainCategory,
          subCategory,
          brand,
          meterial,
          vendorName,
          vendoreDetails,
          productItemDetails: detail,
        });
        return details;
      });
      res.json({ data });
    }
  }),

  //get Product
  getProductDetails: asyncHandler(async (req, res) => {
    try {
      let showProduct = await product.find({});
      res.json({ showProduct });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }),

  //delete Product
  deleteProduct: asyncHandler(async (req, res) => {
    console.log(req.params, "iddddddddddddddddddddddddd");
    try {
      let id = req.query.id;
      let deleted = await product.findByIdAndDelete({
        _id: ObjectId(id),
      });
      console.log(deleted);
      res.json({ deleted });
    } catch (err) {
      console.log(err);
    }
  }),

  editProduct: asyncHandler(async (req, res) => {
    try {
      console.log(req.query, "***********");
      let proDetails = await product.findById(req.query.id);
      console.log(proDetails, "***********");

      res.json(proDetails);
    } catch (err) {
      throw new Error(err);
    }
  }),

  editProTake: asyncHandler(async (req, res) => {
    console.log(req.body, "=-=---000-");
    const {
      productName,
      description,
      category,
      mainCategory,
      subCategory,
      brand,
      meterial,
      vendorName,
      vendoreDetails,
      productItemDetails,
    } = req.body.detail;
    try {
      let id = req.query.id;
      let findPro = await product.findById(id);

      productItemDetails[0].barcode = findPro.productItemDetails[0].barcode;
      productItemDetails[0].mrpBarCode =
        findPro.productItemDetails[0].mrpBarCode;

      productItemDetails[0].barcodepin =
        findPro.productItemDetails[0].barcodepin;

      productItemDetails[0].mrpBarCodePin =
        findPro.productItemDetails[0].mrpBarCodePin;

      let proSuccess = await product.updateOne(
        { _id: req.query.id },
        {
          $set: {
            productName,
            description,
            category,
            mainCategory,
            subCategory,
            brand,
            meterial,
            vendorName,
            vendoreDetails,
            productItemDetails,
          },
        }
      );
      res.json({ proSuccess });
    } catch (err) {
      res.status(401);
      throw new Error(err);
      console.log(err);
    }
  }),

  stockParchase: asyncHandler(async (req, res) => {
    try {
      let purchaseData = await product.aggregate([
        {
          $project: {
            productName: 1,
            description: 1,
            category: 1,
            mainCategory: 1,
            subCategory: 1,
            brand: 1,
            meterial: 1,
            vendorName: 1,
            vendoreDetails: 1,
            productItemDetails: 1,
          },
        },
        {
          $unwind: "$productItemDetails",
        },
        {
          $match: {
            "productItemDetails.stocks": { $lt: "productItemDetails.MinQty" },
          },
        },
      ]);
      res.json(purchaseData);
    } catch (err) {
      res.status(401);
      throw new Error(err);
    }
  }),

  categorySet: asyncHandler(async (req, res) => {
    try {
      const { categoryName, mode } = req.body;

      let isCategory = await category.findOne({
        categoryName,
        mode,
      });
      if (isCategory) {
        console.log("hello1");

        res.status(401);

        throw new Error("It already exists");
      } else {
        console.log("hello3");

        let categoryData = await category.create({
          categoryName,
          mode,
        });

        res.json(categoryData);
      }
    } catch (err) {}
  }),

  categoryShow: asyncHandler(async (req, res) => {
    try {
      const modeData = await category.aggregate([
        {
          $group: {
            _id: "$mode",
            item: {
              $push: "$categoryName",
            },
          },
        },
      ]);

      const showCategory = modeData.map((data) => ({ [data._id]: data.item }));
      res.json(showCategory);
    } catch (err) {
      res.status(401);
    }
  }),

  deleteCategory: asyncHandler(async (req, res) => {
    try {
      let deletcat = await category.deleteOne({
        categoryName: req.query.id,
      });
      res.json(deletcat);
    } catch (err) {
      res.status(401);
      throw new Error(err);
    }
  }),
};
