const pool = require('../services/DatabaseConnection')
const ExtraHelpDecorator = require('../decorators/ExtraHelpDecorator')
const TranscriptDecorator = require('../decorators/TranscriptDecorator')
const AnswersDecorator = require('../decorators/AnswersDecorator')

const NormalDiscountFactory = require('../factories/NormalDiscountFactory')
const FestivalSaleDiscountFactory = require('../factories/FestivalSaleDiscountFactory')

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
      const TranscriptDecoratoredCourse = new TranscriptDecorator(result[0], courseStudentIsTranscript);
      console.log("+++++++ TranscriptDecoratoredCourse ++++++",TranscriptDecoratoredCourse)
      const transcriptAddedPrice = TranscriptDecoratoredCourse.getPrice();
      console.log("+++++++ TranscriptDecoratoredCourse finalPrice ++++++",transcriptAddedPrice)

      const extraHelpDecoratoredCourse = new ExtraHelpDecorator(result[0], courseStudentIsExtraHelp);
      console.log("+++++++ extraHelpDecoratoredCourse ++++++",extraHelpDecoratoredCourse)
      const extraHelpAddedPrice = extraHelpDecoratoredCourse.getPrice();
      console.log("+++++++ extraHelpDecoratoredCourse extraHelpAddedPrice ++++++",extraHelpAddedPrice)

      const AnswersDecoratoredCourse = new AnswersDecorator(result[0], courseStudentIsAnswers);
      console.log("+++++++ AnswersDecoratoredCourse ++++++",extraHelpDecoratoredCourse)
      const asnwersAddedPrice = AnswersDecoratoredCourse.getPrice();
      console.log("+++++++ AnswersDecoratoredCourse finalPrice ++++++",asnwersAddedPrice)

      var finalPrice = 0
      finalPrice =  transcriptAddedPrice + extraHelpAddedPrice + asnwersAddedPrice
      console.log("+++++++  finalPrice ++++++",finalPrice)

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

    // subcription discount

    




/*
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