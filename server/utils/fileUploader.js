const cloudinary = require('cloudinary').v2;
const fs = require('fs');

exports.fileUploader = async (file, folder) => {
  try {
    console.log('File path:', file.path);

    if (!fs.existsSync(file.path)) {
      console.error(`File does not exist at path: ${file.path}`);
      throw new Error('File not found at specified path');
    }

    const options = {
      folder,
      transformation: [
        {
          aspect_ratio: '1:1',
          crop: 'thumb',
          gravity: 'face',
          quality: 'auto',
          fetch_format: 'auto',
        },
      ],
      resource_type: 'auto',
    };

    console.log('Uploading file to Cloudinary...');

    const result = await cloudinary.uploader.upload(file.path, options);
    console.log('Upload successful. Public ID:', result.public_id);

    fs.unlink(file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    return result;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};
