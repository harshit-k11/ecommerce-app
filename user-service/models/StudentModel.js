const User = require('./UserModel');
const NormalSubscription = require('../states/NormalSubscription');

class Student extends User {
    constructor(username, password, studentSpecificProperty) {
        super(username, password);
        this.studentSpecificProperty = studentSpecificProperty;
        this.setSubscriptionState(new NormalSubscription(this));
    }

    upgradeSubscription() {
        this.subscriptionState.nextSubscription();
    }

    downgradeSubscription() {
        this.subscriptionState.previousSubscription();
    }
}

module.exports = Student;