const Course = require('../models/course.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const { fileUploader2 } = require('../utils/fileUploader');

exports.createCourse = async (req, res) => {
  try {
    const userID = req.user._id;
    const {
      courseName,
      courseDescription,
      whatyouwilllearn,
      price,
      category,
      tags,
      requirements,
    } = req.body;
    const thumbnail = req.file;

    console.log(
      courseDescription,
      whatyouwilllearn,
      price,
      category,
      tags,
      requirements,
      thumbnail
    );

    if (
      !courseName ||
      !courseDescription ||
      !whatyouwilllearn ||
      !price ||
      !category ||
      !tags ||
      !requirements ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: 'category not found',
      });
    }

    let processedTags, processedRequirements;

    try {
      processedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    } catch (error) {
      processedTags =
        typeof tags === 'string'
          ? tags
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
          : [];
    }

    try {
      processedRequirements = Array.isArray(requirements)
        ? requirements
        : JSON.parse(requirements);
    } catch (error) {
      processedRequirements =
        typeof requirements === 'string'
          ? requirements
              .split(',')
              .map((req) => req.trim())
              .filter((req) => req.length > 0)
          : [];
    }

    const thumbnailImage = await fileUploader2(thumbnail, process.env.FOLDER);

    const course = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      whatyouwilllearn: whatyouwilllearn,
      price: price,
      thumbnail: thumbnailImage.secure_url,
      instructor: req.user.id,
      category: categoryDetails._id,
      tags: processedTags,
      requirements: processedRequirements,
    });

    await course.populate('category');

    await User.findByIdAndUpdate(
      userID,
      {
        $push: { courses: course._id },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
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
      success: false,
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
      success: false,
      message: 'Error in fetching courses',
      error: error.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide course id',
      });
    }

    const course = await Course.findById(courseId)
      .populate({
        path: 'instructor',
        populate: {
          path: 'additionalDetails',
        },
      })
      .populate({
        path: 'category',
        populate: {
          path: 'subCategories',
        },
      })
      .populate('category')
      .populate('ratingAndReviews');

    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'Course not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Course fetched successfully',
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching course',
      error: error.message,
    });
  }
};

exports.editCourseDetails = async (req, res) => {
  try {
    const {
      courseId,
      courseName,
      courseDescription,
      whatyouwilllearn,
      price,
      category,
      requirements,
    } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide course id',
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'Course not found',
      });
    }

    if (courseName) course.courseName = courseName;
    if (courseDescription) course.courseDescription = courseDescription;
    if (whatyouwilllearn) course.whatyouwilllearn = whatyouwilllearn;
    if (price) course.price = price;
    if (category) course.category = category;
    if (requirements) course.requirements = requirements;

    await course.save();

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in updating course',
      error: error.message,
    });
  }
};

exports.publishCourse = async (req, res) => {
  try {
    console.log(req.body);
    const { courseId, status } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide course id',
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'Course not found',
      });
    }

    course.status = status;
    await course.save();

    return res.status(200).json({
      success: true,
      message: 'Course published successfully',
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in publishing course',
      error: error.message,
    });
  }
};
