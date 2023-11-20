const User = require('./UserModel');

class Admin extends User {
  constructor(username, password, adminSpecificProperty) {
    super(username, password);
    this.adminSpecificProperty = adminSpecificProperty;
  }

  // Additional methods specific to Admin
}

module.exports = Admin;
