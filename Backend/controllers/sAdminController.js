const asyncHandler = require("express-async-handler");
const Product = require("../Models/productModel");
const { SymbologyType, createStream } = require("symbology");
const { nanoid } = require("nanoid");
const { ObjectId } = require("bson");
const Billing = require("../Models/Billing");
const protect = require("../Middleware/auth");
const cloudinary = require("cloudinary").v2;
const imageDownloader = require("image-downloader");
const { json } = require("body-parser");

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  // addProduct: asyncHandler(async (req, res) => {
  //   const vendorCode = {
  //     0: "U",
  //     1: "C",
  //     2: "L",
  //     3: "O",
  //     4: "T",
  //     5: "H",
  //     6: "I",
  //     7: "N",
  //     8: "G",
  //     9: "S",
  //   };
  //   const {
  //     productName,
  //     description,
  //     category,
  //     mainCategory,
  //     subCategory,
  //     brand,
  //     meterial,
  //     vendorName,
  //     vendoreDetails,
  //     select,
  //   } = req.body;

  //   //for VendoreCode
  //   select.forEach((entry) => {
  //     let priceCoded = "";
  //     let price = entry.sellingPrice;
  //     for (let i = 0; i < price.length; i++) {
  //       let char = Number(price[i]);
  //       priceCoded = priceCoded + vendorCode[char];
  //     }
  //     entry.priceCode = priceCoded;
  //     entry.qty = parseInt(entry.qty);
  //     entry.marketPrice = parseInt(entry.marketPrice);
  //     entry.sellingPrice = parseInt(entry.sellingPrice);
  //     entry.MinQty = parseInt(entry.MinQty);
  //     entry.MaxQty = parseInt(entry.MaxQty);
  //     entry.stocks = parseInt(entry.stocks);
  //   });

  //   let productDetailsExist = await Product.findOne({ productName });
  //   if (productDetailsExist) {
  //     res.status(401);
  //     throw new Error("Product already Exist");
  //   } else {
  //     let data = select.map(async (detail, index) => {
  //       var val = Math.floor(100000 + Math.random() * 900000);
  //       var mrpVal = Math.floor(100000 + Math.random() * 900000);

  //       var { data } = await createStream(
  //         {
  //           symbology: SymbologyType.CODE11,
  //           data: productDetailsExist,
  //         },
  //         val
  //       );
  //       let barcode = data;

  //       const image = {
  //         image: barcode,
  //       };

  //       let BarCode_link1 = await cloudinary.uploader.upload(image.image, {
  //         folder: "ukkens_Bar_Code",
  //       });

  //       console.log(BarCode_link1.url, "555555");
  //       let BarCodelink1 = BarCode_link1.secure_url;

  //       var { data } = await createStream(
  //         {
  //           symbology: SymbologyType.CODE11,
  //           data: productDetailsExist,
  //         },
  //         mrpVal
  //       );

  //       let mrpBarCode = data;

  //       const image1 = {
  //         image: mrpBarCode,
  //       };

  //       let BarCode_link2 = await cloudinary.uploader.upload(image1.image, {
  //         folder: "ukkens_Mrp_Code",
  //       });

  //       console.log(BarCode_link2.secure_url, "555555");
  //       let BarCodelink2 = BarCode_link2.secure_url;

  //       detail.barcodeUrl = BarCodelink1;
  //       detail.barcodepin = val;
  //       detail.mrpBarCodeUrl = BarCodelink2;
  //       detail.mrpBarCodePin = mrpVal;

  //       let details = await Product.create({
  //         productName,
  //         description,
  //         category,
  //         mainCategory,
  //         subCategory,
  //         brand,
  //         meterial,
  //         vendorName,
  //         vendoreDetails,
  //         productItemDetails: detail,
  //       });
  //       return details;
  //     });
  //     res.json({ data });
  //   }
  // }),

  //get Product
  getProductDetails: asyncHandler(async (req, res) => {
    try {
      let showProduct = await Product.find({});
      res.json({ showProduct });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }),

  //delete Product
  deleteProduct: asyncHandler(async (req, res) => {
    try {
      let id = req.query.id;
      let deleted = await Product.findByIdAndDelete({
        _id: ObjectId(id),
      });
      res.json({ deleted });
    } catch (err) {
      console.log(err);
    }
  }),

  editProduct: asyncHandler(async (req, res) => {
    try {
      let proDetails = await Product.findById(req.query.id);

      res.json(proDetails);
    } catch (err) {
      throw new Error(err);
    }
  }),

  editProTake: asyncHandler(async (req, res) => {
    let id = req.query.id;

    const {
      ProductName,
      Description,
      MainCategory,
      SubCategory,
      Size,
      Color,
      GenderWear,
      Brand,
      MaterialType,
      MarketPrice,
      SellingPrice,
      Discount,
      MaxStock,
      MinStock,
      Qty,
      MaxStockMeter,
      MinStockMeter,
      VendorName,
    } = req.body;

    try {
      let findPro = await Product.findById(id);
      console.log(findPro.BarCodeMrpLink, "//////////||||||||||||++++====");
      let BarCodeLink = findPro.BarCodeLink;
      let BarCodeMrpLink = findPro.BarCodeMrpLink;

      let BarCodePin = findPro.BarCodePin;

      let BarCodePinMrp = findPro.BarCodePinMrp;

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

      let priceCoded = "";
      let price = SellingPrice + "";
      for (let i = 0; i < price.length; i++) {
        let char = Number(price[i]);
        console.log(char);
        priceCoded = priceCoded + vendorCode[char];
      }

      console.log(priceCoded, "char-");

      // const fs = require("fs");
      // const { createCanvas, loadImage } = require("canvas");

      // const width = 1200;
      // const height = 800;

      // const canvas = createCanvas(width, height);
      // const context = canvas.getContext("2d");

      // context.fillStyle = "#fff";
      // context.fillRect(0, 0, width, height);

      // context.font = "bold 70pt Menlo";
      // context.textAlign = "center";
      // context.textBaseline = "top";
      // context.fillStyle = "#3574d4";

      // const text = "Hello, World!";

      // const textWidth = context.measureText(text).width;
      // context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);
      // context.fillStyle = "red";
      // context.fillText(text, 600, 170);

      // context.fillStyle = "black";
      // context.font = "bold 60pt Menlo";
      // context.fillText(`MRP ${SellingPrice}`, 600, 530);

      // loadImage(BarCodeMrpLink.secure_url).then((image) => {
      //   context.drawImage(image, 0, 0, 1200, 630);
      //   context.fillText(`MRP ${pro.SellingPrice}`, 600, 680);
      //   const buffer = canvas.toBuffer("image/png");
      //   fs.writeFileSync(`./frontend/public/copy/${BarCodePinMrp}.png`, buffer);
      // });

      let proSuccess = await Product.updateOne(
        { _id: req.query.id },
        {
          $set: {
            ProductName,
            Description,
            MainCategory,
            SubCategory,
            Size,
            Color,
            GenderWear,
            Brand,
            MaterialType,
            MarketPrice,
            SellingPrice,
            Discount,
            MaxStock,
            MinStock,
            Qty,
            MaxStockMeter,
            MinStockMeter,
            VendorName,
            priceCode: priceCoded,
            BarCodeLink,
            BarCodePin,
            BarCodeMrpLink,
            BarCodePinMrp,
          },
        }
      );
      console.log(proSuccess, "1111111");
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
      let purchaseData = await Product.find({});

      let parchaseDetails = purchaseData.filter(
        (data) => data.MinStock > data.Qty
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

    let increseValue = await Product.findById(id);

    increseValue.Qty += value;

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

      let imgCode = await Product.findById({ _id: id });

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

  //Add Product
  addProductPost: asyncHandler(async (req, res) => {
    const Products = req.body;

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

    Products.map(async (pro) => {
      console.log(typeof pro.SellingPrice);
      let priceCoded = "";
      let price = pro.SellingPrice + "";
      console.log(typeof price);
      for (let i = 0; i < price.length; i++) {
        let char = Number(price[i]);
        priceCoded = priceCoded + vendorCode[char];
      }
      pro.priceCode = priceCoded;

      console.log(priceCoded, "priceCoded");

      pro.SellingPrice = parseInt(pro.SellingPrice);

      console.log(typeof pro.SellingPrice, "****");

      var val = Math.floor(100000 + Math.random() * 900000);

      var { data } = await createStream(
        {
          symbology: SymbologyType.CODE11,
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

      let BarCodelink1 = BarCode_link1.secure_url;

      //MRP
      var { data } = await createStream(
        {
          symbology: SymbologyType.CODE11,
        },
        val
      );

      let mrpBarCode = data;

      const image1 = {
        image: mrpBarCode,
      };

      let BarCode_link2 = await cloudinary.uploader.upload(image1.image, {
        folder: "ukkens_Mrp_Code",
      });

      const fs = require("fs");
      const { createCanvas, loadImage } = require("canvas");

      const width = 1200;
      const height = 800;

      const canvas = createCanvas(width, height);
      const context = canvas.getContext("2d");

      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);

      context.font = "bold 70pt Menlo";
      context.textAlign = "center";
      context.textBaseline = "top";
      context.fillStyle = "#3574d4";

      const text = "Hello, World!";

      const textWidth = context.measureText(text).width;
      context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);
      context.fillStyle = "red";
      context.fillText(text, 600, 170);

      context.fillStyle = "black";
      context.font = "bold 60pt Menlo";
      context.fillText(`MRP ${pro.SellingPrice}`, 600, 530);

      loadImage(BarCode_link2.secure_url).then((image) => {
        context.drawImage(image, 0, 0, 1200, 630);
        context.fillText(`MRP ${pro.SellingPrice}`, 600, 680);
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync(`./frontend/public/copy/${val}.png`, buffer);
      });

      let BarCodelink2 = BarCode_link2.secure_url;

      let proAdded = await Product.create({
        PID: val,
        ProductName: pro.ProductName,
        Description: pro.ProductDescriptions,
        MainCategory: pro.MainCategory,
        SubCategory: pro.SubCategory,
        Size: pro.Size,
        Color: pro.Color,
        GenderWear: pro.GenderWear,
        Brand: pro.Brand,
        MaterialType: pro.MaterialType,
        MarketPrice: pro.MarketPrice,
        SellingPrice: pro.SellingPrice,
        Discount: pro.Discount,
        MaxStock: pro.MaxStock,
        MinStock: pro.MinStock,
        Qty: pro.Qty,
        MaxStockMeter: pro.MaxStockMeter,
        MinStockMeter: pro.MinStockMeter,
        VendorName: pro.VendorName,
        priceCode: priceCoded,
        BarCodeLink: BarCodelink1,
        BarCodePin: val,
        BarCodeMrpLink: BarCodelink2,
      });
    });
    res.json(proAdded);

    try {
    } catch (err) {
      console.log(err);
    }
  }),

  billing: asyncHandler(async (req, res) => {
    let { value } = req.body;
    value = parseInt(value);

    let billDetails = await Product.findOne({ PID: value });
    if (billDetails) {
      let decreaseQty = await Product.updateOne(
        { PID: value },
        {
          $inc: {
            Qty: -1,
          },
        }
      );
      billDetails.qtyVal = 1;

      console.log(billDetails);

      res.json(billDetails);
    } else {
      res.status(401);
      throw new Error("this Id Is Not Available");
    }
  }),

  increasBillingQty: asyncHandler(async (req, res) => {
    try {
      const { qty, id } = req.body;
      let increaseQty = await Product.updateOne(
        { _id: id },
        {
          $inc: {
            Qty: 1,
          },
        }
      );
      res, json(increaseQty);
    } catch (err) {
      res.status(401);
      throw new Error("Something Went Wrong");
    }
  }),

  decreasBillingQty: asyncHandler(async (req, res) => {
    try {
      const { id } = req.body;
      let decreaseQty = await Product.updateOne(
        { _id: id },
        {
          $inc: {
            Qty: 1,
          },
        }
      );
      res.json(decreaseQty);
    } catch (err) {
      res.status(401);
      throw new Error("Something Went Wrong");
    }
  }),

  deleteBillingPro: asyncHandler(async (req, res) => {
    try {
      const { id } = req.body;
      let deleteBill = await Product.updateOne(
        { _id: id },
        {
          $inc: {
            Qty: 1,
          },
        }
      );
      res.json(deleteBill);
    } catch (err) {
      res.status(401);
      throw new Error("Something Went Wrong");
    }
  }),

  // getBillingDetails: asyncHandler(async (req, res) => {
  //   try {
  //     let getDetails = await Billing.find({});
  //     console.log(getDetails, "getDetailsgetDetails");

  //     res.json(getDetails);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(401);
  //     throw new Error("something Went Wrong", err);
  //   }
  // }),
};
