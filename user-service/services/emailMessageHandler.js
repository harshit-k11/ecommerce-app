const nodemailer = require('nodemailer');

class EmailMessageHandler {
  constructor() {
    this.emailQueue = [];
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '451a5289ef6af9',
        pass: '12cb0994e57c55',
      },
    });
  }

  addToQueue(email) {
    this.emailQueue.push(email);
  }

  async sendEmails() {
    try {
      for (const email of this.emailQueue) {
        const info = await this.transporter.sendMail({
          from: 'WarlordKingsKingdom@gmail.com', // Replace with your email
          to: email.to,
          subject: email.subject,
          text: email.message,
        });

        console.log(`Email sent to ${email.to}: ${info.messageId}`);
      }

      this.emailQueue = [];
    } catch (error) {
      console.error('Error sending emails:', error.message);
    }
  }

  static getInstance() {
    if (!EmailMessageHandler.instance) {
      EmailMessageHandler.instance = new EmailMessageHandler();
    }
    return EmailMessageHandler.instance;
  }

  sendWelcomeEmail(email, message) {
    this.addToQueue({
      to: email,
      subject: 'Welcome to our platform!',
      message,
    });
    this.sendEmails();
  }

  sendCourseSeatEmail(email, numStudents) {
    const message = `Congratulations! You have secured a seat in the course. Total Students: ${numStudents}`;
    this.addToQueue({
      to: email,
      subject: 'Course Seat Confirmation',
      message,
    });
    this.sendEmails();
  }
}

module.exports = EmailMessageHandler;
