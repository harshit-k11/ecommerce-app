const Course = require('../interfaces/CourseRepository')
const CourseBuilder = require('../builder/CourseBuilder')

class AnswersDecorator extends Course {
    constructor(baseCourse, isAnswerSelected) {
      super(baseCourse.courseName, baseCourse.courseTeacherId, baseCourse.coursePrice, baseCourse.courseDescription, baseCourse.courseAnswer, baseCourse.courseStatus, baseCourse.courseRating, baseCourse.courseTranscript, baseCourse.courseStartDate, baseCourse.courseEndDate);
      this.courseId= baseCourse.courseId
      this.courseStatus = baseCourse.courseStatus   

      this.isAnswerSelected = isAnswerSelected;
      console.log("hiii from TranscriptDecorator",typeof(baseCourse),baseCourse.course_id)
    }
  
    getPrice() {
      if (this.isAnswerSelected) {
        this.coursePrice = this.coursePrice + 20
        return  this.coursePrice; // Increase price by 25%
      } else {
        
        return  this.coursePrice; // Increase price by 25%
      }
    }
  }

  module.exports = AnswersDecorator;