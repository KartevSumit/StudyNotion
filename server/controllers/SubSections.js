const Section = require('../models/section.model');
const SubSection = require('../models/subsection.model');
const { fileUploader } = require('../utils/fileUploader');
require('dotenv').config();

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;

    const video = req.file.video;

    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: 'All fields required',
      });
    }

    const response = await fileUploader(video, process.env.FOLDER);

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

    return res.status(200).json({
      success: true,
      message: 'Subsection created successfully',
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in creating subsection',
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subsectionId, title, timeDuration, description } = req.body;
    const video = req.file.video;

    if (!subsectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required',
      });
    }

    if (video) {
      const response = await fileUploader(video, process.env.FOLDER);
      const updatedSubSection = await SubSection.findByIdAndUpdate(
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
      const updatedSubSection = await SubSection.findByIdAndUpdate(
        subsectionId,
        {
          title: title,
          timeDuration: timeDuration,
          description: description,
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Subsection updated successfully',
      data: updatedSubSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in updating subsection',
      error: error.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subsectionId } = req.body;

    if (!subsectionId) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required',
      });
    }

    const deletedSubSection = await SubSection.findByIdAndDelete(subsectionId);

    return res.status(200).json({
      success: true,
      message: 'Subsection deleted successfully',
      data: deletedSubSection,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in deleting subsection',
      error: error.message,
    });
  }
};
