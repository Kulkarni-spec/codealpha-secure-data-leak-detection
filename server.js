const express = require("express");
const bodyParser = require("body-parser");

const app = express();

console.log(" Starting server...");

const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});