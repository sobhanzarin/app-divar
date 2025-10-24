const multer = require("multer");
const fs = require("fs");
const path = require("path");
const createHttpError = require("http-errors");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const listFormat = ["image/png", "image/webp", "image/jpg", "image/jpeg"];
    if (listFormat.includes(file.mimetype)) {
      const format = path.extname(file.originalname);
      const fileName = new Date().getTime().toString() + format;
      cb(null, fileName);
    } else {
      cb(new createHttpError.BadRequest("فرمت عکس اشتباه است!"));
    }
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = upload;
