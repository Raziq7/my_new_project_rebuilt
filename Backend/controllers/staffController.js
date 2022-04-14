const asyncHandler = require("express-async-handler");
const staffModel = require("../Models/staffModel");
const generatorToken = require("../util/jwtGenerator");
const bcrypt = require("bcrypt");

// @desc    Register a new user
// @route   POST /api/staff
// @access  Public
module.exports = {
  staffRegsterDetails: asyncHandler(async (req, res) => {
    try {
      let details = req.body;

      let { email, name, phone, password } = details;

      const staffExist = await staffModel.findOne({ email });

      console.log(staffExist);

      if (staffExist) {
        res.status(400);

        throw new Error("User already exists");
      } else {
        password = await bcrypt.hash(password, 10);

        console.log(password);

        const staff = await staffModel.create({
          name,
          email,
          phone,
          password,
          isblock: false,
        });
        res.json({ staff, Token: generatorToken(staff) });
      }
    } catch (err) {
      console.log(err);
    }
  }),

  //login

  staffLoginDetails: asyncHandler(async (req, res) => {
    // Admin Details
    admin = {
      adminName: "raziq",
      email: "raziq@gmail.com",
      Password: 7204,
      isAdmin: true,
    };

    try {
      let { name, email, password } = req.body;
      const findStaff = await staffModel.findOne({ email, isblock: false });
      if (findStaff) {
        bcrypt
          .compare(password, findStaff.password)
          .then((currectPassword) => {
            if (currectPassword) {
              console.log("hello");
              res.json({ findStaff, Token: generatorToken(findStaff) });
            } else {
              throw new Error("Password is incorrect");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        throw new Error("User does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }),
};
