const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer');
const { auth, isAdmin, isStudent } = require('../middleware/auth');

const {
  getAllProfiles,
  updateProfile,
  updateProfileImage,
  uploadProfileImage,
  deleteCurrentImage,
  updatePassword,
  deleteUser,
  getCart,
  addToCart,
  removeFromCart,
  buyCourse,
} = require('../controllers/Profile');

router.get('/getAllProfile', auth, isAdmin, getAllProfiles);
router.put('/updateProfile', auth, updateProfile);
router.put(
  '/uploadProfileImage',
  auth,
  upload.single('image'),
  uploadProfileImage
);
router.put('/updateProfileImage', auth, updateProfileImage);
router.put('/deleteCurrentImage', auth, deleteCurrentImage);
router.put('/updatePassword', auth, updatePassword);
router.delete('/deleteUser', auth, deleteUser);

router.get('/getCart', auth, isStudent, getCart);
router.put('/addToCart', auth, isStudent, addToCart);
router.put('/removeFromCart', auth, isStudent, removeFromCart);
router.put('/buyCourse', auth, isStudent, buyCourse);

module.exports = router;
