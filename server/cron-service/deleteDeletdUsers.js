const cron = require('node-cron');
const DeletedUser = require('../models/deletebUser.model');
const Profile = require('../models/profile.model');
const CourseProgress = require('../models/courseProgress.model');
const cloudinary = require('cloudinary').v2;

cron.schedule('0 0 * * *', async () => {
  const users = await DeletedUser.find();
  users.forEach(async (user) => {
    if (user.deletedAt < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      await Profile.findByIdAndDelete(user.additionalInfo);
      user.courseProgress.forEach(async (progress) => {
        await CourseProgress.findByIdAndDelete(progress);
      })
      await DeletedUser.findByIdAndDelete(user._id);
      console.log('Deleted user:', user.email);
    }
  });
});
