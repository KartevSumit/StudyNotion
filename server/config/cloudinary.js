const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log('Cloudinary is connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = cloudinaryConnect;
