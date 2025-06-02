const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer');

const {
  auth,
  isAdmin,
  isStudent,
  isInstructor,
} = require('../middleware/auth');

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require('../controllers/Course');
const {
  createSection,
  updateSection,
  deleteSection,
} = require('../controllers/Sections');
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require('../controllers/SubSections');
const {
  createCategory,
  getAllCategorys,
  getCategoryPage,
} = require('../controllers/Category');
const {
  createRatingAndReview,
  getAverageRating,
  getAllRating,
} = require('../controllers/RatingandReview');

// post routes
router.post(
  '/createCourse',
  auth,
  isInstructor,
  upload.single('thumbnail'),
  createCourse
);
router.post('/createSection', auth, isInstructor, createSection);
router.put('/updateSection', auth, isInstructor, updateSection);
router.delete('/deleteSection', auth, isInstructor, deleteSection);
router.post(
  '/createSubSection',
  auth,
  isInstructor,
  upload.single('video'),
  createSubSection
);
router.put(
  '/updateSubSection',
  auth,
  isInstructor,
  upload.single('video'),
  updateSubSection
);
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection);
router.post('/createCategory', auth, isAdmin, createCategory);
router.post('/createRatingAndReview', auth, isStudent, createRatingAndReview);

// get routes
router.get('/getAllCategories', getAllCategorys);
router.get('/getCategoryPage', getCategoryPage);
router.get('/getAllCourses', getAllCourses);
router.get('/getCourseDetails', getCourseDetails);
router.get('/getAverageRating', getAverageRating);
router.get('/getAllRating', getAllRating);

module.exports = router;
