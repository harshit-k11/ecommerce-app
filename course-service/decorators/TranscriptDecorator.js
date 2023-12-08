const Course = require('../interfaces/CourseRepository')
const CourseBuilder = require('../builder/CourseBuilder')

class TranscriptDecorator extends Course {
    constructor(baseCourse, isTranscriptelected) {
      super(baseCourse.course_name, baseCourse.course_teacherId, baseCourse.course_price, baseCourse.course_description, baseCourse.course_answers, baseCourse.courseStatus, baseCourse.course_rating, baseCourse.course_transcript, baseCourse.course_startDate, baseCourse.course_endDate);
      this.courseId= baseCourse.course_id
      this.courseStatus = baseCourse.course_status

      this.isTranscriptelected = isTranscriptelected;
    }
  
    getPrice() {
      if (this.isTranscriptelected) {
        this.coursePrice = this.coursePrice + 10
        return  this.coursePrice; 
      } else {
        
        return  this.coursePrice; 
      }
    }
  }

  module.exports = TranscriptDecorator;