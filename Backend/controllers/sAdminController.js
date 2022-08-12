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
const fs = require("fs");

const { createCanvas, loadImage } = require("canvas");
const LadgerBook = require("../Models/ladgerBookModel");
const LadgerCategory = require("../Models/categorySetModel");
const ProductColumns = require("../Models/ProductColumnsModel");
const category = require("../Models/category");

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  addProduct: asyncHandler(async (req, res) => {
    let categories = req.body.select;
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
    } = req.body;

    //for VendoreCode
    categories.map(async (elem) => {
      let priceCoded = "";
      let price = elem.sellingPrice;
      for (let i = 0; i < price.length; i++) {
        let char = Number(price[i]);
        priceCoded = priceCoded + vendorCode[char];
      }
      priceCode = priceCoded;
      console.log(elem.selectQty, "console.log(selectQty);");

      sellingPrice = parseInt(price);
      marketPrice = parseInt(elem.marketPrice);
      qty = parseInt(elem.qty);
      stocks = parseInt(elem.stocks);
      minStock = parseInt(elem.MinQty);
      maxstock = parseInt(elem.MaxQty);

      let productDetailsExist = await Product.findOne({
        ProductName: productName,
      });
      console.log(productDetailsExist, "productDetailsExist");

      if (productDetailsExist) {
        res.status(401);
        throw new Error("Product already Exist");
      } else {
        var val = Math.floor(100000 + Math.random() * 900000);

        var { data } = await createStream(
          {
            symbology: SymbologyType.CODE11,
          },
          val
        );

        let mrpBarCode = data;

        let image1 = {
          image: mrpBarCode,
        };

        let BarCode_link2 = await cloudinary.uploader.upload(image1.image, {
          folder: "ukkens_Bar_Code",
        });

        // ============without MRP ==============

        const width1 = 1200;
        const height1 = 1000;

        const canvas1 = createCanvas(width1, height1);
        const context1 = canvas1.getContext("2d");

        context1.fillStyle = "#fff";
        context1.fillRect(0, 20, width1, height1);

        context1.font = "bold 70pt Menlo";
        context1.textAlign = "center";
        context1.textBaseline = "top";
        // context.fillStyle = "#3574d4";

        const text1 = "";

        const textWidth1 = context1.measureText(text1).width;
        context1.fillRect(
          600 - textWidth1 / 2 - 10,
          170 - 5,
          textWidth1 + 20,
          120
        );
        context1.fillStyle = "red";
        context1.fillText(text1, 600, 170);

        context1.fillStyle = "black";
        context1.font = "bold 60pt Menlo";

        loadImage(BarCode_link2.secure_url).then(async (image) => {
          context1.drawImage(image, 50, 320, 1100, 380);
          context1.fillText(productName, 500, 45);
          context1.fillText("QTY - 1", 259, 135);
          context1.fillText(`Sort No: ${val}`, 460, 205);
          context1.fillText(priceCode, 320, 720);

          const buffer1 = canvas1.toBuffer("image/png");
          fs.writeFileSync(`./frontend/public/copy/${val}OUT.png`, buffer1);

          image = {
            image: `./frontend/public/copy/${val}OUT.png`,
          };

          let BarCode_update_link = await cloudinary.uploader.upload(
            image.image,
            {
              folder: "ukkens_withoutMRPBar_Code",
            }
          );

          ///dfgdsfgsdfgsdfgdsfgdsfgdf
          var BarCodelink1 = BarCode_update_link.secure_url;

          //=*=*=*=*=*=*=*= without MRP =*=*=*=*=*=*=*=*=*=*=*=*
          // =========MRP BAR CODE ====================

          const width = 1200;
          const height = 1000;

          const canvas = createCanvas(width, height);
          const context = canvas.getContext("2d");

          context.fillStyle = "#fff";
          context.fillRect(0, 20, width, height);

          context.font = "bold 70pt Menlo";
          context.textAlign = "center";
          context.textBaseline = "top";
          // context.fillStyle = "#3574d4";

          const text = "";

          const textWidth = context.measureText(text).width;
          context.fillRect(
            600 - textWidth / 2 - 10,
            170 - 5,
            textWidth + 20,
            120
          );
          context.fillStyle = "red";
          context.fillText(text, 600, 170);

          context.fillStyle = "black";
          context.font = "bold 60pt Menlo";
          context.fillText(
            `MRP ${sellingPrice.toLocaleString("en-US")}`,
            600,
            530
          );
          // context.fillText(pro.ProductName, 455, 50);

          loadImage(BarCode_link2.secure_url).then(async (image) => {
            context.drawImage(image, 50, 320, 1100, 380);
            context.fillText(productName, 500, 45);
            context.fillText("QTY - 1", 259, 135);
            context.fillText(`Sort No: ${val}`, 460, 205);
            context.fillText(priceCode, 320, 720);
            context.fillText(
              `MRP ${sellingPrice.toLocaleString("en-US")}`,
              620,
              810
            );

            const buffer = canvas.toBuffer("image/png");
            fs.writeFileSync(`./frontend/public/copy/${val}.png`, buffer);

            image1 = {
              image: `./frontend/public/copy/${val}.png`,
            };

            let BarCode_MRPUPDATE_link = await cloudinary.uploader.upload(
              image1.image,
              {
                folder: "ukkens_Mrp_Code",
              }
            );

            var BarCodelink2 = BarCode_MRPUPDATE_link.secure_url;

            let details = await Product.create({
              PID: val,
              ProductName: productName,
              Description: description,
              MainCategory: mainCategory,
              SubCategory: subCategory,
              Size: elem.proSize,
              Color: elem.proColor,
              GenderWear: category,
              Brand: brand,
              MaterialType: elem.selectQty,
              MarketPrice: marketPrice,
              SellingPrice: sellingPrice,
              Discount: qty,
              MaxStock: maxstock,
              MinStock: minStock,
              Qty: stocks,
              MaxStockMeter: maxstock,
              MinStockMeter: minStock,
              VendorName: vendorName,
              priceCode: priceCode,
              BarCodeLink: BarCodelink1,
              BarCodePin: val,
              BarCodeMrpLink: BarCodelink2,
            });
          });
        });
      }
    });
    res.json({ data });
  }),
  //get Product
  getProductDetails: asyncHandler(async (req, res) => {
    try {
      let showProduct = await Product.find({});

      res.json(showProduct);
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
        priceCoded = priceCoded + vendorCode[char];
      }

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
      res.json({ proSuccess });
    } catch (err) {
      res.status(401);
      console.log(err);
      throw new Error(err);
    }
  }),

  stockParchase: asyncHandler(async (req, res) => {
    try {
      let purchaseData = await Product.find({});

      let parchaseDetails = purchaseData.filter(
        (data) => data.MinStock > data.Qty
      );

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
    let isCheck = increseValue.Qty + value;
    //  isCheck >= increseValue.MinStock &&
    if (isCheck <= increseValue.MaxStock) {
      console.log(isCheck, "isCheckisCheckisCheckisCheck");
      increseValue.Qty += value;
      await increseValue.save();
      res.json(increseValue);
    } else {
      res.status(401);
      throw new Error(`not Valid because MaxStock is ${increseValue.MaxStock}`);
    }
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
      let priceCoded = "";
      let price = pro.SellingPrice + "";
      for (let i = 0; i < price.length; i++) {
        let char = Number(price[i]);
        priceCoded = priceCoded + vendorCode[char];
      }
      pro.priceCode = priceCoded;

      pro.SellingPrice = parseInt(pro.SellingPrice);

      var val = Math.floor(100000 + Math.random() * 900000);

      //barcode 2
      var { data } = await createStream(
        {
          symbology: SymbologyType.CODE11,
        },
        val
      );

      let mrpBarCode = data;

      let image1 = {
        image: mrpBarCode,
      };

      let BarCode_link2 = await cloudinary.uploader.upload(image1.image, {
        folder: "ukkens_Bar_Code",
      });

      // ============without MRP ==============

      const width1 = 1200;
      const height1 = 1000;

      const canvas1 = createCanvas(width1, height1);
      const context1 = canvas1.getContext("2d");

      context1.fillStyle = "#fff";
      context1.fillRect(0, 20, width1, height1);

      context1.font = "bold 70pt Menlo";
      context1.textAlign = "center";
      context1.textBaseline = "top";
      // context.fillStyle = "#3574d4";

      const text1 = "";

      const textWidth1 = context1.measureText(text1).width;
      context1.fillRect(
        600 - textWidth1 / 2 - 10,
        170 - 5,
        textWidth1 + 20,
        120
      );
      context1.fillStyle = "red";
      context1.fillText(text1, 600, 170);

      context1.fillStyle = "black";
      context1.font = "bold 60pt Menlo";

      loadImage(BarCode_link2.secure_url).then(async (image) => {
        context1.drawImage(image, 50, 320, 1100, 380);
        context1.fillText(pro.ProductName, 500, 45);
        context1.fillText("QTY - 1", 259, 135);
        context1.fillText(`Sort No: ${val}`, 460, 205);
        context1.fillText(pro.priceCode, 320, 720);

        const buffer1 = canvas1.toBuffer("image/png");
        fs.writeFileSync(`./frontend/public/copy/${val}OUT.png`, buffer1);

        image = {
          image: `./frontend/public/copy/${val}OUT.png`,
        };

        let BarCode_update_link = await cloudinary.uploader.upload(
          image.image,
          {
            folder: "ukkens_withoutMRPBar_Code",
          }
        );

        ///dfgdsfgsdfgsdfgdsfgdsfgdf
        var BarCodelink1 = BarCode_update_link.secure_url;

        //=*=*=*=*=*=*=*= without MRP =*=*=*=*=*=*=*=*=*=*=*=*
        // =========MRP BAR CODE ====================

        const width = 1200;
        const height = 1000;

        const canvas = createCanvas(width, height);
        const context = canvas.getContext("2d");

        context.fillStyle = "#fff";
        context.fillRect(0, 20, width, height);

        context.font = "bold 70pt Menlo";
        context.textAlign = "center";
        context.textBaseline = "top";
        // context.fillStyle = "#3574d4";

        const text = "";

        const textWidth = context.measureText(text).width;
        context.fillRect(
          600 - textWidth / 2 - 10,
          170 - 5,
          textWidth + 20,
          120
        );
        context.fillStyle = "red";
        context.fillText(text, 600, 170);

        context.fillStyle = "black";
        context.font = "bold 60pt Menlo";
        context.fillText(`MRP ${pro.SellingPrice}`, 600, 530);
        // context.fillText(pro.ProductName, 455, 50);

        loadImage(BarCode_link2.secure_url).then(async (image) => {
          context.drawImage(image, 50, 320, 1100, 380);
          context.fillText(pro.ProductName, 500, 45);
          context.fillText("QTY - 1", 259, 135);
          context.fillText(`Sort No: ${val}`, 460, 205);
          context.fillText(pro.priceCode, 320, 720);
          context.fillText(
            `MRP ${pro.SellingPrice.toLocaleString("en-US")}`,
            620,
            810
          );

          const buffer = canvas.toBuffer("image/png");
          fs.writeFileSync(`./frontend/public/copy/${val}.png`, buffer);

          image1 = {
            image: `./frontend/public/copy/${val}.png`,
          };

          let BarCode_MRPUPDATE_link = await cloudinary.uploader.upload(
            image1.image,
            {
              folder: "ukkens_Mrp_Code",
            }
          );

          console.log(
            BarCode_MRPUPDATE_link,
            "BarCode_link2BarCode_link2BarCode_link2"
          );
          var BarCodelink2 = BarCode_MRPUPDATE_link.secure_url;

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
        // =========MRP BAR CODE ====================
      });
    });
    res.json(proAdded);

    try {
    } catch (err) {
      res.status(401);
      throw new Error(err);
      console.log(err);
    }
  }),

  billing: asyncHandler(async (req, res) => {
    console.log("nokkkkkkkkkkkkkkkkia");
    let { value } = req.body;
    value = parseInt(value);

    let billDetails = await Product.findOne({ PID: value });
    if (billDetails) {
      billDetails.qtyVal = 1;

      console.log(billDetails, "=======================================");

      res.json(billDetails);
    } else {
      res.status(401);
      throw new Error("this Id Is Not Available");
    }
  }),

  checkoutBillingQty: asyncHandler(async (req, res) => {
    try {
      const { billInfo, grandTotal } = req.body;
      console.log(grandTotal, "5454545454");

      billInfo.map(async (data) => {
        console.log(data.qtyVal, "data.qtyValdata.qtyVal");

        let increaseQty = await Product.updateOne(
          { _id: data._id },
          {
            $inc: {
              Qty: -data.qtyVal,
            },
          }
        );
      });
      let insertBilling = await Billing.insertMany({
        grandTotal,
      });
      res, json(increaseQty);
    } catch (err) {
      res.status(401);
      throw new Error("Something Went Wrong");
    }
  }),

  // decreasBillingQty: asyncHandler(async (req, res) => {
  //   try {
  //     const { id } = req.body;
  //     let decreaseQty = await Product.updateOne(
  //       { _id: id },
  //       {
  //         $inc: {
  //           Qty: 1,
  //         },
  //       }
  //     );
  //     res.json(decreaseQty);
  //   } catch (err) {
  //     res.status(401);
  //     throw new Error("Something Went Wrong");
  //   }
  // }),

  // deleteBillingPro: asyncHandler(async (req, res) => {
  //   try {
  //     const { id } = req.body;
  //     let deleteBill = await Product.updateOne(
  //       { _id: id },
  //       {
  //         $inc: {
  //           Qty: 1,
  //         },
  //       }
  //     );
  //     res.json(deleteBill);
  //   } catch (err) {
  //     res.status(401);
  //     throw new Error("Something Went Wrong");
  //   }
  // }),

  AddladgerBook: asyncHandler(async (req, res) => {
    try {
      let { category, details, credit, debit } = req.body.details;
      let decreaseGrand = await Billing.aggregate([
        { $group: { _id: null, total: { $sum: "$grandTotal" } } },
      ]);

      if (debit) {
        credit = 0;
      } else {
        debit = 0;
      }
      let balance = 0;
      let isExist = await LadgerBook.find().sort({ _id: -1 }).limit(1);
      credit = parseInt(credit);
      debit = parseInt(debit);
      console.log(isExist, "=========================");

      if (isExist[0]) {
        console.log(isExist[0].balance, "=========================");

        balance =
          credit == 0
            ? isExist[0].balance - debit
            : isExist[0].balance + credit;
      } else {
        balance = debit
          ? decreaseGrand[0].total - debit
          : decreaseGrand[0].total + credit;
      }

      balance = parseInt(balance);

      console.log(balance, "balancebalancebalancebalancebalancebalance");

      let ladger = await LadgerBook.create({
        category,
        details,
        credit,
        debit,
        balance,
      });
      res.json(ladger);
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("something Went Wrong", err);
    }
  }),

  ladgerBook: asyncHandler(async (req, res) => {
    console.log("ladgerDaetailsladgerDaetails");

    try {
      let ladgerDaetails = await LadgerBook.find({});
      console.log(ladgerDaetails, "ladgerDaetailsladgerDaetails");
      res.json(ladgerDaetails);
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("something Went Wrong", err);
    }
  }),

  categoryAdd: asyncHandler(async (req, res) => {
    const { category } = req.body;
    let categoryFind = await LadgerCategory.findOne({ category });

    if (categoryFind) {
      console.log("Category Already Exis");
      res.status(401);
      throw new Error("Category Already Exist");
    } else {
      let categorycheck = await LadgerCategory.create({ category });
      res.json(categorycheck);
    }
  }),

  ladgerBookshow: asyncHandler(async (req, res) => {
    let categoryFind = await LadgerCategory.find({});

    res.json(categoryFind);
  }),

  ProductManageColomnHideAndVisible: asyncHandler(async (req, res) => {
    const { id, title } = req.body;
    console.log(title, "sfggdf");
    console.log(id, "sfggdf");

    let set = await ProductColumns.updateOne(
      { title: title },
      { $set: { status: id } }
    );

    res.json(set);
  }),

  ProductManageColomnHideAndVisibleShow: asyncHandler(async (req, res) => {
    const { id, title } = req.body;
    console.log(title, "sfggdf");
    console.log(id, "sfggdf");

    let show = await ProductColumns.find({});

    res.json(show);
  }),

  // deleteLedger
  deleteLedger: asyncHandler(async (req, res) => {
    const { id } = req.query;
    console.log(req.query, "sfggdf");

    let deleteLedger = await LadgerBook.deleteOne({ _id: id });

    res.json(deleteLedger);
  }),
};
