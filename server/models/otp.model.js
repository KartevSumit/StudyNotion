const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m',
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      'OTP Verification',
      `Your OTP is ${otp}`
    );
  } catch (error) {
    consol.log('error occured while sending email', error);
  }
}

otpSchema.pre('save', async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

const Otp = mongoose.model('OTP', otpSchema);
module.exports = Otp;
