const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const category = await Category.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in creating category',
      error: error.message,
    });
  }
};

exports.getAllCategorys = async (req, res) => {
  try {
    const categorys = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Categorys fetched successfully',
      data: categorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching categorys',
      error: error.message,
    });
  }
};

exports.getCategoryPage = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category id',
      });
    }

    const category = await Category.findById(categoryId)
      .populate('course')
      .exec();

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category not found',
      });
    }

    const differentCategorys = await Category.find(
      { _id: { $ne: categoryId } },
      { name: true, description: true }
    )
      .populate('course')
      .exec();

    const topSellingCourse = await Course.find(
      { category: categoryId },
      { courseName: true, thumbnail: true, price: true }
    )
      .sort({ studentsEnrolled: -1 })
      .limit(5)
      .exec();

    return res.status(200).json({
      success: true,
      message: 'Category fetched successfully',
      data: {
        category: category,
        differentCategorys: differentCategorys,
        topSellingCourse: topSellingCourse,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching categorys',
      error: error.message,
    });
  }
};

exports.getCategoryDetails = async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category id',
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category fetched successfully',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching categorys',
      error: error.message,
    });
  }
};
