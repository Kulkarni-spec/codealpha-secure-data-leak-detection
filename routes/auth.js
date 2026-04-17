const express = require("express");
const router = express.Router();
const db = require("../config/db");
const crypto = require("crypto");
const { encrypt } = require("../utils/encryption");

const fs = require("fs");
const path = require("path");

// =====================
// REGISTER USER
// =====================
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    // Encrypt password
    const encryptedPassword = encrypt(password);

    // Generate capability code
    const capabilityCode = crypto.randomBytes(16).toString("hex");

    const query = `
      INSERT INTO users (username, password, capability_code)
      VALUES (?, ?, ?)
    `;

    db.execute(query, [username, encryptedPassword, capabilityCode], (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).send("Database error");
      }

      res.send({
        message: "User Registered Securely",
        capabilityCode: capabilityCode
      });
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


// =====================
// LOGIN USER
// =====================
router.post("/login", (req, res) => {
  const { username, password, capabilityCode } = req.body;

  // 1️⃣ Validation
  if (!username || !password || !capabilityCode) {
    return res.status(400).send("All fields are required");
  }

  // 2️⃣ 🚨 SQL Injection Detection + Logging
  if (
    username.includes("'") ||
    password.includes("OR") ||
    password.includes("--")
  ) {
    const log = `⚠️ SQL Injection Attempt:
Username: ${username}
Password: ${password}
Time: ${new Date().toISOString()}

`;

    const logFilePath = path.join(__dirname, "../logs.txt");

    fs.appendFileSync(logFilePath, log);

    console.log(log);

    return res.status(400).send("Suspicious activity detected");
  }

  // 3️⃣ Safe Query 
  const query = `SELECT * FROM users WHERE username = ?`;

  db.execute(query, [username], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = results[0];

    // Encrypt input password
    const encryptedInputPassword = encrypt(password);

    // 4️⃣ Double-layer security check
    if (
      user.password !== encryptedInputPassword ||
      user.capability_code !== capabilityCode
    ) {
      return res.status(403).send("Unauthorized access");
    }

    res.send({
      message: "Login successful",
      user: username
    });
  });
});

module.exports = router;