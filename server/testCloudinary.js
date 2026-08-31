require("dotenv").config();

const cloudinary = require("./config/cloudinary");

(async () => {
  try {
    console.log(process.env.CLOUDINARY_CLOUD_NAME);
    console.log(process.env.CLOUDINARY_API_KEY);

    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    );

    console.log(result.secure_url);
  } catch (err) {
    console.log(err);
  }
})();