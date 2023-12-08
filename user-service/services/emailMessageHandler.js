const nodemailer = require('nodemailer');

// Strategy: EmailSendingStrategy (Abstract Strategy)
class EmailSendingStrategy {
  // Method to be implemented by concrete strategy classes
  async sendMail(email) {}
}

// Concrete Strategy: NodemailerStrategy
class NodemailerStrategy extends EmailSendingStrategy {
  constructor() {
    super();
    // Using Nodemailer to create a transport mechanism
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '451a5289ef6af9',
        pass: '12cb0994e57c55',
      },
    });
  }

  // Implementing the sendMail method specific to NodemailerStrategy
  async sendMail(email) {
    try {
      const info = await this.transporter.sendMail({
        from: 'WarlordKingsKingdom@gmail.com', // Your Email
        to: email.to,
        subject: email.subject,
        text: email.message,
      });
      console.log(`Email sent to ${email.to}: ${info.messageId}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  }
}


class EmailMessageHandler {
  constructor(strategy) {
    this.strategy = strategy; // Context holds a reference to the selected strategy
    this.emailQueue = [];
  }

  // Method to add emails to the queue
  addToQueue(email) {
    this.emailQueue.push(email);
  }

  // Method to send emails using the selected strategy
  async sendEmails() {
    for (let email of this.emailQueue) {
      await this.strategy.sendMail(email); // Using the selected strategy to send emails
    }
    this.emailQueue = [];
  }

  // Other methods to trigger specific types of emails
  sendWelcomeEmail(email, message) {
    this.addToQueue({
      to: email,
      subject: 'Welcome to our platform!',
      message,
    });
    this.sendEmails();
  }

  sendMembershipCongrats(email) {
    this.addToQueue({
      to: email,
      subject: 'Congratulations on Getting the Membership!',
      message: 'Welcome to our exclusive membership program. Enjoy your benefits!',
    });
    this.sendEmails();
  }

  sendPaymentConfirmation(email, amount) {
    const message = `Your payment of $${amount} has been confirmed. Thank you for your purchase!`;
    this.addToQueue({
      to: email,
      subject: 'Payment Confirmation',
      message,
    });
    this.sendEmails();
  }

  sendMessageToTeacher(email, courseName) {
    const message = `A student has enrolled in your course "${courseName}". Please prepare accordingly.`;
    this.addToQueue({
      to: email,
      subject: 'Student Enrollment Confirmation',
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
