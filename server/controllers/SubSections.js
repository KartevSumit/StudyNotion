const Section = require('../models/section.model');
const SubSection = require('../models/subSection.model');
const Course = require('../models/course.model');
const { fileUploader2 } = require('../utils/fileUploader');
require('dotenv').config();

const parseTimeToSeconds = (timeString) => {
  if (!timeString || typeof timeString !== 'string') return 0;

  const parts = timeString.split(':').map((part) => parseInt(part, 10) || 0);
  if (parts.length !== 3) return 0;

  const [hours, minutes, seconds] = parts;
  return hours * 3600 + minutes * 60 + seconds;
};

const formatSecondsToTime = (totalSeconds) => {
  if (totalSeconds < 0) totalSeconds = 0;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const addTimeDuration = (currentTime, addTime) => {
  const currentSeconds = parseTimeToSeconds(currentTime);
  const addSeconds = parseTimeToSeconds(addTime);
  return formatSecondsToTime(currentSeconds + addSeconds);
};

const subtractTimeDuration = (currentTime, subtractTime) => {
  const currentSeconds = parseTimeToSeconds(currentTime);
  const subtractSeconds = parseTimeToSeconds(subtractTime);
  return formatSecondsToTime(currentSeconds - subtractSeconds);
};

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

    if (!/^\d{1,2}:\d{2}:\d{2}$/.test(timeDuration)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time duration format. Use HH:MM:SS',
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

    updatedSection.timeDuration = addTimeDuration(
      updatedSection.timeDuration || '00:00:00',
      timeDuration
    );
    await updatedSection.save();
    await updatedSection.populate('subSections');

    const updatedCourse = await Course.findById(courseId);
    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });

    updatedCourse.timeDuration = addTimeDuration(
      updatedCourse.timeDuration || '00:00:00',
      timeDuration
    );
    await updatedCourse.save();

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
    const {
      subsectionId,
      title,
      timeDuration,
      description,
      sectionId,
      courseId,
    } = req.body;
    const video = req.file;

    if (!subsectionId || !title || !timeDuration || !description || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (!/^\d{1,2}:\d{2}:\d{2}$/.test(timeDuration)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time duration format. Use HH:MM:SS',
      });
    }

    const oldSubSection = await SubSection.findById(subsectionId);
    if (!oldSubSection) {
      return res.status(404).json({
        success: false,
        message: 'Subsection not found',
      });
    }

    const oldTimeDuration = oldSubSection.timeDuration;
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

    const updatedSection = await Section.findById(sectionId);
    updatedSection.timeDuration = subtractTimeDuration(
      updatedSection.timeDuration || '00:00:00',
      oldTimeDuration
    );
    updatedSection.timeDuration = addTimeDuration(
      updatedSection.timeDuration,
      timeDuration
    );
    await updatedSection.save();

    const updatedCourse = await Course.findById(courseId);
    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });

    updatedCourse.timeDuration = subtractTimeDuration(
      updatedCourse.timeDuration || '00:00:00',
      oldTimeDuration
    );
    updatedCourse.timeDuration = addTimeDuration(
      updatedCourse.timeDuration,
      timeDuration
    );
    await updatedCourse.save();

    console.log('done');
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

    const subsectionToDelete = await SubSection.findById(subsectionId);
    if (!subsectionToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Subsection not found',
      });
    }

    const timeDurationToSubtract = subsectionToDelete.timeDuration;

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSections: subsectionId },
      },
      { new: true }
    );

    updatedSection.timeDuration = subtractTimeDuration(
      updatedSection.timeDuration || '00:00:00',
      timeDurationToSubtract
    );
    await updatedSection.save();

    const deletedSubSection = await SubSection.findByIdAndDelete(subsectionId);

    const updatedCourse = await Course.findById(courseId);
    await updatedCourse.populate({
      path: 'courseContent',
      populate: {
        path: 'subSections',
      },
    });

    updatedCourse.timeDuration = subtractTimeDuration(
      updatedCourse.timeDuration || '00:00:00',
      timeDurationToSubtract
    );
    await updatedCourse.save();

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
  