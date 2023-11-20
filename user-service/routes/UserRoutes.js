 
// user-service/routes/UserRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Define the user registration route
router.post('/register', userController.registerUser);

module.exports = router;
