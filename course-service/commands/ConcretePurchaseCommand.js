const PurchaseCommandModel = require('../models/CoursePurchaseModel')

class ConcretePurchaseCommand extends PurchaseCommandModel {
    constructor(course, student) {
      super();
      this.course = course;
      this.student = student;
    }
  
    execute() {
      // Execute the purchase operation
      this.course.buy(this.student);
    }
  }
  
  module.exports = ConcretePurchaseCommand;