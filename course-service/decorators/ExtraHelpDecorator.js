const Course = require('../interfaces/CourseRepository')


class ExtraHelpDecorator extends Course {
    constructor(baseCourse, isExtraHelpSelected) {
      super(baseCourse.course_name, baseCourse.course_teacherId, baseCourse.course_price, baseCourse.course_description, baseCourse.course_answers, baseCourse.courseStatus, baseCourse.course_rating, baseCourse.course_transcript, baseCourse.course_startDate, baseCourse.course_endDate);
      this.courseId= baseCourse.course_id
      this.courseStatus = baseCourse.course_status      
      this.isExtraHelpSelected = isExtraHelpSelected;
    }
  
    getPrice() {
      if (this.isExtraHelpSelected) {
        //return super.getPrice() + 25; // Increase price by 25%
        return 25
      } else {
        //return super.getPrice();
        return 0
      }
    }
  }

  module.exports = ExtraHelpDecorator;