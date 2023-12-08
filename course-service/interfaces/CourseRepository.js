class Course {
     constructor(courseName, courseTeacherId, coursePrice, courseDescription, courseAnswer, courseStatus, courseRating, courseTranscript, courseStartDate, courseEndDate) {
       
        this.courseName = courseName;
        this.courseTeacherId = courseTeacherId;
        this.courseDescription = courseDescription;
        this.courseAnswer = courseAnswer;
        this.courseStatus = courseStatus;
        this.coursePrice = coursePrice;
        this.courseTranscript = courseTranscript;
        this.courseStartDate= courseStartDate;
        this.courseEndDate = courseEndDate;
        this.courseRating = courseRating;
        console.log(this.courseEndDate, " cvall from construtor");
   }
  
    getDetails() {
      return '';
    }
  
    getPrice() {
      return 0;
    }

    createCourse(){
        return 0;
    }

    readCourse(){
      return 0;
    }

    updateCourse(){
      return 0;
    }

    deleteCourse(){
      return 0;
    }

    buyCourse(){
      return 0;
    }
  }
  
  module.exports = Course;
