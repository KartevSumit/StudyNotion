const User = require('../models/user.model');
const Course = require('../models/course.model');
const Profile = require('../models/profile.model');
const { fileUploader } = require('../utils/fileUploader');
const cloudinary = require('cloudinary').v2;
const TempFile = require('../models/tempFile.model');
require('dotenv').config();
const bcrypt = require('bcrypt');
const CourseProgress = require('../models/courseProgress.model');
const DeletedUser = require('../models/deletebUser.model');

exports.updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const { imageURL } = req.body;
    await TempFile.findOneAndDelete(imageURL);
    user.image = imageURL;
    await (await user.save()).populate('additionalInfo');
    return res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Profile image update error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error in updating image',
      error: error.message,
    });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const imageFile = req.file;

    if (!imageFile) {
    }

    const result = await fileUploader(imageFile, 'profile_images');

    const response = await TempFile.create({
      imageURL: result.secure_url,
      publicId: result.public_id,
    });

    return res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      data: response,
    });
  } catch (error) {
    console.error('Profile image update error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error in uploading image',
      error: error.message,
    });
  }
};

exports.deleteCurrentImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.image.includes('api.dicebear.com')) {
      return res.status(400).json({
        success: false,
        message: 'Default image cannot be deleted',
      });
    }

    try {
      const publicId = user.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`profile_images/${publicId}`);
    } catch (deleteError) {
      console.error('Error deleting old image:', deleteError);
    }

    const defaultAvatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { image: defaultAvatarUrl },
      { new: true }
    ).populate('additionalInfo');

    return res.status(200).json({
      success: true,
      message: 'Profile image successfully reset to default',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error deleting current image:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting current image',
      error: error.message,
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    return res.status(200).json({
      success: true,
      message: 'Profiles fetched successfully',
      data: profiles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching profiles',
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      dateofBirth,
      gender,
      profession,
      about,
    } = req.body;

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    const user = await User.findById(req.user.id);
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;
      await user.save();
      const profile = await Profile.findById(user.additionalInfo);
      if (dateofBirth) {
        profile.dateofBirth = dateofBirth;
      }
      if (gender) {
        profile.gender = gender;
      }
      if (profession) {
        profile.profession = profession;
      }
      if (about) {
        profile.about = about;
      }
      await profile.save();
      await user.populate('additionalInfo');
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in updating profile',
      error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      await user.populate('additionalInfo');
      return res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Incorrect old password',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in updating password',
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userObj = await User.findById(req.user.id).lean();
    if (!userObj) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    delete userObj._id;

    await DeletedUser.create(userObj);

    await User.findByIdAndDelete(req.user.id);

    return res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in deleting user',
      error: error.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.cart.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Course already added to cart',
      });
    }

    user.cart.push(courseId);
    await user.save();
    await user.populate('cart');
    return res.status(200).json({
      success: true,
      message: 'Course added to cart successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in adding course to cart',
      error: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart');
    return res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      data: user.cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching cart',
      error: error.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const exists = user.cart.some((id) => id.toString() === courseId);
    if (!exists) {
      return res.status(400).json({
        success: false,
        message: 'Course not found in cart',
      });
    }

    user.cart = user.cart.filter((id) => id.toString() !== courseId);

    await user.save();
    await user.populate('cart');

    return res.status(200).json({
      success: true,
      message: 'Course removed from cart successfully',
      data: user.cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error in removing course from cart',
      error: error.message,
    });
  }
};

exports.buyCourse = async (req, res) => {
  try {
    let { courseId } = req.body;
    if (!Array.isArray(courseId)) {
      courseId = [courseId];
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const courseIdStrs = courseId.map((id) =>
      typeof id === 'string' ? id : id._id.toString()
    );

    user.cart = user.cart.filter(
      (cid) => !courseIdStrs.includes(cid.toString())
    );

    const existingCourseStrs = user.courses.map((cid) => cid.toString());
    const toAdd = courseIdStrs.filter((id) => !existingCourseStrs.includes(id));

    if (toAdd.length > 0) {
      user.courses.push(...toAdd);

      const courseProgressPromises = toAdd.map(async (courseId) => {
        const course = await Course.findById(courseId);
        if (!course) {
          throw new Error(`Course with ID ${courseId} not found`);
        }

        return new CourseProgress({
          courseId: courseId,
          completedVideos: [],
        });
      });

      const newCourseProgress = await Promise.all(courseProgressPromises);

      const savedCourseProgress = await CourseProgress.insertMany(
        newCourseProgress
      );
      const courseProgressIds = savedCourseProgress.map((cp) => cp._id);
      user.courseProgress.push(...courseProgressIds);
    }

    await user.save();

    await Course.updateMany(
      { _id: { $in: toAdd } },
      { $addToSet: { studentsEnrolled: user._id } }
    );

    await user.populate([
      'cart',
      { path: 'courseProgress', populate: { path: 'courseId' } },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Course(s) bought successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error in buyCourse:', error);
    return res.status(500).json({
      success: false,
      message: 'Error in buying course',
      error: error.message,
    });
  }
};

exports.getInstructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });
    const courseData = courseDetails.map((course) => {
      const totalStudents = course.studentsEnrolled.length;
      const totalRevenue = course.price * totalStudents;
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        thumbnail: course.thumbnail,
        courseDescription: course.courseDescription,
        price: course.price,
        totalStudents,
        totalRevenue,
      };
      return courseDataWithStats;
    });

    return res.status(200).json({
      success: true,
      message: 'Instructor dashboard fetched successfully',
      data: courseData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching instructor dashboard',
      error: error.message,
    });
  }
};
