const User = require('../models/user.model');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'User not found',
      });
    }

    const token = crypto.randomUUID();

    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      'Password reset link',
      `Password reset link: ${url}`
    );

    return res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in password reset',
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: 'Passwords do not match',
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'User not found',
      });
    }

    if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({
        status: false,
        message: 'Token expired',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.token = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      status: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in password reset',
      error: error.message,
    });
  }
};
