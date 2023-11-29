 
// user-service/controllers/UserController.js

const Admin = require('../models/AdminModel');
const Teacher = require('../models/TeacherModel');
const Student = require('../models/StudentModel');

class UserController {
  static registerUser(req, res) {
    const { username, password, role, specificProperty } = req.body;
    console.log(req.body);
    let user;

    switch (role) {
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

    user.register(req, res);
  }
// dropping the singleton pattern for login since we want diffrent instances 
// of different user types to passed in various functionalities
  static loginUser(req, res) {
    const { username, password, role } = req.body;
    let user;

    switch (role) {
      case 'admin':
        user = new Admin(username, password);
        break;
      case 'teacher':
        user = new Teacher(username, password);
        break;
      case 'student':
        user = new Student(username, password);
        break;
      default:
        return res.status(400).json({ error: 'Invalid user type' });
    }

    user.login({ req, res });
  }
}

module.exports = UserController;
