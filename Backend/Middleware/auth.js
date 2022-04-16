const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const staffModel = require("../Models/staffModel");
module.exports = {
  authenticateTokenVerify: asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
      console.log("authentication");

      try {
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
        req.staff = await staffModel.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }),

  isAdmin: (req, res, next) => {
    if (req.staff && req.staff.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  },
};
