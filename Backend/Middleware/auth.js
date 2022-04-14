const jwt = require("jsonwebtoken");

const authenticateTokenVerify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_AUTH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
  });
};
module.exports = authenticateTokenVerify;
