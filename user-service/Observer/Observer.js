const { EmailMessageHandler } = require('../services/emailMessageHandler');
// Observer interface
class Observer {
  update(subject) {}
}

// Concrete observers
class SuccessEmailObserver extends Observer {
  update(subject) {
    if (subject.state === 'success') {
      // Send success email
      const welcomeMessage = `Welcome to our platform, ${this.username}!`;
      EmailMessageHandler.getInstance().sendWelcomeEmail(req.body.email, welcomeMessage);
    }
  }
}

class FailureEmailObserver extends Observer {
  update(subject) {
    if (subject.state === 'failure') {
      // Send failure email
      const welcomeMessage = `Welcome to our platform, ${this.username}!`;
      EmailMessageHandler.getInstance().sendWelcomeEmail(req.body.email, welcomeMessage);
    }
  }
}