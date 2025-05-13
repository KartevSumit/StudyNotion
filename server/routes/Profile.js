const express = require('express');
const router = express.Router();

const { auth, isAdmin, isStudent } = require('../middleware/auth');

const {
  getAllProfile,
  updateProfile,
  updateProfileImage,
} = require('../controllers/Profile');

router.get('/getAllProfile', auth, isAdmin, getAllProfile);
router.put('/updateProfile', auth, updateProfile);
router.put('/updateProfileImage', auth, updateProfileImage);

module.exports = router;
