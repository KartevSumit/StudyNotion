const Tag = require('../models/tags.model');

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        status: false,
        message: 'All fields are required',
      });
    }

    const tag = await Tag.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: 'Tag created successfully',
      data: tag,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in creating tag',
      error: error.message,
    });
  }
};

exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: 'Tags fetched successfully',
      data: tags,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error in fetching tags',
      error: error.message,
    });
  }
};
