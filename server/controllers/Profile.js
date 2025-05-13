const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const cloudinary = require('cloudinary').v2;

// Other controller methods remain the same...

exports.updateProfileImage = async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const imageFile = req.file;
    
    if (!imageFile && req.body.deleteCurrentImage === 'true') {
      const defaultAvatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName} ${user.lastName}`;
      
      if (user.image && !user.image.includes('api.dicebear.com')) {
        try {
          const publicId = user.image.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`profile_images/${publicId}`);
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
        }
      }
      
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
    }
    
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    if (user.image && !user.image.includes('api.dicebear.com')) {
      try {
        const publicId = user.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`profile_images/${publicId}`);
      } catch (deleteError) {
        console.error('Error deleting old image:', deleteError);
      }
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'profile_images',
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
      width: 500,
      height: 500,
      crop: 'fill',
      gravity: 'face'
    });

    // Update user with new image URL
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { image: result.secure_url },
      { new: true }
    ).populate('additionalInfo');

    return res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Profile image update error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating profile image',
      error: error.message,
    });
  }
};