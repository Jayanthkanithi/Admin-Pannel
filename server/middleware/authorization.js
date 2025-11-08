const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("jwt_token");
  if (!token) {
    return res.status(403).json("Not authorized");
  }
  try {
    // Replace 'your_jwt_secret' with your .env JWT_SECRET
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(403).json("Token invalid");
  }
};
