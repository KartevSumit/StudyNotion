const { instance } = require('../config/razorpay');
const Course = require('../models/course.model');
const User = require('../models/user.model');
const mailSender = require('../utils/mailSender');
const mongoose = require('mongoose');

exports.capturePayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide course id',
      });
    }

    try {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(400).json({
          success: false,
          message: 'Course not found',
        });
      }

      const uid = new mongoose.Types.ObjectId(req.user._id);

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: 'You are already enrolled in this course',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error in fetching course',
        error: error.message,
      });
    }
    const amount = course.price * 100;
    const currency = 'INR';

    const options = {
      amount: amount,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course._id,
        userId: userId,
      },
    };

    try {
      const response = await instance.orders.create(options);

      return res.status(200).json({
        success: true,
        message: 'Payment order created successfully',
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error in creating payment order',
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in capturing payment',
      error: error.message,
    });
  }
};

const verifySignature = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac('sha256', webhookSecret);

    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest('hex');

    if (signature !== digest) {
      return res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
    }

    const { courseId, userId } = req.body.payload.entity.notes;

    try {
      const course = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        { new: true }
      );

      if (!course) {
        return res.status(401).json({
          success: false,
          message: 'error in updating course',
          error: error.message,
        });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { courses: courseId },
        },
        { new: true }
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'error in updating user',
          error: error.message,
        });
      }

      const mail = await mailSender(
        user.email,
        'Congratulation on joining our community',
        `Congratulation, you have successfully bought Course: ${course.courseName} from StudyNotion`
      );

      return res.status(200).json({
        success: true,
        message: `Course:${course.id} successfully bought by user: ${user.id}`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'error in authorzation of payment',
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'error in verifying payment',
      error: error.message,
    });
  }
};
