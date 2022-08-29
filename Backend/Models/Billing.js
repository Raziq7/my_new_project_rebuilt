const mongoose = require("mongoose");
const BillingSchema = mongoose.Schema(
  {
    grandTotal: Number,
    Tracking: Number,
  },

  {
    timestamps: true,
  }
);

const Billing = mongoose.model("Billing", BillingSchema);
module.exports = Billing;
