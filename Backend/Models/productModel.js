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
    productItemDetails: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("productModel", productSchema);
module.exports = product;
