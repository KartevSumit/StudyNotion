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
  publishCourse,
  getInstructorCourses,
  deleteCourse,
  editCourseDetails,
  categoryPageDetails,
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
  getCategoryDetails,
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
router.post(
  '/createSubSection',
  auth,
  isInstructor,
  upload.single('video'),
  createSubSection
);
router.post('/createCategory', auth, isAdmin, createCategory);
router.post('/createRatingAndReview', auth, isStudent, createRatingAndReview);

// get routes
router.get('/getAllCategories', getAllCategorys);
router.get('/getCategoryPage', getCategoryPage);
router.get('/getCategoryDetails', getCategoryDetails);
router.get('/getAllCourses', getAllCourses);
router.get('/categoryPageDetails', categoryPageDetails);
router.get('/getCourseDetails', getCourseDetails);
router.get('/getAverageRating', getAverageRating);
router.get('/getAllRating', getAllRating);
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses);

// delete routes
router.delete('/deleteCourse', auth, isInstructor, deleteCourse);
router.delete('/deleteSection', auth, isInstructor, deleteSection);
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection);

// put routes
router.put(
  '/editCourseDetails',
  auth,
  isInstructor,
  upload.single('thumbnail'),
  editCourseDetails
);
router.put('/publishCourse', auth, isInstructor, publishCourse);
router.put('/updateSection', auth, isInstructor, updateSection);
router.put(
  '/updateSubSection',
  auth,
  isInstructor,
  upload.single('video'),
  updateSubSection
);

module.exports = router;
