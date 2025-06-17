const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    trim: true,
  },
  subSections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubSection',
      required: true,
    },
  ],
  timeDuration: {
    type: String,
    default: "00:00:00",
    trim: true,
  },
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
