const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateofBirth: {
    type: Date,
  },
  about: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('Profile', profileSchema);