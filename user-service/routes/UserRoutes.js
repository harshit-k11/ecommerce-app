const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Define the user login and registration route
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;
