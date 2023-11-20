 
// user-service/controllers/UserController.js

const Admin = require('../models/AdminModel');
const Teacher = require('../models/TeacherModel');
const Student = require('../models/StudentModel');

class UserController {
  static registerUser(req, res) {
    const { username, password, userType, specificProperty } = req.body;
    console.log(req.body);
    let user;

    switch (userType) {
      case 'admin':
        user = new Admin(username, password, specificProperty);
        break;
      case 'teacher':
        user = new Teacher(username, password, specificProperty);
        break;
      case 'student':
        user = new Student(username, password, specificProperty);
        break;
      default:
        return res.status(400).json({ error: 'Invalid user type' });
    }

    user.register();

    // You might want to store user information in a database at this point

    res.status(200).json({ message: 'User registered successfully' });
  }
}

module.exports = UserController;
