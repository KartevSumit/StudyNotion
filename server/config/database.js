const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
  mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
