const User = require('../models/user.model');
const Profile = require('../models/profile.model');

exports.updateProfile = async (req, res) => {
  try {
    const { gender, dateofBirth, about, phone } = req.body;

    if (!gender || !dateofBirth || !about || !phone) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required',
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'User not found',
      });
    }

    const profile = user.additionalDetails;

    const updatedProfile = await Profile.findByIdAndUpdate(
      profile,
      {
        gender: gender,
        dateofBirth: dateofBirth,
        about: about,
        phone: phone,
      },
      { new: true }
    );

    await user.populate('additionalDetails');

    return res.status(200).json({
      status: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in updating profile',
      error: error.message,
    });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'User not found',
      });
    }

    await user.populate('additionalDetails');

    return res.status(200).json({
      status: true,
      message: 'Profile fetched successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in fetching profile',
      error: error.message,
    });
  }
};
