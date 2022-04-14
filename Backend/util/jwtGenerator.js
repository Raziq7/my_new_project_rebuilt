const jwt = require("jsonwebtoken");

const generatorToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_AUTH_TOKEN, {
    expiresIn: "30d",
  });
};

module.exports = generatorToken;
