const express = require('express');
const DBconnect = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

DBconnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
