const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Raziq:${process.env.MONGO_URI}@zahraf.bb5ow.mongodb.net/LiveProjectt?retryWrites=true&w=majority`
    );
    console.log("Mongo Db connected");
  } catch (error) {
    console.log("Mongo is error :", error);
  }
};
module.exports = connectDb;
