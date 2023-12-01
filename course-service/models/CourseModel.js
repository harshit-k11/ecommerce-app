const pool = require('../services/DatabaseConnection')
const Course = require('../interfaces/CourseRepository')
const CourseBuilder = require('../builder/CourseBuilder')

class BaseModel extends Course {
  constructor(courseId, courseName, courseTeacherId, coursePrice, courseDescription, courseAnswer, courseTranscript, courseStartDate, courseEndDate) {
    super(courseId, courseName, courseTeacherId, coursePrice, courseDescription, courseAnswer, courseTranscript, courseStartDate, courseEndDate);

  }

    getDetails() {
      return `Course: ${this.courseName}, Description: ${this.courseDescription}`;
    }
  
    getPrice() {
      return this.coursePrice;
    }
  
    // Create operation
    static createCourse(courseName, courseTeacherId, coursePrice, courseDescription, courseAnswer, courseTranscript, courseStartDate, courseEndDate) {
           
      // builder pattern
      const courseBuilder = new CourseBuilder();
      const course = courseBuilder.withCourseName(courseName)
      courseBuilder.withCourseTeacherId(courseTeacherId)
      courseBuilder.withCoursePrice(coursePrice)
      courseBuilder.withCourseDescription(courseDescription)
      courseBuilder.withCourseAnswer(courseAnswer)
      courseBuilder.withCourseTranscript(courseTranscript)
      courseBuilder.withCourseStartDate(courseStartDate)
      courseBuilder.withCourseEndDate(courseEndDate)
      courseBuilder.build();
    

    //console.log("courseee", course);
    pool.getConnection((err, connection) => {
    if(err) throw err
    console.log('connected as id ' + connection.threadId)
      const query = `INSERT INTO course (course_name,	course_description,	course_price,	course_teacherId,	course_transcript,	course_answers,	course_startDate,	course_endDate) VALUES ( ?, ?, ?, ?, ?, ?, ?,?)`;
      const values = [ course.courseName, course.courseDescription, course.coursePrice, course.courseTeacherId, course.courseTranscript , course.courseAnswer, course.courseStartDate, course.courseEndDate];
      //console.log("q", values)
      //console.log("q*********************Q")
      connection.query(query, values, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
  
        console.log(`Course created successfully`);
      });
    })
}

    static getCourse(courseId) {
      // Connect to the database and execute the SELECT statement
      pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
      const query = `SELECT * FROM courses WHERE course_id = ?`;
      const values = [courseId];
      connection.query(query, values, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
  
        if (result.length === 0) {
          console.log(`Course not found: ${courseId}`);
          return;
        }
  
        const course = new Course(
          result[0].course_id,
          result[0].course_name,
          result[0].course_user_id,
          result[0].course_description,
          result[0].course_answer,
          result[0].courseStatus,
          result[0].courseRating,
          result[0].coursePrice
        );
        console.log(course);
      });
    }
)}
  /*
    // Update operation
    static updateCourse(courseId, courseName, courseUserId, courseDescription, courseAnswer, courseStatus, courseRating) {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
      const query = `UPDATE courses SET course_name = ?, course_user_id = ?, course_description = ?, course_answer = ?, course_status = ?, course_rating = ?, course_price = ? WHERE course_id = ?`;
      const values = [courseName, courseUserId, courseDescription, courseAnswer, courseStatus, courseRating, courseId, coursePrice];
      connection.query(query, values, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
  
        console.log(`Course updated successfully: ${courseId}`);
      });
    })}
  
    // Delete operation
    static deleteCourse(courseId) {
    pool.getConnection((err, connection) => {
    if(err) throw err
    console.log('connected as id ' + connection.threadId)
      const query = `DELETE FROM courses WHERE course_id = ?`;
      const values = [courseId];
      connection.query(query, values, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
  
        console.log(`Course deleted successfully: ${courseId}`);
      });
    })}
    */

    static buyCourse(courseId) {
        pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
          const query = `DELETE FROM courses WHERE course_id = ?`;
          const values = [courseId];
        })
    }
    
  };

  module.exports = BaseModel;