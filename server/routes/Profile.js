const express = require('express');
const router = express.Router();

const { auth, isAdmin, isStudent } = require('../middleware/auth');

const { getAllProfile, updateProfile } = require('../controllers/Profile');

router.get('/getAllProfile', auth, isAdmin, getAllProfile);
router.put('/updateProfile', auth, isStudent, updateProfile);

module.exports = router;
