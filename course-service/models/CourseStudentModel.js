const pool = require('../services/DatabaseConnection')
const ExtraHelpDecorator = require('../decorators/ExtraHelpDecorator')
const TranscriptDecorator = require('../decorators/TranscriptDecorator')
const AnswersDecorator = require('../decorators/AnswersDecorator')

const FactoryDiscount = require('../factories/FactoryDiscount')


class CourseStudentModel {
  constructor(courseStudentIsExtraHelp,courseStudentIsTranscript,courseStudentIsAnswers,courseStudentStudentID,coursestudent_courseID) {
    this.courseStudentId = courseStudentId;
    this.courseStudentIsExtraHelp = courseStudentIsExtraHelp;
    this.courseStudentIsTranscript = courseStudentIsTranscript;
    this.courseStudentIsAnswers = courseStudentIsAnswers;
    this.courseStudentStudentID = courseStudentStudentID;
    this.coursestudent_courseID = coursestudent_courseID;

  }

  static buyCourse(courseStudentIsExtraHelp,courseStudentIsTranscript,courseStudentIsAnswers,courseStudentStudentID,coursestudent_courseID) {
    pool.getConnection((err, connection) => {
    if(err) throw err
    console.log('connected as id ' + connection.threadId)
    
    const query = `SELECT * FROM course WHERE course_id = ?`;
    const values = [coursestudent_courseID];
    connection.query(query, values, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("+++++++ result ++++++",result)

      // Structural Design Patterns --->decorator Pattern
      const TranscriptDecoratoredCourse = new TranscriptDecorator(result[0], courseStudentIsTranscript);
      //console.log("+++++++ TranscriptDecoratoredCourse ++++++",TranscriptDecoratoredCourse)
      const transcriptAddedPrice = TranscriptDecoratoredCourse.getPrice();
      console.log("+++++++ TranscriptDecoratoredCourse finalPrice ++++++",transcriptAddedPrice)

      const extraHelpDecoratoredCourse = new ExtraHelpDecorator(TranscriptDecoratoredCourse, courseStudentIsExtraHelp);
      console.log("+++++++ extraHelpDecoratoredCourse ++++++",extraHelpDecoratoredCourse)
      const extraHelpAddedPrice = extraHelpDecoratoredCourse.getPrice();
      //console.log("+++++++ extraHelpDecoratoredCourse extraHelpAddedPrice ++++++",extraHelpAddedPrice)

      const AnswersDecoratoredCourse = new AnswersDecorator(extraHelpDecoratoredCourse, courseStudentIsAnswers);
      console.log("+++++++ AnswersDecoratoredCourse ++++++",AnswersDecoratoredCourse)
      const asnwersAddedPrice = AnswersDecoratoredCourse.getPrice();
      console.log("+++++++ AnswersDecoratoredCourse finalPrice --------------------++++++",asnwersAddedPrice)


      
      // creational design pattern ---> Factory Method 
      const factoryDiscount = new FactoryDiscount()
      const discountType = "Festival"
      const factoryDiscountPercentage = factoryDiscount.createDiscount(discountType)
      console.log("+++++++ factoryDiscountPercentage  ++++++",factoryDiscountPercentage)
      
    // subcription discount


    const query = `SELECT * FROM user_details WHERE id = ?`;
    const values = [courseStudentStudentID];

    connection.query(query, values, (error, user_result) => {
      if (error) {
        console.error(error);
        return;
      }
      
      console.log("+++++++ user_result  ++++++",user_result[0].specificProperty, courseStudentStudentID)
      
      // subcription discount
      var  subcriptionDiscountPercentage = 0
      if(user_result[0].specificProperty == "gold")
      {
        subcriptionDiscountPercentage = 20
      }
      else if(user_result[0].specificProperty == "silver"){
        subcriptionDiscountPercentage = 10
      }
      else{
        subcriptionDiscountPercentage = 0
      }
      
      
      
      const price = asnwersAddedPrice - (subcriptionDiscountPercentage + factoryDiscountPercentage.discountPercentage) * asnwersAddedPrice / 100

      console.log("price ----------->",price,asnwersAddedPrice, subcriptionDiscountPercentage, factoryDiscountPercentage.discountPercentage )




      // create 

    const query = `INSERT INTO coursestudents(coursestudent_studentID, coursestudent_isAnswers, coursestudent_isTrasnscript, coursestudent_isExtraSupprot, coursestudent_courseID) VALUES (?,?,?,?,?)`;
    const values = [courseStudentStudentID,courseStudentIsAnswers,courseStudentIsTranscript,courseStudentIsExtraHelp,coursestudent_courseID];

    connection.query(query, values, (error, course_result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log("course_result  ---> ",course_result)
    })


      
    }
    )



    // create request
    
    


    })})
}
}
module.exports = CourseStudentModel;