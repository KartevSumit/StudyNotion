const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  whatyouwilllearn: {
    type: String,
    required: true,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RatingAndReview',
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  tags: [{ type: String }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  requirements: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Draft',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
