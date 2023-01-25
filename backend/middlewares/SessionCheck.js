const Jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    let authHeader = req.headers["auth-token"];
    console.log(req.headers);
    console.log(authHeader);
    if (authHeader === "null") {
      res.status(401).json({ error: "no token provided" });
    }
    let token = authHeader;
    console.log(token, "hhhhh");
    Jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) {
        res.status(500).json({ error: "Authentication Failed" });
        console.log("failed", err);
      } else {
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Authentication Failed" });
  }
}
module.exports = { verifyToken };
