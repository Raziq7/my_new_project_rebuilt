const mongoose = require("mongoose");
const LadgerCategoryScheama = mongoose.Schema(
  {
    category: String,
  },
  {
    timestamps: true,
  }
);

const LadgerCategory = mongoose.model("LadgerCategory", LadgerCategoryScheama);
module.exports = LadgerCategory;
