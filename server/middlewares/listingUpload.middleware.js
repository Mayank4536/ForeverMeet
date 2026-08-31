const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "ForeverMeet/Listings",

    public_id: `listing-${Date.now()}-${Math.round(
      Math.random() * 100000
    )}`,

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    transformation: [
      {
        width: 1200,
        height: 1200,
        crop: "limit",
        quality: "auto",
      },
    ],
  }),
});

const upload = multer({
  storage,

  limits: {
    files: 10,
    fileSize: 5 * 1024 * 1024, // 5MB per image
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only JPG, JPEG, PNG and WEBP images are allowed.")
      );
    }

    cb(null, true);
  },
});

module.exports = upload;