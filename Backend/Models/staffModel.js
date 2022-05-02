const mongoose = require("mongoose");

const staffModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      minLength: 10,
      maxLength: 10,
      default: 1212121212,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    isBlock: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const staffModel = mongoose.model("staffModel", staffModelSchema);
module.exports = staffModel;
