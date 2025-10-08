const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const userId = req.user ? req.user.id : "guest"; 
    let folder = "uploads/others";

    if (file.fieldname === "audio") {
      folder = `uploads/audio/user_${userId}`;
    } else if (file.fieldname === "cover") {
      folder = `uploads/covers/user_${userId}`;
    } else if (file.fieldname === "profilePic") {
      folder = `uploads/profiles/user_${userId}`;
    }

    fs.mkdirSync(folder, { recursive: true }); 
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "audio" && file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else if (file.fieldname === "cover" && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else if (file.fieldname === "profilePic" && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error(" File type not allowed!"), false);
  }
};

const limits = {
  fileSize: 50 * 1024 * 1024, // 50MB
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
