const Section = require('../models/section.model');
const SubSection = require('../models/subSection.model');
const Course = require('../models/course.model');
const { fileUploader2 } = require('../utils/fileUploader');
require('dotenv').config();

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description, courseId } = req.body;

    const video = req.file;

    console.log(sectionId, title, timeDuration, description, video);

    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: 'All fields required',
      });
    }

    const response = await fileUploader2(video, process.env.FOLDER);

    const subsection = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: response.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSections: subsection._id },
      },
      { new: true }
    );

    await updatedSection.populate('subSections');

    const updatedCourse = await Course.findById(courseId);
    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Subsection created successfully',
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in creating subsection',
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    console.log(req.body);
    const { subsectionId, title, timeDuration, description, courseId } =
      req.body;
    const video = req.file;

    if (!subsectionId || !title || !timeDuration || !description || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    let updatedSubSection;
    
    if (video) {
      const response = await fileUploader2(video, process.env.FOLDER);
      updatedSubSection = await SubSection.findByIdAndUpdate(
        subsectionId,
        {
          title: title,
          timeDuration: timeDuration,
          description: description,
          videoUrl: response.secure_url,
        },
        { new: true }
      );
    } else {
      updatedSubSection = await SubSection.findByIdAndUpdate(
        subsectionId,
        {
          title: title,
          timeDuration: timeDuration,
          description: description,
        },
        { new: true }
      );
    }
    
    
    const updatedCourse = await Course.findById(courseId);
    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });
    
    console.log("done");
    return res.status(200).json({
      success: true,
      message: 'Subsection updated successfully',
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in updating subsection',
      error: error.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subsectionId, sectionId, courseId } = req.body;

    if (!subsectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Remove subsection from section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSections: subsectionId },
      },
      { new: true }
    );

    const deletedSubSection = await SubSection.findByIdAndDelete(subsectionId);

    const updatedCourse = await Course.findById(courseId);
    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Subsection deleted successfully',
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in deleting subsection',
      error: error.message,
    });
  }
};
