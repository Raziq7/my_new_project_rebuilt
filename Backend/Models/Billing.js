const mongoose = require("mongoose");
const BillingSchema = mongoose.Schema(
  {
    PID: {
      type: Number,
    },
    ProductName: {
      type: String,
      required: true,
    },

    Description: {
      type: String,
    },

    MainCategory: {
      type: String,
    },

    SubCategory: {
      type: String,
    },

    Size: {
      type: String,
    },

    Color: {
      type: String,
    },

    GenderWear: {
      type: String,
    },

    Brand: {
      type: String,
    },

    MaterialType: {
      type: String,
    },

    MarketPrice: {
      type: Number,
    },

    SellingPrice: {
      type: Number,
    },
    Discount: {
      type: Number,
    },

    MaxStock: {
      type: Number,
    },

    MinStock: {
      type: Number,
    },

    Qty: {
      type: Number,
    },

    MaxStockMeter: {
      type: String,
    },

    MinStockMeter: {
      type: String,
    },

    VendorName: {
      type: String,
    },

    priceCode: {
      type: String,
    },

    BarCodeLink: {
      type: String,
    },

    BarCodePin: {
      type: Number,
    },

    BarCodeMrpLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Billing = mongoose.model("Billing", BillingSchema);
module.exports = Billing;
