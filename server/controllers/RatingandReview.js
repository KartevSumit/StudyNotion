const RatingAndReview = require('../models/ratingAndReview.model');
const Course = require('../models/course.model');
const mongoose = require('mongoose');

exports.createRatingAndReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, review } = req.body;

    // Fixed: Check courseId instead of undefined 'course' variable
    if (!courseId || !userId || !rating || !review) {
      return res.status(401).json({
        success: false,
        message: 'Please fill complete details',
        // Removed error.message as error is not defined here
      });
    }

    // Fixed: findOne instead of findById and fixed query structure
    const course = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'You are not enrolled in this course',
        // Removed error.message as error is not defined here
      });
    }

    const existingRating = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this course',
        // Removed error.message as error is not defined here
      });
    }

    // Fixed: Added course field to RatingAndReview creation
    const newRating = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating: rating,
      review: review,
    });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          RatingAndReview: newRating._id,
        },
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(400).json({
        success: false,
        message: 'Error in updating course',
        // Removed error.message as error is not defined here
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Rating and Review created successfully',
      data: newRating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in creating rating and review',
      error: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    // Fixed: res.status instead of req.status
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    } else {
      return res.status(200).json({
        success: true,
        averageRating: 0,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in getting average rating',
      error: error.message,
    });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const ratings = await RatingAndReview.find({})
      .sort({ rating: 'desc' })
      .populate({ path: 'user', select: 'firstName lastName email image' })
      .populate({ path: 'course', select: 'courseName' })
      .exec();

    return res.status(200).json({
      success: true,
      message: 'Ratings fetched successfully',
      data: ratings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in getting all rating',
      error: error.message,
    });
  }
};
