const express = require("express");
const app = require("./app.js");
let dotenv = require("dotenv");
let path = require("path");
const connectDb = require("./config/connect");
dotenv.config();

//mongo connection
connectDb();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
app.listen(process.env.PORT || 5000, () => {
  console.log("server is connected");
});
