const Course = require('../models/course.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const { fileUploader } = require('../utils/fileUploader');

exports.createCourse = async (req, res) => {
  try {
    const userID = req.user._id;
    const { courseName, courseDescription, whatyouwilllearn, price, category } =
      req.body;
    const thumbnail = req.file.thumbnail;

    if (
      !courseName ||
      !courseDescription ||
      !whatyouwilllearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required',
      });
    }

    const categoryDetails = await Category.findOne({ category });
    if (!categoryDetails) {
      return res.status(400).json({
        status: false,
        message: 'category not found',
      });
    }

    const thumbnailImage = await fileUploader(thumbnail, process.env.FOLDER);

    const course = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      whatyouwilllearn: whatyouwilllearn,
      price: price,
      thumbnail: thumbnailImage.secure_url,
      instructor: userID,
      category: categoryDetails._id,
    });

    await User.findByIdAndUpdate(
      userID,
      {
        $push: { courses: course._id },
      },
      { new: true }
    );

    await category.findByIdAndUpdate(
      categoryDetails._id,
      {
        $push: { course: course._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in creating course',
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const Courses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate('instructor')
      .exec();

    return res.status(200).json({
      success: true,
      message: 'Courses fetched successfully',
      data: Courses,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in fetching courses',
      error: error.message,
    });
  }
};
