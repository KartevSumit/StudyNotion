const Course = require('../models/course.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const { fileUploader2 } = require('../utils/fileUploader');
const SubSection = require('../models/subSection.model');
const Section = require('../models/section.model');

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
    const { courseId } = req.query;

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
          path: 'additionalInfo',
        },
      })
      .populate({
        path: 'category',
        populate: {
          path: 'subCategories',
        },
      })
      .populate('category')
      .populate('ratingAndReviews')
      .populate({ path: 'courseContent', populate: { path: 'subSections' } })
      .exec();

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

    const thumbnail = req.file;
    if (thumbnail) {
      const thumbnailImage = await fileUploader2(thumbnail, process.env.FOLDER);
      req.body.thumbnail = thumbnailImage.secure_url;
    }

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
    if (req.body.thumbnail) course.thumbnail = req.body.thumbnail;

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

exports.getInstructorCourses = async (req, res) => {
  try {
    const userID = req.user.id;
    const courses = await Course.find({ instructor: userID }).populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });
    return res.status(200).json({
      success: true,
      message: 'Instructor courses fetched successfully',
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching instructor courses',
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide course id',
      });
    }

    const course = await Course.findById(courseId).populate('courseContent');

    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'Course not found',
      });
    }

    course.courseContent.forEach(async (section) => {
      section.subSections.forEach(async (subSection) => {
        await SubSection.findByIdAndDelete(subSection._id);
      });
      await Section.findByIdAndDelete(section._id);
    });

    course.ratingAndReviews.forEach(async (review) => {
      await Review.findByIdAndDelete(review._id);
    });

    course.studentsEnrolled.forEach(async (student) => {
      const user = await User.findById(student._id);
      user.enrolledCourses.pull(courseId);
      await user.save();
    });

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in deleting course',
      error: error.message,
    });
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category id',
      });
    }

    const category = await Category.findById(categoryId)
      .populate({
        path: 'course',
        match: { status: 'Published' },
        populate: 'ratingAndReviews',
      })
      .exec();

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category not found',
      });
    }

    // if (category.course.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'No course found in this category',
    //   });
    // }

    const categoriesExceptThis = await Category.find({
      _id: { $ne: categoryId },
    });

    const differentCategorys = await Category.findOne(
      categoriesExceptThis[getRandomInt(categoriesExceptThis.length)]
    )
      .populate({
        path: 'course',
        match: { status: 'Published' },
        populate: 'ratingAndReviews',
      })
      .exec();

    const allCategories = await Category.find()
      .populate({
        path: 'course',
        match: { status: 'Published' },
        populate: 'ratingAndReviews',
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.course);

    const topSellingCourse = allCourses
      .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      message: 'Category page details fetched successfully',
      data: { category, differentCategorys, topSellingCourse },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching category page details',
      error: error.message,
    });
  }
};
