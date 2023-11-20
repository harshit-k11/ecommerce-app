const User = require('./UserModel');

class Teacher extends User {
  constructor(username, password, teacherSpecificProperty) {
    super(username, password);
    this.teacherSpecificProperty = teacherSpecificProperty;
  }

  // Additional methods specific to Teacher
}

module.exports = Teacher;