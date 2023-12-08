const CourseStudentModel = require('./CourseStudentModel');

describe('CourseStudentModel', () => {
  let mockPool, mockConnection, mockFactoryDiscount, courseStudentModel;

  beforeEach(() => {
    mockConnection = {
      query: jest.fn((sql, params, callback) => {
        const result = [
          {
            course_id: 1,
            courseName: 'Math',
            courseDescription: 'Math course',
            coursePrice: 100,
            courseTeacherId: 1,
            courseTranscript: true,
            courseAnswer: true,
            courseStartDate: '2022-01-01',
            courseEndDate: '2022-12-31',
          },
        ];
        callback(null, result);
      }),
    };

    mockPool = {
      getConnection: jest.fn((callback) => {
        callback(null, mockConnection);
      }),
    };

    mockFactoryDiscount = {
      createDiscount: jest.fn(() => 0.2), // Simulate a 20% discount
    };

    courseStudentModel = new CourseStudentModel(
      true, // courseStudentIsExtraHelp
      true, // courseStudentIsTranscript
      true, // courseStudentIsAnswers
      1, // courseStudentStudentID
      1 // coursestudent_courseID
    );

    // Set the mocked dependencies
    courseStudentModel.pool = mockPool;
    courseStudentModel.FactoryDiscount = mockFactoryDiscount;
  });

  it('should instantiate correctly', () => {
    expect(courseStudentModel).toBeInstanceOf(CourseStudentModel);
  });

  it('should call the pool.getConnection method', () => {
    courseStudentModel.buyCourse();
    expect(mockPool.getConnection).toHaveBeenCalled();
  });

  it('should call the connection.query method', () => {
    courseStudentModel.buyCourse();
    expect(mockConnection.query).toHaveBeenCalled();
  });

  it('should call the FactoryDiscount.createDiscount method', () => {
    courseStudentModel.buyCourse();
    expect(mockFactoryDiscount.createDiscount).toHaveBeenCalled();
  });

  it('should return the correct course data', async () => {
    const result = await courseStudentModel.buyCourse();
    expect(result).toEqual([
      {
        course_id: 1,
        courseName: 'Math',
        courseDescription: 'Math course',
        coursePrice: 100,
        courseTeacherId: 1,
        courseTranscript: true,
        courseAnswer: true,
        courseStartDate: '2022-01-01',
        courseEndDate: '2022-12-31',
      },
    ]);
  });
});