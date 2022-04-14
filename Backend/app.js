const express = require("express");
const app = express();
const dashBoard = require("./router/dashBoard.js");
const staff = require("./router/staff");
const { notFound, errorHandler } = require("./Middleware/ErroreHandling");

app.use(express.json());
app.use("/api", dashBoard);
app.use("/api/staff", staff);

//ERROR HANDLING
app.use(notFound);
app.use(errorHandler);

module.exports = app;
