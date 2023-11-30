// user-service/routes/UserRoutes.js

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');

// Define the user registration route
router.post('/create', courseController.createcourse);
router.post('/buy', courseController.buycourse);

module.exports = router;
