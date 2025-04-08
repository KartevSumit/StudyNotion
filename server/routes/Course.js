const express = require('express');
const router = express.Router();

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
router.post('/createCourse', auth, isInstructor, createCourse);
router.post('/createSection', auth, isInstructor, createSection);
router.post('/updateSection', auth, isInstructor, updateSection);
router.post('/deleteSection', auth, isInstructor, deleteSection);
router.post('/createSubSection', auth, isInstructor, createSubSection);
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
router.post('/deleteSubSection', auth, isInstructor, deleteSubSection);
router.post('/createCategory', auth, isAdmin, createCategory);
router.post('/createRatingAndReview', auth, isStudent, createRatingAndReview);

// get routes
router.get('/getAllCategorys', getAllCategorys);
router.get('/getCategoryPage', getCategoryPage);
router.get('/getAllCourses', getAllCourses);
router.get('/getCourseDetails', getCourseDetails);
router.get('/getAverageRating', getAverageRating);
router.get('/getAllRating', getAllRating);

module.exports = router;
