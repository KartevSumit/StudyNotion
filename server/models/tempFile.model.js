const mongoose = require('mongoose');

const tempFileSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('TempFile', tempFileSchema);
