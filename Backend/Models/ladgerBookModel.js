const mongoose = require("mongoose");
const LadgerBookScheama = mongoose.Schema(
  {
    category: { type: String },

    details: { type: String },

    credit: { type: Number },

    debit: { type: Number },

    balance: { type: Number },
  },

  {
    timestamps: true,
  }
);

const LadgerBook = mongoose.model("LadgerBook", LadgerBookScheama);
module.exports = LadgerBook;
