const cron = require('node-cron');
const TempFile = require('../models/tempFile.model');
const cloudinary = require('cloudinary').v2;

cron.schedule('* * * * *', async () => {
  const files = await TempFile.find();
  files.forEach(async (file) => {
    if (file.uploadedAt < new Date(Date.now() - 5 * 60 * 1000)) {
      await cloudinary.uploader.destroy(file.publicId);
      await TempFile.findByIdAndDelete(file._id);
      console.log('Deleted file:', file.publicId);
    }
  });
});
