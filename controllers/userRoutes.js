const express = require('express');
const router = express.Router();
const userController = require('./userController');

// View route for login/signup page
router.get('/login', userController.showAuthPage);

// Auth API
router.post('/', userController.createUser);        // signup
router.post('/login', userController.loginUser);    // login

module.exports = router;
