const jwt = require("jsonwebtoken");

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };
  // Replace 'your_jwt_secret' with your .env JWT_SECRET
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
