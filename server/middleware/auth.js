require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers('Authorisation').reaplace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: false,
        message: 'Token missing',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in authentication',
      error: error.message,
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== 'Student') {
      return res.status(403).json({
        status: false,
        message: 'Access denied',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in authorization',
      error: error.message,
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== 'Instructor') {
      return res.status(403).json({
        status: false,
        message: 'Access denied',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in authorization',
      error: error.message,
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== 'Admin') {
      return res.status(403).json({
        status: false,
        message: 'Access denied',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in authorization',
      error: error.message,
    });
  }
};
