const asyncHandler = require("express-async-handler");
const staffModel = require("../Models/staffModel");
const generatorToken = require("../util/jwtGenerator");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

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

        throw new Error("Staff already exists");
      } else {
        password = await bcrypt.hash(password, 10);

        console.log(password);

        const staff = await staffModel.create({
          name,
          email,
          phone,
          password,
          status: "staff",
          isblock: false,
        });
        res.json({ staff });
      }
    } catch (err) {
      console.log(err);
    }
  }),

  //login

  staffLoginDetails: asyncHandler(async (req, res) => {
    // Admin Details

    let { email, password } = req.body;
    const findStaff = await staffModel.findOne({ email, isBlock:false });
    console.log(findStaff,'dfjaskdhfksadhfasdhfj');
    if (findStaff) {
      bcrypt
        .compare(password, findStaff.password)
        .then((currectPassword) => {
          if (currectPassword) {
            console.log("hello");
            res.json({ findStaff, Token: generatorToken(findStaff) });
          } else {
            res.status(401);
            throw new Error("Password is incorrect");
          }
        })
        .catch((err) => {
          res.status(401);
          throw new Error("Password is incorrect");
        });
    } else {
      res.status(401);
      throw new Error("Staff does not exist OR Admin Bloked You");
    }
  }),

  //staffShowing
  staffShowing: asyncHandler(async (req, res) => {
    try {
      let staffShowing = await staffModel.find({status: {$ne : "superAdmin"}});

      res.json(staffShowing);
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error(err);
    }
  }),

  staffStatusChange: asyncHandler(async (req, res) => {
    try {
      console.log(req.body.status);
      if (req.body.status == "block") {
        let change = await staffModel.updateOne(
          { _id: req.body.id },
          {
            $set: { status: req.body.status, isBlock: true, isAdmin: false },
          }
        );
        res.json(change);
      }
      if (req.body.status == "admin") {
        let change = await staffModel.updateOne(
          { _id: req.body.id },
          {
            $set: { status: req.body.status, isAdmin: true, isBlock: false },
          }
        );
        res.json(change);
      }
      if (req.body.status == "UnBlock") {
        let change = await staffModel.updateOne(
          { _id: req.body.id },
          {
            $set: { status: req.body.status, isBlock: false, isAdmin: false },
          }
        );
        res.json(change);
      }

      if (req.body.status == "staff") {
        let change = await staffModel.updateOne(
          { _id: req.body.id },
          {
            $set: { status: req.body.status, isAdmin: false, isBlock: false },
          }
        );
        res.json(change);
      }
    } catch (err) {
      res.status(401);
      throw new Error(err);
    }
  }),
};
