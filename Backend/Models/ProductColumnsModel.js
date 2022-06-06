const mongoose = require("mongoose");
const ProductColumnsScheama = mongoose.Schema(
  {
    title: {
      type: String,
    },
    status: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);

const ProductColumns = mongoose.model("ProductColumns", ProductColumnsScheama);
module.exports = ProductColumns;
