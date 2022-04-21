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

    vendorName: {
      type: String,
      required: true,
    },
    vendoreDetails: {
      type: String,
      require: true,
    },
    productItemDetails: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const addProductModel = mongoose.model("productModel", productSchema);
module.exports = addProductModel;
