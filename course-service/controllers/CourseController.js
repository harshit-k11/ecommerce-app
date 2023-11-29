// user-service/controllers/UserController.js

const Course = require('../models/CourseModel');


class CourseController {
  static createcourse(req, res) {
    const {courseName, courseTeacherId, coursePrice, courseDescription, courseAnswer, courseTranscript, courseStartDate, courseEndDate } = req.body;
console.log(req.body, "bpoydddddddddddd");
    Course.createCourse(courseName, courseTeacherId, coursePrice, courseDescription, courseAnswer, courseTranscript, courseStartDate, courseEndDate)
    res.status(200).json({ message: 'Course created successfully' });
  }

  static readcourse(req, res) {
    const { courseId} = req.body;
    console.log(req.body, "bpoydddddddddddd");
    Course.readCourse(courseId)
    res.status(200).json({ message: 'Course created successfully' });
  }
}

module.exports = CourseController;
