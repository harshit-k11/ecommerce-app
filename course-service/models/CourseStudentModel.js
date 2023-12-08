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
      console.log("+++++++ TranscriptDecoratoredCourse ++++++",TranscriptDecoratoredCourse)
      //const transcriptAddedPrice = TranscriptDecoratoredCourse.getPrice();
      console.log("+++++++ TranscriptDecoratoredCourse finalPrice ++++++",TranscriptDecoratoredCourse)

      const extraHelpDecoratoredCourse = new ExtraHelpDecorator(TranscriptDecoratoredCourse, courseStudentIsExtraHelp);
      console.log("+++++++ extraHelpDecoratoredCourse ++++++",extraHelpDecoratoredCourse)
      //const extraHelpAddedPrice = extraHelpDecoratoredCourse.getPrice();
      //console.log("+++++++ extraHelpDecoratoredCourse extraHelpAddedPrice ++++++",extraHelpAddedPrice)

      const AnswersDecoratoredCourse = new AnswersDecorator(extraHelpDecoratoredCourse, courseStudentIsAnswers);
      console.log("+++++++ AnswersDecoratoredCourse ++++++",extraHelpDecoratoredCourse)
      const asnwersAddedPrice = AnswersDecoratoredCourse.getPrice();
      console.log("+++++++ AnswersDecoratoredCourse finalPrice ++++++",asnwersAddedPrice)
      
      // creational design pattern ---> Factory Method 
      /*
      const festivalDiscountFactory = new FestivalSaleDiscountFactory();
      const festivalDiscount = festivalDiscountFactory.applyDiscount()
      console.log("+++++++  festivalDiscount ++++++",festivalDiscount)

      const normalDiscountFactory = new NormalDiscountFactory();
      const normalDiscount = normalDiscountFactory.applyDiscount()
      console.log("+++++++  normalDiscount ++++++",normalDiscount)

      if(normalDiscount > festivalDiscount){
      const finalDiscountByFactory = normalDiscount
      }
      else
      {
        const finalDiscountByFactory = festivalDiscount
      }
      */
      
    // subcription discount
    // behavioral design pattern ---> State Pattern 

      const factoryDiscount = new FactoryDiscount()
      const discountType = "Festival"
      const factoryDiscountPercentage = factoryDiscount.createDiscount(discountType)
      console.log("+++++++ factoryDiscountPercentage  ++++++",factoryDiscountPercentage)

    // create request
    /*
    pool.getConnection(async (err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
          const query = `INSERT INTO coursestudents (coursestudent_studentID, coursestudent_isAnswers, coursestudent_isTrasnscript, coursestudent_isExtraSupprot, coursestudent_courseID) VALUES (?, ?, ?, ?, ?)`;
        //   const values = [ course.courseName, course.courseDescription, course.coursePrice, course.courseTeacherId, course.courseTranscript , course.courseAnswer, course.courseStartDate, course.courseEndDate];
          
          //console.log("q", values)
          //console.log("q*********************Q")
          const result = await connection.query(query, values).toArray()
          if(result?.error) {
            //handle error
          }
        //   , (error, result) => {
        //     if (error) {
        //       console.error(error);
        //       return;
        //     }
        //     console.log(`Course created successfully`);
           })


           // behavioral design pattern ---> Observer Pattern
           // Email serveice






      const extraHelpDecoratoredCourse = new ExtraHelpDecorator(TranscriptDecoratoredCourse, courseStudentIsTranscript);
      console.log("+++++++ TranscriptDecoratoredCourse ++++++",extraHelpDecoratoredCourse)
      const finalPrice = extraHelpDecoratoredCourse.getPrice();
      console.log("+++++++ TranscriptDecoratoredCourse finalPrice ++++++",finalPrice)

      const decoratedCourse = new TranscriptDecorator(new ExtraHelpDecorator(result[0], courseStudentIsExtraHelp), courseStudentIsTranscript);
      const finalPrice2 = decoratedCourse.getPrice();
      console.log("+++++++ TranscriptDecoratoredCourse finalPrice2  ++++++",finalPrice2) */


    })})
}
}
module.exports = CourseStudentModel;