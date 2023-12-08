const Course = require('../interfaces/CourseRepository')

class CourseBuilder {
    
  constructor() {
    this.courseName = null;
    this.courseTeacherId = null;
    this.coursePrice = null;
    this.courseDescription = null;
    this.courseAnswer = null;
    this.courseStatus = 1; // Default courseStatus to 1
    this.courseRating = null;
    this.courseTranscript = null;
    this.courseStartDate = null;
    this.courseEndDate = null;
    
  }

  withCourseName(courseName) {
    this.courseName = courseName;
    return this;
  }

  withCourseTeacherId(courseTeacherId) {
    this.courseTeacherId = courseTeacherId;
    return this;
  }

  withCoursePrice(coursePrice) {
    this.coursePrice = coursePrice;
    return this;
  }

  withCourseDescription(courseDescription) {
    this.courseDescription = courseDescription;
    return this;
  }

  withCourseAnswer(courseAnswer) {
    this.courseAnswer = courseAnswer;
    return this;
  }

  withCourseStatus(courseStatus) {
    this.courseStatus = courseStatus;
    return this;
  }

  withCourseTranscript(courseTranscript) {
    this.courseTranscript = courseTranscript;
    return this;
  }

  withCourseStartDate(courseStartDate) {
    this.courseStartDate = courseStartDate;
    return this;
  }

  withCourseEndDate(courseEndDate) {
    this.courseEndDate = courseEndDate;
    return this;
  }

  withCourseRating(courseRating) {
    this.courseRating = courseRating;
    return this;
  }

  build() {
    //builder function execute
    return new Course({
    
      courseName : this.courseName,
      courseTeacherId :this.courseTeacherId,
      coursePrice  : this.coursePrice,
      courseDescription  :  this.courseDescription,
      courseAnswer  : this.courseAnswer,
      courseStatus  : this.courseStatus,
      courseRating  : this.courseRating,
      courseTranscript  : this.courseTranscript,
      courseStartDate  : this.courseStartDate,
      courseEndDate  : this.courseEndDate
      
    }
    );
  }
}

module.exports = CourseBuilder;