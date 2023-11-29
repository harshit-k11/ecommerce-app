const pool = require('../services/DatabaseConnection')



const Course = class {
    constructor(courseId, courseName, courseUserId, coursePrice, courseDescription, courseAnswer, courseStatus, courseRating) {
      this.courseId = courseId;
      this.courseName = courseName;
      this.courseUserId = courseUserId;
      this.courseDescription = courseDescription;
      this.courseAnswer = courseAnswer;
      this.courseStatus = courseStatus;
      this.coursePrice = coursePrice;
      this.courseRating = courseRating;
    }
  
    // Create operation
    static create(courseId, courseName, courseUserId, courseDescription, courseAnswer, courseStatus,coursePrice, courseRating) {
      const course = new Course(courseId, courseName, courseUserId, courseDescription, courseAnswer, courseStatus, coursePrice, courseRating);
  
    pool.getConnection((err, connection) => {
    if(err) throw err
    console.log('connected as id ' + connection.threadId)
      const query = `INSERT INTO courses (course_id, course_name, course_user_id, course_description, course_answer, course_status, course_rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [course.courseId, course.courseName, course.courseUserId, course.courseDescription, course.courseAnswer, course.courseStatus,course.coursePrice, course.courseRating];
      connection.query(query, values, (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
  
        console.log(`Course created successfully: ${course.courseId}`);
      });
    })
}
  
    // Read operation
    static read(courseId) {
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
  
    // Update operation
    static update(courseId, courseName, courseUserId, courseDescription, courseAnswer, courseStatus, courseRating) {
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
    static delete(courseId) {
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

    static buy(courseId) {
        pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
          const query = `DELETE FROM courses WHERE course_id = ?`;
          const values = [courseId];
        })
    }
  };

  module.exports = Course;