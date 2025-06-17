const CourseProgress = require('../models/courseProgress.model');
const User = require('../models/user.model');

exports.addCompletedLecture = async function (req, res) {
  try {
    const { subsectionId, courseId } = req.body;
    const user = await User.findById(req.user.id).populate('courseProgress');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    console.log(user.courseProgress);
    console.log(courseId);

    const progressEntry = user.courseProgress.find(
      (c) => JSON.stringify(c.courseId) === JSON.stringify(courseId)
    );
    if (!progressEntry) {
      return res.status(404).json({
        success: false,
        message: 'Progress entry not found',
      });
    }

    if (!progressEntry.completedVideos.includes(subsectionId)) {
      const courseProgress = await CourseProgress.findById(progressEntry._id);

      courseProgress.completedVideos.push(subsectionId);
      await courseProgress.save();
    }
    await user.populate([
      {
        path: 'courseProgress',
        populate: { path: 'courseId', populate: { path: 'courseContent' } },
      },
      'additionalInfo',
    ]);
    return res.status(200).json({
      success: true,
      message: 'Lecture added to progress successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in adding lecture to progress',
      error: error.message,
    });
  }
};
