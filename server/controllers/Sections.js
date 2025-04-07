const Section = require('../models/section.model');
const Course = require('../models/course.model');

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        status: false,
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

    await updatedCourse.populate('section', 'subSections');

    return res.status(200).json({
      success: true,
      message: 'Section created successfully',
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in creating section',
      error: error.message,
    });
  }
};

exports.UpdateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        status: false,
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

    return res.status(200).json({
      success: true,
      message: 'Section updated successfully',
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in updating section',
      error: error.message,
    });
  }
};

exports.DeleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    if (!sectionId || !courseId) {
      return res.status(400).json({
        status: false,
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

    const deletedSection = await Section.findByIdAndDelete(sectionId);
    return res.status(200).json({
      success: true,
      message: 'Section deleted successfully',
      data: deletedSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in deleting section',
      error: error.message,
    });
  }
};
