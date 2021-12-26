// Imports
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const emailValidator = require('../middleware/email-validator');
const passwordValidator = require('../middleware/password-validator');
const rateLimite = require('../middleware/rate-limit');

router.post('/signup', emailValidator, passwordValidator, userCtrl.signup);
router.post('/login', rateLimite.limit , userCtrl.login);

// Export
module.exports = router;