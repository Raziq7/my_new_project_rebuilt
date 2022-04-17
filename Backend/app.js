const express = require("express");
const app = express();
const dashBoard = require("./router/dashBoard.js");
const staff = require("./router/staff");
const Sadmin = require("./router/superAdmin");
const { notFound, errorHandler } = require("./Middleware/ErroreHandling");

app.use(express.json());
app.use("/", dashBoard);
app.use("/api/staff", staff);
app.use("/api/superAdmin", Sadmin);

// const __dirname = path.resolve();

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  console.log(path.resolve(__dirname, "frontend", "build"));
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

//ERROR HANDLING
app.use(notFound);
app.use(errorHandler);

module.exports = app;
