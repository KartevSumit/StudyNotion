const express = require('express');
const router = express.Router();

const { auth, isStudent } = require('../middleware/auth');

const { capturePayment, verifySignature } = require('../controllers/payment');

router.post('/capturePayment', auth, isStudent, capturePayment);
router.post('/verifySignature', verifySignature);

module.exports = router;

