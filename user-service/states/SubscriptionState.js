class SubscriptionState {
    constructor(user) {
        this.user = user;
    }

    nextSubscription() {
        throw new Error('This method must be overwritten!');
    }

    previousSubscription() {
        throw new Error('This method must be overwritten!');
    }

    getDiscount() {
        throw new Error('This method must be overwritten!');
    }
}

module.exports = SubscriptionState;