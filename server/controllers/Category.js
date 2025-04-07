const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        status: false,
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
      status: false,
      message: 'Error in creating category',
      error: error.message,
    });
  }
};

exports.getAllCategorys = async (req, res) => {
  try {
    const categorys = await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: 'Categorys fetched successfully',
      data: categorys,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in fetching categorys',
      error: error.message,
    });
  }
};
