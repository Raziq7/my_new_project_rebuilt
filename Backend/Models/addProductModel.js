const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    mainCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    marketPrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      required: true,
    },

    stocks: {
      type: Number,
      required: true,
    },

    vendorCode: {
      type: String,
      required: true,
    },
    barcode: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const addProductModel = mongoose.model("productModel", productSchema);
module.exports = addProductModel;
