const express = require('express');
const DBconnect = require('./config/database');
require('dotenv').config();
const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
//const Payment = require('./routes/Payment');
const Profile = require('./routes/Profile');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require('./config/cloudinary');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/course', courseRoutes);
//app.use('/api/v1/payment', Payment);
app.use('/api/v1/profile', Profile);

DBconnect();
cloudinaryConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server Is Running');
});
