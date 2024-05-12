const multer = require("multer");

const storageDirectory = path.join(__dirname, "storage");
if (!fs.existsSync(storageDirectory)) {
  fs.mkdirSync(storageDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imagesDir = path.join(storageDirectory, "images");
    const documentsDir = path.join(storageDirectory, "documents");

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    if (!fs.existsSync(documentsDir)) {
      fs.mkdirSync(documentsDir, { recursive: true });
    }

    if (file.mimetype.startsWith("image")) {
      cb(null, imagesDir);
    } else if (file.mimetype.startsWith("application")) {
      cb(null, documentsDir);
    } else {
      cb({ message: "Unsupported file type" }, null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
