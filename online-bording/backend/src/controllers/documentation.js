const router = require("express").Router();
const upload = require("../middleware/storage");
const Files = require("../models/files");

router.post("/upload", upload.single("files"), async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const file = new Files({
    fileName: req.files.originalname,
  });

  res.status(200).json({ message: "File uploaded successfully" });
});

module.exports = router;
