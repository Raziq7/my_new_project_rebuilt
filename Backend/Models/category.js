const mongoose = require("mongoose");

const categoryScheama = mongoose.Schema(
  {
    categoryName: {
      type: String,
      require: true,
    },
    mode: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const category = mongoose.model("category", categoryScheama);
module.exports = category;
