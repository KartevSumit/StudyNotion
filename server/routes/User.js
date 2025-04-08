const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');

const {
  SendOTP,
  SignUp,
  Login,
  ChangePassword,
  Logout,
} = require('../controllers/Auth');

const {
  resetPasswordToken,
  resetPassword,
} = require('../controllers/forgotPassword');

router.post('/sendOTP', SendOTP);
router.post('/signup', SignUp);
router.post('/login', Login);
router.post('/changePassword', auth, ChangePassword);
router.post('/logout', auth, Logout);   
router.post('/resetPasswordToken', resetPasswordToken);
router.post('/resetPassword', resetPassword);

module.exports = router;
