const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

// Register
router.post("/register", async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exists!");
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(user_password, salt);

    // Insert user
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [user_name, user_email, bcryptPassword]
    );

    // Generate JWT
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid credentials");
    }
    const validPassword = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Invalid credentials");
    }
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
