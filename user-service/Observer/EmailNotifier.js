const { SuccessEmailObserver, FailureEmailObserver } = require("./Observer");
// Subject
class EmailNotifier {
  constructor() {
    this.observers = [];
    this.state = null;
  }

  attach(observer) {
    this.observers.push(observer)
  }

  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }

  notifyAllObservers() {
    for (let observer of this.observers) {
      observer.update(this);
    }
  }
}

const emailNotifier = new EmailNotifier();
emailNotifier.attach(new SuccessEmailObserver());
emailNotifier.attach(new FailureEmailObserver());

module.exports = emailNotifier;
