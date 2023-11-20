const User = require('./UserModel');

class Student extends User {
  constructor(username, password, studentSpecificProperty) {
    super(username, password);
    this.studentSpecificProperty = studentSpecificProperty;
  }

  // Additional methods specific to Student
}

module.exports = Student;
