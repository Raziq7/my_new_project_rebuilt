const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    mainCategory: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    brand: {
      type: String,
    },
    meterial: {
      type: String,
    },
    vendorName: {
      type: String,
    },
    vendoreDetails: {
      type: String,
    },
    productItemDetails: [
      {
        proSize: String,
        proColor: String,
        qty: Number,
        marketPrice: Number,
        sellingPrice: Number,
        selectQty: String,
        stocks: Number,
        MaxQty: Number,
        MinQty: Number,
        priceCode: String,
        barcodeUrl: String,
        barcodepin: Number,
        mrpBarCodeUrl: String,
        mrpBarCodePin: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("productModel", productSchema);
module.exports = product;
