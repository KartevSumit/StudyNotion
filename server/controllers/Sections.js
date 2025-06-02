const Section = require('../models/section.model');
const Course = require('../models/course.model');

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    console.log(sectionName, courseId);
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const section = await Section.create({
      sectionName: sectionName,
    });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: section._id,
        },
      },
      { new: true }
    );

    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Section created successfully',
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in creating section',
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true }
    );

    const updatedCourse = await Course.findById(updatedSection.courseId);
    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Section updated successfully',
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in updating section',
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          courseContent: sectionId,
        },
      },
      { new: true }
    );

    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });

    const deletedSection = await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: 'Section deleted successfully',
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in deleting section',
      error: error.message,
    });
  }
};
