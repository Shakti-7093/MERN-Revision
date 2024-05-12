const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/db/dbConnection");
dotenv.config();
const app = express();

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  try {
    res.status(200).json({ status: true, message: "Home Route" });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: "Internal Server Error", error: error });
  }
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
