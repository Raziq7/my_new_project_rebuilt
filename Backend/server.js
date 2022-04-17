const express = require("express");
const app = require("./app.js");
let dotenv = require("dotenv");
const connectDb = require("./config/connect");
dotenv.config();

//mongo connection
connectDb();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   console.log(path.join(__dirname, "../frontend/build"));

//   app.get("*", (req, res) => {
//     console.log(path.join(__dirname, "../frontend/build"));
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }
app.listen(process.env.PORT || 5000, () => {
  console.log("server is connected");
});
