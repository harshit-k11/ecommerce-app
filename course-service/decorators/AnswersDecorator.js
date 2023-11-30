const Course = require('../interfaces/CourseRepository')
const CourseBuilder = require('../builder/CourseBuilder')

class AnswersDecorator extends Course {
    constructor(baseCourse, isAnswerSelected) {
      super(baseCourse.course_name, baseCourse.course_teacherId, baseCourse.course_price, baseCourse.course_description, baseCourse.course_answers, baseCourse.courseStatus, baseCourse.course_rating, baseCourse.course_transcript, baseCourse.course_startDate, baseCourse.course_endDate);
      this.courseId= baseCourse.course_id
      this.courseStatus = baseCourse.course_status

      this.isAnswerSelected = isAnswerSelected;
      console.log("hiii from TranscriptDecorator",typeof(baseCourse),baseCourse.course_id)
    }
  
    getPrice() {
      if (this.isAnswerSelected) {
        //this.coursePrice = baseCourse.course_price * 1.25
        return  20 ; // Increase price by 25%
      } else {
       // this.coursePrice = baseCourse.course_price * 1.25
        //return super.getPrice();
        return 0
      }
    }
  }

  module.exports = AnswersDecorator;