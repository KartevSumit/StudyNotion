const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailSender');
const Profile = require('../models/profile.model');

exports.SendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    while (await OTP.findOne({ otp })) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const otpData = await OTP.findOneAndUpdate(
      { email },
      { otp },
      { upsert: true, new: true }
    );

    const response = await mailSender(
      email,
      'OTP Verification',
      `Your OTP is ${otp}`
    );

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: otpData,
      response: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in sending OTP',
      error: error.message,
    });
  }
};

exports.SignUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const otpData = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found',
      });
    }
    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    const HashedPasssword = await bcrypt.hash(password, 10);

    const profile = await Profile.create({
      gender: null,
      dateofBirth: null,
      about: null,
      phone: phoneNumber,
    });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: HashedPasssword,
      accountType,
      additionalInfo: profile._id,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    await newUser.populate('additionalInfo');
    const payload = {
      email: newUser.email,
      id: newUser._id,
      accountType: newUser.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    newUser.token = token;
    newUser.password = undefined;

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const user = await User.findOne({ email }).populate('additionalInfo');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    if (role !== user.accountType) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized role',
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie('token', token, options);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in logging in',
      error: error.message,
    });
  }
};

exports.ChangePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      const mail = await mailSender({
        email: user.email,
        subject: 'Password Changed',
        text: `Your password has been changed successfully`,
      });

      return res.status(200).json({
        success: true,
        message: 'Password changed successfully',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in changing password',
      error: error.message,
    });
  }
};

exports.Logout = async (req, res) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers('Authorisation').reaplace('Bearer ', '');
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token missing',
      });
    }

    res.clearCookie('token');
    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in logging out',
      error: error.message,
    });
  }
};
