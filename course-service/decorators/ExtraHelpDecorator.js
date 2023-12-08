const Course = require('../interfaces/CourseRepository')


class ExtraHelpDecorator extends Course {
    constructor(baseCourse, isExtraHelpSelected) {
      super(baseCourse.courseName, baseCourse.courseTeacherId, baseCourse.coursePrice, baseCourse.courseDescription, baseCourse.courseAnswer, baseCourse.courseStatus, baseCourse.courseRating, baseCourse.courseTranscript, baseCourse.courseStartDate, baseCourse.courseEndDate);
      this.courseId= baseCourse.courseId
      this.courseStatus = baseCourse.courseStatus      
      this.isExtraHelpSelected = isExtraHelpSelected;
    }
  
    getPrice() {
      if (this.isExtraHelpSelected) {
        //return super.getPrice() + 25; // Increase price by 25%
        //return 25
        this.coursePrice = this.coursePrice + 25
        return  this.coursePrice; // Increase price by 25%
      } else {
        
        return  this.coursePrice; // Increase price by 25%
      }
    }
  }

  module.exports = ExtraHelpDecorator;