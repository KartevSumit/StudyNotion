const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    default: null,
  },
  dateofBirth: {
    type: Date,
    default: null,
  },
  about: {
    type: String,
    default: null,
    trim: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
  },
  profession: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Profile', profileSchema);
