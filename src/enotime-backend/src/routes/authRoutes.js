const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/login/local', authController.loginLocal);

router.post('/login/sso', authController.loginSSO);

router.post('/register', authController.registerLocal);

module.exports = router;