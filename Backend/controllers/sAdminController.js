const asyncHandler = require("express-async-handler");
const product = require("../Models/productModel");
const { SymbologyType, createStream } = require("symbology");
const { nanoid } = require("nanoid");
const { ObjectId } = require("bson");
const category = require("../Models/category");
const protect = require("../Middleware/auth");
const cloudinary = require("cloudinary").v2;
const imageDownloader = require("image-downloader");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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
      entry.MaxQty = parseInt(entry.MaxQty);
      entry.stocks = parseInt(entry.stocks);
    });

    let productDetailsExist = await product.findOne({ productName });
    if (productDetailsExist) {
      res.status(401);
      throw new Error("Product already Exist");
    } else {
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

        const image = {
          image: barcode,
        };

        let BarCode_link1 = await cloudinary.uploader.upload(image.image, {
          folder: "ukkens_Bar_Code",
        });

        console.log(BarCode_link1.url, "555555");
        let BarCodelink1 = BarCode_link1.secure_url;

        var { data } = await createStream(
          {
            symbology: SymbologyType.CODE11,
            data: productDetailsExist,
          },
          mrpVal
        );

        let mrpBarCode = data;

        const image1 = {
          image: mrpBarCode,
        };

        let BarCode_link2 = await cloudinary.uploader.upload(image1.image, {
          folder: "ukkens_Mrp_Code",
        });

        console.log(BarCode_link2.secure_url, "555555");
        let BarCodelink2 = BarCode_link2.secure_url;

        detail.barcodeUrl = BarCodelink1;
        detail.barcodepin = val;
        detail.mrpBarCodeUrl = BarCodelink2;
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

      productItemDetails[0].barcodeUrl =
        findPro.productItemDetails[0].barcodeUrl;
      productItemDetails[0].mrpBarCodeUrl =
        findPro.productItemDetails[0].mrpBarCodeUrl;

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
      console.log("hello try");
      let purchaseData = await product.find({
        // $gt: "$productItemDetails.stocks",
        // $lt: "$productItemDetails.MinQty",
      });

      let parchaseDetails = purchaseData.filter(
        (data) =>
          data.productItemDetails[0].stocks < data.productItemDetails[0].MinQty
      );

      console.log(parchaseDetails, "8797979798");
      res.json(parchaseDetails);
    } catch (err) {
      console.log("hello", err);
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

  increaseValueStock: asyncHandler(async (req, res) => {
    let { value, id } = req.body;

    value = parseInt(value);

    let increseValue = await product.findById(id);

    increseValue.productItemDetails[0].stocks += value;

    await increseValue.save();

    res.json(increseValue);
  }),

  setSubCategory: asyncHandler(async (req, res) => {
    try {
      const { value, mainValue } = req.body;

      let isSub = await category.findOne({
        categoryName: mainValue,
      });

      let subExist = isSub.subCategory.indexOf(value) !== -1;

      if (subExist) {
        res.status(401);
        throw new Error("Sub Category Exist");
      } else {
        let updateSubCategory = await category.findOneAndUpdate(
          { categoryName: mainValue },
          {
            $push: {
              subCategory: value,
            },
          }
        );
        console.log(updateSubCategory);
        res.json(updateSubCategory);
      }
    } catch (err) {
      res.status(401);
      throw new Error(err);
    }
  }),

  getCategory: asyncHandler(async (req, res) => {
    console.log("I am Hear");
    try {
      let showSubCate = await category.find({ mode: "Main_Category" });
      res.json(showSubCate);
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error(err);
    }
  }),

  deleteSubCategory: asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
      const { value, sub } = req.body;

      let delSubCat = await category.updateOne(
        { categoryName: value },
        { $pull: { subCategory: sub } }
      );

      res.json(delSubCat);
    } catch (err) {
      res.status(401);
      throw new Error(err);
    }
  }),
  downloadBarcode: asyncHandler(async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id, "dddddd");

      let imgCode = await product.findById({ _id: id });

      let url = imgCode.productItemDetails[0].barcodeUrl;

      const options = {
        url: url,
        dest: "/home/raziq/Desktop/react/live_project/Backend/public", // will be saved to /path/to/dest/image.jpg
      };

      imageDownloader
        .image(options)
        .then(({ filename }) => {
          console.log("Saved to", filename); // saved to /path/to/dest/image.jpg
          res.json({ filename });
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.log(err);
    }
  }),
};
